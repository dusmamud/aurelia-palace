<script lang="ts">
	import { HOTEL, inr } from '#lib/data/hotel';

	let visible = $state(false);
	let pulsed = $state(false);

	$effect(() => {
		const onScroll = () => {
			const show = window.scrollY > 600;
			if (show && !pulsed) pulsed = true;
			visible = show;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div
	class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 px-4 py-3 shadow-[0_-8px_30px_rgba(28,26,23,0.12)] backdrop-blur transition-transform duration-500 ease-out will-change-transform lg:hidden {visible
		? 'translate-y-0'
		: 'translate-y-[110%]'}"
>
	<div class="flex items-center justify-between gap-3">
		<div class="min-w-0">
			<p class="text-xs text-muted">From</p>
			<p class="font-display text-xl leading-none font-semibold text-ink">{inr(HOTEL.priceFrom)} <span class="font-sans text-xs font-normal text-muted">/ night</span></p>
		</div>
		<a href="/book" class="btn-gold shrink-0 !min-h-11 !px-5 {pulsed ? 'cta-pulse-once' : ''}">Book Now</a>
		<a href="tel:{HOTEL.phoneHref}" class="btn-ghost shrink-0 !min-h-11 !px-4">Call</a>
	</div>
</div>
