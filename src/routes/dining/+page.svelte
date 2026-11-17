<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { DINING, IMAGES, inr } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { Clock, Leaf, UtensilsCrossed, ArrowRight, CalendarDays } from '@lucide/svelte';

	const MENUS: Record<string, { name: string; note: string; price: number }[]> = {
		saffron: [
			{ name: 'Laal Maas', note: 'Slow-cooked lamb, Mathania chillies', price: 1450 },
			{ name: 'Royal Dal Baati Churma', note: 'Ghee-roasted baati, panchmel dal', price: 950 },
			{ name: 'Ghevar with Rabri', note: 'Saffron-soaked, made to order', price: 650 }
		],
		'the-courtyard': [
			{ name: 'Jaipur Breakfast Thali', note: 'Bedmi puri, aloo sabzi, lassi', price: 850 },
			{ name: 'Live Grill — Paneer Tikka', note: 'Charcoal grill, mint chutney', price: 750 },
			{ name: 'Masala Dosa, Courtyard Style', note: 'Crisp dosa, sambar, coconut', price: 550 }
		],
		zoya: [
			{ name: 'Zoya Sunset Spritz', note: 'House infusion, citrus, soda', price: 950 },
			{ name: 'Tandoori Prawns', note: 'Smoked prawns, saffron aioli', price: 1250 },
			{ name: 'Saffron Kulfi Sundae', note: 'Pistachio, rose, gold leaf', price: 550 }
		]
	};
</script>

<PageHero
	eyebrow="Dining at the Palace"
	title="Three tables, one palace kitchen"
	subtitle="Royal Indian fine dining, all-day dining under the arches, and a rooftop bar at golden hour — all within the palace walls."
	image={DINING[0].image}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-6 md:grid-cols-3">
		{#each DINING as restaurant, i (restaurant.slug)}
			<article class="card group flex min-w-0 flex-col" use:reveal={{ delay: i * 90 }}>
				<a href="/dining/{restaurant.slug}" class="block overflow-hidden" aria-label={restaurant.name}>
					<img
						src={restaurant.image}
						alt={restaurant.name}
						loading="lazy"
						class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
					/>
				</a>
				<div class="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
					<p class="eyebrow">{restaurant.kind}</p>
					<h2 class="font-display mt-2 text-3xl leading-tight font-semibold text-ink">
						<a href="/dining/{restaurant.slug}" class="transition hover:text-gold-dark">{restaurant.name}</a>
					</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{restaurant.description}</p>
					<ul class="mt-4 space-y-2 text-sm text-ink/80">
						<li class="flex items-center gap-2"><Clock class="h-4 w-4 shrink-0 text-gold-dark" /> {restaurant.hours}</li>
						<li class="flex items-center gap-2"><UtensilsCrossed class="h-4 w-4 shrink-0 text-gold-dark" /> {restaurant.price}</li>
					</ul>
					<div class="mt-5 flex gap-2">
						<a href="/dining/{restaurant.slug}" class="btn-pine flex-1 !min-h-11 !px-4">View <ArrowRight class="h-4 w-4" /></a>
						<a href="/contact?subject=Dining" class="btn-ghost flex-1 !min-h-11 !px-4">Reserve</a>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">From the kitchen</p>
		<h2 class="section-title mt-2">Sample menu highlights</h2>
		<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">
			A taste of each table. Menus change with the season and the morning market — these are the dishes
			guests ask for by name.
		</p>
		<div class="mt-8 grid gap-6 md:grid-cols-3">
			{#each DINING as restaurant, i (restaurant.slug)}
				<div class="min-w-0 rounded-md border border-line bg-white p-5 sm:p-6" use:reveal={{ delay: i * 90 }}>
					<h3 class="font-display text-2xl font-semibold text-ink">{restaurant.name}</h3>
					<ul class="mt-4 divide-y divide-line">
						{#each MENUS[restaurant.slug] as dish (dish.name)}
							<li class="flex items-baseline justify-between gap-3 py-3">
								<span class="min-w-0">
									<span class="block text-sm font-semibold text-ink">{dish.name}</span>
									<span class="block text-xs text-muted">{dish.note}</span>
								</span>
								<span class="font-display shrink-0 text-lg font-semibold text-gold-dark">{inr(dish.price)}</span>
							</li>
						{/each}
					</ul>
					<a href="/dining/{restaurant.slug}" class="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.14em] text-gold-dark uppercase hover:text-pine">
						Full menu <ArrowRight class="h-4 w-4" />
					</a>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-12 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-gold uppercase"><Leaf class="h-4 w-4" /> Vegetarian &amp; Jain, always</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Every restaurant has a full vegetarian menu. Jain food is prepared on request with 24 hours notice —
				just mention it when you reserve.
			</p>
		</div>
		<a href="/contact?subject=Dining" class="btn-gold shrink-0"><CalendarDays class="h-4 w-4" /> Reserve a Table</a>
	</div>
</section>
