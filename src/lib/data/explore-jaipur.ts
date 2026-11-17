const img = (id: string, w = 1600) =>
	`https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export type Attraction = {
	name: string;
	distanceKm: number;
	distanceNote: string;
	timeNeeded: string;
	entryFee: number | null;
	bestTime: string;
	image: string;
	description: string;
};

export const ATTRACTIONS: Attraction[] = [
	{
		name: 'Amber Fort',
		distanceKm: 11,
		distanceNote: 'about 30 minutes by car',
		timeNeeded: 'Half day',
		entryFee: 100,
		bestTime: '7:30 – 10:00 AM',
		image: img('1599661046289-e31897846e41'),
		description:
			'The great hill fort of the Kachhwaha kings — mirrored halls, elephant ramparts and the Sheesh Mahal. Go early, before the crowds and the heat.'
	},
	{
		name: 'City Palace',
		distanceKm: 2,
		distanceNote: 'about 8 minutes by car',
		timeNeeded: '2 – 3 hours',
		entryFee: 1000,
		bestTime: '9:00 AM – 12:00 PM',
		image: img('1603262110263-fb0112e7cc33'),
		description:
			'A living palace — the royal family still resides here. Courtyards, museums and the famous peacock gate, a short walk from our doors.'
	},
	{
		name: 'Hawa Mahal',
		distanceKm: 2.5,
		distanceNote: 'about 10 minutes by car',
		timeNeeded: '1 hour',
		entryFee: 50,
		bestTime: 'Sunrise, 6:30 – 8:00 AM',
		image: img('1568495248636-6432b97bd949'),
		description:
			'The pink facade with 953 windows, built so the royal women could watch the city unseen. At sunrise the whole front glows.'
	},
	{
		name: 'Jantar Mantar',
		distanceKm: 2,
		distanceNote: 'about 8 minutes by car',
		timeNeeded: '1 hour',
		entryFee: 50,
		bestTime: '10:00 AM – 12:00 PM',
		image: img('1587474260584-136574528ed5'),
		description:
			'A UNESCO-listed observatory of giant stone instruments, built in 1734. The sundial still tells the time to within two seconds.'
	},
	{
		name: 'Jal Mahal',
		distanceKm: 6,
		distanceNote: 'about 15 minutes by car',
		timeNeeded: '45 minutes',
		entryFee: null,
		bestTime: 'First light, 6:30 – 7:30 AM',
		image: img('1598091383021-15ddea10925d'),
		description:
			'The water palace, rising from Man Sagar Lake. You cannot go inside — the view from the lakeside promenade at first light is the point.'
	},
	{
		name: 'Nahargarh Fort',
		distanceKm: 12,
		distanceNote: 'about 25 minutes by car',
		timeNeeded: '2 – 3 hours',
		entryFee: 50,
		bestTime: 'Sunset, 5:00 – 6:30 PM',
		image: img('1512343879784-a960bf40e7f2'),
		description:
			'The fort above the city, with a cafe on the ramparts and the best sunset view in Jaipur. Stay for the lights coming on below.'
	},
	{
		name: 'Albert Hall Museum',
		distanceKm: 3,
		distanceNote: 'about 10 minutes by car',
		timeNeeded: '1 – 2 hours',
		entryFee: 40,
		bestTime: '10:00 AM – 1:00 PM',
		image: img('1589308078059-be1415eab4c3'),
		description:
			'Rajasthan’s oldest museum, in a grand Indo-Saracenic hall — miniature paintings, textiles, arms and the famous Egyptian mummy.'
	},
	{
		name: 'Johari Bazaar',
		distanceKm: 2,
		distanceNote: 'about 8 minutes by car',
		timeNeeded: '2 hours',
		entryFee: null,
		bestTime: 'Late afternoon, 4:00 – 7:00 PM',
		image: img('1524492412937-b28074a5d7da'),
		description:
			'Jaipur’s jewellery quarter — gemstones, kundan, block prints and silver. Bargain politely, and stop for lassi at the old shops.'
	}
];

export const ITINERARY = [
	{ time: '6:30 AM', title: 'Sunrise at Hawa Mahal', text: 'A short drive to the pink facade while the city is still quiet, then chai at a 200-year-old shop.' },
	{ time: '7:30 AM', title: 'Amber Fort, before the crowds', text: 'Up the hill for the Sheesh Mahal and the ramparts, back in the palace for breakfast by 10:30.' },
	{ time: '11:00 AM', title: 'City Palace & Jantar Mantar', text: 'The peacock gate, the museums, and the giant sundial — the old city at walking pace.' },
	{ time: '1:00 PM', title: 'Lunch at The Courtyard', text: 'Back at the palace for a long lunch by the fountain, and an hour by the pool.' },
	{ time: '4:00 PM', title: 'Johari Bazaar & Albert Hall', text: 'Gemstones and block prints in the bazaar, then the museum as the light turns gold.' },
	{ time: '5:30 PM', title: 'Sunset at Nahargarh Fort', text: 'Up to the ramparts for the whole city at dusk, then dinner at Saffron on your return.' }
];

export const SEASONS = [
	{ months: 'Oct – Mar', label: 'Best time to visit', text: 'Cool mornings, clear light, 10 – 28°C. The palace gardens are at their best, and every fort is a pleasure.' },
	{ months: 'Apr – Jun', label: 'Summer', text: 'Hot days, 32 – 45°C. Sightsee at sunrise, spend afternoons at the pool and spa — rates are at their lowest.' },
	{ months: 'Jul – Sep', label: 'Monsoon', text: 'Short evening showers wash the city clean. Fewer visitors, green Aravalli hills, and the best light for photographs.' }
];
