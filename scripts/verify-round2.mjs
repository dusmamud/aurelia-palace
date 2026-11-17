// Aurelia Palace round-2 verification: overflow + console errors + new-page interactions
import { chromium } from '/home/hatch/.npm-global/lib/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:4177';
const PAGES = [
	'/',
	'/rooms',
	'/amenities',
	'/reviews',
	'/loyalty',
	'/concierge',
	'/meetings',
	'/packages',
	'/occasions',
	'/explore-jaipur',
	'/press-awards',
	'/gift-cards',
	'/book',
	'/offers',
	'/location'
];
const WIDTHS = [360, 390, 768, 1024, 1440];

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];

page.on('pageerror', (e) => errors.push(`PAGEERROR ${page.url()}: ${e.message}`));
page.on('console', (m) => {
	if (m.type() === 'error') errors.push(`CONSOLE ${page.url()}: ${m.text()}`);
});

let fail = 0;
for (const p of PAGES) {
	for (const w of WIDTHS) {
		await page.setViewportSize({ width: w, height: 800 });
		await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => {
			errors.push(`NAV ${p} @${w}: ${e.message}`);
		});
		await page.waitForTimeout(600);
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
		if (overflow > 0) {
			console.log(`OVERFLOW ${p} @${w}px: +${overflow}px`);
			fail++;
		}
		// tap target spot check on smallest width
		if (w === 360) {
			const small = await page.evaluate(() => {
				const bad = [];
				for (const el of document.querySelectorAll('a, button')) {
					const r = el.getBoundingClientRect();
					if (r.width > 0 && r.height > 0 && r.height < 24 && r.width < 24) bad.push(el.tagName + '.' + (el.className?.toString().slice(0, 40) || ''));
				}
				return bad.slice(0, 5);
			});
			if (small.length) console.log(`SMALL-TAP ${p}: ${small.join(' | ')}`);
		}
	}
	console.log(`OK ${p}`);
}

// Interactions on new pages
async function interact() {
	// Reviews filter
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto(BASE + '/reviews', { waitUntil: 'networkidle' });
	await page.waitForTimeout(500);
	const chip = page.getByText('Spa', { exact: true }).first();
	if (await chip.count()) { await chip.click(); await page.waitForTimeout(400); console.log('reviews filter clicked'); }

	// Packages filter
	await page.goto(BASE + '/packages', { waitUntil: 'networkidle' });
	const f = page.getByText('Wellness', { exact: true }).first();
	if (await f.count()) { await f.click(); await page.waitForTimeout(400); console.log('packages filter clicked'); }

	// Loyalty join form
	await page.goto(BASE + '/loyalty', { waitUntil: 'networkidle' });
	await page.getByLabel(/name/i).first().fill('Test Guest');
	await page.getByLabel(/email/i).first().fill('test@example.com');
	await page.getByLabel(/phone/i).first().fill('9876543210');
	const join = page.getByRole('button', { name: /join/i }).first();
	if (await join.count()) { await join.click(); await page.waitForTimeout(500); console.log('loyalty join submitted, member card visible:', (await page.getByText(/AC-/).count()) > 0); }

	// Gift card picker
	await page.goto(BASE + '/gift-cards', { waitUntil: 'networkidle' });
	const amt = page.getByText('₹25,000', { exact: true }).first();
	if (await amt.count()) { await amt.click(); await page.waitForTimeout(300); console.log('gift amount picked'); }

	// Booking flow smoke: pick room on /book and continue
	await page.goto(BASE + '/book?checkIn=2026-12-10&checkOut=2026-12-12&guests=2&rooms=1', { waitUntil: 'networkidle' });
	await page.waitForTimeout(500);
	const cont = page.getByRole('button', { name: /continue to checkout/i }).first();
	if (await cont.count()) { await cont.click(); await page.waitForTimeout(800); console.log('book->checkout url:', page.url()); }
}
await interact();

console.log('\nERRORS:', errors.length ? errors.join('\n') : 'none');
console.log('OVERFLOW FAILURES:', fail);
await browser.close();
process.exit(errors.length || fail ? 1 : 0);
