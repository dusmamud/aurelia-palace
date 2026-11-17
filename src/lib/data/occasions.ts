const img = (id: string, w = 1600) =>
	`https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export type Occasion = {
	slug: string;
	title: string;
	eyebrow: string;
	image: string;
	description: string;
	inclusions: string[];
	priceFrom: number;
	priceNote: string;
};

export const OCCASIONS: Occasion[] = [
	{
		slug: 'honeymoon-romance',
		title: 'Honeymoon & Romance',
		eyebrow: 'For two',
		image: img('1584132967334-10e028bd69f7'),
		description:
			'A palace that slows down for two people. A suite with a terrace, a couples ritual at Amara Spa, and a private dinner under the stars — the honeymoon Jaipur regulars write home about.',
		inclusions: [
			'Private candlelit dinner on the palace terrace',
			'90-minute couples ritual at Amara Spa',
			'Rose-petal turndown and a bottle of sparkling wine on arrival',
			'Late checkout and a complimentary suite upgrade, when available'
		],
		priceFrom: 54999,
		priceNote: 'per night, Royal Heritage Suite and above'
	},
	{
		slug: 'family-holidays',
		title: 'Family Holidays',
		eyebrow: 'For the whole family',
		image: img('1571896349842-33c89424de2d'),
		description:
			'Children under six stay free, interconnecting rooms keep everyone close, and the kids club keeps the small ones busy while you have an hour at the spa. A family holiday that does not feel like a compromise.',
		inclusions: [
			'Interconnecting rooms and family suites for up to 4 guests',
			'Kids club, 10 AM – 6 PM, with craft and storytelling sessions',
			'Family dining at The Courtyard, with a dedicated kids menu',
			'Complimentary cots, high chairs and a shallow pool section'
		],
		priceFrom: 24999,
		priceNote: 'per night, Premium Courtyard Room and above'
	},
	{
		slug: 'celebrations-anniversaries',
		title: 'Celebrations & Anniversaries',
		eyebrow: 'For the big days',
		image: img('1511578314322-379afb476865'),
		description:
			'Fifty years together, a first birthday, a milestone that deserves more than a restaurant table. A private venue in the palace, a cake from our pastry kitchen, and a photographer who knows the light.',
		inclusions: [
			'Private venue for up to 40 guests, with a dedicated celebration host',
			'Celebration cake from the palace pastry kitchen',
			'Professional photographer for two hours',
			'Champagne toast and a personalised menu at Saffron or The Courtyard'
		],
		priceFrom: 45000,
		priceNote: 'celebration package, for up to 10 guests'
	}
];
