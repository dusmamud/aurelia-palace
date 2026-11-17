<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr } from '#lib/data/hotel';
	import { ATTRACTIONS, ITINERARY, SEASONS } from '#lib/data/explore-jaipur';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, CalendarDays, Clock, ConciergeBell, MapPin, Sun, Ticket } from '@lucide/svelte';

	const heroImage = 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop';
</script>

<svelte:head>
	<title>Explore Jaipur — The Aurelia Palace | Amber Fort, Hawa Mahal, City Palace & a 1-Day Itinerary</title>
	<meta name="description" content="Explore Jaipur from The Aurelia Palace — Amber Fort 11 km, Hawa Mahal 2.5 km, City Palace 2 km. Entry fees, best times, and a curated one-day itinerary." />
</svelte:head>

<PageHero
	eyebrow="Explore Jaipur"
	title="The Pink City, from your palace"
	subtitle="Eight places worth your day, with honest distances, entry fees and the best hour to go. The concierge arranges drivers, guides and tickets — you just choose."
	image={heroImage}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div use:reveal>
		<p class="eyebrow">When to come</p>
		<h2 class="section-title mt-2">Best time to visit Jaipur</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each SEASONS as s (s.months)}
				<div class="card min-w-0 p-6">
					<p class="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-gold-dark uppercase"><Sun class="h-4 w-4" /> {s.months}</p>
					<h3 class="font-display mt-3 text-2xl font-semibold">{s.label}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Eight places, one city</p>
		<h2 class="section-title mt-2">Where to go</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each ATTRACTIONS as a (a.name)}
				<article class="card flex min-w-0 flex-col">
					<img src={a.image} alt={a.name} loading="lazy" class="aspect-[4/3] w-full object-cover" />
					<div class="flex min-w-0 flex-1 flex-col p-5">
						<div class="flex items-start justify-between gap-2">
							<h3 class="font-display text-2xl leading-tight font-semibold">{a.name}</h3>
							<span class="chip shrink-0">{a.distanceKm} km</span>
						</div>
						<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.description}</p>
						<ul class="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-ink/85">
							<li class="flex items-center gap-2"><MapPin class="h-3.5 w-3.5 shrink-0 text-gold-dark" /> {a.distanceNote}</li>
							<li class="flex items-center gap-2"><Clock class="h-3.5 w-3.5 shrink-0 text-gold-dark" /> {a.timeNeeded} · best {a.bestTime}</li>
							<li class="flex items-center gap-2"><Ticket class="h-3.5 w-3.5 shrink-0 text-gold-dark" /> Entry: {a.entryFee === null ? 'Free' : `${inr(a.entryFee)} per person`}</li>
						</ul>
					</div>
				</article>
			{/each}
		</div>
		<p class="mt-4 text-sm text-muted">Entry fees are indicative Indian-resident rates for adults; foreign visitor rates differ. Ask the concierge for current prices and for tickets booked in advance.</p>
	</div>

	<div class="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-5" use:reveal>
		<div class="min-w-0 lg:col-span-3">
			<p class="eyebrow">One perfect day</p>
			<h2 class="section-title mt-2">A curated 1-day itinerary</h2>
			<ol class="mt-8 space-y-0">
				{#each ITINERARY as stop, i (stop.time)}
					<li class="relative flex gap-4 pb-8 last:pb-0">
						{#if i < ITINERARY.length - 1}<span class="absolute top-10 left-[19px] h-[calc(100%-2.5rem)] w-px bg-line" aria-hidden="true"></span>{/if}
						<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-cream font-display text-base font-semibold text-gold-dark">{i + 1}</span>
						<div class="min-w-0 pt-1">
							<p class="flex flex-wrap items-center gap-x-2 text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase"><CalendarDays class="h-3.5 w-3.5" /> {stop.time}</p>
							<h3 class="font-display mt-1 text-2xl leading-tight font-semibold">{stop.title}</h3>
							<p class="mt-1 text-sm leading-relaxed text-muted">{stop.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
		<div class="min-w-0 lg:col-span-2">
			<div class="rounded-md bg-pine p-6 text-ivory sm:p-8 lg:sticky lg:top-24">
				<p class="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-gold uppercase"><ConciergeBell class="h-4 w-4" /> The Concierge</p>
				<h3 class="font-display mt-3 text-3xl font-semibold">Let us plan the day</h3>
				<p class="mt-3 text-sm leading-relaxed text-ivory/85">
					Private chauffeur from {inr(4500)} for a full day, a historian guide from {inr(2500)}, and
					tickets booked before you leave the palace. Heritage walks leave every Saturday at 7:30 AM — free for guests.
				</p>
				<img src={IMAGES.heritage} alt="Heritage walk in the old city of Jaipur" loading="lazy" class="mt-5 aspect-[16/10] w-full rounded-sm object-cover" />
				<a href="/contact?subject=Jaipur%20Tours" class="btn-gold mt-5 w-full">Book a Tour <ArrowRight class="h-4 w-4" /></a>
				<a href="/experiences" class="btn-ghost-light mt-3 w-full">See All Experiences</a>
			</div>
		</div>
	</div>
</section>
