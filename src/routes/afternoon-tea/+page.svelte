<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr } from '#lib/data/hotel';
	import { MENU, TEA_PRICE, TEA_TIMINGS, TEA_VENUE } from '#lib/data/afternoon-tea';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, CakeSlice, Clock, Coffee, Cookie, MapPin, Sandwich } from '@lucide/svelte';

	const ICONS = {
		savouries: Sandwich,
		scones: Cookie,
		desserts: CakeSlice,
		teas: Coffee
	} as const;
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Afternoon Tea"
	title="Tea, the palace way"
	subtitle="Scones warm from the oven, saffron kulfi, and a pot of masala chai — served in the courtyard every afternoon, under the arches, as the light turns gold."
	image={IMAGES.pool2}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-3" use:reveal>
		<div class="card min-w-0 p-6">
			<Clock class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Timings</h2>
			<p class="mt-1 text-muted">{TEA_TIMINGS}</p>
			<p class="mt-1 text-sm text-muted">Served every day, no reservation needed for residents.</p>
		</div>
		<div class="card min-w-0 p-6">
			<MapPin class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Venue</h2>
			<p class="mt-1 text-muted">{TEA_VENUE}</p>
			<p class="mt-1 text-sm text-muted">By the fountain in summer, inside the arched hall in winter.</p>
		</div>
		<div class="card min-w-0 p-6">
			<Coffee class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Price</h2>
			<p class="mt-1 text-muted"><span class="font-display text-2xl font-semibold text-gold-dark">{inr(TEA_PRICE)}</span> per person</p>
			<p class="mt-1 text-sm text-muted">Includes one pot of tea per guest and the full menu below.</p>
		</div>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">The menu</p>
		<h2 class="section-title mt-2">Four tiers, one long afternoon</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Everything is made in the palace kitchen the same afternoon. Vegetarian, Jain and gluten-free versions of the full menu are available — just mention it when you book.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-2" use:reveal>
		{#each MENU as section (section.slug)}
			{@const Icon = ICONS[section.slug as keyof typeof ICONS]}
			<div class="card min-w-0 p-6">
				<Icon class="h-6 w-6 text-gold-dark" />
				<h3 class="font-display mt-4 text-2xl font-semibold">{section.title}</h3>
				<p class="mt-1 text-sm leading-relaxed text-muted">{section.text}</p>
				<ul class="mt-5 space-y-4">
					{#each section.items as item (item.name)}
						<li class="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0">
							<p class="font-semibold">{item.name}</p>
							<p class="mt-0.5 text-sm leading-relaxed text-muted">{item.text}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Reserve a table</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Afternoon tea is {inr(TEA_PRICE)} per person, {TEA_TIMINGS.toLowerCase()} at {TEA_VENUE}. Non-residents are welcome — reserve ahead and the courtyard table is yours.
			</p>
		</div>
		<a href="/dining/reserve" class="btn-gold shrink-0">Reserve a Table <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
