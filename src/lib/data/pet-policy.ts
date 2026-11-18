export type PetRoom = { slug: string; name: string };

export const PET_POLICY = {
	feePerStay: 1500,
	maxPetsPerRoom: 2,
	weightLimitKg: 25,
	description:
		'Well-behaved dogs and cats are welcome at The Aurelia Palace. A pet stay fee of ₹1,500 covers the whole stay, and we keep a small welcome pack ready in the room before you arrive.'
};

export const ELIGIBLE_ROOMS: PetRoom[] = [
	{ slug: 'deluxe-palace-room', name: 'Deluxe Palace Room' },
	{ slug: 'premium-courtyard-room', name: 'Premium Courtyard Room' },
	{ slug: 'palace-garden-suite', name: 'Palace Garden Suite' }
];

export const PET_RULES = [
	'Pets must be on a leash in all public areas, including the lobby and gardens.',
	'Pets must never be left unattended in the room — use our pet-sitting service if you go out.',
	'Pets are not allowed in the spa, the pool area, or inside the dining rooms.',
	'Owners are responsible for cleaning up after their pet in the gardens and public areas.',
	'Please tell us about your pet when you book, so the room is prepared in advance.',
	'The palace may charge for any damage beyond normal wear, at cost.'
];

export const PET_AMENITIES = [
	{ title: 'Pet bed', text: 'A comfortable bed, sized to your pet, waiting in the room.' },
	{ title: 'Bowls & treats', text: 'Food and water bowls, plus a jar of treats from our kitchen.' },
	{ title: 'Welcome pack', text: 'A welcome pack with a toy, waste bags and a palace bandana.' },
	{ title: 'Pet menu', text: 'A simple pet menu from the kitchen — boiled chicken, rice and vegetables.' },
	{ title: 'Pet sitting', text: 'Trained pet sitters at ₹800 per hour, so you can dine or spa in peace.' },
	{ title: 'Grooming on request', text: 'A wash and brush-up can be arranged with 24 hours\u2019 notice.' }
];

export const WALK_ROUTES = [
	{
		title: 'Palace gardens',
		distance: 'On the grounds',
		text: 'A shaded morning loop around the palace gardens — lawns, fountains and plenty of room to sniff.'
	},
	{
		title: 'C-Scheme park',
		distance: '5 min walk',
		text: 'The neighbourhood park five minutes away, with a walking track and open lawns in the early morning.'
	},
	{
		title: 'Central Park, Jaipur',
		distance: '10 min by car',
		text: 'Jaipur\u2019s largest park, with a 4 km jogging track — best before 9 AM, when the light is kind.'
	}
];
