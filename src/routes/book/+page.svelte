<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { BadgeCheck, BedDouble, Eye, Maximize, ShieldCheck, Users } from '@lucide/svelte';
	import BookingBar from '#lib/components/BookingBar.svelte';
	import { inr, nightsBetween, ROOMS, totalFor, usrcset, type Room } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	function todayPlus(n: number): string {
		const d = new Date();
		d.setDate(d.getDate() + n);
		return d.toISOString().slice(0, 10);
	}

	// Prerendered shell: SvelteKit throws (url_search_unavailable_prerender)
	// if a prerendered page reads `url.searchParams` during SSR, so the
	// shell renders with defaults and the real query params are applied in
	// onMount, in the browser. Hydration still matches (initial state =
	// SSR state); the update happens after mount.
	let checkIn = $state(todayPlus(7));
	let checkOut = $state(todayPlus(9));
	let guests = $state(2);
	let roomsCount = $state(1);
	let selected: Room | undefined = $state(ROOMS[0]);
	const nights = $derived(nightsBetween(checkIn, checkOut));

	onMount(() => {
		const q = page.url.searchParams;
		// No params at all: refresh the defaults from the client clock, so a
		// shell built yesterday never shows stale default dates.
		if (!q.get('checkIn') && !q.get('checkOut') && !q.get('room') && !q.get('guests') && !q.get('rooms')) {
			checkIn = todayPlus(7);
			checkOut = todayPlus(9);
			return;
		}
		const ci = q.get('checkIn');
		if (ci) checkIn = ci;
		const co = q.get('checkOut');
		if (co) checkOut = co;
		const g = Number(q.get('guests') ?? NaN);
		if (Number.isFinite(g) && g >= 1) guests = g;
		const r = Number(q.get('rooms') ?? NaN);
		if (Number.isFinite(r) && r >= 1) roomsCount = r;
		const slug = q.get('room');
		if (slug) {
			const found = ROOMS.find((room) => room.slug === slug);
			if (found) selected = found;
		}
	});

	function fmtDate(s: string): string {
		return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
	}

	function continueToCheckout() {
		if (!selected) return;
		const params = new URLSearchParams({ room: selected.slug, checkIn, checkOut, guests: String(guests), rooms: String(roomsCount) });
		goto(`/checkout?${params.toString()}`);
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<section class="bg-pine px-4 pt-28 pb-8 text-ivory sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<p class="eyebrow !text-gold">Step 1 of 3 — Choose your room</p>
		<h1 class="font-display mt-3 text-4xl font-semibold sm:text-5xl">Your stay, {fmtDate(checkIn)} — {fmtDate(checkOut)}</h1>
		<p class="mt-2 text-white/80">{nights} {nights === 1 ? 'night' : 'nights'} · {guests} {guests === 1 ? 'guest' : 'guests'} · {roomsCount} {roomsCount === 1 ? 'room' : 'rooms'}</p>
		<div class="mt-6"><BookingBar compact initialCheckIn={checkIn} initialCheckOut={checkOut} initialGuests={guests} initialRooms={roomsCount} /></div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each ROOMS as room, i (room.slug)}
			{@const t = totalFor(room, nights)}
			<article
				class="card min-w-0 {selected?.slug === room.slug ? 'ring-2 ring-gold' : ''}"
				use:reveal={{ delay: (i % 3) * 80 }}
			>
				<button class="block w-full overflow-hidden text-left" onclick={() => (selected = room)} aria-pressed={selected?.slug === room.slug}>
					<img src={room.image} srcset={usrcset(room.image)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={room.name} loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover" />
				</button>
				<div class="p-5">
					<div class="flex items-start justify-between gap-3">
						<h2 class="font-display min-w-0 text-2xl leading-tight font-semibold">{room.name}</h2>
						<p class="shrink-0 text-right"><span class="font-display block text-xl font-semibold">{inr(room.price)}</span><span class="text-xs text-muted">/ night</span></p>
					</div>
					<p class="mt-2 text-sm leading-relaxed text-muted">{room.short}</p>
					<ul class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink/75">
						<li class="flex items-center gap-1.5"><Maximize class="h-3.5 w-3.5 text-gold-dark" /> {room.size} sqm</li>
						<li class="flex items-center gap-1.5"><Users class="h-3.5 w-3.5 text-gold-dark" /> Up to {room.occupancy}</li>
						<li class="flex items-center gap-1.5"><BedDouble class="h-3.5 w-3.5 text-gold-dark" /> {room.bed}</li>
						<li class="flex items-center gap-1.5"><Eye class="h-3.5 w-3.5 text-gold-dark" /> {room.view}</li>
					</ul>
					<div class="mt-4 rounded-sm bg-cream p-3 text-sm">
						<p class="flex justify-between"><span>{nights} {nights === 1 ? 'night' : 'nights'} × {inr(room.price)}</span><span>{inr(t.base)}</span></p>
						<p class="mt-1 flex justify-between text-muted"><span>GST (18%)</span><span>{inr(t.taxes)}</span></p>
						<p class="mt-1 flex justify-between border-t border-line pt-1 font-semibold"><span>Total</span><span>{inr(t.total)}</span></p>
					</div>
					<button
						class={selected?.slug === room.slug ? 'btn-gold mt-4 w-full' : 'btn-pine mt-4 w-full'}
						onclick={() => (selected = room)}
					>
						{#if selected?.slug === room.slug}<BadgeCheck class="h-4 w-4" /> Selected{/if}
						{#if selected?.slug !== room.slug}Select This Room{/if}
					</button>
				</div>
			</article>
		{/each}
	</div>

	<div class="card sticky bottom-20 mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between lg:bottom-6" use:reveal>
		<div class="min-w-0">
			<p class="text-sm text-muted">Selected</p>
			<p class="font-display text-2xl font-semibold">{selected?.name ?? 'No room selected'}</p>
			<p class="text-sm text-muted">
				{#if selected}{nights} {nights === 1 ? 'night' : 'nights'} · {inr(totalFor(selected, nights).total)} total, GST included{/if}
			</p>
		</div>
		<button class="btn-gold shrink-0" onclick={continueToCheckout} disabled={!selected}>Continue to Checkout →</button>
	</div>

	<div class="mt-6 grid gap-4 sm:grid-cols-2" use:reveal>
		<p class="flex items-start gap-3 rounded-md border border-line bg-white p-4 text-sm leading-relaxed"><ShieldCheck class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> <span><strong>Free cancellation</strong> up to 72 hours before check-in on flexible rates. See the <a class="text-gold-dark underline underline-offset-2" href="/cancellation-policy">cancellation policy</a>.</span></p>
		<p class="flex items-start gap-3 rounded-md border border-line bg-white p-4 text-sm leading-relaxed"><BadgeCheck class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> <span><strong>Best rate guarantee</strong> — find a lower rate for the same room and dates within 24 hours of booking and we will match it.</span></p>
	</div>
</section>
