import { IMAGES } from '#lib/data/hotel';

export type VenueLayout = {
	theatre: number;
	classroom: number;
	boardroom: number;
	ushape: number;
};

export type MeetingVenue = {
	name: string;
	short: string;
	size: string;
	image: string;
	layouts: VenueLayout;
};

export const VENUES: MeetingVenue[] = [
	{
		name: 'The Durbar Hall',
		short: 'Our grandest meeting room — frescoed walls, natural light and a private entrance for delegates.',
		size: '220 sqm',
		image: IMAGES.events,
		layouts: { theatre: 120, classroom: 90, boardroom: 40, ushape: 50 }
	},
	{
		name: 'Boardroom',
		short: 'A quiet, wood-panelled room for boards and leadership meets, with courtyard views and complete privacy.',
		size: '48 sqm',
		image: IMAGES.palace,
		layouts: { theatre: 14, classroom: 12, boardroom: 14, ushape: 12 }
	},
	{
		name: 'The Courtyard Pavilion',
		short: 'Our largest space — a covered pavilion off the courtyard for summits, launches and all-hands.',
		size: '380 sqm',
		image: IMAGES.resort2,
		layouts: { theatre: 200, classroom: 140, boardroom: 60, ushape: 80 }
	},
	{
		name: 'Business Lounge',
		short: 'A relaxed lounge for workshops and breakouts, with sofas, a coffee station and garden access.',
		size: '72 sqm',
		image: IMAGES.resort3,
		layouts: { theatre: 30, classroom: 24, boardroom: 20, ushape: 18 }
	}
];

export const DAY_DELEGATE = {
	price: 4999,
	title: 'Day Delegate Package',
	note: 'Per person, per day. Prices include 18% GST.',
	inclusions: [
		'Venue hire with your chosen layout',
		'Two coffee breaks with tea, coffee and cookies',
		'Lunch at The Courtyard',
		'Projector, screen and PA system',
		'High-speed Wi-Fi for all delegates',
		'Stationery, mineral water and mints',
		'Dedicated meeting coordinator'
	]
};

export const TEAM_BUILDING = [
	{
		title: 'Heritage Walk of the Old City',
		price: 1800,
		note: 'A historian-led morning through Johari Bazaar and hidden havelis, ending with chai.'
	},
	{
		title: 'Royal Cooking Challenge',
		price: 2500,
		note: 'Teams cook laal maas and ghevar with our chefs, then sit down to eat what they made.'
	},
	{
		title: 'Sunrise Yoga & Breakfast',
		price: 1200,
		note: 'A gentle start on the terrace lawn, followed by breakfast in the courtyard.'
	},
	{
		title: 'Pool Games & High Tea',
		price: 1500,
		note: 'Light-hearted poolside games in the afternoon, then high tea at 4 PM.'
	}
];

export const CLIENTS = [
	'Meridian Capital',
	'Northwind Consulting',
	'Apex Technologies',
	'Solace Airlines',
	'Vantage Group',
	'BluePeak Retail'
];

export const LAYOUTS = ['Theatre', 'Classroom', 'Boardroom', 'U-shape', 'Cabaret', 'Not sure yet'];
