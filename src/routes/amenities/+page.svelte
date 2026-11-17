<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { AMENITIES, SIGNATURE_AMENITIES } from '#lib/data/amenities';
	import { IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Check, Clock } from '@lucide/svelte';
</script>

<PageHero
	eyebrow="Amenities & Facilities"
	title="Everything, quietly taken care of"
	subtitle="A pool that is always the right temperature, a butler who knows before you ask, and a concierge who knows Jaipur properly. The details are the point."
	image={IMAGES.pool}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Signature amenities -->
	<div class="space-y-12 sm:space-y-16">
		{#each SIGNATURE_AMENITIES as sig, i (sig.title)}
			<article class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12" use:reveal>
				<img
					src={sig.image}
					alt={sig.title}
					loading="lazy"
					class="aspect-[4/3] w-full rounded-md object-cover {i % 2 === 1 ? 'lg:order-2' : ''}"
				/>
				<div class="min-w-0 {i % 2 === 1 ? 'lg:order-1' : ''}">
					<p class="eyebrow">Signature {i + 1} of 3</p>
					<h2 class="section-title mt-2">{sig.title}</h2>
					<p class="mt-4 text-base leading-relaxed text-muted">{sig.text}</p>
					<ul class="mt-6 space-y-3 text-sm text-ink/85">
						{#each sig.points as point (point)}
							<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {point}</li>
						{/each}
					</ul>
				</div>
			</article>
		{/each}
	</div>

	<!-- Full amenity grid -->
	<div class="mt-16 sm:mt-24" use:reveal>
		<p class="eyebrow">All amenities</p>
		<h2 class="section-title mt-2">The full list, at a glance</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Everything below is included in your stay unless noted. Hours are as listed — the concierge and the
			butler never close.
		</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each AMENITIES as a, i (a.name)}
				<div class="min-w-0 rounded-md border border-line bg-white p-5" use:reveal={{ delay: (i % 3) * 80 }}>
					<a.icon class="h-7 w-7 text-gold-dark" />
					<h3 class="font-display mt-3 text-xl leading-tight font-semibold text-ink">{a.name}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
					<p class="mt-3 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-pine uppercase">
						<Clock class="h-3.5 w-3.5 text-gold-dark" /> {a.hours}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Good to know -->
	<div class="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3" use:reveal>
		<div class="rounded-md bg-cream p-5">
			<p class="text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase">Check-in · Check-out</p>
			<p class="mt-2 text-sm leading-relaxed text-ink/85">Check-in from 2:00 PM, check-out until 12:00 PM. Early check-in and late check-out are complimentary when the room is available.</p>
		</div>
		<div class="rounded-md bg-cream p-5">
			<p class="text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase">Children</p>
			<p class="mt-2 text-sm leading-relaxed text-ink/85">Children under 6 stay free. Cots, high chairs and the shallow pool section are complimentary, and the kids club runs daily.</p>
		</div>
		<div class="rounded-md bg-cream p-5">
			<p class="text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase">Accessibility</p>
			<p class="mt-2 text-sm leading-relaxed text-ink/85">Step-free access to the lobby, restaurants and pool deck, plus accessible rooms on the ground floor. Tell us what you need when you book.</p>
		</div>
	</div>

	<!-- CTA -->
	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="font-display text-2xl font-semibold sm:text-3xl">Come and use all of it.</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Rooms from ₹18,999 a night, breakfast included, free cancellation up to 72 hours before check-in.
			</p>
		</div>
		<a href="/book" class="btn-gold shrink-0">Check Availability <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
