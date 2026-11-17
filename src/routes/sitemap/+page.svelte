<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { DINING, IMAGES, POSTS, ROOMS } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	const groups: { title: string; links: { href: string; label: string }[] }[] = [
		{ title: 'Stay', links: [{ href: '/', label: 'Home' }, { href: '/rooms', label: 'Rooms & Suites' }, ...ROOMS.map((r) => ({ href: `/rooms/${r.slug}`, label: r.name })), { href: '/offers', label: 'Offers' }, { href: '/packages', label: 'Stay Packages' }, { href: '/amenities', label: 'Amenities' }, { href: '/gift-cards', label: 'Gift Cards' }, { href: '/gallery', label: 'Gallery' }] },
		{ title: 'Eat & relax', links: [{ href: '/dining', label: 'Dining' }, ...DINING.map((d) => ({ href: `/dining/${d.slug}`, label: d.name })), { href: '/spa-wellness', label: 'Amara Spa' }, { href: '/experiences', label: 'Experiences' }, { href: '/concierge', label: 'Concierge' }] },
		{ title: 'Celebrate', links: [{ href: '/weddings-events', label: 'Weddings & Events' }, { href: '/meetings', label: 'Meetings & Conferences' }, { href: '/occasions', label: 'Special Occasions' }] },
		{ title: 'Book', links: [{ href: '/book', label: 'Book a Room' }, { href: '/checkout', label: 'Checkout' }, { href: '/confirmation', label: 'Booking Confirmation' }, { href: '/manage-booking', label: 'Manage My Booking' }, { href: '/loyalty', label: 'Aurelia Circle Loyalty' }] },
		{ title: 'The palace', links: [{ href: '/about', label: 'About' }, { href: '/location', label: 'Location' }, { href: '/explore-jaipur', label: 'Explore Jaipur' }, { href: '/reviews', label: 'Guest Reviews' }, { href: '/press-awards', label: 'Press & Awards' }, { href: '/contact', label: 'Contact' }, { href: '/faq', label: 'FAQ' }, { href: '/careers', label: 'Careers' }] },
		{ title: 'Journal', links: [{ href: '/blog', label: 'Journal' }, ...POSTS.map((p) => ({ href: `/blog/${p.slug}`, label: p.title }))] },
		{ title: 'Legal', links: [{ href: '/privacy-policy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms & Conditions' }, { href: '/cancellation-policy', label: 'Cancellation Policy' }, { href: '/sitemap', label: 'Sitemap' }] }
	];
</script>

<svelte:head>
	<title>Sitemap — The Aurelia Palace, Jaipur</title>
	<meta name="description" content="Every page on The Aurelia Palace, Jaipur website — rooms, dining, spa, weddings, booking, journal and policies." />
</svelte:head>

<PageHero eyebrow="Sitemap" title="Every page, in one place" subtitle="Rooms, dining, spa, weddings, booking and everything else — find it here." image={IMAGES.resort2} />

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" use:reveal>
		{#each groups as group (group.title)}
			<div class="card min-w-0 p-6">
				<h2 class="font-display text-2xl font-semibold">{group.title}</h2>
				<ul class="mt-4 space-y-2">
					{#each group.links as link (link.href)}
						<li><a href={link.href} class="inline-flex min-h-8 items-center text-sm text-muted transition hover:text-gold-dark">{link.label}</a></li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
