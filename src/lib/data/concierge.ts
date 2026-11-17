export type ConciergeService = {
	id: string;
	icon: 'car' | 'plane' | 'landmark' | 'utensils' | 'shopping' | 'ticket' | 'party' | 'bell';
	title: string;
	text: string;
	priceFrom: string;
	duration: string;
};

export const SERVICES: ConciergeService[] = [
	{
		id: 'airport-transfers',
		icon: 'car',
		title: 'Airport Transfers',
		text: 'A chauffeur-driven Jaguar or Mercedes waiting at Jaipur International Airport, 25 minutes away — with cold towels and a bottle of water, not a queue.',
		priceFrom: '₹2,500 one way',
		duration: '25 minutes'
	},
	{
		id: 'guided-tours',
		icon: 'landmark',
		title: 'Private Guided Tours',
		text: 'Amber Fort at sunrise, the City Palace, Hawa Mahal and Jantar Mantar with a historian who knows the stories the guidebooks skip — in your own car, at your own pace.',
		priceFrom: '₹4,500 per person',
		duration: 'Half day · 4–5 hours'
	},
	{
		id: 'private-dining',
		icon: 'utensils',
		title: 'Private Dining Experiences',
		text: 'A candlelit dinner on your terrace, a chef’s table in the palace kitchen, or a royal thali under the arches — menus built around you, including Jain and vegan.',
		priceFrom: '₹6,500 per person',
		duration: 'Evening · 2–3 hours'
	},
	{
		id: 'chauffeur',
		icon: 'plane',
		title: 'Chauffeur on Call',
		text: 'A car and driver for the day — old-city shopping, a drive to the Aravalli foothills, or dinner across town. Book by the hour or the day, with 30 minutes’ notice.',
		priceFrom: '₹1,200 per hour',
		duration: 'By the hour or day'
	},
	{
		id: 'shopping',
		icon: 'shopping',
		title: 'Shopping Assistance',
		text: 'A personal shopper for Johari Bazaar’s jewellery, Bapu Bazaar’s textiles and block-printing workshops — with trusted shops, fair prices and delivery to your room.',
		priceFrom: 'Complimentary for guests',
		duration: 'Half day · 3–4 hours'
	},
	{
		id: 'tickets',
		icon: 'ticket',
		title: 'Tickets & Reservations',
		text: 'The table that is hard to get, a block-printing workshop, a folk-music evening or a last-minute flight — if it exists in Jaipur, we will find a way in.',
		priceFrom: 'At cost, no fee',
		duration: 'Same-day, usually'
	},
	{
		id: 'celebrations',
		icon: 'party',
		title: 'In-Room Celebrations',
		text: 'Birthdays, anniversaries and proposals — flowers, a cake from our patisserie, a violinist at the door, or a private terrace set for two. Tell us the occasion; we handle the rest.',
		priceFrom: '₹3,500 onwards',
		duration: 'Set up in 2 hours'
	},
	{
		id: 'butler',
		icon: 'bell',
		title: 'Butler Requests',
		text: 'Unpacking and pressing, a bath drawn at 7 PM, breakfast served on the terrace, a suit collected and returned — a butler who learns how you like things by day two.',
		priceFrom: 'Included in suites',
		duration: 'On request, 24 hours'
	}
];

export const CONCIERGE_TEAM = [
	{
		initials: 'VR',
		name: 'Vikram Singh Rathore',
		role: 'Head Concierge',
		detail: '18 years at the palace. Knows every jeweller in Johari Bazaar by first name, and which table at Saffron catches the evening light.'
	},
	{
		initials: 'AK',
		name: 'Aisha Khan',
		role: 'Guest Experience Concierge',
		detail: 'Speaks five languages. Arranges the tours, the tickets and the surprises — and remembers how you take your chai.'
	}
];
