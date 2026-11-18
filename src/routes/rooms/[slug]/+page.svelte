<script lang="ts">
	import { ArrowRight, BedDouble, Check, Clock, Eye, Maximize, Users } from '@lucide/svelte';
	import BookingBar from '#lib/components/BookingBar.svelte';
	import RoomCard from '#lib/components/RoomCard.svelte';
	import { reveal } from '#lib/reveal';
	import { HOTEL, ROOMS, inr, usrcset } from '#lib/data/hotel';
	import { SITE_URL } from '#lib/data/meta';

	let { data } = $props();
	let room = $derived(data.room);
	let active = $state(0);
	let mainImage = $derived(room.gallery[active]);
	let similar = $derived(ROOMS.filter((r) => r.slug !== room.slug).slice(0, 3));

	// HotelRoom is NOT a subclass of Product, so `offers` on a plain
	// HotelRoom is invalid (schema.org validator warned about it). The
	// schema.org hotels guide's own pattern is a Multi-Typed Entity: the
	// room is typed as both HotelRoom and Product, which makes `offers`
	// valid; the room points back to the hotel with `containedInPlace`
	// (the old `isPartOf` was a CreativeWork property — also invalid).
	let jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': ['HotelRoom', 'Product'],
			'@id': `${SITE_URL}/rooms/${room.slug}#room`,
			name: room.name,
			description: room.description,
			// Rich Results flagged the missing global identifier (gtin/brand)
			// on the Merchant listings item. A hotel room has no GTIN; the
			// brand is the hotel itself. The other two optional warnings
			// (hasMerchantReturnPolicy, shippingDetails) do not apply to a
			// stay — a room is not shipped, and cancellation terms live on
			// the /cancellation-policy page, not in an Offer.
			brand: { '@type': 'Brand', name: HOTEL.name },
			image: room.gallery,
			occupancy: { '@type': 'QuantitativeValue', maxValue: room.occupancy },
			bed: room.bed,
			floorSize: { '@type': 'QuantitativeValue', value: room.size, unitCode: 'MTK' },
			containedInPlace: { '@type': 'Hotel', '@id': `${SITE_URL}/#hotel` },
			offers: {
				'@type': 'Offer',
				url: `${SITE_URL}/book?room=${room.slug}`,
				price: room.price,
				priceCurrency: 'INR',
				availability: 'https://schema.org/InStock'
			}
		})
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:px-8">
	<a href="/rooms" class="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-pine">
		<ArrowRight class="h-4 w-4 rotate-180" /> All Rooms &amp; Suites
	</a>

	<div class="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
		<!-- Gallery -->
		<div class="min-w-0" use:reveal>
			<div class="relative overflow-hidden rounded-md">
				<img
					src={mainImage}
					srcset={usrcset(mainImage)}
					sizes="(max-width: 1024px) 100vw, 50vw"
					alt="{room.name} — photo {active + 1} of {room.gallery.length}"
					decoding="async"
					class="aspect-[4/3] w-full object-cover"
				/>
				<span class="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
					{active + 1} / {room.gallery.length}
				</span>
			</div>
			<div class="mt-3 grid grid-cols-4 gap-3">
				{#each room.gallery as src, i (src)}
					<button
						type="button"
						aria-label="Show photo {i + 1} of {room.name}"
						aria-pressed={active === i}
						onclick={() => (active = i)}
						class="min-h-11 overflow-hidden rounded-sm transition {active === i
							? 'ring-2 ring-gold ring-offset-2'
							: 'opacity-75 hover:opacity-100'}"
					>
						<img src={src} srcset={usrcset(src, [160, 320])} sizes="80px" alt="" loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover" />
					</button>
				{/each}
			</div>
		</div>

		<!-- Details -->
		<div class="min-w-0" use:reveal={{ delay: 80 }}>
			<p class="eyebrow">Rooms &amp; Suites · {HOTEL.city}</p>
			<h1 class="font-display mt-3 text-4xl leading-[1.05] font-semibold text-ink sm:text-5xl">{room.name}</h1>
			<p class="mt-4 flex flex-wrap items-baseline gap-2">
				<span class="font-display text-3xl font-semibold text-pine">{inr(room.price)}</span>
				<span class="text-sm text-muted">per night · +18% GST at checkout · breakfast included</span>
			</p>
			<p class="mt-5 leading-relaxed text-muted">{room.description}</p>

			<ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/80">
				<li class="flex items-center gap-1.5"><Maximize class="h-4 w-4 text-gold-dark" /> {room.size} sqm</li>
				<li class="flex items-center gap-1.5"><Users class="h-4 w-4 text-gold-dark" /> Up to {room.occupancy} guests</li>
				<li class="flex items-center gap-1.5"><Eye class="h-4 w-4 text-gold-dark" /> {room.view}</li>
				<li class="flex items-center gap-1.5"><BedDouble class="h-4 w-4 text-gold-dark" /> {room.bed}</li>
				<li class="flex items-center gap-1.5"><Clock class="h-4 w-4 text-gold-dark" /> Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}</li>
			</ul>

			<h2 class="mt-8 text-sm font-semibold tracking-[0.18em] text-muted uppercase">Amenities</h2>
			<ul class="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
				{#each room.amenities as amenity (amenity)}
					<li class="flex min-w-0 items-start gap-2.5 text-sm text-ink/85">
						<Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> <span class="min-w-0">{amenity}</span>
					</li>
				{/each}
			</ul>

			<div class="mt-8 flex flex-wrap gap-3">
				<a href="/book?room={room.slug}" class="btn-gold">Book This Room <ArrowRight class="h-4 w-4" /></a>
				<a href="tel:{HOTEL.phoneHref}" class="btn-ghost">Call {HOTEL.phone}</a>
			</div>
		</div>
	</div>

	<!-- Availability -->
	<div class="mt-14" use:reveal>
		<h2 class="section-title !text-3xl">Check availability for this room.</h2>
		<div class="mt-6"><BookingBar compact /></div>
	</div>
</section>

<!-- Similar rooms -->
<section class="bg-cream/60 py-16 sm:py-20" use:reveal>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="section-title">You may also like.</h2>
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each similar as similarRoom, i (similarRoom.slug)}
				<div use:reveal={{ delay: i * 80 }} class="min-w-0"><RoomCard room={similarRoom} /></div>
			{/each}
		</div>
	</div>
</section>
