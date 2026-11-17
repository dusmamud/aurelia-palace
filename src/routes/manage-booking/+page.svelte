<script lang="ts">
	import { CalendarDays, Search, Users, XCircle } from '@lucide/svelte';
	import { inr } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	type Booking = {
		ref: string; roomSlug: string; roomName: string; checkIn: string; checkOut: string;
		guests: number; rooms: number; nights: number; base: number; taxes: number; total: number;
		name: string; email: string; phone: string; status: string;
	};

	function loadAll(): Booking[] {
		if (typeof window === 'undefined') return [];
		try { return JSON.parse(localStorage.getItem('aurelia-bookings') ?? '[]'); } catch { return []; }
	}
	function saveAll(list: Booking[]) {
		try { localStorage.setItem('aurelia-bookings', JSON.stringify(list)); } catch { /* ignore */ }
	}

	let all = $state<Booking[]>(loadAll());
	let refInput = $state('');
	let contactInput = $state('');
	let found = $state<Booking | null>(null);
	let searched = $state(false);
	let message = $state('');

	function fmtDate(s: string): string {
		return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
	}

	function lookup(e: SubmitEvent) {
		e.preventDefault();
		searched = true;
		found = null;
		message = '';
		const ref = refInput.trim().toUpperCase();
		const contact = contactInput.trim().toLowerCase();
		if (!ref || !contact) { message = 'Please enter both your booking reference and email or phone.'; return; }
		const digits = contact.replace(/\D/g, '').replace(/^91/, '');
		const match = loadAll().find((b) => b.ref.toUpperCase() === ref && (b.email.toLowerCase() === contact || b.phone === digits || b.phone === contact.replace(/\D/g, '')));
		if (match) found = match;
		else message = 'No booking found with that reference and contact. Check the reference (it starts with AP-) and try again, or book a new stay.';
	}

	function cancel(b: Booking) {
		const list = loadAll().map((x) => (x.ref === b.ref ? { ...x, status: 'Cancelled' } : x));
		saveAll(list);
		all = list;
		found = { ...b, status: 'Cancelled' };
	}
</script>

<svelte:head>
	<title>Manage My Booking — The Aurelia Palace, Jaipur</title>
	<meta name="description" content="Look up, view or cancel your booking at The Aurelia Palace, Jaipur with your booking reference and email or phone." />
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 pt-28 pb-14 sm:px-6 lg:px-8">
	<p class="eyebrow">Manage my booking</p>
	<h1 class="section-title mt-2">Find your booking</h1>
	<p class="mt-3 max-w-2xl leading-relaxed text-muted">
		Enter the booking reference from your confirmation (it starts with <strong>AP-</strong>) and the
		email or phone you booked with. Bookings are stored on this device only in this demo.
	</p>

	<form class="card mt-8 grid max-w-3xl gap-4 p-6 sm:grid-cols-[1fr_1fr_auto]" onsubmit={lookup} novalidate use:reveal>
		<label class="min-w-0"><span class="label">Booking reference *</span><input class="input uppercase" bind:value={refInput} placeholder="AP-XXXXXX" autocomplete="off" required /></label>
		<label class="min-w-0"><span class="label">Email or phone *</span><input class="input" bind:value={contactInput} placeholder="you@example.com / 98765 43210" autocomplete="email" required /></label>
		<button type="submit" class="btn-gold sm:self-end"><Search class="h-4 w-4" /> Find Booking</button>
	</form>

	{#if message}<p class="mt-5 max-w-3xl rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{message}</p>{/if}

	{#if found}
		<article class="card mt-6 max-w-3xl p-6" use:reveal>
			<div class="flex flex-wrap items-start justify-between gap-3">
				<div>
					<p class="label">Booking reference</p>
					<p class="font-display text-3xl font-semibold">{found.ref}</p>
					<h2 class="font-display mt-2 text-2xl font-semibold">{found.roomName}</h2>
					<p class="text-sm text-muted">Booked by {found.name} · {found.email}</p>
				</div>
				<span class="chip {found.status === 'Cancelled' ? '!border-red-200 !bg-red-50 !text-red-800' : '!border-pine/20 !bg-pine/5 !text-pine'}">{found.status}</span>
			</div>
			<dl class="mt-5 space-y-2 border-t border-line pt-4 text-sm">
				<div class="flex justify-between gap-3"><dt class="flex items-center gap-1.5 text-muted"><CalendarDays class="h-4 w-4" /> Dates</dt><dd class="text-right font-medium">{fmtDate(found.checkIn)} — {fmtDate(found.checkOut)} · {found.nights} {found.nights === 1 ? 'night' : 'nights'}</dd></div>
				<div class="flex justify-between gap-3"><dt class="flex items-center gap-1.5 text-muted"><Users class="h-4 w-4" /> Guests</dt><dd class="font-medium">{found.guests} guests · {found.rooms} {found.rooms === 1 ? 'room' : 'rooms'}</dd></div>
				<div class="flex justify-between gap-3"><dt class="text-muted">Total paid (demo)</dt><dd class="font-semibold">{inr(found.total)}</dd></div>
			</dl>
			{#if found.status !== 'Cancelled'}
				<p class="mt-4 text-sm text-muted">Free cancellation up to 72 hours before check-in. Cancelling here updates the booking stored on this device.</p>
				<button class="btn-ghost mt-4 !border-red-300 !text-red-800 hover:!border-red-500" onclick={() => cancel(found!)}><XCircle class="h-4 w-4" /> Cancel Booking</button>
			{:else}
				<p class="mt-4 rounded-sm bg-red-50 p-4 text-sm text-red-800">This booking is cancelled. You can book the same room again for new dates.</p>
				<a href="/book" class="btn-gold mt-4">Book Again</a>
			{/if}
		</article>
	{/if}

	<div class="mt-12" use:reveal>
		<h2 class="font-display text-3xl font-semibold">Your bookings on this device</h2>
		{#if all.length === 0}
			<p class="mt-3 max-w-2xl text-muted">No bookings saved on this device yet. <a href="/book" class="font-semibold text-gold-dark underline underline-offset-2">Book your stay</a> and it will appear here.</p>
		{:else}
			<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each all as b (b.ref)}
					<article class="card min-w-0 p-5">
						<div class="flex items-start justify-between gap-3">
							<p class="font-display text-xl font-semibold">{b.ref}</p>
							<span class="chip {b.status === 'Cancelled' ? '!border-red-200 !bg-red-50 !text-red-800' : ''}">{b.status}</span>
						</div>
						<p class="mt-1 font-medium">{b.roomName}</p>
						<p class="mt-1 text-sm text-muted">{fmtDate(b.checkIn)} — {fmtDate(b.checkOut)} · {b.nights} {b.nights === 1 ? 'night' : 'nights'}</p>
						<p class="mt-2 text-sm font-semibold">{inr(b.total)} total</p>
					</article>
				{/each}
			</div>
		{/if}
		{#if searched && !found && !message}
			<p class="mt-4 text-sm text-muted">Nothing matched — check the reference and try again.</p>
		{/if}
	</div>
</section>
