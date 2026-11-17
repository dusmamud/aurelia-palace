import { error } from '@sveltejs/kit';
import { ROOMS } from '#lib/data/hotel';
import type { PageLoad } from './$types';

export function entries() {
	return ROOMS.map((room) => ({ slug: room.slug }));
}

export const load: PageLoad = ({ params }) => {
	const room = ROOMS.find((r) => r.slug === params.slug);
	if (!room) error(404, 'Room not found');
	return { room };
};
