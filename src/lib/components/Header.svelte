<script lang="ts">
	import { Menu, X, Phone, Crown } from '@lucide/svelte';
	import { HOTEL } from '#lib/data/hotel';

	const links = [
		{ href: '/rooms', label: 'Rooms & Suites' },
		{ href: '/dining', label: 'Dining' },
		{ href: '/spa-wellness', label: 'Spa & Wellness' },
		{ href: '/experiences', label: 'Experiences' },
		{ href: '/weddings-events', label: 'Weddings & Events' },
		{ href: '/offers', label: 'Offers' }
	];

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur transition-shadow duration-300 {scrolled
		? 'border-line shadow-[0_8px_30px_rgba(28,26,23,0.12)]'
		: 'border-transparent'}"
>
	<div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
		<a href="/" class="flex min-h-11 items-center gap-3" aria-label="The Aurelia Palace — home">
			<span class="flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-pine text-gold">
				<Crown class="h-5 w-5" strokeWidth={1.8} />
			</span>
			<span class="leading-none">
				<span class="font-display block text-[1.35rem] leading-none font-semibold tracking-wide text-ink">The Aurelia Palace</span>
				<span class="mt-1 block text-[0.6rem] font-semibold tracking-[0.35em] text-gold-dark uppercase">Jaipur · Five Star</span>
			</span>
		</a>

		<nav aria-label="Primary" class="hidden items-center gap-1 xl:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-sm px-3 py-2 text-[0.95rem] font-medium text-ink/80 transition hover:bg-cream hover:text-gold-dark"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a href="tel:{HOTEL.phoneHref}" class="hidden min-h-11 items-center gap-2 rounded-sm px-3 text-sm font-medium text-ink/80 transition hover:text-gold-dark md:inline-flex">
				<Phone class="h-4 w-4" /> {HOTEL.phone}
			</a>
			<a href="/book" class="btn-gold hidden !min-h-11 !px-5 !py-2.5 sm:inline-flex">Book Now</a>
			<button
				type="button"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
				class="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink transition hover:border-gold hover:text-gold-dark xl:hidden"
			>
				{#if open}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
			</button>
		</div>
	</div>

	{#if open}
		<nav aria-label="Mobile" class="border-t border-line bg-ivory px-4 pt-2 pb-4 xl:hidden">
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (open = false)}
					class="flex min-h-12 items-center rounded-sm px-3 text-base font-medium text-ink transition hover:bg-cream hover:text-gold-dark"
				>
					{link.label}
				</a>
			{/each}
			<a href="/gallery" onclick={() => (open = false)} class="flex min-h-12 items-center rounded-sm px-3 text-base font-medium text-ink transition hover:bg-cream">Gallery</a>
			<a href="/about" onclick={() => (open = false)} class="flex min-h-12 items-center rounded-sm px-3 text-base font-medium text-ink transition hover:bg-cream">About</a>
			<a href="/contact" onclick={() => (open = false)} class="flex min-h-12 items-center rounded-sm px-3 text-base font-medium text-ink transition hover:bg-cream">Contact</a>
			<a href="/book" onclick={() => (open = false)} class="btn-gold mt-3 w-full">Book Now</a>
			<a href="tel:{HOTEL.phoneHref}" onclick={() => (open = false)} class="btn-ghost mt-2 w-full">Call {HOTEL.phone}</a>
		</nav>
	{/if}
</header>
