<script lang="ts">
	import { HOTEL, inr } from '#lib/data/hotel';
</script>

<div class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 px-4 py-3 shadow-[0_-8px_30px_rgba(28,26,23,0.12)] backdrop-blur lg:hidden">
	<div class="flex items-center justify-between gap-3">
		<div class="min-w-0">
			<p class="text-xs text-muted">From</p>
			<p class="font-display text-xl leading-none font-semibold text-ink">{inr(HOTEL.priceFrom)} <span class="font-sans text-xs font-normal text-muted">/ night</span></p>
		</div>
		<a href="/book" class="btn-gold shrink-0 !min-h-11 !px-5">Book Now</a>
		<a href="tel:{HOTEL.phoneHref}" class="btn-ghost shrink-0 !min-h-11 !px-4">Call</a>
	</div>
</div>
