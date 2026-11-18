<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ArrowLeft, CalendarDays, CreditCard, Landmark, Lock, ShieldCheck, Smartphone, Users } from '@lucide/svelte';
	import { inr, nightsBetween, ROOMS, totalFor, usrcset } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	const q = page.url.searchParams;
	const roomSlug = q.get('room') ?? '';
	const checkIn = q.get('checkIn') ?? '';
	const checkOut = q.get('checkOut') ?? '';
	const guests = Number(q.get('guests') ?? 2);
	const roomsCount = Number(q.get('rooms') ?? 1);
	const room = ROOMS.find((r) => r.slug === roomSlug);
	const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
	const totals = room && nights ? totalFor(room, nights) : null;

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let requests = $state('');
	let payment = $state<'upi' | 'card' | 'netbanking'>('upi');
	let upiId = $state('');
	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvv = $state('');
	let cardName = $state('');
	let error = $state('');

	function fmtDate(s: string): string {
		return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
	}
	function fmtCard(v: string): string {
		return v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
	}

	function pay(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!room || !totals) return;
		const digits = phone.replace(/\D/g, '').replace(/^91/, '');
		if (!name.trim() || !email.trim() || !phone.trim()) { error = 'Please fill in your name, email and phone.'; return; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { error = 'Please enter a valid email address.'; return; }
		if (!/^[6-9]\d{9}$/.test(digits)) { error = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'; return; }
		if (payment === 'upi' && upiId.trim() && !/^[\w.+-]+@[a-zA-Z]{2,}$/.test(upiId.trim())) { error = 'Please enter a valid UPI ID (for example name@okhdfcbank) or leave it blank to pay at the hotel.'; return; }
		if (payment === 'card' && (cardNumber.replace(/\D/g, '').length < 15 || cardExpiry.trim().length < 5 || cardCvv.replace(/\D/g, '').length < 3)) { error = 'Please enter a complete mock card number, expiry and CVV — or choose UPI instead.'; return; }
		const ref = 'AP-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
		const booking = {
			ref, roomSlug: room.slug, roomName: room.name, checkIn, checkOut, guests, rooms: roomsCount,
			nights, base: totals.base, taxes: totals.taxes, total: totals.total,
			name: name.trim(), email: email.trim(), phone: digits, requests: requests.trim(),
			payment, status: 'Confirmed', createdAt: new Date().toISOString()
		};
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-bookings') ?? '[]');
			list.push(booking);
			localStorage.setItem('aurelia-bookings', JSON.stringify(list));
		} catch { /* ignore */ }
		goto(`/confirmation?ref=${ref}&room=${room.slug}`);
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 pt-28 pb-14 sm:px-6 lg:px-8">
	<p class="eyebrow">Step 2 of 3 — Guest details & payment</p>
	<h1 class="section-title mt-2">Almost there</h1>
	<p class="mt-2 flex items-center gap-2 text-sm text-muted"><Lock class="h-4 w-4 text-gold-dark" /> Demo checkout — no real payment is taken. Your booking is saved on this device only.</p>

	{#if !room || !totals}
		<div class="card mt-8 p-8 text-center" use:reveal>
			<h2 class="font-display text-3xl font-semibold">We could not find that room</h2>
			<p class="mx-auto mt-3 max-w-md text-muted">The booking link is incomplete or the room no longer exists. Please choose a room again.</p>
			<a href="/book" class="btn-gold mt-6">Choose a Room</a>
		</div>
	{:else}
		<div class="mt-8 grid gap-8 lg:grid-cols-5">
			<form class="min-w-0 space-y-8 lg:col-span-3" onsubmit={pay} novalidate use:reveal>
				<section class="card p-6">
					<h2 class="font-display text-2xl font-semibold">Guest details</h2>
					<div class="mt-5 grid gap-4 sm:grid-cols-2">
						<label class="min-w-0 sm:col-span-2"><span class="label">Full name *</span><input class="input" bind:value={name} placeholder="As on your ID" autocomplete="name" required /></label>
						<label class="min-w-0"><span class="label">Email *</span><input type="email" class="input" bind:value={email} placeholder="you@example.com" autocomplete="email" required /></label>
						<label class="min-w-0"><span class="label">Phone (+91) *</span><input type="tel" class="input" bind:value={phone} placeholder="98765 43210" autocomplete="tel" inputmode="tel" required /></label>
						<label class="min-w-0 sm:col-span-2"><span class="label">Special requests (optional)</span><textarea class="input min-h-24 resize-y" bind:value={requests} placeholder="Early check-in, extra bed, anniversary setup…"></textarea></label>
					</div>
				</section>

				<section class="card p-6">
					<h2 class="font-display text-2xl font-semibold">Payment method</h2>
					<div class="mt-5 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
						<label class="flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border p-3 {payment === 'upi' ? 'border-gold bg-cream' : 'border-line'}">
							<input type="radio" name="payment" value="upi" bind:group={payment} class="accent-[#b9975b]" /> <Smartphone class="h-4 w-4" /> UPI
						</label>
						<label class="flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border p-3 {payment === 'card' ? 'border-gold bg-cream' : 'border-line'}">
							<input type="radio" name="payment" value="card" bind:group={payment} class="accent-[#b9975b]" /> <CreditCard class="h-4 w-4" /> Card
						</label>
						<label class="flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border p-3 {payment === 'netbanking' ? 'border-gold bg-cream' : 'border-line'}">
							<input type="radio" name="payment" value="netbanking" bind:group={payment} class="accent-[#b9975b]" /> <Landmark class="h-4 w-4" /> NetBanking
						</label>
					</div>
					{#if payment === 'upi'}
						<label class="mt-4 block min-w-0"><span class="label">UPI ID (optional — leave blank to pay at the hotel)</span><input class="input" bind:value={upiId} placeholder="name@okhdfcbank" inputmode="email" /></label>
					{:else if payment === 'card'}
						<div class="mt-4 grid gap-4 sm:grid-cols-2">
							<label class="min-w-0 sm:col-span-2"><span class="label">Card number (demo — use any 16 digits)</span><input class="input" value={fmtCard(cardNumber)} oninput={(e) => (cardNumber = (e.target as HTMLInputElement).value)} placeholder="4242 4242 4242 4242" inputmode="numeric" /></label>
							<label class="min-w-0"><span class="label">Expiry</span><input class="input" bind:value={cardExpiry} placeholder="MM / YY" inputmode="numeric" /></label>
							<label class="min-w-0"><span class="label">CVV</span><input class="input" bind:value={cardCvv} placeholder="123" inputmode="numeric" /></label>
							<label class="min-w-0 sm:col-span-2"><span class="label">Name on card</span><input class="input" bind:value={cardName} placeholder="As printed on the card" /></label>
						</div>
					{:else}
						<p class="mt-4 rounded-sm bg-cream p-4 text-sm leading-relaxed text-muted">NetBanking is a demo option: no bank page will open and no payment will be taken. Your booking will be confirmed as “pay at hotel”.</p>
					{/if}
				</section>

				{#if error}<p class="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>{/if}
				<div class="flex flex-wrap gap-3">
					<button type="submit" class="btn-gold flex-1"><Lock class="h-4 w-4" /> Confirm Booking · {inr(totals.total)}</button>
					<a href="/book?room={room.slug}&checkIn={checkIn}&checkOut={checkOut}&guests={guests}&rooms={roomsCount}" class="btn-ghost"><ArrowLeft class="h-4 w-4" /> Back</a>
				</div>
				<p class="flex items-start gap-2 text-sm text-muted"><ShieldCheck class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Free cancellation up to 72 hours before check-in. No real payment is taken in this demo.</p>
			</form>

			<aside class="min-w-0 lg:col-span-2" use:reveal>
				<div class="card overflow-hidden">
					<img src={room.image} srcset={usrcset(room.image)} sizes="(max-width: 1024px) 100vw, 50vw" alt={room.name} loading="lazy" decoding="async" class="aspect-[16/9] w-full object-cover" />
					<div class="p-6">
						<h2 class="font-display text-2xl font-semibold">{room.name}</h2>
						<p class="mt-1 text-sm text-muted">{room.view} · {room.size} sqm · {room.bed}</p>
						<dl class="mt-5 space-y-2 border-t border-line pt-4 text-sm">
							<div class="flex justify-between gap-3"><dt class="flex items-center gap-1.5 text-muted"><CalendarDays class="h-4 w-4" /> Dates</dt><dd class="text-right font-medium">{fmtDate(checkIn)} — {fmtDate(checkOut)}</dd></div>
							<div class="flex justify-between gap-3"><dt class="flex items-center gap-1.5 text-muted"><Users class="h-4 w-4" /> Guests</dt><dd class="font-medium">{guests} guests · {roomsCount} {roomsCount === 1 ? 'room' : 'rooms'} · {nights} {nights === 1 ? 'night' : 'nights'}</dd></div>
							<div class="flex justify-between gap-3"><dt class="text-muted">Room ({nights} × {inr(room.price)})</dt><dd>{inr(totals.base)}</dd></div>
							<div class="flex justify-between gap-3"><dt class="text-muted">GST (18%)</dt><dd>{inr(totals.taxes)}</dd></div>
							<div class="flex justify-between gap-3 border-t border-line pt-2 text-base font-semibold"><dt>Total</dt><dd>{inr(totals.total)}</dd></div>
						</dl>
						<p class="mt-4 text-xs leading-relaxed text-muted">Breakfast at The Courtyard included. Taxes shown upfront — no surprises at check-in.</p>
					</div>
				</div>
			</aside>
		</div>
	{/if}
</section>
