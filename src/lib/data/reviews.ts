export const RATING_SUMMARY = {
	overall: 4.9,
	total: 2841,
	bars: [
		{ stars: 5, percent: 89 },
		{ stars: 4, percent: 8 },
		{ stars: 3, percent: 2 },
		{ stars: 2, percent: 1 },
		{ stars: 1, percent: 0 }
	]
};

export const REVIEW_CATEGORIES = ['All', 'Rooms', 'Dining', 'Spa', 'Service', 'Weddings'] as const;

export type Review = {
	name: string;
	place: string;
	date: string;
	room: string;
	category: Exclude<(typeof REVIEW_CATEGORIES)[number], 'All'>;
	rating: number;
	title: string;
	text: string;
	source: 'Tripadvisor' | 'Google' | 'Booking.com';
};

export const REVIEWS: Review[] = [
	{
		name: 'Ananya Sharma',
		place: 'Mumbai, India',
		date: 'November 2026',
		room: 'Royal Heritage Suite',
		category: 'Rooms',
		rating: 5,
		title: 'Felt like a home, not a hotel',
		text: 'We have stayed at every big hotel in Jaipur, and this is the first one that felt like a home. The butler remembered how we take our chai on day two, the suite was spotless, and the garden view at sunrise is worth waking up for.',
		source: 'Tripadvisor'
	},
	{
		name: 'James Whitfield',
		place: 'London, United Kingdom',
		date: 'October 2026',
		room: 'Premium Courtyard Room',
		category: 'Service',
		rating: 5,
		title: 'Quiet, beautiful, and properly run',
		text: 'Three weeks in India and this was the calmest stay of the trip. Staff who actually listen, a concierge who got us a table at a fully booked restaurant, and not a single thing we had to ask twice for.',
		source: 'Google'
	},
	{
		name: 'Vikram Singh Rathore',
		place: 'Jaipur, India',
		date: 'August 2026',
		room: 'Aurelia Presidential Suite',
		category: 'Weddings',
		rating: 5,
		title: 'Our reception, flawlessly run',
		text: 'Four hundred guests, a pheras ceremony at dawn and a reception under the lights — the events team handled every detail without us chasing anyone. Our families are still talking about the food at Saffron.',
		source: 'Google'
	},
	{
		name: 'Priya Nair',
		place: 'Bengaluru, India',
		date: 'September 2026',
		room: 'Deluxe Palace Room',
		category: 'Dining',
		rating: 5,
		title: 'Dinner at Saffron alone is worth the trip',
		text: 'The laal maas and the dal baati churma are the real thing — slow-cooked, generous, and served by people who are proud of the kitchen. Breakfast at The Courtyard was just as good, every single morning.',
		source: 'Tripadvisor'
	},
	{
		name: 'Sarah Mitchell',
		place: 'Sydney, Australia',
		date: 'September 2026',
		room: 'Palace Garden Suite',
		category: 'Spa',
		rating: 5,
		title: 'The 90-minute ritual reset my whole trip',
		text: 'I arrived exhausted after two long flights and left the Amara Spa feeling like a different person. The hammam, the warm oils, the quiet — it is the best spa I have used in India, and I have used a few.',
		source: 'Google'
	},
	{
		name: 'Elena Rossi',
		place: 'Milan, Italy',
		date: 'October 2026',
		room: 'Aravalli Suite',
		category: 'Dining',
		rating: 5,
		title: 'Sunset at Zoya, dinner at Saffron',
		text: 'We watched the sun go down over the old city from the rooftop bar, then had the best meal of our honeymoon downstairs. The staff even remembered it was our anniversary without us saying a word.',
		source: 'Tripadvisor'
	},
	{
		name: 'Arjun Mehta',
		place: 'Ahmedabad, India',
		date: 'November 2026',
		room: 'Deluxe Palace Room',
		category: 'Rooms',
		rating: 4,
		title: 'Beautiful room, one small wait',
		text: 'The room itself is lovely — high ceilings, a deep tub, a proper garden view. Check-in took a little longer than expected on a busy Friday evening, but the welcome drink and the upgrade offer more than made up for it.',
		source: 'Booking.com'
	},
	{
		name: 'Daniel O’Connor',
		place: 'Dublin, Ireland',
		date: 'November 2026',
		room: 'Royal Heritage Suite',
		category: 'Rooms',
		rating: 5,
		title: 'The suite Jaipur regulars ask for by name',
		text: 'A separate living room, frescoed walls, and a butler who had the car ready before breakfast. It is expensive, and it is worth every rupee. We have already booked again for February.',
		source: 'Tripadvisor'
	},
	{
		name: 'Kavita Desai',
		place: 'Pune, India',
		date: 'October 2026',
		room: 'Deluxe Palace Room',
		category: 'Spa',
		rating: 5,
		title: 'Book the couples ritual. Trust me.',
		text: 'My husband and I did the 90-minute couples ritual on our second day and immediately booked it again for our last day. The therapists are superb, the suite is candlelit and calm, and the champagne tea afterwards is a lovely touch.',
		source: 'Google'
	},
	{
		name: 'Hannah Klein',
		place: 'Berlin, Germany',
		date: 'September 2026',
		room: 'Premium Courtyard Room',
		category: 'Service',
		rating: 4,
		title: 'Warm people, gorgeous palace',
		text: 'The courtyard room is peaceful and the staff are genuinely warm — not the rehearsed kind. The pool gets busy around 4 PM, so go early if you want a lounger. Otherwise, very little to fault.',
		source: 'Booking.com'
	},
	{
		name: 'Rohan & Meera Kapoor',
		place: 'New Delhi, India',
		date: 'October 2026',
		room: 'Royal Heritage Suite',
		category: 'Weddings',
		rating: 5,
		title: 'Our anniversary, done properly',
		text: 'A terrace dinner under the stars, a cake that appeared without us asking, and a spa morning the next day. The team made our tenth anniversary feel like a first. We cried a little. We will be back.',
		source: 'Tripadvisor'
	},
	{
		name: 'Neha Gupta',
		place: 'Gurugram, India',
		date: 'August 2026',
		room: 'Deluxe Palace Room',
		category: 'Dining',
		rating: 3,
		title: 'Lovely hotel, one slow breakfast',
		text: 'The palace, the pool and the rooms are all excellent. One morning the breakfast service was slow — twenty minutes for filter coffee on a full terrace. The manager apologised in person and the next morning was perfect, which is why this is three stars, not two.',
		source: 'Google'
	}
];
