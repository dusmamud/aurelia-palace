<script lang="ts">
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { metaFor, ogImage, SITE_URL, breadcrumbsFor } from '#lib/data/meta';
	// Font preloads: the hero headline reflows when Cormorant/Jost swap in
	// late on slow networks, and PageSpeed measured that reflow as the whole
	// 0.24–0.27 CLS on /dining and /amenities. Preloading the three weights
	// the hero and body actually use starts the download with the HTML
	// instead of after the CSS is parsed.
	import cormorant600 from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2?url';
	import jost400 from '@fontsource/jost/files/jost-latin-400-normal.woff2?url';
	import jost600 from '@fontsource/jost/files/jost-latin-600-normal.woff2?url';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import StickyBookBar from '#lib/components/StickyBookBar.svelte';
	import BackToTop from '#lib/components/BackToTop.svelte';
	import ChatWidget from '#lib/components/ChatWidget.svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Lenis smooth scroll (the modern standard, pairs with GSAP ScrollTrigger).
	// Native window scrolling is preserved, so the sticky header and the
	// CSS view-timeline parallax keep working. Disabled entirely under
	// prefers-reduced-motion.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
		return () => lenis.destroy();
	});

	// View Transitions API: soft crossfade between pages (0.28s, see app.css).
	// Falls back to a normal navigation where the API is absent.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	// Per-page meta from the single source of truth (src/lib/data/meta.ts).
	// Null on unknown paths — error pages render their own <title> and no
	// canonical, so a 404 never claims a canonical URL.
	const meta = $derived(metaFor(page.url.pathname));
	const canonical = $derived(meta ? `${SITE_URL}${page.url.pathname === '/' ? '' : page.url.pathname}` : null);
	const crumbs = $derived(breadcrumbsFor(page.url.pathname));
	const breadcrumbJsonLd = $derived(
		crumbs
			? JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'BreadcrumbList',
					itemListElement: crumbs.map((c, i) => ({
						'@type': 'ListItem',
						position: i + 1,
						name: c.name,
						item: c.url
					}))
				})
			: null
	);

	// Amenity names for the Hotel schema. Kept here (not imported from
	// amenities.ts) so the layout does not pull 14 lucide icon components
	// into every page's bundle. Keep in sync with src/lib/data/amenities.ts.
	const AMENITY_FEATURE_NAMES = [
		'Outdoor Temperature-Controlled Pool',
		'Fitness Centre',
		'Business Centre',
		'Concierge Desk',
		'24-Hour Butler Service',
		'Airport Transfers',
		'EV Charging',
		'Valet Parking',
		'Complimentary Wi-Fi',
		'Evening Turndown',
		'In-Room Dining',
		'Kids Club',
		'Library & Lounge',
		'Salon & Grooming'
	];

	const hotelJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Hotel',
		'@id': `${SITE_URL}/#hotel`,
		name: HOTEL.name,
		description:
			'A 5-star palace hotel in Jaipur with 118 rooms and suites, royal Indian dining at Saffron, Amara Spa, weddings and meetings.',
		url: `${SITE_URL}/`,
		image: IMAGES.hero,
		telephone: HOTEL.phone,
		email: HOTEL.email,
		starRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: HOTEL.rating,
			reviewCount: HOTEL.reviewsCount,
			bestRating: 5
		},
		priceRange: '₹18,999 - ₹1,25,000',
		numberOfRooms: HOTEL.roomsCount,
		currenciesAccepted: 'INR',
		paymentAccepted: 'Credit Card, Debit Card, UPI, Net Banking',
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
		checkoutTime: '12:00',
		amenityFeature: AMENITY_FEATURE_NAMES.map((name) => ({
			'@type': 'LocationFeatureSpecification',
			name,
			value: true
		}))
	});
</script>

<svelte:head>
	<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href={cormorant600} />
	<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href={jost400} />
	<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href={jost600} />
	{#if meta}
		<title>{meta.title}</title>
		<meta name="description" content={meta.description} />
		{#if canonical}<link rel="canonical" href={canonical} />{/if}
		<meta property="og:type" content={meta.type} />
		<meta property="og:site_name" content="The Aurelia Palace" />
		<meta property="og:title" content={meta.title} />
		<meta property="og:description" content={meta.description} />
		<meta property="og:image" content={ogImage(meta.image)} />
		{#if canonical}<meta property="og:url" content={canonical} />{/if}
		{#if meta.type === 'article' && meta.publishedTime}
			<meta property="article:published_time" content={meta.publishedTime} />
		{/if}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={meta.title} />
		<meta name="twitter:description" content={meta.description} />
		<meta name="twitter:image" content={ogImage(meta.image)} />
	{/if}
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	{@html `<script type="application/ld+json">${hotelJsonLd}</script>`}
	{#if breadcrumbJsonLd}{@html `<script type="application/ld+json">${breadcrumbJsonLd}</script>`}{/if}
</svelte:head>

<Header />
<main class="min-h-[60vh]">{@render children()}</main>
<Footer />
<div class="h-16 lg:hidden" aria-hidden="true"></div>
<StickyBookBar />
<BackToTop />
<ChatWidget />
