<script lang="ts">
	import { Mail, MapPin, Phone, Crown, Star } from '@lucide/svelte';
	import { HOTEL, ROOMS, DINING } from '#lib/data/hotel';
</script>

<footer class="border-t border-line bg-pine text-white/85">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
		<div class="min-w-0">
			<a href="/" class="flex items-center gap-3">
				<span class="flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-pine-2 text-gold">
					<Crown class="h-5 w-5" strokeWidth={1.8} />
				</span>
				<span class="leading-none">
					<span class="font-display block text-xl leading-none font-semibold text-white">The Aurelia Palace</span>
					<span class="mt-1 block text-[0.6rem] font-semibold tracking-[0.35em] text-gold uppercase">Jaipur · Five Star</span>
				</span>
			</a>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
				A palace stay, quietly perfected. 118 rooms and suites, royal dining, Amara Spa and weddings in the heart of Jaipur.
			</p>
			<p class="mt-4 flex items-center gap-1 text-sm text-gold">
				{#each Array(5) as _, i (i)}<Star class="h-4 w-4 fill-gold text-gold" />{/each}
				<span class="ml-1 text-white/80">{HOTEL.rating}/5 · {HOTEL.reviewsCount.toLocaleString('en-IN')} guest reviews</span>
			</p>
		</div>

		<nav aria-label="Explore" class="min-w-0">
			<h3 class="text-sm font-semibold tracking-[0.2em] text-white uppercase">Explore</h3>
			<ul class="mt-4 space-y-1">
				{#each [{ href: '/rooms', label: 'Rooms & Suites' }, { href: '/dining', label: 'Dining' }, { href: '/spa-wellness', label: 'Spa & Wellness' }, { href: '/experiences', label: 'Experiences' }, { href: '/gallery', label: 'Gallery' }, { href: '/offers', label: 'Offers' }, { href: '/blog', label: 'Journal' }, { href: '/faq', label: 'FAQ' }] as item (item.href)}
					<li><a href={item.href} class="inline-flex min-h-8 items-center text-sm text-white/70 transition hover:text-gold">{item.label}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Rooms and dining" class="min-w-0">
			<h3 class="text-sm font-semibold tracking-[0.2em] text-white uppercase">Rooms & Dining</h3>
			<ul class="mt-4 space-y-1">
				{#each ROOMS.slice(0, 4) as room (room.slug)}
					<li><a href="/rooms/{room.slug}" class="inline-flex min-h-8 items-center text-sm text-white/70 transition hover:text-gold">{room.name}</a></li>
				{/each}
				{#each DINING as d (d.slug)}
					<li><a href="/dining/{d.slug}" class="inline-flex min-h-8 items-center text-sm text-white/70 transition hover:text-gold">{d.name}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="min-w-0">
			<h3 class="text-sm font-semibold tracking-[0.2em] text-white uppercase">Contact</h3>
			<ul class="mt-4 space-y-3 text-sm text-white/70">
				<li class="flex items-start gap-2"><MapPin class="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{HOTEL.address}</span></li>
				<li class="flex items-center gap-2"><Phone class="h-4 w-4 shrink-0 text-gold" /><a href="tel:{HOTEL.phoneHref}" class="transition hover:text-gold">{HOTEL.phone}</a></li>
				<li class="flex items-center gap-2"><Mail class="h-4 w-4 shrink-0 text-gold" /><a href="mailto:{HOTEL.email}" class="transition hover:text-gold">{HOTEL.email}</a></li>
			</ul>
			<p class="mt-4 text-xs leading-relaxed text-white/60">Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}. Front desk open 24 hours.</p>
			<p class="mt-3 text-xs leading-relaxed text-white/50">Demo site with mock data for client preview — prices, availability and contact details are illustrative.</p>
		</div>
	</div>

	<div class="border-t border-white/10">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
			<p>© 2026 The Aurelia Palace, Jaipur. All rights reserved.</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<a href="/privacy-policy" class="transition hover:text-gold">Privacy Policy</a>
				<a href="/terms" class="transition hover:text-gold">Terms</a>
				<a href="/cancellation-policy" class="transition hover:text-gold">Cancellation Policy</a>
				<a href="/sitemap" class="transition hover:text-gold">Sitemap</a>
			</div>
		</div>
	</div>
</footer>
