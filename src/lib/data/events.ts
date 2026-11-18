export type EventMonth = 'December 2026' | 'January 2027' | 'February 2027';

export const MONTHS: Array<'All' | EventMonth> = ['All', 'December 2026', 'January 2027', 'February 2027'];

export type PalaceEvent = {
	slug: string;
	title: string;
	month: EventMonth;
	date: string;
	time: string;
	venue: string;
	price: number;
	text: string;
};

export const EVENTS: PalaceEvent[] = [
	{
		slug: 'folk-music-evening',
		title: 'Folk Music Evening',
		month: 'December 2026',
		date: 'Fri 5 Dec 2026',
		time: '7:00 PM – 9:00 PM',
		venue: 'The Courtyard',
		price: 0,
		text: 'Manganiyar musicians from the Thar desert play under the arches — an evening of desert ballads, free for resident guests.'
	},
	{
		slug: 'heritage-walk',
		title: 'Heritage Walk of the Old City',
		month: 'December 2026',
		date: 'Sun 14 Dec 2026',
		time: '7:30 AM – 10:30 AM',
		venue: 'Heritage trail',
		price: 1500,
		text: 'A historian-led morning through Johari Bazaar, Hawa Mahal and hidden havelis, ending with chai at a 200-year-old shop.'
	},
	{
		slug: 'wine-dinner',
		title: 'Winter Wine Dinner',
		month: 'December 2026',
		date: 'Sat 20 Dec 2026',
		time: '7:30 PM – 10:30 PM',
		venue: 'Saffron',
		price: 6500,
		text: 'Five courses from the Saffron kitchen paired with Indian wines, introduced by the sommelier between courses.'
	},
	{
		slug: 'new-year-gala',
		title: 'New Year Gala',
		month: 'December 2026',
		date: 'Wed 31 Dec 2026',
		time: '8:00 PM – 1:00 AM',
		venue: 'The Courtyard',
		price: 12000,
		text: 'A black-tie evening in the courtyard — dinner, live music, dancing and fireworks over the palace at midnight.'
	},
	{
		slug: 'block-printing-workshop',
		title: 'Block-Printing Workshop',
		month: 'January 2027',
		date: 'Sat 10 Jan 2027',
		time: '10:00 AM – 1:00 PM',
		venue: 'The Courtyard',
		price: 2500,
		text: 'Learn Jaipur block printing from a master artisan and take home the scarf you printed yourself. All materials included.'
	},
	{
		slug: 'classical-dance-recital',
		title: 'Classical Dance Recital',
		month: 'January 2027',
		date: 'Fri 23 Jan 2027',
		time: '7:00 PM – 8:30 PM',
		venue: 'The Courtyard',
		price: 0,
		text: 'An evening of Kathak by a Jaipur gharana dancer, with live tabla and harmonium. Free for resident guests.'
	},
	{
		slug: 'kite-festival-brunch',
		title: 'Kite Festival Brunch',
		month: 'January 2027',
		date: 'Sun 25 Jan 2027',
		time: '11:00 AM – 3:00 PM',
		venue: 'Pool lawn',
		price: 3200,
		text: 'Makar Sankranti on the pool lawn — kites, til laddoos, a long Rajasthani brunch and the best sky in Jaipur.'
	},
	{
		slug: 'astronomy-night',
		title: 'Astronomy Night',
		month: 'February 2027',
		date: 'Sat 7 Feb 2027',
		time: '8:00 PM – 10:00 PM',
		venue: 'Pool lawn',
		price: 1800,
		text: 'Telescopes on the pool lawn with an astronomer from the Jantar Mantar team — planets, constellations and winter skies.'
	},
	{
		slug: 'sufi-evening',
		title: 'Sufi Evening at Zoya',
		month: 'February 2027',
		date: 'Fri 20 Feb 2027',
		time: '7:30 PM – 10:00 PM',
		venue: 'Zoya',
		price: 3500,
		text: 'Qawwali at the rooftop bar as the sun sets over the old city. Dinner and drinks at Zoya, music on the house.'
	},
	{
		slug: 'spring-heritage-walk',
		title: 'Spring Heritage Walk',
		month: 'February 2027',
		date: 'Sun 22 Feb 2027',
		time: '7:30 AM – 10:30 AM',
		venue: 'Heritage trail',
		price: 1500,
		text: 'The old city in spring light — a historian-led walk through the bazaars, with breakfast at a heritage haveli to finish.'
	}
];
