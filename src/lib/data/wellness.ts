export type RetreatPackage = {
	slug: string;
	nights: number;
	days: number;
	priceFrom: number;
	name: string;
	short: string;
	inclusions: string[];
};

export const RETREATS: RetreatPackage[] = [
	{
		slug: 'three-day-reset',
		nights: 2,
		days: 3,
		priceFrom: 54000,
		name: 'Three-Day Reset',
		short: 'A long weekend to slow down — sunrise yoga, one spa ritual a day and evenings that end early.',
		inclusions: [
			'2 nights in a Deluxe Palace Room',
			'Daily sunrise yoga and pranayama',
			'One 60-minute spa treatment a day',
			'Ayurvedic breakfast, lunch and dinner',
			'Guided evening meditation',
			'Use of the hammam and pool'
		]
	},
	{
		slug: 'five-day-renewal',
		nights: 4,
		days: 5,
		priceFrom: 88000,
		name: 'Five-Day Renewal',
		short: 'Five days to properly unwind — a full Ayurvedic consultation, daily treatments and a heritage walk.',
		inclusions: [
			'4 nights in a Premium Courtyard Room',
			'Ayurvedic consultation and dosha assessment',
			'Daily 90-minute spa ritual',
			'Personalised Ayurvedic meals',
			'Morning yoga and evening meditation',
			'Heritage walk of the old city',
			'Use of the hammam and pool'
		]
	},
	{
		slug: 'seven-day-immersion',
		nights: 6,
		days: 7,
		priceFrom: 118000,
		name: 'Seven-Day Immersion',
		short: 'A full week of deep rest — a tailored Ayurvedic programme, daily rituals and complete digital quiet.',
		inclusions: [
			'6 nights in a Royal Heritage Suite',
			'Full Ayurvedic programme with daily consultations',
			'Two spa rituals a day',
			'Personalised meals and herbal teas',
			'Private yoga and meditation sessions',
			'Cooking class and heritage walk',
			'Airport transfers included'
		]
	}
];

export type ScheduleItem = {
	time: string;
	title: string;
	text: string;
};

export const SCHEDULE: ScheduleItem[] = [
	{ time: '06:00', title: 'Sunrise yoga', text: 'An hour of gentle asana on the palace terrace as Jaipur wakes up.' },
	{ time: '07:30', title: 'Pranayama', text: 'Guided breathing practice in the garden, before the heat of the day.' },
	{ time: '09:00', title: 'Breakfast', text: 'Ayurvedic breakfast at The Courtyard — warm, seasonal and unhurried.' },
	{ time: '11:00', title: 'Spa treatment', text: 'Your daily ritual at Amara Spa — abhyanga, shirodhara or a herbal wrap.' },
	{ time: '16:00', title: 'Meditation', text: 'A quiet hour in the meditation pavilion, guided or in silence.' },
	{ time: '19:00', title: 'Dinner', text: 'A light Ayurvedic dinner, eaten slowly, with the evening light on the courtyard.' }
];

export type Therapist = {
	name: string;
	role: string;
	text: string;
};

export const THERAPISTS: Therapist[] = [
	{
		name: 'Dr. Kavita Menon',
		role: 'Ayurvedic Physician',
		text: 'Fifteen years of clinical Ayurveda in Kerala and Jaipur. Dr. Menon designs every retreat programme, from the first consultation to the final meal.'
	},
	{
		name: 'Arjun Rathore',
		role: 'Yoga Acharya',
		text: 'Trained in Rishikesh, Arjun has taught yoga at the palace for eight years. His sunrise classes suit complete beginners as well as long-time practitioners.'
	},
	{
		name: 'Meera Joshi',
		role: 'Meditation Guide',
		text: 'Meera leads the evening meditation and the silent mornings. Guests say her sessions are the part of the retreat they carry home with them.'
	}
];
