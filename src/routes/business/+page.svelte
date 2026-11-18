<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, usrcset } from '#lib/data/hotel';
	import { popIn } from '#lib/motion';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, BedDouble, Check, Clock, Coffee, Plane, Users, Wifi } from '@lucide/svelte';

	let company = $state('');
	let contactName = $state('');
	let email = $state('');
	let nightsPerMonth = $state('');
	let errors = $state({ company: '', contactName: '', email: '', nightsPerMonth: '' });
	let submitted = $state(false);

	const PERKS = [
		{ icon: BedDouble, title: 'Corporate rate — 15% off', text: 'A standing 15% off the best available rate for your team, with code CORP15 on every booking. No blackout dates.' },
		{ icon: Coffee, title: 'Early breakfast from 6:30 AM', text: 'Breakfast at The Courtyard from 6:30 AM, so early meetings and early flights are both covered.' },
		{ icon: Clock, title: 'Late checkout, 2:00 PM', text: 'Corporate guests check out at 2:00 PM as standard — no asking, no fee, no queue at noon.' },
		{ icon: Wifi, title: '1 Gbps Wi-Fi', text: 'Fibre Wi-Fi in every room and meeting space, with a dedicated network for corporate groups on request.' },
		{ icon: Plane, title: 'Airport transfer', text: 'Jaipur International Airport is 25 minutes away. Transfers are arranged for every corporate booking, on arrival and departure.' },
		{ icon: Users, title: 'Meeting rooms on site', text: 'Boardrooms and event spaces for 10 to 200 people, with AV, catering and a dedicated events manager.' }
	];

	function validate(): boolean {
		errors = { company: '', contactName: '', email: '', nightsPerMonth: '' };
		let ok = true;
		if (!company.trim()) {
			errors.company = 'Please enter your company name.';
			ok = false;
		}
		if (!contactName.trim()) {
			errors.contactName = 'Please enter a contact name.';
			ok = false;
		}
		if (!email.trim()) {
			errors.email = 'Please enter a work email address.';
			ok = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			errors.email = 'That email address does not look right — please check it.';
			ok = false;
		}
		const nights = Number(nightsPerMonth);
		if (!nightsPerMonth.trim() || !Number.isFinite(nights) || nights < 1) {
			errors.nightsPerMonth = 'Please enter how many room nights your company needs per month (at least 1).';
			ok = false;
		}
		return ok;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-corporate') ?? '[]') as unknown[];
			list.push({
				company: company.trim(),
				contactName: contactName.trim(),
				email: email.trim(),
				nightsPerMonth: Number(nightsPerMonth),
				submittedAt: new Date().toISOString()
			});
			localStorage.setItem('aurelia-corporate', JSON.stringify(list));
		} catch {
			// localStorage unavailable — the enquiry is still confirmed on screen
		}
		submitted = true;
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Corporate Stays"
	title="Business travel, done properly"
	subtitle="A palace that works as hard as your team does — a standing corporate rate, early breakfast, late checkout, and meeting rooms downstairs."
	image={IMAGES.events}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Perks -->
	<div use:reveal>
		<p class="eyebrow">Why Companies Stay Here</p>
		<h2 class="section-title mt-2">Everything a business trip needs</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each PERKS as perk (perk.title)}
				<div class="card min-w-0 p-6">
					<perk.icon class="h-6 w-6 text-gold-dark" />
					<h3 class="font-display mt-4 text-2xl font-semibold">{perk.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{perk.text}</p>
				</div>
			{/each}
		</div>
		<p class="mt-6 text-sm text-muted">
			Need a meeting space too? See our <a href="/meetings" class="font-semibold text-gold-dark underline underline-offset-2">meeting rooms and event spaces</a> — boardrooms for 10, conferences for 200.
		</p>
	</div>

	<!-- Image strip -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<img
			src={IMAGES.heritage}
			srcset={usrcset(IMAGES.heritage)}
			sizes="100vw"
			alt="The palace, a short drive from Jaipur's business district"
			loading="lazy"
			decoding="async"
			class="aspect-[16/7] w-full rounded-md object-cover"
		/>
	</div>

	<!-- Enquiry form -->
	<div class="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-5 lg:gap-12" use:reveal>
		<div class="min-w-0 lg:col-span-2">
			<p class="eyebrow">Corporate Enquiry</p>
			<h2 class="section-title mt-2">Set up a corporate account</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				Tell us about your company's travel and we will come back within one working day with a corporate rate, a
				booking code and a single monthly invoice — no per-stay paperwork.
			</p>
			<ul class="mt-6 space-y-3 text-sm text-ink/85">
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> 15% off with code CORP15</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> One monthly invoice for all stays</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> A named account manager at the palace</li>
			</ul>
			<p class="mt-6 text-sm text-muted">
				Prefer to talk first? Call <a href="tel:{HOTEL.phoneHref}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.phone}</a>
				or write to <a href="mailto:{HOTEL.email}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.email}</a>.
			</p>
		</div>

		<div class="min-w-0 lg:col-span-3">
			{#if submitted}
				<div class="card p-6 sm:p-8" use:popIn>
					<Check class="h-8 w-8 text-gold-dark" />
					<h3 class="font-display mt-4 text-3xl font-semibold">Thank you, {contactName.trim()}.</h3>
					<p class="mt-3 text-base leading-relaxed text-muted">
						Your corporate enquiry for {company.trim()} has been received. Our team will write to {email.trim()} within
						one working day with your corporate rate and booking code.
					</p>
					<p class="mt-3 text-sm text-muted">
						Estimated volume: {nightsPerMonth} room nights per month. Your reference is saved on this device.
					</p>
					<button
						type="button"
						class="btn-ghost mt-6 min-h-11"
						onclick={() => {
							submitted = false;
							company = '';
							contactName = '';
							email = '';
							nightsPerMonth = '';
						}}
					>
						Send Another Enquiry
					</button>
				</div>
			{:else}
				<form class="card p-6 sm:p-8" onsubmit={handleSubmit} novalidate>
					<div class="space-y-5">
						<div>
							<label for="company" class="block text-sm font-semibold">Company name</label>
							<input
								id="company"
								type="text"
								bind:value={company}
								autocomplete="organization"
								placeholder="Your company"
								class="mt-2 min-h-11 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-base outline-none focus:border-gold-dark"
							/>
							{#if errors.company}<p class="mt-1 text-sm text-red-700">{errors.company}</p>{/if}
						</div>
						<div>
							<label for="contactName" class="block text-sm font-semibold">Contact name</label>
							<input
								id="contactName"
								type="text"
								bind:value={contactName}
								autocomplete="name"
								placeholder="Who should we write to?"
								class="mt-2 min-h-11 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-base outline-none focus:border-gold-dark"
							/>
							{#if errors.contactName}<p class="mt-1 text-sm text-red-700">{errors.contactName}</p>{/if}
						</div>
						<div>
							<label for="email" class="block text-sm font-semibold">Work email</label>
							<input
								id="email"
								type="email"
								bind:value={email}
								autocomplete="email"
								placeholder="you@company.com"
								class="mt-2 min-h-11 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-base outline-none focus:border-gold-dark"
							/>
							{#if errors.email}<p class="mt-1 text-sm text-red-700">{errors.email}</p>{/if}
						</div>
						<div>
							<label for="nightsPerMonth" class="block text-sm font-semibold">Room nights per month</label>
							<input
								id="nightsPerMonth"
								type="number"
								min="1"
								step="1"
								inputmode="numeric"
								bind:value={nightsPerMonth}
								placeholder="e.g. 20"
								class="mt-2 min-h-11 w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-base outline-none focus:border-gold-dark"
							/>
							{#if errors.nightsPerMonth}<p class="mt-1 text-sm text-red-700">{errors.nightsPerMonth}</p>{/if}
						</div>
						<button type="submit" class="btn-pine min-h-11 w-full">Send Corporate Enquiry <ArrowRight class="h-4 w-4" /></button>
						<p class="text-xs leading-relaxed text-muted">
							Your enquiry is saved on this device only, as a demo of the corporate enquiry flow.
						</p>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
