import { DINING, POSTS, ROOMS } from '#lib/data/hotel';

export const prerender = true;

const BASE = 'https://aurelia-palace.pages.dev';

const staticRoutes = [
	'/',
	'/rooms',
	'/dining',
	'/spa-wellness',
	'/experiences',
	'/weddings-events',
	'/gallery',
	'/offers',
	'/location',
	'/about',
	'/contact',
	'/book',
	'/checkout',
	'/confirmation',
	'/manage-booking',
	'/faq',
	'/blog',
	'/careers',
	'/privacy-policy',
	'/terms',
	'/cancellation-policy',
	'/sitemap'
];

const routes = [
	...staticRoutes,
	...ROOMS.map((r) => `/rooms/${r.slug}`),
	...DINING.map((d) => `/dining/${d.slug}`),
	...POSTS.map((p) => `/blog/${p.slug}`)
];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
		.map((r) => `  <url><loc>${BASE}${r === '/' ? '' : r}</loc></url>`)
		.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
