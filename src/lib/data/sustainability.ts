export type Initiative = {
	slug: string;
	title: string;
	text: string;
};

export const INITIATIVES: Initiative[] = [
	{
		slug: 'no-single-use-plastic',
		title: 'No single-use plastic',
		text: 'Water arrives in glass bottles, toiletries in refillable ceramic, and laundry in cloth bags. Nothing disposable crosses the threshold of a guest room.'
	},
	{
		slug: 'solar-hot-water',
		title: 'Solar hot water',
		text: 'Rooftop solar thermal panels provide 40% of the palace hot water — every shower, every bath, every pot in the kitchen.'
	},
	{
		slug: 'rainwater-harvesting',
		title: 'Rainwater harvesting',
		text: 'Monsoon rain is collected from the palace roofs and stored in restored underground tanks, then used to water the gardens through the dry months.'
	},
	{
		slug: 'local-produce',
		title: '70% local sourcing',
		text: 'Seven in ten ingredients in our kitchens travel less than 100 km — from farms and markets around Jaipur, bought fresh each morning.'
	},
	{
		slug: 'kitchen-garden',
		title: 'Kitchen garden',
		text: 'Herbs, salad leaves and edible flowers grow in the palace kitchen garden, picked the same day they reach your plate at Saffron and The Courtyard.'
	},
	{
		slug: 'artisan-programme',
		title: 'Local artisan programme',
		text: 'Block printers, blue potters and miniature painters from Jaipur supply the palace shop and the rooms — 120 artisans supported so far, paid fairly and on time.'
	},
	{
		slug: 'school-support',
		title: 'School support',
		text: 'The palace funds uniforms, books and a midday meal programme at two government schools near the old city, and our staff volunteer there every month.'
	}
];

export type Stat = {
	value: number;
	suffix: string;
	label: string;
	text: string;
};

export const STATS: Stat[] = [
	{
		value: 40,
		suffix: '%',
		label: 'Solar hot water',
		text: 'of the palace hot water comes from rooftop solar panels'
	},
	{
		value: 70,
		suffix: '%',
		label: 'Local sourcing',
		text: 'of kitchen produce is sourced within 100 km of Jaipur'
	},
	{
		value: 0,
		suffix: '',
		label: 'Single-use plastic',
		text: 'in guest rooms — glass, ceramic and cloth instead'
	},
	{
		value: 120,
		suffix: '',
		label: 'Local artisans',
		text: 'supported through the palace artisan programme'
	}
];
