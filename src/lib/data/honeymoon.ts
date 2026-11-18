export type HoneymoonPackage = {
	slug: string;
	title: string;
	nights: number;
	price: number;
	priceNote: string;
	suiteSlug: string;
	description: string;
	inclusions: string[];
};

export const HONEYMOON_PACKAGES: HoneymoonPackage[] = [
	{
		slug: 'two-night-escape',
		title: 'Two-Night Escape',
		nights: 2,
		price: 68000,
		priceNote: 'for two, Royal Heritage Suite',
		suiteSlug: 'royal-heritage-suite',
		description:
			'A short, slow start to married life — a suite, a spa ritual and one unforgettable dinner on the terrace.',
		inclusions: [
			'2 nights in the Royal Heritage Suite',
			'Private candle-lit dinner on the terrace',
			'60-minute couples ritual at Amara Spa',
			'Rose-petal turndown and sparkling wine on arrival',
			'Breakfast in bed on your first morning',
			'Late checkout at 2:00 PM'
		]
	},
	{
		slug: 'three-night-romance',
		title: 'Three-Night Romance',
		nights: 3,
		price: 98000,
		priceNote: 'for two, Royal Heritage Suite',
		suiteSlug: 'royal-heritage-suite',
		description:
			'Three unhurried nights with a flower bath, a heritage walk for two and dinner at Saffron.',
		inclusions: [
			'3 nights in the Royal Heritage Suite',
			'Private candle-lit dinner on the terrace',
			'90-minute couples ritual at Amara Spa',
			'Flower bath drawn in the suite',
			'Private heritage walk of the old city',
			'Dinner for two at Saffron',
			'Late checkout at 2:00 PM'
		]
	},
	{
		slug: 'five-night-palace-honeymoon',
		title: 'Five-Night Palace Honeymoon',
		nights: 5,
		price: 168000,
		priceNote: 'for two, Palace Garden Suite',
		suiteSlug: 'palace-garden-suite',
		description:
			'Five nights in the Palace Garden Suite — your own terrace, a plunge-pool view and the palace at your pace.',
		inclusions: [
			'5 nights in the Palace Garden Suite',
			'Two private candle-lit dinners',
			'90-minute couples ritual at Amara Spa',
			'Flower bath and rose-petal turndown nightly',
			'Private heritage walk and Amber Fort visit',
			'Dinner for two at Saffron and Zoya',
			'Complimentary airport transfers',
			'Late checkout at 2:00 PM'
		]
	}
];

export const HONEYMOON_INCLUDED = [
	'Suite upgrade when available',
	'Rose-petal turndown every evening',
	'Sparkling wine and cake on arrival',
	'Breakfast at The Courtyard or in bed',
	'Late checkout at 2:00 PM',
	'Complimentary Wi-Fi and airport transfer for suites'
];
