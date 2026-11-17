import { error } from '@sveltejs/kit';
import { POSTS } from '#lib/data/hotel';
import type { PageLoad } from './$types';

export const entries = () => POSTS.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const post = POSTS.find((p) => p.slug === params.slug);
	if (!post) error(404, 'That story could not be found.');
	return { post };
};
