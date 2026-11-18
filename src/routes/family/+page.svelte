<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, ROOMS, inr, usrcset } from '#lib/data/hotel';
	import { BABYSITTING_RATE, FAMILY_FAQS, FAMILY_PACKAGES, KIDS_CLUB, KIDS_MENUS } from '#lib/data/family';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Baby, Check, Clock, Moon, Sparkles, Users } from '@lucide/svelte';

	const connecting = ROOMS.filter((r) => r.slug === 'deluxe-palace-room' || r.slug === 'premium-courtyard-room');
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Family Stays"
	title="A palace the whole family loves"
	subtitle="Connecting rooms for the parents, a kids club for the small ones, and a pool with a shallow end — a family holiday that does not feel like a compromise."
	image={IMAGES.pool}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Connecting rooms -->
	<div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12" use:reveal>
		<img
			src={IMAGES.resort2}
			srcset={usrcset(IMAGES.resort2)}
			sizes="(max-width: 1024px) 100vw, 50vw"
			alt="Connecting rooms at The Aurelia Palace"
			loading="lazy"
			decoding="async"
			class="aspect-[4/3] w-full rounded-md object-cover"
		/>
		<div class="min-w-0">
			<p class="eyebrow">Rooms that connect</p>
			<h2 class="section-title mt-2">Two rooms, one family</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				Our Deluxe Palace Rooms and Premium Courtyard Rooms connect in pairs through an internal door, so parents
				and children each have their own room — and their own sleep schedule — with a shared entrance. Book a
				connecting pair and the palace keeps everyone close without anyone stepping on anyone else.
			</p>
			<ul class="mt-6 space-y-3 text-sm text-ink/85">
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Internal connecting door, locked from either side</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Sleeps up to 5 across the pair, with a daybed in the Premium room</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Cots free for children under 6, high chairs at every restaurant</li>
			</ul>
			<div class="mt-6 flex flex-wrap gap-3">
				{#each connecting as room (room.slug)}
					<a href="/rooms/{room.slug}" class="btn-ghost min-h-11">{room.name} · {inr(room.price)}</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Kids club -->
	<div class="mt-16 grid items-center gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-12" use:reveal>
		<div class="min-w-0 lg:order-2">
			<img
				src={KIDS_CLUB.image}
				srcset={usrcset(KIDS_CLUB.image)}
				sizes="(max-width: 1024px) 100vw, 50vw"
				alt={KIDS_CLUB.name}
				loading="lazy"
				decoding="async"
				class="aspect-[4/3] w-full rounded-md object-cover"
			/>
		</div>
		<div class="min-w-0 lg:order-1">
			<p class="eyebrow">Kids Club</p>
			<h2 class="section-title mt-2">{KIDS_CLUB.name}</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">{KIDS_CLUB.description}</p>
			<p class="mt-4 text-sm text-muted">
				<span class="font-semibold text-ink">Ages {KIDS_CLUB.ages}</span> · {KIDS_CLUB.timings}, {KIDS_CLUB.days.toLowerCase()}
			</p>
			<ul class="mt-6 space-y-3 text-sm text-ink/85">
				{#each KIDS_CLUB.activities as act (act)}
					<li class="flex items-start gap-2"><Sparkles class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {act}</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Practical cards: babysitting, cots, kids menus -->
	<div class="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3" use:reveal>
		<div class="card min-w-0 p-6">
			<Moon class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Babysitting</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Trained babysitters from 9 AM to 10 PM at {inr(BABYSITTING_RATE)} per hour, with 4 hours' notice — so dinner at
				Saffron can be a date night again.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<Baby class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Cots, free</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Children under 6 stay free in their parents' room. Cots, high chairs and bottle warmers are complimentary —
				just mention them when you book.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<Clock class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Kids club hours</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				The Little Maharajas Club runs {KIDS_CLUB.timings.toLowerCase()} daily for ages {KIDS_CLUB.ages}. Drop in for an
				hour or the whole day — no booking needed.
			</p>
		</div>
	</div>

	<!-- Kids menus -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Hungry, small people</p>
		<h2 class="section-title mt-2">{KIDS_MENUS.title}</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">{KIDS_MENUS.description}</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each KIDS_MENUS.items as item (item.name)}
				<div class="card min-w-0 p-6">
					<h3 class="font-display text-xl font-semibold">{item.name}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Family packages -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Family Packages</p>
		<h2 class="section-title mt-2">Priced for the whole family</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Packages are priced for 2 adults and 2 children in connecting rooms, with breakfast and kids club included.
			Check-in is {HOTEL.checkIn}, check-out {HOTEL.checkOut}.
		</p>
		<div class="mt-8 grid gap-4 lg:grid-cols-3">
			{#each FAMILY_PACKAGES as pkg (pkg.slug)}
				<article class="card flex min-w-0 flex-col p-6">
					<div class="flex items-center gap-2 text-sm text-muted">
						<Users class="h-4 w-4 text-gold-dark" /> {pkg.nights} nights
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
					<a href="/book" class="btn-pine mt-4 min-h-11">Book This Package <ArrowRight class="h-4 w-4" /></a>
				</article>
			{/each}
		</div>
	</div>

	<!-- FAQ -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Good to know</p>
		<h2 class="section-title mt-2">Family questions, answered</h2>
		<div class="mt-8 space-y-4">
			{#each FAMILY_FAQS as faq (faq.q)}
				<div class="card min-w-0 p-6">
					<h3 class="font-display text-xl font-semibold">{faq.q}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- CTA -->
	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Bring the whole family</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Connecting rooms go first in school holidays. Book early and tell us the children's ages — the room will be
				ready for them before you arrive.
			</p>
		</div>
		<a href="/book" class="btn-gold min-h-11 shrink-0">Book a Family Stay <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
