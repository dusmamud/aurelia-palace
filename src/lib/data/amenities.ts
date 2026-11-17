import {
	Waves,
	Dumbbell,
	Briefcase,
	ConciergeBell,
	BellRing,
	Plane,
	PlugZap,
	CarFront,
	Wifi,
	MoonStar,
	UtensilsCrossed,
	Baby,
	BookOpen,
	Scissors
} from '@lucide/svelte';

const img = (id: string, w = 1600) =>
	`https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const AMENITIES = [
	{
		icon: Waves,
		name: 'Outdoor Temperature-Controlled Pool',
		text: 'A 25-metre pool under the palms, heated in winter and cooled in summer, with a shallow section for children and poolside service from 10 AM.',
		hours: '7:00 AM – 8:00 PM'
	},
	{
		icon: Dumbbell,
		name: 'Fitness Centre',
		text: 'Cardio machines, free weights and a stretching studio, with a trainer on request. Towels, water and fruit are always laid out.',
		hours: 'Open 24 hours'
	},
	{
		icon: Briefcase,
		name: 'Business Centre',
		text: 'Two private meeting rooms, high-speed printing, video-conferencing and a quiet desk when the palace is too beautiful to work in.',
		hours: '7:00 AM – 10:00 PM'
	},
	{
		icon: ConciergeBell,
		name: 'Concierge Desk',
		text: 'Restaurant tables, drivers, guides, last-minute tickets — if it exists in Jaipur, the concierge can arrange it, usually within the hour.',
		hours: '24 hours'
	},
	{
		icon: BellRing,
		name: '24-Hour Butler Service',
		text: 'Every suite comes with a dedicated butler — unpacking, pressing, reservations and anything else, day or night.',
		hours: '24 hours · Suites'
	},
	{
		icon: Plane,
		name: 'Airport Transfers',
		text: 'Chauffeur-driven transfers to Jaipur International Airport, 25 minutes away, in a clean sedan or an Innova for families.',
		hours: 'On request · ₹1,800 one way, complimentary for suites'
	},
	{
		icon: PlugZap,
		name: 'EV Charging',
		text: 'Two fast-charging bays in the palace car park, complimentary for resident guests. The valet will plug in and return the car charged.',
		hours: '24 hours · Complimentary'
	},
	{
		icon: CarFront,
		name: 'Valet Parking',
		text: 'Covered, attended parking at the palace gate. Hand the keys to the valet and forget about the car until you need it again.',
		hours: '24 hours · Complimentary'
	},
	{
		icon: Wifi,
		name: 'Complimentary Wi-Fi',
		text: 'Fast, unlimited Wi-Fi in every room, restaurant and garden — no codes, no sign-in pages, no per-device limits.',
		hours: 'Throughout the palace'
	},
	{
		icon: MoonStar,
		name: 'Evening Turndown',
		text: 'Beds turned down, curtains drawn, lights dimmed and a small sweet left by the bed. The palace settles before you do.',
		hours: 'Nightly, 7:00 – 9:00 PM'
	},
	{
		icon: UtensilsCrossed,
		name: 'In-Room Dining',
		text: 'The full Courtyard and Saffron menus, served in your room at any hour — breakfast in bed, or a late-night dal baati when the day runs long.',
		hours: '24 hours'
	},
	{
		icon: Baby,
		name: 'Kids Club',
		text: 'Supervised play, block-printing and storytelling sessions for ages 4–12, so parents get an hour at the spa and children get a better story.',
		hours: '9:00 AM – 7:00 PM'
	},
	{
		icon: BookOpen,
		name: 'Library & Lounge',
		text: 'A quiet, wood-panelled library with books on Rajasthan, newspapers, board games and a fireplace that is lit on winter evenings.',
		hours: '7:00 AM – 11:00 PM'
	},
	{
		icon: Scissors,
		name: 'Salon & Grooming',
		text: 'Hair, shave and bridal styling in a private salon off the spa floor, with stylists who know what a palace wedding photographs like.',
		hours: '10:00 AM – 8:00 PM · By appointment'
	}
];

export const SIGNATURE_AMENITIES = [
	{
		title: 'The pool, at any hour of light',
		text: 'Our 25-metre outdoor pool is the centre of the palace in the daytime and the quietest corner of it at dusk. Temperature-controlled all year, with loungers that are never fought over and a poolside menu that runs until the light goes.',
		image: img('1571896349842-33c89424de2d'),
		points: ['Heated in winter, cooled in summer', 'Shallow section for children', 'Poolside service, 10:00 AM – 7:00 PM', 'Cabanas on request for suite guests']
	},
	{
		title: 'A butler who knows before you ask',
		text: 'Suite guests get a dedicated butler, not a call centre. Yours learns how you take your chai on day one, presses your clothes before dinner, and has the car ready before you have finished breakfast.',
		image: img('1542314831-068cd1dbfeeb'),
		points: ['Unpacking and pressing on arrival', 'Restaurant and spa bookings handled for you', 'Available day and night, by phone or in person', 'Included with every suite, no extra charge']
	},
	{
		title: 'A concierge who actually knows Jaipur',
		text: 'The concierge desk is staffed by people who grew up in this city. They will get you the table that is booked out, the guide who wrote the book, and the sunrise slot at Amber Fort before the crowds arrive.',
		image: img('1551882547-ff40c63fe5fa'),
		points: ['Restaurant and event bookings', 'Private drivers and heritage guides', 'Tickets, workshops and day trips', 'Available 24 hours, in person or by phone']
	}
];
