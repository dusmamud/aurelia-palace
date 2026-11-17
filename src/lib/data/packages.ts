import { IMAGES } from '#lib/data/hotel';

export type PackageCategory = 'Romance' | 'Family' | 'Wellness' | 'Business';

export type StayPackage = {
	slug: string;
	name: string;
	category: PackageCategory;
	nights: number;
	priceFrom: number;
	short: string;
	image: string;
	inclusions: string[];
	validity: string;
	terms: string;
};

export const CATEGORIES: Array<'All' | PackageCategory> = ['All', 'Romance', 'Family', 'Wellness', 'Business'];

export const PACKAGES: StayPackage[] = [
	{
		slug: 'royal-heritage-escape',
		name: 'Royal Heritage Escape',
		category: 'Romance',
		nights: 3,
		priceFrom: 74999,
		short: 'Three slow days of palace living — breakfast in the courtyard, an hour at the spa and a walk through the old city.',
		image: IMAGES.palace,
		inclusions: [
			'3 nights in a Premium Courtyard Room',
			'Daily breakfast at The Courtyard',
			'60-minute spa ritual for two at Amara Spa',
			'Guided heritage walk of the old city',
			'High tea by the pool, once during your stay'
		],
		validity: 'Valid till 31 Mar 2027',
		terms: 'For two guests. Blackout dates apply on festival weekends.'
	},
	{
		slug: 'honeymoon-in-the-palace',
		name: 'Honeymoon in the Palace',
		category: 'Romance',
		nights: 2,
		priceFrom: 89999,
		short: 'Two nights for two, with a candlelit dinner on the terrace and a spa ritual made for couples.',
		image: IMAGES.wedding,
		inclusions: [
			'2 nights in the Royal Heritage Suite',
			'Candlelit dinner for two on the terrace',
			'60-minute couple spa ritual at Amara Spa',
			'Breakfast in bed on one morning',
			'Late checkout till 4 PM, subject to availability'
		],
		validity: 'Valid till 31 Dec 2026',
		terms: 'For two guests. Suite upgrade on request, subject to availability.'
	},
	{
		slug: 'family-palace-holiday',
		name: 'Family Palace Holiday',
		category: 'Family',
		nights: 3,
		priceFrom: 119999,
		short: 'Two rooms, a kids club, and breakfast for everyone — the palace, sized for the whole family.',
		image: IMAGES.pool,
		inclusions: [
			'3 nights in two Deluxe Palace Rooms',
			'Daily breakfast for the whole family',
			'Kids club access and evening activities',
			'Family heritage walk with a storyteller',
			'One family dinner at The Courtyard'
		],
		validity: 'Valid till 31 Mar 2027',
		terms: 'For two adults and up to two children under 12. Extra child ₹2,500 per night.'
	},
	{
		slug: 'wellness-retreat',
		name: 'Wellness Retreat',
		category: 'Wellness',
		nights: 4,
		priceFrom: 149999,
		short: 'Four days to slow down — sunrise yoga, Ayurvedic treatments and meals that leave you lighter.',
		image: IMAGES.spa,
		inclusions: [
			'4 nights in a Premium Courtyard Room',
			'Daily sunrise yoga on the terrace lawn',
			'Two Ayurvedic treatments at Amara Spa',
			'Daily breakfast and one spa lunch',
			'Consultation with our Ayurvedic therapist'
		],
		validity: 'Valid till 30 Jun 2027',
		terms: 'For one guest; a second guest can be added for ₹35,000. Treatments by prior booking.'
	},
	{
		slug: 'jaipur-explorer',
		name: 'Jaipur Explorer',
		category: 'Family',
		nights: 3,
		priceFrom: 69999,
		short: 'Three days to see Jaipur properly — a guided city tour, airport transfers and the palace to come home to.',
		image: IMAGES.heritage,
		inclusions: [
			'3 nights in a Deluxe Palace Room',
			'Full-day guided city tour with a historian',
			'Airport transfers, both ways',
			'Daily breakfast at The Courtyard',
			'Entry tickets to Amber Fort and Hawa Mahal'
		],
		validity: 'Valid till 31 Mar 2027',
		terms: 'For two guests. Tour runs on fixed days; private guide on request.'
	},
	{
		slug: 'business-traveller',
		name: 'Business Traveller',
		category: 'Business',
		nights: 2,
		priceFrom: 54999,
		short: 'Two efficient nights — late checkout, laundry done overnight and a car waiting when you land.',
		image: IMAGES.resort,
		inclusions: [
			'2 nights in a Premium Courtyard Room',
			'Late checkout till 6 PM, guaranteed',
			'Laundry for two pieces, overnight',
			'Airport transfers, both ways',
			'Daily breakfast and all-day Wi-Fi'
		],
		validity: 'Valid till 31 Mar 2027',
		terms: 'For one guest. GST invoice provided for business expenses.'
	}
];
