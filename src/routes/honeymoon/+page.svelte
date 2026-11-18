<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, ROOMS, inr, usrcset } from '#lib/data/hotel';
	import { HONEYMOON_INCLUDED, HONEYMOON_PACKAGES } from '#lib/data/honeymoon';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Check, Clock, Flower2, Heart, MoonStar, Sparkles, UtensilsCrossed } from '@lucide/svelte';

	const suites = ROOMS.filter((r) => r.slug === 'royal-heritage-suite' || r.slug === 'palace-garden-suite');
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Honeymoon & Romance"
	title="Begin married life slowly"
	subtitle="A suite with a terrace, a couples ritual at the spa, and a private dinner under the stars — the honeymoon Jaipur regulars write home about."
	image={IMAGES.spa2}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Suite highlights -->
	<div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12" use:reveal>
		<img
			src={IMAGES.resort}
			srcset={usrcset(IMAGES.resort)}
			sizes="(max-width: 1024px) 100vw, 50vw"
			alt="Suites for a honeymoon at The Aurelia Palace"
			loading="lazy"
			decoding="async"
			class="aspect-[4/3] w-full rounded-md object-cover"
		/>
		<div class="min-w-0">
			<p class="eyebrow">Suites for two</p>
			<h2 class="section-title mt-2">A suite that slows down for two people</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				Honeymoon couples stay in our suites — a separate living room, a terrace to yourselves, and a butler who
				knows when to disappear. Breakfast arrives when you wake, not when the kitchen decides.
			</p>
			<div class="mt-6 space-y-4">
				{#each suites as suite (suite.slug)}
					<div class="card min-w-0 p-5">
						<div class="flex flex-wrap items-baseline justify-between gap-2">
							<h3 class="font-display text-xl font-semibold">{suite.name}</h3>
							<p class="text-sm text-muted">From <span class="font-display text-xl font-semibold text-gold-dark">{inr(suite.price)}</span> / night</p>
						</div>
						<p class="mt-1 text-sm leading-relaxed text-muted">{suite.short}</p>
						<a href="/rooms/{suite.slug}" class="mt-3 inline-flex min-h-11 items-center gap-1 font-semibold text-gold-dark underline underline-offset-2">View the suite <ArrowRight class="h-4 w-4" /></a>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Romantic moments -->
	<div class="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4" use:reveal>
		<div class="card min-w-0 p-6">
			<UtensilsCrossed class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Private candle-lit dinner</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">A table for two on the palace terrace, candles and marigolds, a menu written for the evening — and no other guests in sight.</p>
		</div>
		<div class="card min-w-0 p-6">
			<Heart class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Couples spa ritual</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">A side-by-side ritual at Amara Spa — a 90-minute signature treatment in a candlelit suite, with time to linger afterwards.</p>
		</div>
		<div class="card min-w-0 p-6">
			<Flower2 class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Flower bath</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">A rose-petal bath drawn in your suite while you are at dinner, with sparkling wine waiting on your return.</p>
		</div>
		<div class="card min-w-0 p-6">
			<Clock class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Late checkout</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">Every honeymoon package includes late checkout at 2:00 PM, so the last morning is as slow as the first.</p>
		</div>
	</div>

	<!-- Packages -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Honeymoon Packages</p>
		<h2 class="section-title mt-2">Choose your pace</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Prices are for two guests in the named suite, with breakfast included. Check-in is {HOTEL.checkIn} and
			check-out {HOTEL.checkOut} — honeymoon packages always include late checkout.
		</p>
		<div class="mt-8 grid gap-4 lg:grid-cols-3">
			{#each HONEYMOON_PACKAGES as pkg (pkg.slug)}
				<article class="card flex min-w-0 flex-col p-6">
					<div class="flex items-center gap-2 text-sm text-muted">
						<MoonStar class="h-4 w-4 text-gold-dark" /> {pkg.nights} nights
					</div>
					<h3 class="font-display mt-3 text-2xl font-semibold">{pkg.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p>
					<ul class="mt-4 flex-1 space-y-2 text-sm text-ink/85">
						{#each pkg.inclusions as inc (inc)}
							<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {inc}</li>
						{/each}
					</ul>
					<p class="mt-6 text-sm text-muted">
						From <span class="font-display text-2xl font-semibold text-gold-dark">{inr(pkg.price)}</span>
						<span class="ml-1">{pkg.priceNote}</span>
					</p>
					<a href="/book?room={pkg.suiteSlug}" class="btn-pine mt-4 min-h-11">Book This Package <ArrowRight class="h-4 w-4" /></a>
				</article>
			{/each}
		</div>
	</div>

	<!-- What's included -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Every Honeymoon</p>
		<h2 class="section-title mt-2">Included, without asking</h2>
		<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each HONEYMOON_INCLUDED as item (item)}
				<div class="card flex min-w-0 items-start gap-3 p-5">
					<Sparkles class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
					<p class="text-sm leading-relaxed text-ink/85">{item}</p>
				</div>
			{/each}
		</div>
		<p class="mt-6 text-sm text-muted">
			Questions? Call the palace on <a href="tel:{HOTEL.phoneHref}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.phone}</a>
			or write to <a href="mailto:{HOTEL.email}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.email}</a> — a celebrations host plans every honeymoon personally.
		</p>
	</div>

	<!-- CTA -->
	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Your dates, your pace</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Honeymoon suites book out early from October to March. Tell us your dates and we will hold the best suite for
				48 hours, no payment needed.
			</p>
		</div>
		<a href="/book" class="btn-gold min-h-11 shrink-0">Book a Honeymoon <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
