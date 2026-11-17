<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES } from '#lib/data/hotel';
	import { TIERS, COMPARE, LOYALTY_FAQS } from '#lib/data/loyalty';
	import { reveal } from '#lib/reveal';
	import { Crown, Gem, Star, Check, ArrowRight, ChevronDown, Sparkles, CreditCard, BedDouble, Gift, BadgePercent } from '@lucide/svelte';

	const TIER_ICONS = { ivory: Star, gold: Gem, royal: Crown } as const;

	const STEPS = [
		{ icon: Sparkles, title: 'Join free', text: 'One minute, no fee. Your Ivory membership starts the moment you join.' },
		{ icon: BedDouble, title: 'Stay and earn', text: 'Every night, every dinner at Saffron, every ritual at Amara Spa earns points.' },
		{ icon: Gift, title: 'Move up', text: '5 nights a year takes you to Gold; 15 nights to Aurelia Royal — with better rates and more of the palace.' }
	];

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let errors = $state<Record<string, string>>({});
	let memberNo = $state('');
	let memberName = $state('');
	let openFaq = $state<number | null>(0);

	function join(e: Event) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Please enter a valid email address.';
		if (!/^[+0-9][0-9\s-]{7,14}$/.test(phone.trim())) errors.phone = 'Please enter a valid phone number.';
		if (Object.keys(errors).length > 0) return;
		const no = 'AC-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-loyalty') ?? '[]') as unknown[];
			existing.push({ name: name.trim(), email: email.trim(), phone: phone.trim(), memberNo: no, tier: 'Ivory', at: new Date().toISOString() });
			localStorage.setItem('aurelia-loyalty', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — membership is still confirmed on screen
		}
		memberNo = no;
		memberName = name.trim();
	}
</script>

<PageHero
	eyebrow="Aurelia Circle"
	title="Stay once. Belong always."
	subtitle="Our loyalty programme for guests who return — member rates from your first night, upgrades as you stay, and a palace that starts to know you."
	image={IMAGES.resort}
/>

<!-- How it works -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-6 sm:grid-cols-3" use:reveal>
		{#each STEPS as step, i (step.title)}
			<div class="rounded-md border border-line bg-white p-6">
				<div class="flex items-center justify-between">
					<span class="flex h-12 w-12 items-center justify-center rounded-full bg-pine text-gold"><step.icon class="h-5 w-5" /></span>
					<span class="font-display text-4xl text-sand">0{i + 1}</span>
				</div>
				<h2 class="font-display mt-4 text-2xl font-semibold">{step.title}</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted sm:text-base">{step.text}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Tiers -->
<section class="bg-cream/60 py-14 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-2xl" use:reveal>
			<p class="eyebrow">Three tiers</p>
			<h2 class="section-title mt-2">Choose how much of the palace you want</h2>
			<p class="mt-3 text-base leading-relaxed text-muted">Every tier keeps its benefits for the rest of the year you earn it — and the whole of the next.</p>
		</div>
		<div class="mt-10 grid gap-6 lg:grid-cols-3">
			{#each TIERS as tier, i (tier.id)}
				{@const Icon = TIER_ICONS[tier.id]}
				<article class="card flex flex-col p-6 sm:p-8 {tier.highlight ? 'border-gold ring-1 ring-gold' : ''}" use:reveal={{ delay: i * 100 }}>
					<div class="flex items-center justify-between gap-3">
						<span class="flex h-12 w-12 items-center justify-center rounded-full {tier.highlight ? 'bg-gold text-white' : 'bg-pine text-gold'}"><Icon class="h-5 w-5" /></span>
						{#if tier.highlight}<span class="chip !border-gold !bg-gold/10 !text-gold-dark">Most popular</span>{/if}
					</div>
					<h3 class="font-display mt-5 text-3xl font-semibold">{tier.name}</h3>
					<p class="mt-1 text-sm text-muted">{tier.tagline}</p>
					<p class="mt-4 flex items-baseline gap-2">
						<span class="font-display text-5xl font-semibold text-gold-dark">{tier.rate}%</span>
						<span class="text-sm text-muted">off the member rate</span>
					</p>
					<p class="mt-1 text-xs font-semibold tracking-[0.18em] text-muted uppercase">{tier.qualify}</p>
					<ul class="mt-6 flex-1 space-y-3 border-t border-line pt-6">
						{#each tier.benefits as b (b)}
							<li class="flex gap-2.5 text-sm leading-relaxed"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {b}</li>
						{/each}
					</ul>
					<a href="#join" class="{tier.highlight ? 'btn-gold' : 'btn-pine'} mt-8 w-full">Join {tier.name} free</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Comparison table -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">Side by side</p>
		<h2 class="section-title mt-2">Compare the tiers</h2>
	</div>
	<div class="mt-8 overflow-x-auto rounded-md border border-line bg-white" use:reveal>
		<table class="w-full min-w-[640px] text-left text-sm">
			<thead>
				<tr class="border-b border-line bg-pine text-ivory">
					<th scope="col" class="px-4 py-3.5 font-semibold sm:px-6">Benefit</th>
					<th scope="col" class="px-4 py-3.5 font-semibold">Ivory</th>
					<th scope="col" class="px-4 py-3.5 font-semibold text-gold">Gold</th>
					<th scope="col" class="px-4 py-3.5 font-semibold">Aurelia Royal</th>
				</tr>
			</thead>
			<tbody>
				{#each COMPARE as row, i (row.benefit)}
					<tr class={i % 2 === 1 ? 'bg-cream/50' : ''}>
						<th scope="row" class="px-4 py-3 font-medium sm:px-6">{row.benefit}</th>
						<td class="px-4 py-3 text-muted">{row.ivory}</td>
						<td class="px-4 py-3 font-medium">{row.gold}</td>
						<td class="px-4 py-3 text-muted">{row.royal}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-3 text-xs text-muted">Nights at any room type count towards your tier. Suites and direct bookings earn double points.</p>
</section>

<!-- Join form / member card -->
<section id="join" class="bg-pine py-14 text-ivory sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
			<div use:reveal>
				<p class="eyebrow !text-gold">Join Aurelia Circle</p>
				<h2 class="font-display mt-2 text-4xl leading-[1.05] font-semibold sm:text-5xl">A minute to join. A palace that remembers you.</h2>
				<p class="mt-4 max-w-xl text-base leading-relaxed text-ivory/85">
					Join free and your member rate applies to your very next stay — 5% off from day one, plus a welcome
					amenity waiting in your room. No card to carry, no fee, ever.
				</p>
				<ul class="mt-6 space-y-3 text-sm text-ivory/85">
					<li class="flex gap-2.5"><BadgePercent class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Member rate from your first booking</li>
					<li class="flex gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Points on stays, dining and spa — valid 24 months</li>
					<li class="flex gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Member-only offers before anyone else</li>
				</ul>
			</div>

			{#if memberNo}
				<div class="rounded-md border border-gold/60 bg-pine-2 p-6 sm:p-8" use:reveal>
					<p class="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-gold uppercase"><Crown class="h-4 w-4" /> Welcome to Aurelia Circle</p>
					<div class="mt-6 rounded-md border border-gold/50 bg-pine p-6">
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="font-display text-2xl font-semibold text-ivory">Aurelia Circle</p>
								<p class="text-xs tracking-[0.3em] text-gold uppercase">Ivory Member</p>
							</div>
							<CreditCard class="h-8 w-8 text-gold" />
						</div>
						<p class="mt-8 text-xs tracking-[0.2em] text-ivory/60 uppercase">Member number</p>
						<p class="font-display mt-1 text-3xl font-semibold tracking-wider text-ivory">{memberNo}</p>
						<p class="mt-4 text-sm text-ivory/85">{memberName}</p>
						<p class="mt-1 text-xs text-ivory/60">Member rate: 5% off · Points valid 24 months</p>
					</div>
					<p class="mt-4 text-sm leading-relaxed text-ivory/85">
						Your membership is saved on this device. Show your member number at check-in, or quote it when you book by phone.
					</p>
					<a href="/book" class="btn-gold mt-6 w-full">Book with your member rate <ArrowRight class="h-4 w-4" /></a>
				</div>
			{:else}
				<form class="rounded-md bg-ivory p-6 text-ink sm:p-8" novalidate onsubmit={join} use:reveal>
					<div>
						<label class="label" for="loyalty-name">Full name</label>
						<input id="loyalty-name" class="input" type="text" autocomplete="name" placeholder="Aarav Verma" bind:value={name} />
						{#if errors.name}<p class="mt-1 text-sm text-red-800">{errors.name}</p>{/if}
					</div>
					<div class="mt-5">
						<label class="label" for="loyalty-email">Email</label>
						<input id="loyalty-email" class="input" type="email" autocomplete="email" placeholder="you@example.com" bind:value={email} />
						{#if errors.email}<p class="mt-1 text-sm text-red-800">{errors.email}</p>{/if}
					</div>
					<div class="mt-5">
						<label class="label" for="loyalty-phone">Phone</label>
						<input id="loyalty-phone" class="input" type="tel" autocomplete="tel" placeholder="+91 98765 43210" bind:value={phone} />
						{#if errors.phone}<p class="mt-1 text-sm text-red-800">{errors.phone}</p>{/if}
					</div>
					<button type="submit" class="btn-gold mt-6 w-full">Join free <ArrowRight class="h-4 w-4" /></button>
					<p class="mt-3 text-center text-xs leading-relaxed text-muted">By joining you agree to the Aurelia Circle terms. We never share your details.</p>
				</form>
			{/if}
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="text-center" use:reveal>
		<p class="eyebrow">Good to know</p>
		<h2 class="section-title mt-2">Questions, answered</h2>
	</div>
	<div class="mt-8 space-y-3">
		{#each LOYALTY_FAQS as faq, i (faq.q)}
			<div class="overflow-hidden rounded-md border border-line bg-white" use:reveal>
				<button
					type="button"
					class="flex w-full min-h-14 items-center justify-between gap-4 px-5 py-4 text-left font-medium"
					aria-expanded={openFaq === i}
					onclick={() => (openFaq = openFaq === i ? null : i)}
				>
					<span>{faq.q}</span>
					<ChevronDown class="h-5 w-5 shrink-0 text-gold-dark transition-transform {openFaq === i ? 'rotate-180' : ''}" />
				</button>
				{#if openFaq === i}
					<p class="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted sm:text-base">{faq.a}</p>
				{/if}
			</div>
		{/each}
	</div>
	<div class="mt-12 text-center" use:reveal>
		<a href="/book" class="btn-pine">Book with your member rate <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
