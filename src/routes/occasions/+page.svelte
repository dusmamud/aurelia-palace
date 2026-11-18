<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr, usrcset } from '#lib/data/hotel';
	import { OCCASIONS } from '#lib/data/occasions';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Check, Gift, Heart, Sparkles } from '@lucide/svelte';
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Special Occasions"
	title="Some days deserve a palace"
	subtitle="A honeymoon, a family holiday, a fifty-year anniversary — tell us what you are celebrating, and the palace will arrange the rest."
	image={IMAGES.pool2}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="space-y-12 sm:space-y-16">
		{#each OCCASIONS as occ, i (occ.slug)}
			<article class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12" use:reveal>
				<img
					src={occ.image}
					srcset={usrcset(occ.image)}
					sizes="(max-width: 1024px) 100vw, 50vw"
					alt={occ.title}
					loading="lazy"
					decoding="async"
					class="aspect-[4/3] w-full rounded-md object-cover {i % 2 === 1 ? 'lg:order-2' : ''}"
				/>
				<div class="min-w-0 {i % 2 === 1 ? 'lg:order-1' : ''}">
					<p class="eyebrow">{occ.eyebrow}</p>
					<h2 class="section-title mt-2">{occ.title}</h2>
					<p class="mt-4 text-base leading-relaxed text-muted">{occ.description}</p>
					<ul class="mt-6 space-y-3 text-sm text-ink/85">
						{#each occ.inclusions as inc (inc)}
							<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {inc}</li>
						{/each}
					</ul>
					<p class="mt-6 text-sm text-muted">
						From <span class="font-display text-2xl font-semibold text-gold-dark">{inr(occ.priceFrom)}</span>
						<span class="ml-1">{occ.priceNote}</span>
					</p>
					<a href="/contact?subject={encodeURIComponent(occ.title)}" class="btn-pine mt-6">Enquire <ArrowRight class="h-4 w-4" /></a>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3" use:reveal>
		<div class="card min-w-0 p-6">
			<Heart class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">One point of contact</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">A single celebrations host plans the whole occasion with you — rooms, dining, spa and photography, in one conversation.</p>
		</div>
		<div class="card min-w-0 p-6">
			<Sparkles class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">The palace, dressed for you</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">Fresh marigolds, candles, a private table — the small details are arranged before you arrive, not after you ask.</p>
		</div>
		<div class="card min-w-0 p-6">
			<Gift class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">A gift that stays</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">Rather give the occasion away? A gift card covers rooms, dining and spa — <a href="/gift-cards" class="font-semibold text-gold-dark underline underline-offset-2">see gift cards</a>.</p>
		</div>
	</div>

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Tell us the date</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Occasions book out early, especially October to March. Write to us with your dates and we will hold the best rooms for 48 hours, no payment needed.
			</p>
		</div>
		<a href="/contact" class="btn-gold shrink-0">Plan an Occasion</a>
	</div>
</section>
