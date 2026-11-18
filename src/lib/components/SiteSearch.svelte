<script lang="ts">
	import { Search, X } from '@lucide/svelte';
	import { DINING, POSTS, ROOMS } from '#lib/data/hotel';
	import { popIn } from '#lib/motion';

	type Entry = { label: string; kind: string; href: string };

	const PAGES: Entry[] = [
		{ label: 'Home', kind: 'Page', href: '/' },
		{ label: 'Rooms & Suites', kind: 'Page', href: '/rooms' },
		{ label: 'Compare Rooms', kind: 'Page', href: '/rooms/compare' },
		{ label: 'Dining', kind: 'Page', href: '/dining' },
		{ label: 'Reserve a Table', kind: 'Page', href: '/dining/reserve' },
		{ label: 'Afternoon Tea', kind: 'Page', href: '/afternoon-tea' },
		{ label: 'Spa & Wellness', kind: 'Page', href: '/spa-wellness' },
		{ label: 'Book a Spa Treatment', kind: 'Page', href: '/spa/book' },
		{ label: 'Wellness Retreats', kind: 'Page', href: '/wellness' },
		{ label: 'Experiences', kind: 'Page', href: '/experiences' },
		{ label: 'Weddings & Events', kind: 'Page', href: '/weddings-events' },
		{ label: 'Honeymoon & Romantic Escapes', kind: 'Page', href: '/honeymoon' },
		{ label: 'Family Stays', kind: 'Page', href: '/family' },
		{ label: 'Pet-Friendly Stays', kind: 'Page', href: '/pet-friendly' },
		{ label: 'Long Stays', kind: 'Page', href: '/long-stays' },
		{ label: 'Business Stays', kind: 'Page', href: '/business' },
		{ label: 'Meetings', kind: 'Page', href: '/meetings' },
		{ label: 'Occasions', kind: 'Page', href: '/occasions' },
		{ label: 'Offers', kind: 'Page', href: '/offers' },
		{ label: 'Stay Packages', kind: 'Page', href: '/packages' },
		{ label: 'Gallery', kind: 'Page', href: '/gallery' },
		{ label: 'Amenities', kind: 'Page', href: '/amenities' },
		{ label: 'Guest Reviews', kind: 'Page', href: '/reviews' },
		{ label: 'Aurelia Circle — Loyalty', kind: 'Page', href: '/loyalty' },
		{ label: 'Concierge', kind: 'Page', href: '/concierge' },
		{ label: 'Explore Jaipur', kind: 'Page', href: '/explore-jaipur' },
		{ label: 'What’s On', kind: 'Page', href: '/whats-on' },
		{ label: 'Airport Transfers', kind: 'Page', href: '/transfers' },
		{ label: 'Sustainability', kind: 'Page', href: '/sustainability' },
		{ label: 'Accessibility', kind: 'Page', href: '/accessibility' },
		{ label: 'Travel Agents', kind: 'Page', href: '/travel-agents' },
		{ label: 'Gift Cards', kind: 'Page', href: '/gift-cards' },
		{ label: 'About the Palace', kind: 'Page', href: '/about' },
		{ label: 'Location', kind: 'Page', href: '/location' },
		{ label: 'Contact', kind: 'Page', href: '/contact' },
		{ label: 'FAQ', kind: 'Page', href: '/faq' },
		{ label: 'Journal', kind: 'Page', href: '/blog' },
		{ label: 'Book a Stay', kind: 'Page', href: '/book' },
		{ label: 'Manage My Booking', kind: 'Page', href: '/manage-booking' }
	];

	const INDEX: Entry[] = [
		...PAGES,
		...ROOMS.map((r) => ({ label: r.name, kind: 'Room', href: `/rooms/${r.slug}` })),
		...DINING.map((d) => ({ label: d.name, kind: 'Dining', href: `/dining/${d.slug}` })),
		...POSTS.map((p) => ({ label: p.title, kind: 'Journal', href: `/blog/${p.slug}` }))
	];

	let open = $state(false);
	let query = $state('');

	const results = $derived(
		query.trim().length < 2
			? []
			: INDEX.filter((e) => e.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
	);

	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<button
	type="button"
	aria-label="Search the site"
	onclick={() => (open = true)}
	class="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink transition hover:border-gold hover:text-gold-dark"
>
	<Search class="h-5 w-5" />
</button>

{#if open}
	<div class="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm" role="presentation" onclick={() => (open = false)}>
		<div
			use:popIn
			class="mx-auto mt-24 w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-md bg-ivory shadow-[0_24px_64px_rgba(28,26,23,0.4)]"
			role="dialog"
			aria-label="Search the site"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center gap-3 border-b border-line px-4">
				<Search class="h-5 w-5 shrink-0 text-gold-dark" />
				<label for="site-search" class="sr-only">Search rooms, dining, pages</label>
				<input
					id="site-search"
					type="search"
					bind:value={query}
					placeholder="Search rooms, dining, spa, weddings…"
					autocomplete="off"
					class="min-w-0 flex-1 bg-transparent py-4 text-base outline-none placeholder:text-muted"
				/>
				<button type="button" aria-label="Close search" onclick={() => (open = false)} class="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-ink/70 transition hover:bg-cream hover:text-ink">
					<X class="h-5 w-5" />
				</button>
			</div>
			{#if query.trim().length >= 2}
				{#if results.length > 0}
					<ul class="max-h-80 overflow-y-auto py-2">
						{#each results as r (r.href)}
							<li>
								<a
									href={r.href}
									onclick={() => (open = false)}
									class="flex items-center justify-between gap-3 px-4 py-3 text-sm transition hover:bg-cream"
								>
									<span class="min-w-0 font-medium text-ink">{r.label}</span>
									<span class="shrink-0 rounded-full border border-line px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider text-muted uppercase">{r.kind}</span>
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="px-4 py-6 text-sm text-muted">
						Nothing found for “{query.trim()}”. Try “spa”, “suite”, “wedding” or “Jaipur”.
					</p>
				{/if}
			{:else}
				<p class="px-4 py-6 text-sm text-muted">Try “spa”, “suite”, “wedding”, “afternoon tea” or “transfers”.</p>
			{/if}
		</div>
	</div>
{/if}
