<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { popIn } from '#lib/motion';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, BadgePercent, BedDouble, Check, CheckCircle2, Mail, Percent, Phone, UtensilsCrossed } from '@lucide/svelte';

	let agency = $state('');
	let iata = $state('');
	let email = $state('');
	let error = $state('');
	let saved = $state(false);

	const FACTS = [
		'118 rooms across 6 room types',
		'3 restaurants — Saffron, The Courtyard and Zoya',
		'Amara Spa & Hammam on site',
		'25 minutes from Jaipur International Airport',
		`Check-in ${HOTEL.checkIn} · Check-out ${HOTEL.checkOut}`
	];

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!agency.trim() || !iata.trim() || !email.trim()) {
			error = 'Please fill in all required fields.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid work email address.';
			return;
		}
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-trade') ?? '[]') as unknown[];
			list.push({ agency: agency.trim(), iata: iata.trim(), email: email.trim(), at: new Date().toISOString() });
			localStorage.setItem('aurelia-trade', JSON.stringify(list));
		} catch {
			/* storage unavailable — still show success */
		}
		saved = true;
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Travel Trade"
	title="Partner with the palace"
	subtitle="For travel agents and tour operators — net rates, a real commission, and a reservations team that answers the phone. Join the trade programme."
	image={IMAGES.palace}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-3" use:reveal>
		<div class="card min-w-0 p-6">
			<Percent class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">10% commission</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">A flat 10% commission on every room night you book for your clients, paid monthly by bank transfer.</p>
		</div>
		<div class="card min-w-0 p-6">
			<BadgePercent class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Net rates</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">Trade partners book at net rates with a flexible markup — your margin is yours to set, and rates are protected from public discounting.</p>
		</div>
		<div class="card min-w-0 p-6">
			<BedDouble class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Dedicated support</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">A named trade contact for quotes, holds and amendments — plus priority room allocation in peak season.</p>
		</div>
	</div>

	<div class="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-2" use:reveal>
		<div class="min-w-0">
			<p class="eyebrow">Fact sheet</p>
			<h2 class="section-title mt-2">The palace at a glance</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				Everything your clients ask about, in one place. A printable fact sheet is available on request from the trade desk.
			</p>
			<ul class="mt-6 space-y-3 text-sm text-ink/85">
				{#each FACTS as fact (fact)}
					<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {fact}</li>
				{/each}
			</ul>
			<div class="card mt-8 min-w-0 p-6">
				<UtensilsCrossed class="h-6 w-6 text-gold-dark" />
				<h3 class="font-display mt-4 text-2xl font-semibold">Trade login</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Our online trade portal is coming soon. Until then, send the form opposite and we will email you net rates, availability and booking access directly.
				</p>
				<p class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
					<a href="tel:{HOTEL.phoneHref}" class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-dark"><Phone class="h-4 w-4" /> {HOTEL.phone}</a>
					<a href="mailto:{HOTEL.email}" class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-dark"><Mail class="h-4 w-4" /> {HOTEL.email}</a>
				</p>
			</div>
		</div>

		<div class="min-w-0">
			{#if saved}
				<div class="card p-6 sm:p-8" use:popIn>
					<CheckCircle2 class="h-10 w-10 text-gold-dark" />
					<h2 class="section-title mt-4">Thank you, {agency}</h2>
					<p class="mt-2 text-base leading-relaxed text-muted">
						Your trade enquiry is with us. The trade desk will write to {email} within one working day with net rates and booking access.
					</p>
					<a href="/rooms" class="btn-pine mt-6">Browse Rooms <ArrowRight class="h-4 w-4" /></a>
				</div>
			{:else}
				<div class="card p-6 sm:p-8">
					<p class="eyebrow">Join the trade programme</p>
					<h2 class="section-title mt-2">Request trade access</h2>
					<p class="mt-3 text-sm leading-relaxed text-muted">
						Three fields, one email back. We verify every agency before issuing rates, so please use your work email.
					</p>
					<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
						<label class="block min-w-0">
							<span class="label">Agency name *</span>
							<input class="input" bind:value={agency} placeholder="Your agency name" autocomplete="organization" required />
						</label>
						<label class="block min-w-0">
							<span class="label">IATA number *</span>
							<input class="input" bind:value={iata} placeholder="e.g. 12345678" autocomplete="off" inputmode="numeric" required />
						</label>
						<label class="block min-w-0">
							<span class="label">Work email *</span>
							<input type="email" class="input" bind:value={email} placeholder="you@agency.com" autocomplete="email" required />
						</label>
						{#if error}
							<p class="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{error}</p>
						{/if}
						<button type="submit" class="btn-gold min-h-11 w-full sm:w-auto">Request Trade Access</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</section>
