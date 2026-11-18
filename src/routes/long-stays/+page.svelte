<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr, usrcset } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Check, Clock, Home, Laptop, Shirt, Sparkles, WashingMachine } from '@lucide/svelte';

	const BASE_NIGHTLY = 18999;

	type StayRate = { nights: number; label: string; discount: number };

	const RATES: StayRate[] = [
		{ nights: 7, label: 'One week', discount: 0.1 },
		{ nights: 14, label: 'Two weeks', discount: 0.15 },
		{ nights: 30, label: 'One month', discount: 0.25 }
	];

	function rateFor(rate: StayRate) {
		const perNight = Math.round(BASE_NIGHTLY * (1 - rate.discount));
		return { perNight, total: perNight * rate.nights, saving: BASE_NIGHTLY * rate.nights - perNight * rate.nights };
	}

	const PERKS = [
		{ icon: Home, title: 'Kitchenette suites', text: 'The Palace Garden Suite and Aravalli Suite have a kitchenette, a dining table and space to live in, not just sleep in.' },
		{ icon: Laptop, title: 'Dedicated workspace', text: 'A proper desk, a chair made for long days, and 1 Gbps Wi-Fi in every room — video calls included.' },
		{ icon: WashingMachine, title: 'Weekly laundry', text: 'Laundry and pressing once a week, included in every long-stay rate. Daily housekeeping on request.' },
		{ icon: Shirt, title: 'Weekly housekeeping', text: 'A full weekly housekeeping service, with fresh linen and a deep clean — plus daily towel refresh.' },
		{ icon: Sparkles, title: 'Resident rate at the spa', text: 'Long-stay guests get a resident rate at Amara Spa — 20% off treatments, all month.' },
		{ icon: Clock, title: 'Flexible check-out', text: 'Stay a month and check-out moves to 2:00 PM, with a late checkout whenever your flight allows.' }
	];
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Long Stays"
	title="Stay a while, live like a local"
	subtitle="A week, a fortnight or a month at the palace — a suite with a kitchenette, a desk that works, and a rate that gets kinder the longer you stay."
	image={IMAGES.resort2}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Rate cards -->
	<div use:reveal>
		<p class="eyebrow">Long-Stay Rates</p>
		<h2 class="section-title mt-2">The longer you stay, the less it costs</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Rates are calculated from our base nightly rate of {inr(BASE_NIGHTLY)} for a Deluxe Palace Room, with breakfast
			included. The discount applies to the whole stay.
		</p>
		<div class="mt-8 grid gap-4 lg:grid-cols-3">
			{#each RATES as rate (rate.nights)}
				{@const r = rateFor(rate)}
				<article class="card flex min-w-0 flex-col p-6">
					<p class="text-sm font-semibold tracking-[0.18em] text-gold-dark uppercase">{rate.label} · {rate.nights} nights</p>
					<p class="mt-4 text-sm text-muted">
						<span class="font-display text-3xl font-semibold text-gold-dark">{inr(r.perNight)}</span> per night
						<span class="ml-2 rounded-full bg-pine px-2 py-0.5 text-xs font-semibold text-ivory">{Math.round(rate.discount * 100)}% off</span>
					</p>
					<p class="mt-2 text-sm text-muted">
						{inr(r.total)} for {rate.nights} nights — you save {inr(r.saving)}.
					</p>
					<ul class="mt-4 flex-1 space-y-2 text-sm text-ink/85">
						<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Breakfast included every morning</li>
						<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Weekly laundry and housekeeping</li>
						<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> 1 Gbps Wi-Fi and a dedicated workspace</li>
					</ul>
					<a href="/book" class="btn-pine mt-6 min-h-11">Book {rate.nights} Nights <ArrowRight class="h-4 w-4" /></a>
				</article>
			{/each}
		</div>
	</div>

	<!-- Rate table -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">At a Glance</p>
		<h2 class="section-title mt-2">Rates side by side</h2>
		<div class="mt-8 overflow-x-auto rounded-md border border-ink/10">
			<table class="w-full min-w-[560px] text-left text-sm">
				<thead>
					<tr class="bg-pine text-ivory">
						<th class="px-4 py-3 font-semibold">Stay length</th>
						<th class="px-4 py-3 font-semibold">Discount</th>
						<th class="px-4 py-3 font-semibold">Per night</th>
						<th class="px-4 py-3 font-semibold">Total</th>
						<th class="px-4 py-3 font-semibold">You save</th>
					</tr>
				</thead>
				<tbody>
					{#each RATES as rate (rate.nights)}
						{@const r = rateFor(rate)}
						<tr class="border-t border-ink/10">
							<td class="px-4 py-3 font-semibold">{rate.label} ({rate.nights} nights)</td>
							<td class="px-4 py-3">{Math.round(rate.discount * 100)}% off</td>
							<td class="px-4 py-3">{inr(r.perNight)}</td>
							<td class="px-4 py-3">{inr(r.total)}</td>
							<td class="px-4 py-3 font-semibold text-gold-dark">{inr(r.saving)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="mt-3 text-sm text-muted">Base nightly rate {inr(BASE_NIGHTLY)}. Rates shown are for a Deluxe Palace Room; suites are discounted at the same percentages.</p>
	</div>

	<!-- Perks -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Long-Stay Perks</p>
		<h2 class="section-title mt-2">Made for living in, not passing through</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each PERKS as perk (perk.title)}
				<div class="card min-w-0 p-6">
					<perk.icon class="h-6 w-6 text-gold-dark" />
					<h3 class="font-display mt-4 text-2xl font-semibold">{perk.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{perk.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Image + CTA -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<img
			src={IMAGES.resort3}
			srcset={usrcset(IMAGES.resort3)}
			sizes="100vw"
			alt="The palace, your home for the month"
			loading="lazy"
			decoding="async"
			class="aspect-[16/7] w-full rounded-md object-cover"
		/>
	</div>
	<div class="mt-8 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Staying a month or more?</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				For stays over 30 nights, write to us — monthly rates are agreed per guest, and include a dedicated housekeeping
				schedule and a parking space.
			</p>
		</div>
		<a href="/book" class="btn-gold min-h-11 shrink-0">Book a Long Stay <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
