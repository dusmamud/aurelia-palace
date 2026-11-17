export const prerender = true;

export function GET() {
	return new Response('User-agent: *\nAllow: /\nDisallow: /checkout\nDisallow: /confirmation\nDisallow: /manage-booking\nSitemap: https://aurelia-palace.pages.dev/sitemap.xml\n', {
		headers: { 'Content-Type': 'text/plain' }
	});
}
