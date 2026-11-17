import { DINING } from '#lib/data/hotel';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => DINING.map((r) => ({ slug: r.slug }));

export const load: PageLoad = ({ params }) => {
	const restaurant = DINING.find((r) => r.slug === params.slug);
	if (!restaurant) error(404, 'Restaurant not found');
	return { restaurant };
};
