import { DINING, IMAGES, POSTS, ROOMS } from './hotel';

export const SITE_URL = 'https://aureliapalace.pages.dev';

/**
 * Single source of truth for per-page SEO meta.
 * The layout renders exactly one <title>, one meta description, one canonical
 * and one set of OG/Twitter tags from here — pages must NOT emit their own
 * title/description (that used to duplicate the layout's generic ones, and
 * tools read the first description in the document, which was the generic one).
 * Pages that carry `noindex` (privacy, terms, checkout, confirmation,
 * manage-booking) keep ONLY their robots meta in their own <svelte:head>.
 */

export type PageMeta = {
	title: string;
	description: string;
	image: string;
	type: 'website' | 'article';
	publishedTime?: string;
};

/** OG/Twitter share image: 1200×630 crop, entropy crop keeps the subject in frame. */
export function ogImage(url: string): string {
	const base = url.split('?')[0];
	return `${base}?w=1200&h=630&fit=crop&crop=entropy&auto=format&q=80`;
}

const DEFAULT_IMAGE = IMAGES.hero;

const STATIC: Record<string, { title: string; description: string; image?: string }> = {
	'/': {
		title: 'The Aurelia Palace · Five Star Palace Hotel in Jaipur',
		description:
			'The Aurelia Palace, Jaipur — 118 rooms and suites, royal Indian dining at Saffron, Amara Spa, and a 25-minute airport transfer. Book direct for the best rate.',
		image: IMAGES.hero
	},
	'/about': {
		title: 'About — The Aurelia Palace, Jaipur | A Palace Since 1892',
		description:
			'The Aurelia Palace, Jaipur — built in 1892 as a royal residence, restored in 2024. 118 rooms and suites, royal Indian dining, Amara Spa and a team that treats guests like family.',
		image: IMAGES.palace
	},
	'/rooms': {
		title: 'Rooms & Suites · The Aurelia Palace, Jaipur',
		description:
			'Six rooms and suites at The Aurelia Palace, Jaipur — from the Deluxe Palace Room at ₹18,999 to the Aurelia Presidential Suite. Garden, courtyard, palace and Aravalli views.',
		image: IMAGES.resort
	},
	'/dining': {
		title: 'Dining in Jaipur — Saffron, Courtyard & Zoya | Aurelia Palace',
		description:
			'Three restaurants at The Aurelia Palace, Jaipur — Saffron royal Indian fine dining, The Courtyard all-day dining, and Zoya rooftop bar at sunset.',
		image: DINING[0].image
	},
	'/spa-wellness': {
		title: 'Amara Spa & Wellness — The Aurelia Palace, Jaipur',
		description:
			'Amara Spa at The Aurelia Palace, Jaipur — Ayurvedic rituals, marble hammam and candlelit treatment suites. Signature 60-minute ritual from ₹8,500.',
		image: IMAGES.spa
	},
	'/experiences': {
		title: 'Experiences — The Aurelia Palace, Jaipur | Spa & Walks',
		description:
			'Experiences at The Aurelia Palace, Jaipur — Amara Spa rituals, heritage walks of the old city, royal cooking classes and sunset high tea by the pool.',
		image: IMAGES.spa2
	},
	'/weddings-events': {
		title: 'Weddings & Events — The Aurelia Palace, Jaipur',
		description:
			'Weddings and events at The Aurelia Palace, Jaipur — palace weddings, receptions and celebrations for up to 300 guests, with royal dining and decor.',
		image: IMAGES.wedding
	},
	'/gallery': {
		title: 'Gallery — The Aurelia Palace, Jaipur | Palace Photos',
		description:
			'Photos of The Aurelia Palace, Jaipur — the pool at dusk, the Royal Heritage Suite, dinner at Saffron, Amara Spa and weddings at the palace.',
		image: IMAGES.pool
	},
	'/offers': {
		title: 'Offers — The Aurelia Palace, Jaipur | Stay 3, Pay 2',
		description:
			'Offers at The Aurelia Palace, Jaipur — Stay 3 Pay 2, Royal Honeymoon and 15% off direct bookings. Best rate when you book direct.',
		image: IMAGES.resort2
	},
	'/amenities': {
		title: 'Amenities — The Aurelia Palace, Jaipur | Pool, Spa & More',
		description:
			'Everything included at The Aurelia Palace, Jaipur — temperature-controlled pool, Amara Spa, fitness centre, concierge, butler service and EV charging.',
		image: IMAGES.pool
	},
	'/packages': {
		title: 'Packages — The Aurelia Palace, Jaipur | Honeymoon & Family',
		description:
			'Stay packages at The Aurelia Palace, Jaipur — honeymoon, family, wellness and heritage packages from ₹24,999, with dining, spa and experiences included.',
		image: IMAGES.resort3
	},
	'/reviews': {
		title: 'Guest Reviews — The Aurelia Palace, Jaipur | 4.9 out of 5',
		description:
			'2,841 verified guest reviews of The Aurelia Palace, Jaipur — rated 4.9 out of 5. Read what guests say about the rooms, dining, spa and service.',
		image: IMAGES.resort
	},
	'/loyalty': {
		title: 'Aurelia Circle Loyalty — The Aurelia Palace, Jaipur',
		description:
			'Join the Aurelia Circle at The Aurelia Palace, Jaipur — Ivory, Gold and Royal tiers with up to 15% off, late checkout and spa credits.',
		image: IMAGES.heritage
	},
	'/concierge': {
		title: 'Concierge — The Aurelia Palace, Jaipur | Guides & Drivers',
		description:
			'The concierge at The Aurelia Palace, Jaipur — restaurant tables, private drivers, heritage guides, tickets and day trips, arranged within the hour.',
		image: IMAGES.heritage
	},
	'/meetings': {
		title: 'Meetings & Events — The Aurelia Palace, Jaipur',
		description:
			'Meetings and events at The Aurelia Palace, Jaipur — four venues for 10 to 300 guests, day-delegate from ₹4,999, with royal dining and AV included.',
		image: IMAGES.events
	},
	'/occasions': {
		title: 'Occasions — The Aurelia Palace, Jaipur | Honeymoons & Family',
		description:
			'Honeymoons, family holidays and celebrations at The Aurelia Palace, Jaipur — private dinners, couples spa rituals, kids club, private venues and photographers.',
		image: IMAGES.wedding
	},
	'/explore-jaipur': {
		title: 'Explore Jaipur — The Aurelia Palace | Amber Fort & Hawa Mahal',
		description:
			'Explore Jaipur from The Aurelia Palace — Amber Fort 11 km, Hawa Mahal 2.5 km, City Palace 2 km. Entry fees, best times, and a curated one-day itinerary.',
		image: IMAGES.heritage
	},
	'/press-awards': {
		title: 'Press & Awards — The Aurelia Palace, Jaipur',
		description:
			'Press and awards for The Aurelia Palace, Jaipur — Best Heritage Hotel at the India Travel Awards 2025, Condé Nast Traveller Readers’ Choice, Best Luxury Spa 2026.',
		image: IMAGES.palace
	},
	'/gift-cards': {
		title: 'Gift Cards — The Aurelia Palace, Jaipur | Give a Palace Stay',
		description:
			'Gift cards for The Aurelia Palace, Jaipur — from ₹5,000, valid 12 months, redeemable on rooms, dining, spa and experiences.',
		image: IMAGES.resort2
	},
	'/location': {
		title: 'Location — The Aurelia Palace, Jaipur | C-Scheme',
		description:
			'The Aurelia Palace, Jaipur — 12 Rajmahal Road, C-Scheme. 25 minutes from Jaipur International Airport, 8 minutes from Hawa Mahal, 30 minutes from Amber Fort.',
		image: IMAGES.heritage
	},
	'/faq': {
		title: 'FAQ — The Aurelia Palace, Jaipur | Check-in & Cancellation',
		description:
			'Frequently asked questions about The Aurelia Palace, Jaipur — check-in 2 PM, check-out 12 PM, breakfast, airport transfers, cancellation and vegetarian food.',
		image: IMAGES.palace
	},
	'/blog': {
		title: 'Journal — The Aurelia Palace, Jaipur | Jaipur Guides',
		description:
			'The Aurelia Palace journal — Jaipur in 48 hours, inside the Saffron kitchen, and why December is the best month to visit Jaipur.',
		image: IMAGES.resort3
	},
	'/contact': {
		title: 'Contact — The Aurelia Palace, Jaipur | Reservations & Concierge',
		description:
			'Contact The Aurelia Palace, Jaipur — call +91 141 456 7890, email stay@aureliapalace.in, or send an enquiry. 12 Rajmahal Road, C-Scheme, Jaipur 302001.',
		image: IMAGES.palace
	},
	'/careers': {
		title: 'Careers — The Aurelia Palace, Jaipur | Join the Palace Team',
		description:
			'Careers at The Aurelia Palace, Jaipur — Front Office Manager, Executive Chef, Spa Therapist and Guest Relations roles. Apply online.',
		image: IMAGES.palace
	},
	'/privacy-policy': {
		title: 'Privacy Policy — The Aurelia Palace, Jaipur',
		description:
			'Privacy policy for The Aurelia Palace, Jaipur — what guest information we collect, how we use it, and your rights.',
		image: IMAGES.palace
	},
	'/terms': {
		title: 'Terms & Conditions — The Aurelia Palace, Jaipur',
		description: 'Terms and conditions for staying and booking at The Aurelia Palace, Jaipur.',
		image: IMAGES.palace
	},
	'/cancellation-policy': {
		title: 'Cancellation Policy — The Aurelia Palace, Jaipur',
		description:
			'Cancellation policy for The Aurelia Palace, Jaipur — free cancellation up to 72 hours before check-in, 50% charge 24–72 hours, no refund under 24 hours.',
		image: IMAGES.palace
	},
	'/sitemap': {
		title: 'Sitemap — The Aurelia Palace, Jaipur',
		description:
			'Every page on The Aurelia Palace, Jaipur website — rooms, dining, spa, weddings, booking, journal and policies.',
		image: IMAGES.palace
	},
	'/book': {
		title: 'Choose Your Room — The Aurelia Palace, Jaipur | Book Direct',
		description:
			'Choose your room at The Aurelia Palace, Jaipur. Prices shown with 18% GST included, free cancellation up to 72 hours before check-in, best rate guarantee.',
		image: IMAGES.resort
	},
	'/checkout': {
		title: 'Checkout — The Aurelia Palace, Jaipur',
		description:
			'Complete your demo booking at The Aurelia Palace, Jaipur. Guest details and mock payment — no real payment is taken.',
		image: IMAGES.resort
	},
	'/confirmation': {
		title: 'Booking Confirmed — The Aurelia Palace, Jaipur',
		description:
			'Your booking at The Aurelia Palace, Jaipur is confirmed (demo). Keep your booking reference safe.',
		image: IMAGES.resort
	},
	'/manage-booking': {
		title: 'Manage My Booking — The Aurelia Palace, Jaipur',
		description:
			'Look up, view or cancel your booking at The Aurelia Palace, Jaipur with your booking reference and email or phone.',
		image: IMAGES.resort
	},
	'/rooms/compare': {
		title: 'Compare Rooms | The Aurelia Palace, Jaipur',
		description:
			'Compare up to three rooms side by side — size, occupancy, bed, view, price and amenities — and pick the perfect palace room in Jaipur.'
	},
	'/dining/reserve': {
		title: 'Reserve a Table | The Aurelia Palace, Jaipur',
		description:
			'Book a table at Saffron, The Courtyard or Zoya rooftop bar at The Aurelia Palace, Jaipur. Choose your date, time and party size in under a minute.'
	},
	'/spa/book': {
		title: 'Book a Spa Treatment | The Aurelia Palace, Jaipur',
		description:
			'Book an Ayurvedic ritual, hammam, facial or couples treatment at Amara Spa, The Aurelia Palace Jaipur. Choose your treatment, date and time.'
	},
	'/family': {
		title: 'Family Stays at The Aurelia Palace, Jaipur',
		description:
			'Family stays at The Aurelia Palace, Jaipur — connecting rooms, a kids club for ages 4–12, kids menus, babysitting and family packages from ₹54,999.'
	},
	'/honeymoon': {
		title: 'Honeymoon in Jaipur | The Aurelia Palace',
		description:
			'Honeymoon packages at The Aurelia Palace, Jaipur — suites, private candle-lit dinners, couples spa rituals and flower baths, from ₹68,000 for two nights.'
	},
	'/pet-friendly': {
		title: 'Pet-Friendly Hotel in Jaipur | The Aurelia Palace',
		description:
			'Pet-friendly stays at The Aurelia Palace, Jaipur — dogs and cats welcome for ₹1,500 per stay, with pet beds, a welcome pack and garden walks nearby.'
	},
	'/long-stays': {
		title: 'Long Stays in Jaipur | The Aurelia Palace',
		description:
			'Long stays at The Aurelia Palace, Jaipur — save 10% on 7 nights, 15% on 14 nights and 25% on 30 nights, with kitchenette suites and weekly laundry.'
	},
	'/business': {
		title: 'Corporate Stays in Jaipur | The Aurelia Palace',
		description:
			'Corporate stays at The Aurelia Palace, Jaipur — 15% off with CORP15, early breakfast, 2 PM checkout, 1 Gbps Wi-Fi and meeting rooms on site.'
	},
	'/sustainability': {
		title: 'Sustainability at The Aurelia Palace, Jaipur',
		description:
			'Solar hot water, local sourcing, zero single-use plastic and 120 artisans supported — how The Aurelia Palace treads lightly on Jaipur.'
	},
	'/accessibility': {
		title: 'Accessibility at The Aurelia Palace, Jaipur',
		description:
			'Step-free routes, four accessible rooms, roll-in showers, hearing and visual assistance, and service animals welcome at The Aurelia Palace.'
	},
	'/wellness': {
		title: 'Wellness Retreats at The Aurelia Palace, Jaipur',
		description:
			'3, 5 and 7-day Ayurvedic wellness retreats in Jaipur — sunrise yoga, daily spa rituals, guided meditation and personalised meals.'
	},
	'/afternoon-tea': {
		title: 'Afternoon Tea at The Aurelia Palace, Jaipur',
		description:
			'Palace afternoon tea at The Courtyard, 3:30–5:30 PM daily — savouries, warm scones, desserts and eighteen teas, ₹2,200 per person.'
	},
	'/whats-on': {
		title: 'What’s On at The Aurelia Palace, Jaipur',
		description:
			'Folk music, heritage walks, wine dinners, workshops and the New Year gala — events at The Aurelia Palace, December 2026 to February 2027.'
	},
	'/transfers': {
		title: 'Airport Transfers | The Aurelia Palace, Jaipur',
		description:
			'Chauffeur airport and railway transfers in Jaipur — sedan ₹1,800, SUV ₹2,800 or a vintage car ₹6,500, one-way, with meet-and-greet.'
	},
	'/travel-agents': {
		title: 'Travel Trade | The Aurelia Palace, Jaipur',
		description:
			'Travel agents: 10% commission, net rates and dedicated support at The Aurelia Palace, Jaipur. Request trade access today.'
	}
};

const MONTHS: Record<string, string> = {
	Jan: '01',
	Feb: '02',
	Mar: '03',
	Apr: '04',
	May: '05',
	Jun: '06',
	Jul: '07',
	Aug: '08',
	Sep: '09',
	Oct: '10',
	Nov: '11',
	Dec: '12'
};

/** '10 Nov 2026' -> '2026-11-10' (no timezone shift). */
export function isoDate(d: string): string {
	const [day, mon, year] = d.split(' ');
	return `${year}-${MONTHS[mon] ?? '01'}-${day.padStart(2, '0')}`;
}

/**
 * Meta for a pathname, or null for unknown paths (error pages render
 * their own <title> and no canonical — a 404 must not claim a canonical).
 */
export function metaFor(pathname: string): PageMeta | null {
	const s = STATIC[pathname];
	if (s) {
		return { title: s.title, description: s.description, image: s.image ?? DEFAULT_IMAGE, type: 'website' };
	}
	const roomSlug = pathname.match(/^\/rooms\/([\w-]+)$/)?.[1];
	if (roomSlug) {
		const room = ROOMS.find((r) => r.slug === roomSlug);
		if (room) {
			return {
				title: `${room.name} · The Aurelia Palace, Jaipur`,
				description: room.description,
				image: room.image,
				type: 'website'
			};
		}
	}
	const diningSlug = pathname.match(/^\/dining\/([\w-]+)$/)?.[1];
	if (diningSlug) {
		const restaurant = DINING.find((r) => r.slug === diningSlug);
		if (restaurant) {
			return {
				title: `${restaurant.name} — ${restaurant.kind} | The Aurelia Palace, Jaipur`,
				description: restaurant.description,
				image: restaurant.image,
				type: 'website'
			};
		}
	}
	const postSlug = pathname.match(/^\/blog\/([\w-]+)$/)?.[1];
	if (postSlug) {
		const post = POSTS.find((p) => p.slug === postSlug);
		if (post) {
			return {
				title: `${post.title} — The Aurelia Palace, Jaipur`,
				description: post.excerpt,
				image: post.image,
				type: 'article',
				publishedTime: isoDate(post.date)
			};
		}
	}
	return null;
}

const CRUMB_LABELS: Record<string, string> = {
	rooms: 'Rooms & Suites',
	dining: 'Dining',
	blog: 'Journal',
	'spa-wellness': 'Spa & Wellness',
	experiences: 'Experiences',
	'weddings-events': 'Weddings & Events',
	gallery: 'Gallery',
	offers: 'Offers',
	amenities: 'Amenities',
	packages: 'Packages',
	reviews: 'Guest Reviews',
	loyalty: 'Aurelia Circle',
	concierge: 'Concierge',
	meetings: 'Meetings & Events',
	occasions: 'Occasions',
	'explore-jaipur': 'Explore Jaipur',
	'press-awards': 'Press & Awards',
	'gift-cards': 'Gift Cards',
	location: 'Location',
	about: 'About',
	contact: 'Contact',
	faq: 'FAQ',
	careers: 'Careers',
	'privacy-policy': 'Privacy Policy',
	terms: 'Terms & Conditions',
	'cancellation-policy': 'Cancellation Policy',
	sitemap: 'Sitemap',
	spa: 'Amara Spa',
	compare: 'Compare Rooms',
	reserve: 'Reserve a Table',
	book: 'Book a Spa Treatment',
	family: 'Family Stays',
	honeymoon: 'Honeymoon',
	'pet-friendly': 'Pet-Friendly Stays',
	'long-stays': 'Long Stays',
	business: 'Corporate Stays',
	sustainability: 'Sustainability',
	accessibility: 'Accessibility',
	wellness: 'Wellness Retreats',
	'afternoon-tea': 'Afternoon Tea',
	'whats-on': 'What’s On',
	transfers: 'Airport Transfers',
	'travel-agents': 'Travel Trade'
};

/**
 * Breadcrumb trail for a pathname, or null on home, on the client-only
 * booking pages (they are robots-disallowed and return 404 to crawlers),
 * and on unknown paths.
 */
export function breadcrumbsFor(pathname: string): { name: string; url: string }[] | null {
	if (pathname === '/') return null;
	const parts = pathname.split('/').filter(Boolean);
	if (['book', 'checkout', 'confirmation', 'manage-booking'].includes(parts[0])) return null;
	const crumbs = [{ name: 'Home', url: `${SITE_URL}/` }];
	let url = SITE_URL;
	for (const seg of parts) {
		url += `/${seg}`;
		let name = CRUMB_LABELS[seg];
		if (!name) {
			if (parts[0] === 'rooms') name = ROOMS.find((r) => r.slug === seg)?.name ?? seg;
			else if (parts[0] === 'dining') name = DINING.find((r) => r.slug === seg)?.name ?? seg;
			else if (parts[0] === 'blog') name = POSTS.find((p) => p.slug === seg)?.title ?? seg;
			else name = seg;
		}
		crumbs.push({ name, url });
	}
	return crumbs;
}
