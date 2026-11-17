<script lang="ts">
	import { page } from '$app/state';
	import { CalendarDays, CheckCircle2, Mail, Users } from '@lucide/svelte';
	import { inr, ROOMS } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	type Booking = {
		ref: string; roomSlug: string; roomName: string; checkIn: string; checkOut: string;
		guests: number; rooms: number; nights: number; base: number; taxes: number; total: number;
		name: string; email: string; phone: string; status: string;
	};

	const ref = page.url.searchParams.get('ref') ?? '';
	const roomSlug = page.url.searchParams.get('room') ?? '';
	const room = ROOMS.find((r) => r.slug === roomSlug);

	let booking = $state<Booking | null>(null);
	if (typeof window !== 'undefined') {
		try {
			const list: Booking[] = JSON.parse(localStorage.getItem('aurelia-bookings') ?? '[]');
			booking = list.find((b) => b.ref === ref) ?? null;
		} catch { /* ignore */ }
	}

	function fmtDate(s: string): string {
		if (!s) return '—';
		return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
	}
</script>

<svelte:head>
	<title>Booking Confirmed {ref} — The Aurelia Palace, Jaipur</title>
	<meta name="description" content="Your booking at The Aurelia Palace, Jaipur is confirmed (demo). Keep your booking reference safe." />
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 pt-28 pb-16 text-center sm:px-6 lg:px-8">
	<div use:reveal>
		<CheckCircle2 class="mx-auto h-16 w-16 text-pine" />
		<p class="eyebrow mt-5">Step 3 of 3 — Confirmed</p>
		<h1 class="font-display mt-3 text-5xl font-semibold sm:text-6xl">You are booked in.</h1>
		<p class="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
			Thank you{#if booking}, {booking.name}{/if} — your stay at The Aurelia Palace is confirmed.
			Keep your booking reference safe; you will need it to manage or cancel your booking.
		</p>
	</div>

	<div class="card mt-8 p-6 text-left sm:p-8" use:reveal>
		<p class="label">Booking reference</p>
		<p class="font-display text-4xl font-semibold tracking-wide text-pine sm:text-5xl">{ref || '—'}</p>
		{#if room}
			<div class="mt-6 flex gap-4">
				<img src={room.image} alt={room.name} loading="lazy" class="h-20 w-28 shrink-0 rounded-sm object-cover" />
				<div class="min-w-0">
					<h2 class="font-display text-2xl font-semibold">{room.name}</h2>
					<p class="text-sm text-muted">{room.view} · {room.size} sqm · {room.bed}</p>
				</div>
			</div>
		{/if}
		<dl class="mt-6 space-y-3 border-t border-line pt-5 text-sm">
			{#if booking}
				<div class="flex justify-between gap-3"><dt class="flex items-center gap-1.5 text-muted"><CalendarDays class="h-4 w-4" /> Dates</dt><dd class="text-right font-medium">{fmtDate(booking.checkIn)} — {fmtDate(booking.checkOut)} · {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</dd></div>
				<div class="flex justify-between gap-3"><dt class="flex items-center gap-1.5 text-muted"><Users class="h-4 w-4" /> Guests</dt><dd class="font-medium">{booking.guests} guests · {booking.rooms} {booking.rooms === 1 ? 'room' : 'rooms'}</dd></div>
				<div class="flex justify-between gap-3"><dt class="text-muted">Room</dt><dd>{inr(booking.base)}</dd></div>
				<div class="flex justify-between gap-3"><dt class="text-muted">GST (18%)</dt><dd>{inr(booking.taxes)}</dd></div>
				<div class="flex justify-between gap-3 border-t border-line pt-2 text-base font-semibold"><dt>Total</dt><dd>{inr(booking.total)}</dd></div>
				<div class="flex justify-between gap-3"><dt class="text-muted">Status</dt><dd class="font-semibold text-pine">{booking.status}</dd></div>
			{:else}
				<div class="flex justify-between gap-3"><dt class="text-muted">Room</dt><dd class="font-medium">{room?.name ?? '—'}</dd></div>
				<p class="text-sm text-muted">Full details are saved on the device you booked from. Open Manage My Booking on that device to see the complete summary.</p>
			{/if}
		</dl>
		<p class="mt-5 flex items-start gap-2 rounded-sm bg-cream p-4 text-sm leading-relaxed text-muted">
			<Mail class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
			<span><strong>Confirmation email is mock in this demo</strong> — no email is actually sent. In the live hotel, your confirmation and pre-arrival concierge note would arrive within minutes.</span>
		</p>
	</div>

	<div class="mt-8 flex flex-wrap justify-center gap-3" use:reveal>
		<a href="/manage-booking" class="btn-pine">Manage My Booking</a>
		<a href="/" class="btn-ghost">Back to Home</a>
	</div>
	<p class="mt-6 text-sm text-muted">Check-in 2:00 PM · Check-out 12:00 PM · Free cancellation up to 72 hours before check-in.</p>
</section>
