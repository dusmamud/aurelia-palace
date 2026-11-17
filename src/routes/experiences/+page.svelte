<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { EXPERIENCES, IMAGES, inr } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { Clock, ArrowRight, ConciergeBell } from '@lucide/svelte';

	const DETAILS: Record<string, { duration: string; price: number; priceNote: string }> = {
		'Amara Spa & Hammam': { duration: '90 minutes', price: 8500, priceNote: 'per person, from' },
		'Heritage Walk of the Old City': { duration: '3 hours, from 7:30 AM', price: 2500, priceNote: 'per person' },
		'Royal Cooking Class': { duration: '2.5 hours, from 11 AM', price: 4500, priceNote: 'per person, lunch included' },
		'Sunset Pool & High Tea': { duration: '4:00 – 6:00 PM daily', price: 1800, priceNote: 'per person' }
	};
</script>

<PageHero
	eyebrow="Experiences"
	title="Jaipur, arranged for you"
	subtitle="Four ways to spend a day well — in the palace, in the old city, and at the table. Every experience is led by someone who knows Jaipur properly."
	image={IMAGES.heritage}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="space-y-12 sm:space-y-16">
		{#each EXPERIENCES as exp, i (exp.title)}
			{@const d = DETAILS[exp.title] ?? { duration: '', price: 0, priceNote: '' }}
			<article class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12" use:reveal>
				<img
					src={exp.image}
					alt={exp.title}
					loading="lazy"
					class="aspect-[4/3] w-full rounded-md object-cover {i % 2 === 1 ? 'lg:order-2' : ''}"
				/>
				<div class="min-w-0 {i % 2 === 1 ? 'lg:order-1' : ''}">
					<p class="eyebrow">Experience {i + 1} of 4</p>
					<h2 class="section-title mt-2">{exp.title}</h2>
					<p class="mt-4 text-base leading-relaxed text-muted">{exp.text}</p>
					<ul class="mt-5 flex flex-wrap gap-2">
						<li class="chip"><Clock class="mr-1.5 h-3.5 w-3.5 text-gold-dark" /> {d.duration}</li>
						<li class="chip">{d.priceNote} {inr(d.price)}</li>
					</ul>
					<a href="/contact?subject=Experiences" class="btn-pine mt-6">Enquire <ArrowRight class="h-4 w-4" /></a>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-gold uppercase"><ConciergeBell class="h-4 w-4" /> The Concierge</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Want something else — a private driver, a block-printing workshop, a sunrise at Amber Fort, a table
				that is hard to get? Ask the concierge. If it exists in Jaipur, they can arrange it.
			</p>
		</div>
		<a href="/contact" class="btn-gold shrink-0">Ask the Concierge</a>
	</div>
</section>
