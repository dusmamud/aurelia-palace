export const prerender = true;

export function GET() {
	return new Response(
		'User-agent: *\nAllow: /\nDisallow: /book\nDisallow: /checkout\nDisallow: /confirmation\nDisallow: /manage-booking\nSitemap: https://aureliapalace.pages.dev/sitemap.xml\n',
		{
			headers: { 'Content-Type': 'text/plain' }
		}
	);
}
