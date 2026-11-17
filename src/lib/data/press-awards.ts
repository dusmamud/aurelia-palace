export type Award = {
	year: string;
	title: string;
	organisation: string;
	detail: string;
};

export const AWARDS: Award[] = [
	{
		year: '2025',
		title: 'Best Heritage Hotel',
		organisation: 'India Travel Awards',
		detail: 'Recognised for the restoration of the 1892 palace and for heritage hospitality that keeps the building, not just the name.'
	},
	{
		year: '2025',
		title: 'Top 10 Palace Hotels — Readers’ Choice',
		organisation: 'Condé Nast Traveller',
		detail: 'Voted by readers in the annual Readers’ Choice Awards, placing the palace among the ten best in India.'
	},
	{
		year: '2026',
		title: 'Best Luxury Spa',
		organisation: 'Spa Asia Awards',
		detail: 'Amara Spa & Hammam, for its Ayurvedic rituals, the marble hammam and the couples suite.'
	},
	{
		year: '2026',
		title: 'Travellers’ Choice',
		organisation: 'Tripadvisor',
		detail: 'Awarded on the strength of guest reviews — a 4.9 rating across 2,841 verified stays.'
	}
];

export type PressQuote = {
	publication: string;
	quote: string;
	context: string;
};

export const PRESS_QUOTES: PressQuote[] = [
	{
		publication: 'Condé Nast Traveller',
		quote: 'The rare palace hotel that feels like a home, not a museum. Dinner at Saffron alone is worth the flight to Jaipur.',
		context: 'Readers’ Choice Awards, 2025'
	},
	{
		publication: 'The Times of India',
		quote: 'A quietly confident restoration — frescoes, courtyards and a spa that understands what slow actually means.',
		context: 'Travel feature, January 2026'
	},
	{
		publication: 'Travel + Leisure India',
		quote: 'Jaipur’s most considered stay. The butlers remember how you take your chai; the city is eight minutes away.',
		context: 'Best New Hotels, 2025'
	}
];

export const PRESS_CONTACT = {
	email: 'press@aureliapalace.in',
	phone: '+91 141 456 7890',
	note: 'For press visits, photography, interviews with the general manager, and high-resolution images of the palace, rooms and restaurants.'
};
