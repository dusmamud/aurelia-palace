import { IMAGES } from './hotel';

export type FamilyPackage = {
	slug: string;
	title: string;
	nights: number;
	price: number;
	priceNote: string;
	description: string;
	inclusions: string[];
};

export const KIDS_CLUB = {
	name: 'The Little Maharajas Club',
	ages: '4–12 years',
	timings: '9:00 AM – 6:00 PM',
	days: 'Daily',
	description:
		'Supervised play, palace treasure hunts, block-printing and pottery workshops, story time under the banyan tree, and a daily evening puppet show. Children are looked after by trained carers, so parents get a real hour to themselves.',
	activities: [
		'Palace treasure hunt every morning',
		'Block-printing and pottery workshops',
		'Story time and puppet shows',
		'Pool games in the shallow section',
		'Traditional games — gilli danda, carrom, kite making'
	],
	image: IMAGES.pool2
};

export const KIDS_MENUS = {
	title: 'Kids menus, everywhere',
	description:
		'Every restaurant has a children\u2019s menu, and the kitchen happily makes a plain version of anything on the main menu. Jain and allergy-aware cooking on request.',
	items: [
		{ name: 'The Courtyard', text: 'Breakfast pancakes, dosa and eggs any way, plus a pasta and dal-rice lunch menu.' },
		{ name: 'Saffron', text: 'A mild royal thali for young diners, with butter chicken, dal makhani and naan.' },
		{ name: 'Poolside', text: 'Sandwiches, fruit platters, kulfi and fresh juices, served all afternoon.' },
		{ name: 'In-room', text: 'Kids\u2019 room service until 10 PM — mac and cheese, khichdi and warm milk at bedtime.' }
	]
};

export const FAMILY_PACKAGES: FamilyPackage[] = [
	{
		slug: 'family-weekend',
		title: 'Family Weekend',
		nights: 2,
		price: 54999,
		priceNote: 'for 2 adults + 2 children, connecting rooms',
		description:
			'Two nights in connecting Deluxe and Premium rooms, with breakfast and the kids club included.',
		inclusions: [
			'Connecting Deluxe + Premium rooms',
			'Breakfast at The Courtyard for the family',
			'Kids club access, both days',
			'One family dinner at Saffron',
			'Pool floats and board games in the room'
		]
	},
	{
		slug: 'palace-family-week',
		title: 'Palace Family Week',
		nights: 5,
		price: 129999,
		priceNote: 'for 2 adults + 2 children, connecting rooms',
		description:
			'Five slow nights with the whole palace to explore — a heritage walk, a cooking class and a day trip to Amber Fort.',
		inclusions: [
			'Connecting Deluxe + Premium rooms',
			'Daily breakfast and one family dinner',
			'Kids club access every day',
			'Heritage walk of the old city',
			'Family cooking class in the palace kitchen',
			'Private car to Amber Fort for a half day'
		]
	},
	{
		slug: 'grandparents-gathering',
		title: 'Grandparents Gathering',
		nights: 3,
		price: 99999,
		priceNote: 'for up to 6 guests across 3 rooms',
		description:
			'Three generations under one roof — connecting rooms, a private terrace dinner and a family portrait in the courtyard.',
		inclusions: [
			'Three connecting rooms for up to 6 guests',
			'Daily breakfast for everyone',
			'Private terrace dinner one evening',
			'Family portrait session in the courtyard',
			'Kids club access for the grandchildren'
		]
	}
];

export const FAMILY_FAQS = [
	{
		q: 'Do children stay free?',
		a: 'Children under 6 stay free in their parents\u2019 room, and cots and high chairs are complimentary. Children aged 6–12 sharing a room are charged ₹2,500 per night, including breakfast.'
	},
	{
		q: 'Which rooms connect to each other?',
		a: 'Our Deluxe Palace Rooms and Premium Courtyard Rooms connect in pairs through an internal door, so parents and children each have their own room with a shared entrance. Ask for a connecting pair when you book.'
	},
	{
		q: 'Is there babysitting?',
		a: 'Yes — trained babysitters are available from 9 AM to 10 PM at ₹1,200 per hour, with 4 hours\u2019 notice. Evening babysitting lets parents enjoy dinner at Saffron in peace.'
	},
	{
		q: 'Is the pool safe for children?',
		a: 'The pool has a dedicated shallow section for children, and the kids club runs supervised pool games every afternoon. Children under 12 must be accompanied by an adult at the pool.'
	},
	{
		q: 'What is there for teenagers?',
		a: 'Teenagers get a different pace: the games room, cycling around C-Scheme, a block-printing workshop, and a guided old-city walk with a historian who actually makes it interesting.'
	}
];

export const BABYSITTING_RATE = 1200;
