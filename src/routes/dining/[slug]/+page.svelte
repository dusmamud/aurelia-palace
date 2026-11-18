<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { DINING, HOTEL, inr, usrcset } from '#lib/data/hotel';
	import { SITE_URL } from '#lib/data/meta';
	import { reveal } from '#lib/reveal';
	import { Clock, UtensilsCrossed, Leaf, Check, ArrowRight, CalendarDays } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const restaurant = $derived(data.restaurant);

	// Cuisines are taken from the visible copy (kind + description) only.
	const CUISINES: Record<string, string[]> = {
		saffron: ['Rajasthani', 'North Indian'],
		'the-courtyard': ['Indian', 'International'],
		zoya: ['Cocktails', 'Bar food']
	};

	const restaurantJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Restaurant',
			'@id': `${SITE_URL}/dining/${restaurant.slug}#restaurant`,
			name: restaurant.name,
			description: restaurant.description,
			image: restaurant.image,
			servesCuisine: CUISINES[restaurant.slug] ?? ['Indian'],
			priceRange: restaurant.price,
			acceptsReservations: 'True',
			telephone: HOTEL.phone,
			address: {
				'@type': 'PostalAddress',
				streetAddress: '12 Rajmahal Road, C-Scheme',
				addressLocality: 'Jaipur',
				addressRegion: 'Rajasthan',
				postalCode: '302001',
				addressCountry: 'IN'
			},
			containedInPlace: { '@type': 'Hotel', '@id': `${SITE_URL}/#hotel` }
		})
	);

	const SIGNATURES: Record<string, { name: string; note: string; price: number }[]> = {
		saffron: [
			{ name: 'Laal Maas', note: 'Slow-cooked lamb, Mathania chillies, smoked ghee', price: 1450 },
			{ name: 'Royal Dal Baati Churma', note: 'Ghee-roasted baati, panchmel dal, jaggery churma', price: 950 },
			{ name: 'Ker Sangri', note: 'Desert beans and berries, a Rajasthani classic', price: 850 },
			{ name: 'Ghevar with Rabri', note: 'Saffron-soaked ghevar, made to order', price: 650 }
		],
		'the-courtyard': [
			{ name: 'Jaipur Breakfast Thali', note: 'Bedmi puri, aloo sabzi, curd, lassi', price: 850 },
			{ name: 'Live Grill — Paneer Tikka', note: 'Charcoal grill, mint chutney, pickled onion', price: 750 },
			{ name: 'Masala Dosa, Courtyard Style', note: 'Crisp dosa, sambar, coconut chutney', price: 550 },
			{ name: 'Palace Club Sandwich', note: 'Grilled chicken, egg, house mayo', price: 650 }
		],
		zoya: [
			{ name: 'Zoya Sunset Spritz', note: 'House infusion, citrus, soda', price: 950 },
			{ name: 'Tandoori Prawns', note: 'Smoked prawns, saffron aioli', price: 1250 },
			{ name: 'Burrata & Heirloom Tomato', note: 'Basil oil, sourdough, sea salt', price: 950 },
			{ name: 'Saffron Kulfi Sundae', note: 'Pistachio, rose, gold leaf', price: 550 }
		]
	};

	const dishes = $derived(SIGNATURES[restaurant.slug] ?? []);
	const others = $derived(DINING.filter((r) => r.slug !== restaurant.slug));

	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let time = $state('19:30');
	let guests = $state(2);
	let submitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[+0-9][0-9\s-]{7,14}$/.test(phone.trim())) errors.phone = 'Please enter a valid phone number.';
		if (!date) errors.date = 'Please choose a date.';
		if (!time) errors.time = 'Please choose a time.';
		if (guests < 1 || guests > 20) errors.guests = 'Guests must be between 1 and 20.';
		if (Object.keys(errors).length > 0) return;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-dining') ?? '[]') as unknown[];
			existing.push({ name: name.trim(), phone: phone.trim(), date, time, guests, restaurant: restaurant.slug, at: new Date().toISOString() });
			localStorage.setItem('aurelia-dining', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — reservation is still confirmed on screen
		}
		submitted = true;
	}
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${restaurantJsonLd}</script>`}
</svelte:head>

<PageHero
	eyebrow={restaurant.kind}
	title={restaurant.name}
	subtitle={restaurant.description}
	image={restaurant.image}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5">
		<div class="min-w-0 lg:col-span-3" use:reveal>
			<div class="flex flex-wrap gap-2">
				<span class="chip"><Clock class="mr-1.5 h-3.5 w-3.5 text-gold-dark" /> {restaurant.hours}</span>
				<span class="chip"><UtensilsCrossed class="mr-1.5 h-3.5 w-3.5 text-gold-dark" /> {restaurant.price}</span>
				<span class="chip"><Leaf class="mr-1.5 h-3.5 w-3.5 text-gold-dark" /> Veg &amp; Jain on request</span>
			</div>

			<h2 class="section-title mt-8">Signature dishes</h2>
			<ul class="mt-6 divide-y divide-line rounded-md border border-line bg-white">
				{#each dishes as dish (dish.name)}
					<li class="flex items-baseline justify-between gap-4 p-5">
						<span class="min-w-0">
							<span class="font-display block text-xl font-semibold text-ink sm:text-2xl">{dish.name}</span>
							<span class="mt-0.5 block text-sm text-muted">{dish.note}</span>
						</span>
						<span class="font-display shrink-0 text-xl font-semibold text-gold-dark">{inr(dish.price)}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-4 text-sm leading-relaxed text-muted">
				Menus are indicative and change with the season. All prices are in Indian rupees and exclusive of
				applicable taxes. Please tell us about allergies when you reserve.
			</p>

			<h2 class="section-title mt-12">Also at the palace</h2>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				{#each others as other (other.slug)}
					<a href="/dining/{other.slug}" class="card group flex min-w-0 items-center gap-4 p-4">
						<img src={other.image} srcset={usrcset(other.image, [160, 320])} sizes="80px" alt={other.name} loading="lazy" decoding="async" class="h-20 w-20 shrink-0 rounded-sm object-cover" />
						<span class="min-w-0">
							<span class="font-display block truncate text-xl font-semibold text-ink group-hover:text-gold-dark">{other.name}</span>
							<span class="block truncate text-xs text-muted">{other.kind} · {other.hours}</span>
							<span class="mt-1 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.14em] text-gold-dark uppercase">View <ArrowRight class="h-3.5 w-3.5" /></span>
						</span>
					</a>
				{/each}
			</div>
		</div>

		<div class="min-w-0 lg:col-span-2" use:reveal={{ delay: 120 }}>
			<div class="rounded-md border border-line bg-white p-5 sm:p-6 lg:sticky lg:top-24">
				<p class="eyebrow">Reserve a table</p>
				<h2 class="font-display mt-2 text-3xl font-semibold text-ink">{restaurant.name}</h2>
				<p class="mt-1 text-sm text-muted">{restaurant.hours} · {restaurant.price}</p>
				{#if submitted}
					<div class="mt-6 rounded-sm border border-gold/40 bg-cream p-5" role="status">
						<p class="flex items-start gap-2 font-semibold text-pine"><Check class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> Table request received</p>
						<p class="mt-2 text-sm leading-relaxed text-ink/80">
							Thank you, {name.trim()}. Your request for {guests} {guests === 1 ? 'guest' : 'guests'} at {restaurant.name}
							on {date} at {time} is saved. Our concierge will call {phone.trim()} shortly to confirm.
						</p>
						<button type="button" class="btn-ghost mt-4 !min-h-11 w-full" onclick={() => { submitted = false; name = ''; phone = ''; date = ''; time = '19:30'; guests = 2; }}>Make another request</button>
					</div>
				{:else}
					<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
						<div>
							<label class="label" for="d-name">Full name</label>
							<input id="d-name" class="input" type="text" autocomplete="name" placeholder="Your name" bind:value={name} />
							{#if errors.name}<p class="mt-1 text-xs text-red-800">{errors.name}</p>{/if}
						</div>
						<div>
							<label class="label" for="d-phone">Phone</label>
							<input id="d-phone" class="input" type="tel" autocomplete="tel" placeholder="+91 98765 43210" bind:value={phone} />
							{#if errors.phone}<p class="mt-1 text-xs text-red-800">{errors.phone}</p>{/if}
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="label" for="d-date">Date</label>
								<input id="d-date" class="input" type="date" bind:value={date} />
								{#if errors.date}<p class="mt-1 text-xs text-red-800">{errors.date}</p>{/if}
							</div>
							<div>
								<label class="label" for="d-time">Time</label>
								<input id="d-time" class="input" type="time" bind:value={time} />
								{#if errors.time}<p class="mt-1 text-xs text-red-800">{errors.time}</p>{/if}
							</div>
						</div>
						<div>
							<label class="label" for="d-guests">Guests</label>
							<input id="d-guests" class="input" type="number" min="1" max="20" bind:value={guests} />
							{#if errors.guests}<p class="mt-1 text-xs text-red-800">{errors.guests}</p>{/if}
						</div>
						<button type="submit" class="btn-gold w-full"><CalendarDays class="h-4 w-4" /> Request Reservation</button>
						<p class="text-center text-xs text-muted">No advance payment. Confirmation by phone.</p>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
