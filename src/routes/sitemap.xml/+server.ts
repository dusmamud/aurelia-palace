import { DINING, POSTS, ROOMS } from '#lib/data/hotel';

export const prerender = true;

const BASE = 'https://aureliapalace.pages.dev';

// Only canonical, indexable URLs that return HTTP 200 belong in a sitemap.
// Deliberately EXCLUDED (all three signals must agree — sitemap, robots.txt,
// and the page's own status/meta):
// - /book, /checkout, /confirmation, /manage-booking: client-only SPA pages
//   (prerender=false). They render in a browser but return HTTP 404 on a
//   direct fetch, so listing them tells crawlers to index a 404.
// - /privacy-policy, /terms: carry meta noindex. A sitemap entry + noindex
//   is a contradiction; the noindex wins and the entry wastes crawl budget.
// - /sitemap: the human sitemap page itself is not a landing page.
// The four booking pages are also Disallow in robots.txt, and the two
// policy pages keep their noindex meta. lastmod is 2026-11-18 for every URL
// because this fix round changed every page's head/meta/schema.
const LASTMOD = '2026-11-18';

const staticRoutes = [
	'/',
	'/rooms',
	'/dining',
	'/spa-wellness',
	'/experiences',
	'/weddings-events',
	'/gallery',
	'/offers',
	'/amenities',
	'/packages',
	'/reviews',
	'/loyalty',
	'/concierge',
	'/meetings',
	'/occasions',
	'/explore-jaipur',
	'/press-awards',
	'/gift-cards',
	'/location',
	'/about',
	'/contact',
	'/faq',
	'/blog',
	'/careers',
	'/cancellation-policy'
];

const routes = [
	...staticRoutes,
	...ROOMS.map((r) => `/rooms/${r.slug}`),
	...DINING.map((d) => `/dining/${d.slug}`),
	...POSTS.map((p) => `/blog/${p.slug}`)
];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
		.map((r) => `  <url><loc>${BASE}${r === '/' ? '' : r}</loc><lastmod>${LASTMOD}</lastmod></url>`)
		.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
