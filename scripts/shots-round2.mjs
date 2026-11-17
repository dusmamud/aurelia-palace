// Quick visual check: home + new pages, mobile + desktop
import { chromium } from '/home/hatch/.npm-global/lib/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:4177';
const shots = [
	['/', 390, 'home-390'],
	['/', 1440, 'home-1440'],
	['/amenities', 390, 'amenities-390'],
	['/packages', 1440, 'packages-1440'],
	['/loyalty', 390, 'loyalty-390'],
	['/explore-jaipur', 1440, 'jaipur-1440']
];
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [path, w, name] of shots) {
	await page.setViewportSize({ width: w, height: 844 });
	await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
	await page.waitForTimeout(1200);
	await page.screenshot({ path: `/tmp/aurelia-shots/${name}.png` });
	console.log('shot', name);
}
await browser.close();
