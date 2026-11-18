<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr } from '#lib/data/hotel';
	import { RETREATS, SCHEDULE, THERAPISTS } from '#lib/data/wellness';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Check, Clock, Moon, Sun, Sunrise } from '@lucide/svelte';
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Wellness Retreats"
	title="Come home to yourself"
	subtitle="Three, five or seven days of yoga, Ayurveda and unhurried time — designed by our physicians, delivered by the palace, and paced so slowly you will forget what day it is."
	image={IMAGES.spa}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div use:reveal>
		<p class="eyebrow">Retreat packages</p>
		<h2 class="section-title mt-2">Choose how long you need</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Every retreat includes your room, all meals, daily treatments and the full schedule below. Prices are per person; a companion sharing your room joins for half the retreat price.
		</p>
	</div>

	<div class="mt-8 grid gap-4 lg:grid-cols-3" use:reveal>
		{#each RETREATS as retreat (retreat.slug)}
			<article class="card flex min-w-0 flex-col p-6">
				<p class="eyebrow">{retreat.days} days · {retreat.nights} nights</p>
				<h3 class="font-display mt-2 text-2xl font-semibold">{retreat.name}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{retreat.short}</p>
				<p class="mt-4 text-sm text-muted">
					From <span class="font-display text-2xl font-semibold text-gold-dark">{inr(retreat.priceFrom)}</span>
					<span class="ml-1">per person</span>
				</p>
				<ul class="mt-5 flex-1 space-y-3 text-sm text-ink/85">
					{#each retreat.inclusions as inc (inc)}
						<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {inc}</li>
					{/each}
				</ul>
				<a href="/spa/book" class="btn-pine mt-6">Book This Retreat <ArrowRight class="h-4 w-4" /></a>
			</article>
		{/each}
	</div>

	<div class="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-2" use:reveal>
		<div class="min-w-0">
			<p class="eyebrow">A day on retreat</p>
			<h2 class="section-title mt-2">Slow by design</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				Nothing on the schedule is compulsory. Sleep through yoga, skip the 4 PM meditation, read by the pool instead — the retreat bends to you, not the other way round.
			</p>
			<ol class="mt-8 space-y-0">
				{#each SCHEDULE as item, i (item.time)}
					<li class="relative flex gap-4 pb-6 {i === SCHEDULE.length - 1 ? '' : ''}">
						{#if i < SCHEDULE.length - 1}<span class="absolute top-10 left-[19px] h-full w-px bg-gold/40" aria-hidden="true"></span>{/if}
						<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine text-ivory">
							{#if item.time === '06:00'}<Sunrise class="h-5 w-5" />
							{:else if item.time === '09:00'}<Sun class="h-5 w-5" />
							{:else if item.time === '19:00'}<Moon class="h-5 w-5" />
							{:else}<Clock class="h-5 w-5" />{/if}
						</span>
						<div class="min-w-0 pt-1">
							<p class="text-sm font-semibold text-gold-dark">{item.time}</p>
							<h3 class="font-display text-xl font-semibold">{item.title}</h3>
							<p class="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
		<div class="min-w-0">
			<p class="eyebrow">Your therapists</p>
			<h2 class="section-title mt-2">People, not programmes</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				A retreat is only as good as the people guiding it. You will meet the same three faces every day — they learn how you are doing, and adjust the programme as you go.
			</p>
			<div class="mt-8 space-y-4">
				{#each THERAPISTS as therapist (therapist.name)}
					<div class="card min-w-0 p-6">
						<p class="eyebrow">{therapist.role}</p>
						<h3 class="font-display mt-2 text-2xl font-semibold">{therapist.name}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">{therapist.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Begin your retreat</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Retreats run year-round and start any day of the week. Book through Amara Spa and tell us how many days you need — the physicians will take it from there.
			</p>
		</div>
		<a href="/spa/book" class="btn-gold shrink-0">Book at Amara Spa</a>
	</div>
</section>
