<script lang="ts">
	import { ArrowUp } from '@lucide/svelte';

	let visible = $state(false);

	$effect(() => {
		const onScroll = () => {
			visible = window.scrollY > 600;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

{#if visible}
	<button
		type="button"
		aria-label="Back to top"
		onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		class="fixed bottom-20 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ivory text-gold-dark shadow-[0_8px_24px_rgba(28,26,23,0.18)] transition hover:border-gold hover:bg-cream lg:bottom-6 lg:left-6"
	>
		<ArrowUp class="h-5 w-5" />
	</button>
{/if}
