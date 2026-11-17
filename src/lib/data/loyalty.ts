export type Tier = {
	id: 'ivory' | 'gold' | 'royal';
	name: string;
	tagline: string;
	qualify: string;
	nights: string;
	rate: number;
	highlight: boolean;
	benefits: string[];
};

export const TIERS: Tier[] = [
	{
		id: 'ivory',
		name: 'Ivory',
		tagline: 'Your first stay, already rewarded.',
		qualify: 'Join free — no nights needed',
		nights: '0 nights',
		rate: 5,
		highlight: false,
		benefits: [
			'5% off the member rate on every stay',
			'Complimentary Wi-Fi and breakfast upgrade',
			'Welcome amenity on arrival',
			'Priority reservations at Saffron and Zoya',
			'Member-only offers, first',
			'Best-rate guarantee when you book direct'
		]
	},
	{
		id: 'gold',
		name: 'Gold',
		tagline: 'For guests who keep coming back.',
		qualify: '5 nights in a year',
		nights: '5 nights / year',
		rate: 10,
		highlight: true,
		benefits: [
			'10% off the member rate on every stay',
			'Room upgrade when available',
			'Late checkout until 4:00 PM',
			'₹2,500 spa credit every year',
			'Welcome amenity and a bottle of wine',
			'Priority reservations and early check-in',
			'Double points on dining and spa'
		]
	},
	{
		id: 'royal',
		name: 'Aurelia Royal',
		tagline: 'The palace, at your service.',
		qualify: '15 nights in a year',
		nights: '15 nights / year',
		rate: 15,
		highlight: false,
		benefits: [
			'15% off the member rate on every stay',
			'Guaranteed room upgrade, suites included',
			'Late checkout until 6:00 PM',
			'₹7,500 spa credit every year',
			'Dedicated butler and concierge line',
			'Complimentary airport transfer in a chauffeur car',
			'Private dining on the terrace, once a year',
			'Invitation to the annual Aurelia Royal evening'
		]
	}
];

export type CompareRow = { benefit: string; ivory: string; gold: string; royal: string };

export const COMPARE: CompareRow[] = [
	{ benefit: 'Member rate discount', ivory: '5% off', gold: '10% off', royal: '15% off' },
	{ benefit: 'Room upgrade', ivory: '—', gold: 'When available', royal: 'Guaranteed' },
	{ benefit: 'Late checkout', ivory: '12:00 PM', gold: 'Until 4:00 PM', royal: 'Until 6:00 PM' },
	{ benefit: 'Early check-in', ivory: '—', gold: 'Priority', royal: 'Guaranteed, from 10 AM' },
	{ benefit: 'Annual spa credit', ivory: '—', gold: '₹2,500', royal: '₹7,500' },
	{ benefit: 'Airport transfer', ivory: 'On request', gold: 'On request', royal: 'Complimentary' },
	{ benefit: 'Welcome amenity', ivory: 'Included', gold: 'Included + wine', royal: 'Included + champagne' },
	{ benefit: 'Dedicated concierge line', ivory: '—', gold: '—', royal: 'Included' },
	{ benefit: 'Dining & spa points', ivory: '1×', gold: '2×', royal: '3×' },
	{ benefit: 'Suite upgrade at check-in', ivory: '—', gold: '—', royal: 'When available' }
];

export const LOYALTY_FAQS = [
	{
		q: 'Is joining Aurelia Circle free?',
		a: 'Yes. Ivory membership is free and takes less than a minute to join. You start earning points and a 5% member rate from your very first stay — there is no joining fee and no card to carry.'
	},
	{
		q: 'How do I move up to Gold or Aurelia Royal?',
		a: 'Stay 5 nights in a calendar year to reach Gold, and 15 nights to reach Aurelia Royal. Nights at any room type count, and your tier is reviewed every January — once you earn a tier, you keep it for the rest of that year and the next.'
	},
	{
		q: 'Do my points expire?',
		a: 'Points earned on stays, dining and spa are valid for 24 months from the date you earn them. We remind you before anything is about to expire, and points can be used for room nights, spa rituals and dinners at Saffron.'
	},
	{
		q: 'Can I use the member rate and an offer together?',
		a: 'The member rate applies to the best available rate, and most offers — including Stay 3, Pay 2 — can be combined with it. If an offer cannot be combined, we always apply whichever saves you more, automatically.'
	}
];
