<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, inr } from '#lib/data/hotel';
	import { popIn } from '#lib/motion';
	import { reveal } from '#lib/reveal';
	import { Car, CheckCircle2, Clock, Crown, Mail, Phone, Users } from '@lucide/svelte';

	type Pickup = 'Jaipur International Airport' | 'Jaipur Junction Railway Station' | 'The Aurelia Palace';
	type Vehicle = 'Sedan' | 'SUV' | 'Vintage car';

	const VEHICLES: Array<{ name: Vehicle; price: number; text: string }> = [
		{ name: 'Sedan', price: 1800, text: 'Up to 3 guests with luggage — air-conditioned, chauffeur-driven.' },
		{ name: 'SUV', price: 2800, text: 'Up to 6 guests with luggage — room for the whole family and their bags.' },
		{ name: 'Vintage car', price: 6500, text: 'Arrive in a 1962 Ambassador, polished and chauffeur-driven. A Jaipur entrance.' }
	];

	const today = new Date().toISOString().slice(0, 10);

	let pickup = $state<Pickup>('Jaipur International Airport');
	let date = $state(today);
	let time = $state('12:00');
	let reference = $state('');
	let passengers = $state(2);
	let name = $state('');
	let phone = $state('');
	let vehicle = $state<Vehicle>('Sedan');
	let error = $state('');
	let confirmed = $state(false);
	let bookingRef = $state('');

	const selectedVehicle = $derived(VEHICLES.find((v) => v.name === vehicle) ?? VEHICLES[0]);

	function makeReference(): string {
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		let out = '';
		for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
		return `AP-TRF-${out}`;
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		const digits = phone.replace(/\D/g, '').replace(/^91/, '');
		if (!name.trim() || !phone.trim() || !date || !time || !reference.trim()) {
			error = 'Please fill in all required fields.';
			return;
		}
		if (!/^[6-9]\d{9}$/.test(digits)) {
			error = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.';
			return;
		}
		if (date < today) {
			error = 'Please choose a date from today onwards.';
			return;
		}
		const ref = makeReference();
		bookingRef = ref;
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-transfer') ?? '[]') as unknown[];
			list.push({
				reference: ref,
				pickup,
				date,
				time,
				flightTrain: reference.trim(),
				passengers,
				vehicle,
				price: selectedVehicle.price,
				name: name.trim(),
				phone: digits,
				at: new Date().toISOString()
			});
			localStorage.setItem('aurelia-transfer', JSON.stringify(list));
		} catch {
			/* storage unavailable — still show confirmation */
		}
		confirmed = true;
	}

	function reset() {
		confirmed = false;
		bookingRef = '';
		pickup = 'Jaipur International Airport';
		date = today;
		time = '12:00';
		reference = '';
		passengers = 2;
		name = '';
		phone = '';
		vehicle = 'Sedan';
		error = '';
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Transfers"
	title="Arrive like royalty"
	subtitle="Jaipur airport is 25 minutes away. Book a chauffeur — a sedan, an SUV, or a vintage car — and we will be waiting at arrivals with your name on a board."
	image={IMAGES.resort}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	{#if confirmed}
		<div class="card mx-auto max-w-2xl p-6 sm:p-8" use:popIn>
			<CheckCircle2 class="h-10 w-10 text-gold-dark" />
			<h2 class="section-title mt-4">Transfer booked</h2>
			<p class="mt-2 text-base leading-relaxed text-muted">
				Your chauffeur will meet you at {pickup} on {date} at {time}. Your reference is
				<span class="font-semibold text-ink">{bookingRef}</span> — please keep it handy.
			</p>
			<dl class="mt-6 space-y-3 text-sm">
				<div class="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-3"><dt class="text-muted">Reference</dt><dd class="font-semibold">{bookingRef}</dd></div>
				<div class="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-3"><dt class="text-muted">Vehicle</dt><dd class="font-semibold">{vehicle} — {inr(selectedVehicle.price)} one-way</dd></div>
				<div class="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-3"><dt class="text-muted">Pickup</dt><dd class="font-semibold">{pickup}</dd></div>
				<div class="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-3"><dt class="text-muted">Date & time</dt><dd class="font-semibold">{date} at {time}</dd></div>
				<div class="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-3"><dt class="text-muted">Flight / train</dt><dd class="font-semibold">{reference}</dd></div>
				<div class="flex flex-wrap justify-between gap-2 border-b border-ink/10 pb-3"><dt class="text-muted">Passengers</dt><dd class="font-semibold">{passengers}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Booked for</dt><dd class="font-semibold">{name} · {phone}</dd></div>
			</dl>
			<button type="button" onclick={reset} class="btn-pine mt-6">Book another transfer</button>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-5" use:reveal>
			<div class="min-w-0 lg:col-span-3">
				<p class="eyebrow">Book a transfer</p>
				<h2 class="section-title mt-2">One-way, chauffeur-driven</h2>
				<p class="mt-4 text-base leading-relaxed text-muted">
					Prices are per one-way trip, including meet-and-greet and all tolls. Suite guests travel complimentary — book here and we will waive the charge at check-in.
				</p>
				<form class="mt-8 grid gap-4 sm:grid-cols-2" onsubmit={submit} novalidate>
					<label class="min-w-0">
						<span class="label">Pickup from *</span>
						<select class="input" bind:value={pickup}>
							<option value="Jaipur International Airport">Jaipur International Airport</option>
							<option value="Jaipur Junction Railway Station">Jaipur Junction Railway Station</option>
							<option value="The Aurelia Palace">The Aurelia Palace (to airport / station)</option>
						</select>
					</label>
					<label class="min-w-0">
						<span class="label">Vehicle *</span>
						<select class="input" bind:value={vehicle}>
							{#each VEHICLES as v (v.name)}
								<option value={v.name}>{v.name} — {inr(v.price)} one-way</option>
							{/each}
						</select>
					</label>
					<label class="min-w-0">
						<span class="label">Date *</span>
						<input type="date" class="input" bind:value={date} min={today} required />
					</label>
					<label class="min-w-0">
						<span class="label">Time *</span>
						<input type="time" class="input" bind:value={time} required />
					</label>
					<label class="min-w-0">
						<span class="label">Flight / train number *</span>
						<input class="input" bind:value={reference} placeholder="e.g. AI 123 or 12955" autocomplete="off" required />
					</label>
					<label class="min-w-0">
						<span class="label">Passengers *</span>
						<input type="number" class="input" bind:value={passengers} min="1" max="6" inputmode="numeric" required />
					</label>
					<label class="min-w-0">
						<span class="label">Full name *</span>
						<input class="input" bind:value={name} placeholder="Your full name" autocomplete="name" required />
					</label>
					<label class="min-w-0">
						<span class="label">Phone (+91) *</span>
						<input type="tel" class="input" bind:value={phone} placeholder="98765 43210" autocomplete="tel" inputmode="tel" required />
					</label>
					{#if error}
						<p class="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2" role="alert">{error}</p>
					{/if}
					<div class="sm:col-span-2">
						<button type="submit" class="btn-gold min-h-11">Book Transfer — {inr(selectedVehicle.price)}</button>
					</div>
				</form>
			</div>
			<div class="min-w-0 lg:col-span-2">
				<div class="space-y-4">
					{#each VEHICLES as v (v.name)}
						<div class="card min-w-0 p-6">
							{#if v.name === 'Sedan'}<Car class="h-6 w-6 text-gold-dark" />
							{:else if v.name === 'SUV'}<Users class="h-6 w-6 text-gold-dark" />
							{:else}<Crown class="h-6 w-6 text-gold-dark" />{/if}
							<h3 class="font-display mt-4 text-2xl font-semibold">{v.name}</h3>
							<p class="mt-1 text-sm leading-relaxed text-muted">{v.text}</p>
							<p class="mt-3 text-sm text-muted"><span class="font-display text-2xl font-semibold text-gold-dark">{inr(v.price)}</span> one-way</p>
						</div>
					{/each}
					<div class="card min-w-0 p-6">
						<Clock class="h-6 w-6 text-gold-dark" />
						<h3 class="font-display mt-4 text-2xl font-semibold">Good to know</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">
							The airport is 25 minutes away in normal traffic. Your chauffeur tracks your flight and waits up to 60 minutes free if it is delayed. Prefer to arrange by phone? Call {HOTEL.phone} or write to {HOTEL.email}.
						</p>
						<p class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
							<a href="tel:{HOTEL.phoneHref}" class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-dark"><Phone class="h-4 w-4" /> {HOTEL.phone}</a>
							<a href="mailto:{HOTEL.email}" class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-dark"><Mail class="h-4 w-4" /> {HOTEL.email}</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>
