import { DINING, POSTS, ROOMS } from '#lib/data/hotel';

export const prerender = true;

const BASE = 'https://aureliapalace.pages.dev';

// Only canonical, indexable URLs that return HTTP 200 belong in a sitemap.
// Deliberately EXCLUDED (all three signals must agree — sitemap, robots.txt,
// and the page's own status/meta):
// - /checkout, /confirmation, /manage-booking: transactional pages. They
//   are prerendered shells since 2026-11-18 (they return 200 now), but
//   without query params / a booking they show an empty state, so they stay
//   noindex + robots-disallowed and out of the sitemap.
// - /privacy-policy, /terms: carry meta noindex. A sitemap entry + noindex
//   is a contradiction; the noindex wins and the entry wastes crawl budget.
// - /sitemap: the human sitemap page itself is not a landing page.
// /book IS listed: it prerenders with all 6 rooms and prices (200, real
// content) since the 2026-11-18 shell round, so its robots disallow was
// removed too. lastmod is 2026-11-18 for every URL because this round
// changed the booking pages' status plus every page's head/meta/schema.
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
	'/cancellation-policy',
	'/book',
	'/rooms/compare',
	'/dining/reserve',
	'/spa/book',
	'/family',
	'/honeymoon',
	'/pet-friendly',
	'/long-stays',
	'/business',
	'/sustainability',
	'/accessibility',
	'/wellness',
	'/afternoon-tea',
	'/whats-on',
	'/transfers',
	'/travel-agents'
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
