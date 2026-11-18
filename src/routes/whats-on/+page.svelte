<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr } from '#lib/data/hotel';
	import { EVENTS, MONTHS, type EventMonth } from '#lib/data/events';
	import { reveal } from '#lib/reveal';
	import { CalendarDays, Clock, MapPin } from '@lucide/svelte';

	let month = $state<'All' | EventMonth>('All');

	const filtered = $derived(month === 'All' ? EVENTS : EVENTS.filter((e) => e.month === month));
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="What's On"
	title="The palace calendar"
	subtitle="Folk music in the courtyard, wine dinners at Saffron, kite festival brunch on the pool lawn — what is happening at the palace this winter."
	image={IMAGES.events}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="flex flex-wrap gap-2" use:reveal>
		{#each MONTHS as m (m)}
			<button
				type="button"
				onclick={() => (month = m)}
				aria-pressed={month === m}
				class="min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors {month === m
					? 'border-pine bg-pine text-ivory'
					: 'border-ink/20 bg-transparent text-ink hover:border-pine'}"
			>
				{m}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="mt-10 text-base text-muted" use:reveal>No events scheduled for this month yet — check back soon.</p>
	{:else}
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" use:reveal>
			{#each filtered as event (event.slug)}
				<article class="card flex min-w-0 flex-col p-6">
					<p class="eyebrow">{event.month}</p>
					<h2 class="font-display mt-2 text-2xl font-semibold">{event.title}</h2>
					<p class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
						<span class="inline-flex items-center gap-1.5"><CalendarDays class="h-4 w-4 shrink-0 text-gold-dark" /> {event.date}</span>
						<span class="inline-flex items-center gap-1.5"><Clock class="h-4 w-4 shrink-0 text-gold-dark" /> {event.time}</span>
					</p>
					<p class="mt-1 inline-flex items-center gap-1.5 text-sm text-muted"><MapPin class="h-4 w-4 shrink-0 text-gold-dark" /> {event.venue}</p>
					<p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{event.text}</p>
					<p class="mt-4 text-sm">
						{#if event.price === 0}
							<span class="font-semibold text-gold-dark">Free for resident guests</span>
						{:else}
							<span class="font-display text-xl font-semibold text-gold-dark">{inr(event.price)}</span>
							<span class="ml-1 text-muted">per person</span>
						{/if}
					</p>
				</article>
			{/each}
		</div>
	{/if}

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Join an event</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Most events are free for resident guests; others are bookable at reception. Write to the concierge to reserve a place — popular evenings fill up fast.
			</p>
		</div>
		<a href="/contact" class="btn-gold shrink-0">Reserve a Place</a>
	</div>
</section>
