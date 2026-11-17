<script lang="ts">
	import { Award, Crown, HeartHandshake, Leaf, ShieldCheck } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	const values = [
		{ icon: Crown, title: 'Palace, not hotel', text: 'High ceilings, hand-painted frescoes and staff who remember how you take your chai. The building sets the standard; the service keeps it.' },
		{ icon: HeartHandshake, title: 'Service before systems', text: 'A butler for every suite, a concierge who answers the phone, and no request that needs a form before a conversation.' },
		{ icon: Leaf, title: 'Rooted in Jaipur', text: 'Local artisans restored the frescoes, local farms supply the kitchens, and the heritage walk is led by a Jaipur historian — not a script.' },
		{ icon: ShieldCheck, title: 'Honest rates', text: 'The price you see is the price you pay, taxes shown upfront. Best rate when you book direct, and we will match a lower rate you find elsewhere.' }
	];

	const leaders = [
		{ initials: 'AR', name: 'Aarav Rathore', role: 'General Manager', text: 'Twenty years in palace hotels across Rajasthan. Believes a hotel is judged by its quietest hour, not its busiest.' },
		{ initials: 'PS', name: 'Priya Sharma', role: 'Director of Guest Experience', text: 'Runs the concierge, the butlers and the heritage walks. If a guest remembers one person from their stay, it is usually Priya.' },
		{ initials: 'VK', name: 'Vikram Kapoor', role: 'Executive Chef', text: 'Leads Saffron and The Courtyard. His laal maas takes six hours, and he will tell you why that matters.' }
	];

	const awards = [
		'Condé Nast Traveller — Readers’ Choice 2026 (illustrative)',
		'Travel + Leisure — Best Palace Hotels, India (illustrative)',
		'World Travel Awards — India’s Leading Boutique Hotel (illustrative)'
	];
</script>

<svelte:head>
	<title>About — The Aurelia Palace, Jaipur | A Palace Since 1892</title>
	<meta name="description" content="The Aurelia Palace, Jaipur — built in 1892 as a royal residence, restored in 2024. 118 rooms and suites, royal Indian dining, Amara Spa and a team that treats guests like family." />
</svelte:head>

<PageHero
	eyebrow="Our story"
	title="A palace since 1892"
	subtitle="Built as a royal residence, restored in 2024 — and run today as a small, quiet, properly looked-after palace hotel."
	image={IMAGES.palace}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid items-center gap-10 lg:grid-cols-2" use:reveal>
		<div class="min-w-0">
			<p class="eyebrow">1892 — 2024</p>
			<h2 class="section-title mt-2">From royal residence to your stay</h2>
			<p class="mt-4 leading-relaxed text-muted">
				The Aurelia Palace was built in 1892 as a royal residence on Rajmahal Road — a courtyard
				house with frescoed ceilings, arched verandas and a garden meant for slow evenings. For
				over a century it was a private home, then a family guesthouse, and finally, after a
				two-year restoration that finished in 2024, the palace hotel it is today.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				The restoration kept what mattered: the frescoes, the marble, the courtyard fountain and
				the high ceilings. What changed is what guests feel rather than see — new plumbing,
				silent air conditioning, fast Wi-Fi, and a kitchen that can serve a royal thali and a
				Jain breakfast with equal care.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Today there are {HOTEL.roomsCount} rooms and suites, three restaurants, the Amara Spa, and a
				team of just over two hundred people — small enough that the front desk knows your name by
				day two.
			</p>
			<div class="mt-8 grid grid-cols-3 gap-4 text-center">
				<div><p class="font-display text-4xl font-semibold text-pine">1892</p><p class="mt-1 text-xs tracking-[0.18em] text-muted uppercase">Built</p></div>
				<div><p class="font-display text-4xl font-semibold text-pine">{HOTEL.roomsCount}</p><p class="mt-1 text-xs tracking-[0.18em] text-muted uppercase">Rooms & suites</p></div>
				<div><p class="font-display text-4xl font-semibold text-pine">{HOTEL.rating} / 5</p><p class="mt-1 text-xs tracking-[0.18em] text-muted uppercase">Guest rating</p></div>
			</div>
		</div>
		<div class="min-w-0">
			<img src={IMAGES.resort} alt="The palace courtyard" loading="lazy" class="aspect-[4/3] w-full rounded-md object-cover" />
			<p class="mt-3 text-sm text-muted">The courtyard at first light — the quietest hour of the palace day.</p>
		</div>
	</div>

	<div class="mt-16" use:reveal>
		<p class="eyebrow">What we stand for</p>
		<h2 class="section-title mt-2">Four things we will not compromise on</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as v (v.title)}
				<div class="card min-w-0 p-6">
					<v.icon class="h-6 w-6 text-gold-dark" />
					<h3 class="font-display mt-4 text-2xl font-semibold">{v.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-16" use:reveal>
		<p class="eyebrow">Leadership</p>
		<h2 class="section-title mt-2">The people behind the palace</h2>
		<p class="mt-3 max-w-2xl text-muted">A small leadership team — no stock photos here, just the people who run the hotel day to day.</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each leaders as person (person.name)}
				<article class="card min-w-0 p-6 text-center">
					<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pine text-2xl font-semibold tracking-wide text-gold">
						{person.initials}
					</div>
					<h3 class="font-display mt-4 text-2xl font-semibold">{person.name}</h3>
					<p class="text-sm font-semibold tracking-[0.14em] text-gold-dark uppercase">{person.role}</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">{person.text}</p>
				</article>
			{/each}
		</div>
	</div>

	<div class="mt-16 rounded-md bg-pine px-6 py-10 text-center text-ivory sm:px-10" use:reveal>
		<Award class="mx-auto h-8 w-8 text-gold" />
		<h2 class="font-display mt-4 text-3xl font-semibold sm:text-4xl">Recognised, quietly</h2>
		<ul class="mx-auto mt-5 max-w-2xl space-y-2 text-sm text-white/80">
			{#each awards as award (award)}
				<li>{award}</li>
			{/each}
		</ul>
		<p class="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-white/60">
			Demo note: the awards above are illustrative placeholder text for the client preview. Real
			awards and press mentions will replace them before launch.
		</p>
		<div class="mt-7 flex flex-wrap justify-center gap-3">
			<a href="/rooms" class="btn-gold">Explore Rooms</a>
			<a href="/contact" class="btn-ghost-light">Talk to Us</a>
		</div>
	</div>
</section>
