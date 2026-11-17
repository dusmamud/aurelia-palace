<script lang="ts">
	/**
	 * Animated count-up number. SSR renders the final value (no-JS safe);
	 * in the browser it counts from 0 when scrolled into view, once.
	 * Reduced-motion visitors always see the final value.
	 */
	let {
		value,
		prefix = '',
		suffix = '',
		decimals = 0,
		duration = 1200,
		class: className = ''
	}: {
		value: number;
		prefix?: string;
		suffix?: string;
		decimals?: number;
		duration?: number;
		class?: string;
	} = $props();

	let progress = $state(1);
	let node: HTMLSpanElement | undefined = $state();

	$effect(() => {
		const el = node;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		progress = 0;
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				io.disconnect();
				const start = performance.now();
				const tick = (now: number) => {
					const p = Math.min(1, (now - start) / duration);
					progress = 1 - Math.pow(1 - p, 3);
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		io.observe(el);
		return () => io.disconnect();
	});
</script>

<span bind:this={node} class={className}
	>{prefix}{(value * progress).toFixed(decimals)}{suffix}</span
>
