<script lang="ts">
	import { ArrowRight, Clock, Landmark, Mail, MapPin, Navigation, Phone, Plane, TrainFront } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES, usrcset } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	const distances = [
		{ icon: Plane, name: 'Jaipur International Airport', detail: '12 km · about 25 minutes', note: 'Complimentary chauffeur transfer for suite guests; ₹1,800 one way for other rooms.' },
		{ icon: TrainFront, name: 'Jaipur Junction Railway Station', detail: '4 km · about 10 minutes', note: 'Direct trains to Delhi, Agra and Jodhpur.' },
		{ icon: Landmark, name: 'Hawa Mahal', detail: '3 km · about 8 minutes', note: 'The pink facade is at its best at sunrise.' },
		{ icon: Landmark, name: 'City Palace', detail: '3.5 km · about 10 minutes', note: 'A short walk through the old city gates.' },
		{ icon: Landmark, name: 'Amber Fort', detail: '11 km · about 30 minutes', note: 'Leave by 7:30 AM to beat the crowds.' },
		{ icon: Landmark, name: 'Jantar Mantar & Albert Hall', detail: '4–5 km · about 12 minutes', note: 'Easy to pair with an afternoon heritage walk.' }
	];

	const nearby = [
		{ name: 'Johari Bazaar', text: 'Jaipur’s jewellery quarter — gemstones, block prints and silver, a 10-minute walk.', image: IMAGES.heritage },
		{ name: 'Bapu Bazaar', text: 'Textiles, mojris and tie-dye. Go in the late afternoon, when the light turns gold.', image: IMAGES.resort2 },
		{ name: 'Nahargarh Fort', text: 'Sunset over the whole city from the ramparts, 25 minutes by car.', image: IMAGES.resort3 },
		{ name: 'Jal Mahal', text: 'The water palace on Man Sagar Lake — best photographed at first light.', image: IMAGES.resort }
	];
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Location"
	title="In the heart of Jaipur"
	subtitle="C-Scheme, on Rajmahal Road — the old city on one side, the airport on the other, and the palace in between."
	image={IMAGES.heritage}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-3" use:reveal>
		<a href="tel:{HOTEL.phoneHref}" class="card min-w-0 p-6">
			<Phone class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Call us</h2>
			<p class="mt-1 text-muted">{HOTEL.phone}</p>
			<p class="mt-1 text-sm text-muted">24-hour front desk & concierge</p>
		</a>
		<a href="mailto:{HOTEL.email}" class="card min-w-0 p-6">
			<Mail class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Write to us</h2>
			<p class="mt-1 text-muted">{HOTEL.email}</p>
			<p class="mt-1 text-sm text-muted">Reservations reply within a day</p>
		</a>
		<div class="card min-w-0 p-6">
			<Clock class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Check-in & check-out</h2>
			<p class="mt-1 text-muted">Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}</p>
			<p class="mt-1 text-sm text-muted">Early check-in on request, when the room is ready</p>
		</div>
	</div>

	<div class="mt-12 grid gap-8 lg:grid-cols-5" use:reveal>
		<div class="min-w-0 lg:col-span-3">
			<p class="eyebrow">Find us</p>
			<h2 class="section-title mt-2">12 Rajmahal Road, C-Scheme</h2>
			<p class="mt-3 max-w-xl leading-relaxed text-muted">
				{HOTEL.address}. The palace sits on a quiet, tree-lined road — five minutes from the old
				city gates, and far enough from the traffic to sleep well.
			</p>
			<div class="mt-6 overflow-hidden rounded-md border border-line">
				<iframe
					title="Map — The Aurelia Palace, Jaipur"
					src="https://www.openstreetmap.org/export/embed.html?bbox=75.75%2C26.89%2C75.82%2C26.93&layer=mapnik&marker=26.9124%2C75.7873"
					loading="lazy"
					class="h-[380px] w-full border-0"
				></iframe>
			</div>
			<p class="mt-3 text-sm text-muted">
				Map not loading?
				<a
					class="font-semibold text-gold-dark underline underline-offset-2"
					href="https://www.google.com/maps/search/?api=1&query=12+Rajmahal+Road+C-Scheme+Jaipur+302001"
					target="_blank"
					rel="noopener noreferrer">Open in Google Maps</a
				>
			</p>
		</div>
		<div class="min-w-0 lg:col-span-2">
			<p class="eyebrow">Getting here</p>
			<h2 class="font-display mt-2 text-3xl font-semibold">Distances & times</h2>
			<ul class="mt-5 space-y-3">
				{#each distances as d (d.name)}
					<li class="card flex min-w-0 gap-4 !shadow-none p-4">
						<d.icon class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
						<div class="min-w-0">
							<p class="font-semibold">{d.name}</p>
							<p class="text-sm text-gold-dark">{d.detail}</p>
							<p class="mt-0.5 text-sm text-muted">{d.note}</p>
						</div>
					</li>
				{/each}
			</ul>
			<a href="/contact" class="btn-pine mt-6 w-full"><Navigation class="h-4 w-4" /> Ask the Concierge</a>
			<a href="/explore-jaipur" class="btn-gold mt-3 w-full">Explore Jaipur Guide <ArrowRight class="h-4 w-4" /></a>
		</div>
	</div>

	<div class="mt-16" use:reveal>
		<p class="eyebrow">Around the palace</p>
		<h2 class="section-title mt-2">Nearby, worth your morning</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each nearby as place (place.name)}
				<article class="card min-w-0">
					<img src={place.image} srcset={usrcset(place.image)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" alt={place.name} loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover" />
					<div class="p-5">
						<h3 class="font-display text-2xl font-semibold">{place.name}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">{place.text}</p>
					</div>
				</article>
			{/each}
		</div>
		<p class="mt-6 flex items-start gap-2 text-sm text-muted">
			<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
			All times are approximate and depend on traffic. Ask the concierge for a driver, a walking route, or a guided heritage walk — the walk is free for guests on Saturday mornings.
		</p>
	</div>
</section>
