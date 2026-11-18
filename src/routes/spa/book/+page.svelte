<script lang="ts">
	import { BadgeCheck, Check, Clock, Leaf, Phone, Sparkles } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, inr } from '#lib/data/hotel';
	import { SPA_HOURS, SPA_TREATMENTS } from '#lib/data/spa-treatments';
	import { popIn } from '#lib/motion';
	import { reveal } from '#lib/reveal';

	function todayStr(): string {
		const d = new Date();
		return d.toISOString().slice(0, 10);
	}

	function makeRef(prefix: string): string {
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		return prefix + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
	}

	let treatmentSlug = $state(SPA_TREATMENTS[0].slug);
	let date = $state(todayStr());
	let time = $state('11:00');
	let name = $state('');
	let phone = $state('');
	let error = $state('');
	let reference = $state('');
	let saved = $state(false);

	const today = todayStr();
	const chosen = $derived(SPA_TREATMENTS.find((t) => t.slug === treatmentSlug) ?? SPA_TREATMENTS[0]);

	function fmtDate(s: string): string {
		return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
		if (!name.trim() || !phone.trim() || !date || !time) {
			error = 'Please fill in all required fields.';
			return;
		}
		if (!/^[6-9]\d{9}$/.test(digits)) {
			error = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.';
			return;
		}
		reference = makeRef('AP-SPA-');
		const booking = {
			reference,
			treatment: chosen.name,
			duration: chosen.duration,
			price: chosen.price,
			date,
			time,
			name: name.trim(),
			phone: digits,
			at: new Date().toISOString()
		};
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-spa') ?? '[]');
			list.push(booking);
			localStorage.setItem('aurelia-spa', JSON.stringify(list));
		} catch {
			/* storage unavailable — the confirmation is still shown on screen */
		}
		saved = true;
	}

	function reset() {
		treatmentSlug = SPA_TREATMENTS[0].slug;
		date = todayStr();
		time = '11:00';
		name = '';
		phone = '';
		error = '';
		reference = '';
		saved = false;
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Amara Spa & Hammam"
	title="Book a spa treatment"
	subtitle="Ayurvedic rituals, a marble hammam and candlelit treatment suites — choose your treatment, your day and your hour."
	image={IMAGES.spa}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	{#if saved}
		<div class="card mx-auto max-w-2xl p-6 sm:p-8" use:popIn>
			<BadgeCheck class="h-10 w-10 text-gold-dark" />
			<h2 class="font-display mt-4 text-3xl font-semibold">Your treatment is booked</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Thank you, {name.trim()}. Please arrive 15 minutes early for your treatment and show your reference at the spa reception.
			</p>
			<p class="mt-5 text-sm text-muted">Booking reference</p>
			<p class="font-mono text-2xl font-semibold tracking-wider text-gold-dark">{reference}</p>
			<dl class="mt-6 space-y-3 border-t border-line pt-6 text-sm">
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Treatment</dt><dd class="font-semibold">{chosen.name}</dd></div>
				<div class="flex flex-wrap justify-between gap-2">
					<dt class="text-muted">Duration</dt><dd class="font-semibold">{chosen.duration} minutes</dd>
				</div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Price</dt><dd class="font-semibold">{inr(chosen.price)}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Date</dt><dd class="font-semibold">{fmtDate(date)}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Time</dt><dd class="font-semibold">{time}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Name</dt><dd class="font-semibold">{name.trim()}</dd></div>
				<div class="flex flex-wrap justify-between gap-2">
					<dt class="text-muted">Phone</dt><dd class="font-semibold">+91 {phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')}</dd>
				</div>
			</dl>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<button type="button" class="btn-gold min-h-11" onclick={reset}>Book another treatment</button>
				<a href="/spa-wellness" class="btn-ghost min-h-11">About Amara Spa</a>
			</div>
		</div>
	{:else}
		<div use:reveal>
			<p class="eyebrow">Choose your treatment</p>
			<h2 class="section-title mt-2">Eight rituals, one quiet afternoon</h2>
			<p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
				Every treatment includes the hammam, the relaxation lounge and herbal tea afterwards. Tap a card to select it.
			</p>
		</div>

		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" use:reveal>
			{#each SPA_TREATMENTS as treatment, i (treatment.slug)}
				{@const isSelected = treatmentSlug === treatment.slug}
				<button
					type="button"
					class="card min-w-0 p-5 text-left {isSelected ? 'ring-2 ring-gold' : ''}"
					onclick={() => (treatmentSlug = treatment.slug)}
					aria-pressed={isSelected}
				>
					<span class="flex items-start justify-between gap-2">
						<Leaf class="h-5 w-5 shrink-0 text-gold-dark" />
						{#if isSelected}<span class="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-gold text-white"><Check class="h-4 w-4" /></span>{/if}
					</span>
					<span class="font-display mt-3 block text-xl leading-tight font-semibold">{treatment.name}</span>
					<span class="mt-2 block text-sm leading-relaxed text-muted">{treatment.description}</span>
					<span class="mt-4 flex items-baseline justify-between gap-2">
						<span class="flex items-center gap-1.5 text-sm text-muted"><Clock class="h-4 w-4 text-gold-dark" /> {treatment.duration} min</span>
						<span class="font-display text-xl font-semibold text-gold-dark">{inr(treatment.price)}</span>
					</span>
					<span class="sr-only">Treatment {i + 1} of {SPA_TREATMENTS.length}</span>
				</button>
			{/each}
		</div>

		<form class="card mx-auto mt-10 max-w-2xl p-6 sm:p-8" onsubmit={submit} use:reveal>
			<div class="flex items-start gap-3">
				<Sparkles class="mt-1 h-6 w-6 shrink-0 text-gold-dark" />
				<div class="min-w-0">
					<h3 class="font-display text-2xl font-semibold">Your booking</h3>
					<p class="mt-1 text-sm text-muted">
						<span class="font-semibold text-ink">{chosen.name}</span> · {chosen.duration} minutes · {inr(chosen.price)}
					</p>
				</div>
			</div>

			{#if error}
				<p role="alert" class="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">{error}</p>
			{/if}

			<div class="mt-6 grid gap-5 sm:grid-cols-2">
				<label class="min-w-0">
					<span class="label">Date *</span>
					<input type="date" class="input min-h-11" bind:value={date} min={today} required />
				</label>
				<label class="min-w-0">
					<span class="label">Full name *</span>
					<input class="input min-h-11" bind:value={name} placeholder="Your full name" autocomplete="name" required />
				</label>
				<label class="min-w-0 sm:col-span-2">
					<span class="label">Phone (+91) *</span>
					<input
						type="tel"
						class="input min-h-11"
						bind:value={phone}
						placeholder="98765 43210"
						autocomplete="tel"
						inputmode="tel"
						required
					/>
				</label>
			</div>

			<fieldset class="mt-8 min-w-0">
				<legend class="label">Time *</legend>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each SPA_HOURS as slot (slot)}
						<button
							type="button"
							class="min-h-11 rounded-sm border px-4 text-sm font-semibold {time === slot
								? 'border-gold-dark bg-gold-dark text-white'
								: 'border-line bg-white text-ink'}"
							onclick={() => (time = slot)}
							aria-pressed={time === slot}>{slot}</button
						>
					{/each}
				</div>
			</fieldset>

			<button type="submit" class="btn-gold mt-8 min-h-11 w-full">Confirm Spa Booking — {inr(chosen.price)}</button>
			<p class="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted">
				<Phone class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
				<span
					>Questions? Call the spa on <a href="tel:{HOTEL.phoneHref}" class="font-semibold text-gold-dark underline underline-offset-2"
						>{HOTEL.phone}</a
					>. Free cancellation up to 12 hours before your treatment.</span
				>
			</p>
		</form>
	{/if}
</section>
