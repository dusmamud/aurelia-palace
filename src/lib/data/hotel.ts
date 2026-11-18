export const HOTEL = {
	name: 'The Aurelia Palace',
	city: 'Jaipur',
	tagline: 'A palace stay, quietly perfected.',
	address: '12 Rajmahal Road, C-Scheme, Jaipur, Rajasthan 302001',
	phone: '+91 141 456 7890',
	phoneHref: '+911414567890',
	email: 'stay@aureliapalace.in',
	checkIn: '2:00 PM',
	checkOut: '12:00 PM',
	roomsCount: 118,
	rating: 4.9,
	reviewsCount: 2841,
	priceFrom: 18999
};

const img = (id: string, w = 1600) =>
	`https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/** Build a responsive srcset from a full Unsplash URL (strips its query, re-adds per-width params). */
export function usrcset(url: string, widths: number[] = [480, 800, 1200, 1600]): string {
	const base = url.split('?')[0];
	return widths.map((w) => `${base}?q=80&w=${w}&auto=format&fit=crop ${w}w`).join(', ');
}

export const IMAGES = {
	hero: img('1599661046289-e31897846e41', 2000),
	palace: img('1542314831-068cd1dbfeeb'),
	pool: img('1571896349842-33c89424de2d'),
	pool2: img('1540541338287-41700207dee6'),
	spa: img('1544161515-4ab6ce6db874'),
	spa2: img('1600334129128-685c5582fd35'),
	wedding: img('1519167758481-83f550bb49b3'),
	events: img('1511578314322-379afb476865'),
	heritage: img('1602643163983-ed0babc39797'),
	resort: img('1551882547-ff40c63fe5fa'),
	resort2: img('1445019980597-93fa8acb246c'),
	resort3: img('1520250497591-112f2f40a3f4')
};

export type Room = {
	slug: string;
	name: string;
	short: string;
	price: number;
	size: number;
	occupancy: number;
	view: string;
	bed: string;
	image: string;
	gallery: string[];
	amenities: string[];
	description: string;
};

export const ROOMS: Room[] = [
	{
		slug: 'deluxe-palace-room',
		name: 'Deluxe Palace Room',
		short: 'Garden-facing calm, hand-painted ceilings and a deep soaking tub.',
		price: 18999,
		size: 42,
		occupancy: 2,
		view: 'Garden view',
		bed: 'King bed',
		image: img('1611892440504-42a792e24d32'),
		gallery: [
			img('1611892440504-42a792e24d32'),
			img('1590490360182-c33d57733427'),
			img('1578683010236-d716f9a3f461'),
			img('1542314831-068cd1dbfeeb')
		],
		amenities: ['King bed', 'Rain shower', 'Soaking tub', 'High-speed Wi-Fi', 'Smart TV', 'Tea & coffee bar', 'In-room safe', 'Daily housekeeping'],
		description:
			'Our entry to palace living. A 42 sqm room with hand-painted ceilings, a marble bathroom and a quiet garden view — everything you need, nothing you do not.'
	},
	{
		slug: 'premium-courtyard-room',
		name: 'Premium Courtyard Room',
		short: 'A private sit-out over the courtyard, made for slow mornings.',
		price: 24999,
		size: 52,
		occupancy: 3,
		view: 'Courtyard view',
		bed: 'King bed + daybed',
		image: img('1590490360182-c33d57733427'),
		gallery: [
			img('1590490360182-c33d57733427'),
			img('1611892440504-42a792e24d32'),
			img('1571896349842-33c89424de2d'),
			img('1520250497591-112f2f40a3f4')
		],
		amenities: ['King bed + daybed', 'Private sit-out', 'Rain shower', 'Soaking tub', 'High-speed Wi-Fi', 'Smart TV', 'Mini bar', 'Evening turndown'],
		description:
			'A 52 sqm room opening onto the palace courtyard. Mornings arrive with birdsong and filter coffee on your sit-out; evenings end with turndown and warm light.'
	},
	{
		slug: 'royal-heritage-suite',
		name: 'Royal Heritage Suite',
		short: 'A separate living room, frescoed walls and butler service on call.',
		price: 39999,
		size: 78,
		occupancy: 3,
		view: 'Palace & garden view',
		bed: 'King bed',
		image: img('1582719508461-905c673771fd'),
		gallery: [
			img('1582719508461-905c673771fd'),
			img('1591088398332-8a7791972843'),
			img('1611892440504-42a792e24d32'),
			img('1544161515-4ab6ce6db874')
		],
		amenities: ['Separate living room', 'Butler service', 'King bed', 'Walk-in wardrobe', 'Rain shower + tub', 'Dining for two', 'High-speed Wi-Fi', 'Airport transfer'],
		description:
			'78 sqm of heritage: frescoed walls, a separate living room and a dedicated butler. The suite Jaipur regulars ask for by name.'
	},
	{
		slug: 'palace-garden-suite',
		name: 'Palace Garden Suite',
		short: 'A garden terrace, a plunge pool view and space to truly unwind.',
		price: 54999,
		size: 96,
		occupancy: 3,
		view: 'Garden & pool view',
		bed: 'King bed',
		image: img('1591088398332-8a7791972843'),
		gallery: [
			img('1591088398332-8a7791972843'),
			img('1582719508461-905c673771fd'),
			img('1571896349842-33c89424de2d'),
			img('1540541338287-41700207dee6')
		],
		amenities: ['Garden terrace', 'Separate living room', 'Butler service', 'King bed', 'Walk-in wardrobe', 'Rain shower + tub', 'Dining for four', 'Spa credit ₹5,000'],
		description:
			'96 sqm with a private garden terrace looking over the pool. Breakfast on the terrace, an afternoon at the spa, dinner at Saffron — the suite does the planning for you.'
	},
	{
		slug: 'aravalli-suite',
		name: 'Aravalli Suite',
		short: 'Corner suite with Aravalli views, a study and a dining room.',
		price: 68999,
		size: 112,
		occupancy: 4,
		view: 'Aravalli Hills view',
		bed: 'King bed',
		image: img('1578683010236-d716f9a3f461'),
		gallery: [
			img('1578683010236-d716f9a3f461'),
			img('1582719508461-905c673771fd'),
			img('1590490360182-c33d57733427'),
			img('1551882547-ff40c63fe5fa')
		],
		amenities: ['Corner Aravalli view', 'Private study', 'Dining room', 'Butler service', 'King bed', 'Walk-in wardrobe', 'Rain shower + tub', 'Chauffeur on request'],
		description:
			'A 112 sqm corner suite above the old city, with Aravalli Hills on the horizon. A study for slow work, a dining room for long dinners, and silence when you want it.'
	},
	{
		slug: 'aurelia-presidential-suite',
		name: 'Aurelia Presidential Suite',
		short: '180 sqm, a private plunge pool and the whole palace at your service.',
		price: 125000,
		size: 180,
		occupancy: 4,
		view: 'Panoramic city view',
		bed: 'King bed',
		image: img('1584132967334-10e028bd69f7'),
		gallery: [
			img('1584132967334-10e028bd69f7'),
			img('1578683010236-d716f9a3f461'),
			img('1582719508461-905c673771fd'),
			img('1540541338287-41700207dee6')
		],
		amenities: ['Private plunge pool', 'Panoramic terrace', 'Two bedrooms', 'Private dining room', 'Dedicated butler & chef', 'King bed', 'Spa suite access', 'Chauffeur included'],
		description:
			'The top of the palace. 180 sqm, two bedrooms, a private plunge pool and a terrace over Jaipur. A dedicated butler and chef, and nothing on your schedule unless you put it there.'
	}
];

export const DINING = [
	{
		slug: 'saffron',
		name: 'Saffron',
		kind: 'Royal Indian · Fine dining',
		hours: '7:00 PM – 11:00 PM',
		price: '₹4,500 for two',
		image: img('1414235077428-338989a2e8c0'),
		description:
			'Slow-cooked Rajasthani classics and royal thalis, served in a candlelit dining room. The laal maas and the dal baati churma are the dishes guests fly in for.'
	},
	{
		slug: 'the-courtyard',
		name: 'The Courtyard',
		kind: 'All-day dining · Indian & international',
		hours: '7:00 AM – 11:00 PM',
		price: '₹2,800 for two',
		image: img('1517248135467-4c7edcad34c4'),
		description:
			'Breakfast under the arches, long lunches by the fountain, and a live grill in the evening. Vegetarian, Jain and vegan menus on request, always.'
	},
	{
		slug: 'zoya',
		name: 'Zoya',
		kind: 'Rooftop bar & lounge',
		hours: '5:00 PM – 12:30 AM',
		price: '₹3,200 for two',
		image: img('1470337458703-46ad1756a187'),
		description:
			'Sunset over the old city, a short cocktail list done properly, and live acoustic sets on weekends. The best seat in Jaipur at golden hour.'
	}
];

export const EXPERIENCES = [
	{ title: 'Amara Spa & Hammam', text: 'Ayurvedic rituals, a marble hammam and candlelit treatment suites. 90-minute signature ritual from ₹8,500.', image: img('1544161515-4ab6ce6db874') },
	{ title: 'Heritage Walk of the Old City', text: 'A historian-led morning through Johari Bazaar, Hawa Mahal and hidden havelis, ending with chai at a 200-year-old shop.', image: img('1524492412937-b28074a5d7da') },
	{ title: 'Royal Cooking Class', text: 'Learn laal maas and ghevar with our chefs in the palace kitchen, then sit down to eat what you made.', image: img('1544025162-d76694265947') },
	{ title: 'Sunset Pool & High Tea', text: 'High tea by the pool at 4 PM — scones, saffron kulfi and first pick of the loungers as the light turns gold.', image: img('1571896349842-33c89424de2d') }
];

export const OFFERS = [
	{ title: 'Stay 3, Pay 2', text: 'Three nights for the price of two on Deluxe and Premium rooms, breakfast included.', code: 'PALACE3', valid: 'Valid till 31 Mar 2027' },
	{ title: 'Royal Honeymoon', text: 'Suite upgrade, couples spa ritual, private dinner on the terrace and late checkout.', code: 'HONEYMOON', valid: 'Valid till 31 Dec 2026' },
	{ title: 'Direct Booking — 15% Off', text: 'Book direct and save 15% on the best available rate, with flexible cancellation.', code: 'DIRECT15', valid: 'Members only' }
];

export const TESTIMONIALS = [
	{ name: 'Ananya Sharma', place: 'Mumbai', text: 'We have stayed at every big hotel in Jaipur. This is the first one that felt like a home, not a hotel. The butler remembered how we take our chai on day two.' },
	{ name: 'James Whitfield', place: 'London', text: 'Quiet, beautiful, and properly run. Dinner at Saffron was the best meal of our three weeks in India.' },
	{ name: 'Rohan & Meera Kapoor', place: 'New Delhi', text: 'Booked the Royal Heritage Suite for our anniversary. The terrace dinner, the spa, the staff — flawless from check-in to checkout.' }
];

export const FAQS = [
	{ q: 'What are the check-in and check-out times?', a: 'Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are complimentary when the room is available — just ask at booking.' },
	{ q: 'Is breakfast included in the room rate?', a: 'Yes, breakfast at The Courtyard is included for all room rates shown on this site. Suite rates also include high tea and airport transfers.' },
	{ q: 'Do you offer airport transfers?', a: 'Yes. Jaipur International Airport is 25 minutes away. Suite guests get a complimentary chauffeur transfer; other guests can add one for ₹1,800 one way.' },
	{ q: 'What is the cancellation policy?', a: 'Free cancellation up to 72 hours before check-in on flexible rates. Non-refundable advance-purchase rates are clearly marked before you pay.' },
	{ q: 'Are children welcome?', a: 'Very welcome. Children under 6 stay free, cots and high chairs are complimentary, and the pool has a dedicated shallow section.' },
	{ q: 'Do you have vegetarian and Jain food?', a: 'Yes — every restaurant has a full vegetarian menu, and Jain food is prepared on request with 24 hours notice.' }
];

export const POSTS = [
	{ slug: 'jaipur-in-48-hours', title: 'Jaipur in 48 Hours: The Slow Way', date: '10 Nov 2026', excerpt: 'Hawa Mahal at sunrise, a block-printing workshop, and dinner at Saffron — a two-day plan that leaves room to breathe.', image: img('1524492412937-b28074a5d7da') },
	{ slug: 'inside-saffron', title: 'Inside Saffron: The Kitchen That Never Rushes', date: '28 Oct 2026', excerpt: 'Laal maas takes six hours. Our chefs explain why some things in a palace kitchen cannot be hurried.', image: img('1544025162-d76694265947') },
	{ slug: 'winter-in-jaipur', title: 'Winter in Jaipur: Why December Is the Month', date: '15 Oct 2026', excerpt: 'Cool mornings, clear light, and the palace at its best. What to pack, what to book, and what to skip.', image: img('1542314831-068cd1dbfeeb') }
];

export const GALLERY = [
	{ src: img('1566073771259-6a8506099945'), label: 'The pool at dusk' },
	{ src: img('1542314831-068cd1dbfeeb'), label: 'The palace facade' },
	{ src: img('1582719508461-905c673771fd'), label: 'Royal Heritage Suite' },
	{ src: img('1414235077428-338989a2e8c0'), label: 'Dinner at Saffron' },
	{ src: img('1544161515-4ab6ce6db874'), label: 'Amara Spa' },
	{ src: img('1519167758481-83f550bb49b3'), label: 'Weddings at the palace' },
	{ src: img('1571896349842-33c89424de2d'), label: 'Poolside, golden hour' },
	{ src: img('1524492412937-b28074a5d7da'), label: 'The old city, nearby' },
	{ src: img('1470337458703-46ad1756a187'), label: 'Zoya at sunset' }
];

export function inr(n: number): string {
	return '₹' + n.toLocaleString('en-IN');
}

export function nightsBetween(a: string, b: string): number {
	const d1 = new Date(a + 'T00:00:00');
	const d2 = new Date(b + 'T00:00:00');
	return Math.max(1, Math.round((d2.getTime() - d1.getTime()) / 86400000));
}

export function totalFor(room: Room, nights: number): { base: number; taxes: number; total: number } {
	const base = room.price * nights;
	const taxes = Math.round(base * 0.18);
	return { base, taxes, total: base + taxes };
}
