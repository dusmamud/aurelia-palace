export type SpaTreatment = {
	slug: string;
	name: string;
	duration: number;
	price: number;
	description: string;
};

export const SPA_TREATMENTS: SpaTreatment[] = [
	{
		slug: 'signature-abhyanga',
		name: 'Signature Abhyanga',
		duration: 60,
		price: 8500,
		description:
			'Our signature full-body Ayurvedic ritual with warm herbal oils, slow rhythmic strokes and a warm herbal compress to finish.'
	},
	{
		slug: 'couples-ritual',
		name: 'Couples Ritual for Two',
		duration: 90,
		price: 14000,
		description:
			'A side-by-side ritual for two in the candlelit couples suite — Abhyanga, a rose foot soak and time to linger over saffron tea.'
	},
	{
		slug: 'royal-hammam-ritual',
		name: 'Royal Hammam Ritual',
		duration: 75,
		price: 9500,
		description:
			'Marble hammam steam, a traditional kese exfoliation and a cloud of soap foam, followed by argan oil and a cool rose mist.'
	},
	{
		slug: 'deep-tissue-massage',
		name: 'Deep-Tissue Massage',
		duration: 60,
		price: 7500,
		description:
			'Slow, firm pressure for tired muscles and stiff shoulders — the treatment our therapists recommend after a long journey.'
	},
	{
		slug: 'radiance-facial',
		name: 'Radiance Facial',
		duration: 60,
		price: 6500,
		description:
			'A brightening facial with sandalwood, saffron and a cool jade stone massage. Skin leaves the room looking rested, not rushed.'
	},
	{
		slug: 'herbal-body-scrub',
		name: 'Herbal Body Scrub',
		duration: 45,
		price: 5500,
		description:
			'A gentle exfoliation with ground almonds, orange peel and honey, finished with a light warm-oil polish. Best before the hammam.'
	},
	{
		slug: 'foot-ritual',
		name: 'Foot Ritual',
		duration: 30,
		price: 3500,
		description:
			'A warm herbal soak, a salt scrub and a slow reflexology massage — thirty quiet minutes that undo a whole day of walking the old city.'
	},
	{
		slug: 'head-massage',
		name: 'Shirodhara Head Massage',
		duration: 45,
		price: 4500,
		description:
			'A calming head, neck and shoulder massage with warm brahmi oil, ending with a slow pour of oil across the forehead. Deeply restful.'
	}
];

export const SPA_HOURS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
