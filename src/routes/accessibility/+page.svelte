<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, ROOMS } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { ArrowRight, Car, Ear, Eye, HeartHandshake, Mail, PawPrint, Phone, Route, ShowerHead } from '@lucide/svelte';

	const ACCESSIBLE_ROOM_SLUGS = [
		'deluxe-palace-room',
		'premium-courtyard-room',
		'royal-heritage-suite',
		'palace-garden-suite'
	] as const;

	const accessibleRooms = ACCESSIBLE_ROOM_SLUGS.map((slug) => ROOMS.find((r) => r.slug === slug)).filter(
		(r): r is (typeof ROOMS)[number] => r !== undefined
	);
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Accessibility"
	title="The palace, open to everyone"
	subtitle="A 200-year-old palace was not built for wheelchairs — so we rebuilt the parts that matter. Step-free routes, accessible rooms and staff who know how to help, without fuss."
	image={IMAGES.palace}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div use:reveal>
		<p class="eyebrow">Accessible rooms</p>
		<h2 class="section-title mt-2">Four rooms, fully step-free</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			Four of our rooms are adapted for wheelchair users and guests with limited mobility — wide doorways, lowered fixtures and roll-in showers. Mention your needs when booking and we will hold the room that suits you best.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-2" use:reveal>
		{#each accessibleRooms as room (room.slug)}
			<a href="/rooms/{room.slug}" class="card group min-w-0 p-6">
				<h3 class="font-display text-2xl font-semibold">{room.name}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{room.short}</p>
				<p class="mt-3 text-sm text-muted">{room.size} sqm · {room.view} · {room.bed}</p>
				<span class="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-gold-dark">
					View room <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
				</span>
			</a>
		{/each}
	</div>

	<div class="mt-16 grid gap-4 sm:mt-20 lg:grid-cols-3" use:reveal>
		<div class="card min-w-0 p-6">
			<Route class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Step-free routes</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				The entrance, reception, restaurants, pool and spa are all reachable without steps. Ramps and a lift serve the upper floors, and the garden paths are firm and level. Staff are always nearby to open doors and guide you.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<ShowerHead class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Accessible bathrooms</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Accessible rooms have roll-in showers with a fold-down seat, grab rails beside the WC and in the shower, a lowered washbasin with knee space, and an emergency pull cord within reach of the floor.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<Ear class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Hearing assistance</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Visual fire alarms and doorbells are fitted in accessible rooms, and the reception desk has a hearing loop. Tell us at booking and we will also arrange a vibrating alarm clock for your stay.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<Eye class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Visual assistance</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Large-print menus, room directories and spa lists are available at every restaurant and at reception. Staff are happy to read menus aloud, guide you through the palace, and describe dishes at the table.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<PawPrint class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Service animals welcome</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Guide and assistance dogs stay free, in every room category. We provide a water bowl, a relief area in the garden, and staff who know not to distract a working dog.
			</p>
		</div>
		<div class="card min-w-0 p-6">
			<Car class="h-6 w-6 text-gold-dark" />
			<h3 class="font-display mt-4 text-2xl font-semibold">Accessible transport</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				A wheelchair-accessible vehicle is available for airport transfers and sightseeing, with 24 hours notice. The palace has two reserved accessible parking bays beside the entrance.
			</p>
		</div>
	</div>

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Tell us what you need</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Every guest's needs are different. Call or write before you arrive and we will make sure the right room, route and support are ready — no surprises at check-in.
			</p>
			<p class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
				<a href="tel:{HOTEL.phoneHref}" class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold"><Phone class="h-4 w-4" /> {HOTEL.phone}</a>
				<a href="mailto:{HOTEL.email}" class="inline-flex min-h-11 items-center gap-2 font-semibold text-gold"><Mail class="h-4 w-4" /> {HOTEL.email}</a>
			</p>
		</div>
		<a href="/contact" class="btn-gold shrink-0"><HeartHandshake class="h-4 w-4" /> Plan Your Stay</a>
	</div>
</section>
