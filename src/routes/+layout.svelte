<script lang="ts">
	import { HOTEL } from '#lib/data/hotel';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import StickyBookBar from '#lib/components/StickyBookBar.svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const hotelJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Hotel',
		name: HOTEL.name,
		description:
			'A 5-star palace hotel in Jaipur with 118 rooms and suites, royal Indian dining at Saffron, Amara Spa, weddings and meetings.',
		url: 'https://aureliapalace.pages.dev/',
		telephone: HOTEL.phone,
		email: HOTEL.email,
		starRating: { '@type': 'Rating', ratingValue: '5' },
		priceRange: '₹18,999 - ₹1,25,000',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '12 Rajmahal Road, C-Scheme',
			addressLocality: 'Jaipur',
			addressRegion: 'Rajasthan',
			postalCode: '302001',
			addressCountry: 'IN'
		},
		geo: { '@type': 'GeoCoordinates', latitude: 26.9124, longitude: 75.7873 },
		checkinTime: '14:00',
		checkoutTime: '12:00'
	});
</script>

<svelte:head>
	<title>The Aurelia Palace, Jaipur — 5-Star Palace Hotel | Rooms, Dining, Spa & Weddings</title>
	<meta
		name="description"
		content="The Aurelia Palace, Jaipur — a 5-star palace hotel with 118 rooms and suites, royal Indian dining, Amara Spa, weddings and meetings. Best rate when you book direct."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="The Aurelia Palace" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	{@html `<script type="application/ld+json">${hotelJsonLd}</script>`}
</svelte:head>

<Header />
<main class="min-h-[60vh]">{@render children()}</main>
<Footer />
<div class="h-16 lg:hidden" aria-hidden="true"></div>
<StickyBookBar />
