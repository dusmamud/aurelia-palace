# The Aurelia Palace, Jaipur

5-star palace hotel website — mock demo data for client preview. Real hotel name,
photos, prices and contact details to be replaced before a real launch.

## Stack (locked)

Svelte 5.57.3, SvelteKit 3.2.0, Vite 8.3.8, TypeScript 6, Tailwind CSS 4.3.5
(`@tailwindcss/vite`), `@sveltejs/adapter-static` 4.0.1 + prerender. No
`svelte.config.js` — adapter config lives in `vite.config.ts`. `#lib` imports,
runes, lucide-svelte icons only, no emojis.

## Develop

```sh
npm install
npm run dev
npm run check   # svelte-check, must be 0 errors
npm run build   # static output in build/
npm run preview # serves build/ on port 4176
```

## Pages (31 HTML + 4 client-only booking pages)

Home, Rooms hub + 6 room detail pages, Dining hub + 3 restaurant pages,
Spa & Wellness, Experiences, Weddings & Events, Gallery, Offers, Location,
About, Contact, Book / Checkout / Confirmation / Manage Booking (demo checkout,
no real payment — bookings in localStorage), FAQ, Journal + 3 posts, Careers,
Privacy / Terms / Cancellation, Sitemap. Hotel JSON-LD, sitemap.xml (34 URLs).

## Deploy

- GitHub repo: `dusmamud/aurelia-palace`
- Cloudflare Pages project: `aureliapalace` (create first — Dashboard >
  Workers & Pages > Create > Pages > Direct Upload), build `npm run build`,
  output `build/`. Repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
  required for the GitHub Actions deploy.
- Photos: Unsplash (see `src/lib/data/hotel.ts` — every ID verified HTTP 200
  via curl; VM Playwright cannot load them through the egress proxy, live
  they load normally).
