<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, inr, usrcset } from '#lib/data/hotel';
	import { ELIGIBLE_ROOMS, PET_AMENITIES, PET_POLICY, PET_RULES, WALK_ROUTES } from '#lib/data/pet-policy';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, BedDouble, Check, Footprints, Heart, PawPrint, ShieldCheck, UtensilsCrossed } from '@lucide/svelte';
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Pet-Friendly Stays"
	title="Bring the four-legged family"
	subtitle="Well-behaved dogs and cats are welcome at the palace — a bed in the room, a welcome pack on arrival, and gardens made for morning walks."
	image={IMAGES.resort}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Policy cards -->
	<div class="grid gap-4 sm:grid-cols-3" use:reveal>
		<div class="card min-w-0 p-6">
			<PawPrint class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Fee per stay</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				<span class="font-display text-2xl font-semibold text-gold-dark">{inr(PET_POLICY.feePerStay)}</span> per stay,
				however many nights — it covers the deep clean, the welcome pack and the pet menu.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<Heart class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Up to {PET_POLICY.maxPetsPerRoom} pets</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				A maximum of {PET_POLICY.maxPetsPerRoom} pets per room, each up to {PET_POLICY.weightLimitKg} kg. Tell us about
				your pet when you book so the room is prepared before you arrive.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<ShieldCheck class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">No size surprises</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				The weight limit is {PET_POLICY.weightLimitKg} kg per pet. Larger dogs can be accommodated in the Palace Garden
				Suite — ask when you book and we will confirm.
			</p>
		</div>
	</div>

	<!-- Eligible rooms -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Pet-Friendly Rooms</p>
		<h2 class="section-title mt-2">Rooms that welcome pets</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Pets stay in garden-level rooms and suites with easy access to the gardens, so the morning walk starts at your
			door. These are the room types where pets are welcome:
		</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each ELIGIBLE_ROOMS as room (room.slug)}
				<a href="/rooms/{room.slug}" class="card block min-w-0 p-6 transition-colors hover:border-gold-dark">
					<BedDouble class="h-6 w-6 text-gold-dark" />
					<h3 class="font-display mt-4 text-2xl font-semibold">{room.name}</h3>
					<p class="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-gold-dark">View the room <ArrowRight class="h-4 w-4" /></p>
				</a>
			{/each}
		</div>
	</div>

	<!-- Rules + amenities -->
	<div class="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-2 lg:gap-12" use:reveal>
		<div class="min-w-0">
			<p class="eyebrow">House Rules</p>
			<h2 class="section-title mt-2">A few rules, for everyone's comfort</h2>
			<ul class="mt-6 space-y-3 text-sm text-ink/85">
				{#each PET_RULES as rule (rule)}
					<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {rule}</li>
				{/each}
			</ul>
		</div>
		<div class="min-w-0">
			<p class="eyebrow">For Your Pet</p>
			<h2 class="section-title mt-2">Waiting in the room</h2>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				{#each PET_AMENITIES as amenity (amenity.title)}
					<div class="card min-w-0 p-5">
						<UtensilsCrossed class="h-5 w-5 text-gold-dark" />
						<h3 class="font-display mt-3 text-xl font-semibold">{amenity.title}</h3>
						<p class="mt-1 text-sm leading-relaxed text-muted">{amenity.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Walk routes -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Walk Routes</p>
		<h2 class="section-title mt-2">Where to walk</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each WALK_ROUTES as route (route.title)}
				<div class="card min-w-0 p-6">
					<Footprints class="h-6 w-6 text-gold-dark" />
					<h3 class="font-display mt-4 text-2xl font-semibold">{route.title}</h3>
					<p class="mt-1 text-sm font-semibold text-gold-dark">{route.distance}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{route.text}</p>
				</div>
			{/each}
		</div>
		<img
			src={IMAGES.pool2}
			srcset={usrcset(IMAGES.pool2)}
			sizes="(max-width: 1024px) 100vw, 50vw"
			alt="The palace gardens, made for morning walks"
			loading="lazy"
			decoding="async"
			class="mt-8 aspect-[16/7] w-full rounded-md object-cover"
		/>
		<p class="mt-6 text-sm text-muted">
			Questions about bringing your pet? Call <a href="tel:{HOTEL.phoneHref}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.phone}</a>
			or write to <a href="mailto:{HOTEL.email}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.email}</a>.
		</p>
	</div>

	<!-- CTA -->
	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Pets travel too</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Mention your pet when you book and the bed, bowls and welcome pack will be waiting in the room.
			</p>
		</div>
		<a href="/book" class="btn-gold min-h-11 shrink-0">Book a Pet-Friendly Stay <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
