<script lang="ts">
	import { usrcset } from '#lib/data/hotel';

	let { eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image: string } = $props();

	const words = $derived(title.split(' '));
</script>

<section class="relative flex min-h-[46svh] items-end overflow-hidden bg-pine text-white sm:min-h-[52svh]">
	<img
		src={image}
		srcset={usrcset(image, [800, 1200, 1600, 2000])}
		sizes="100vw"
		alt={title}
		class="animate-kenburns absolute inset-0 h-full w-full object-cover"
		fetchpriority="high"
	/>
	<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15"></div>
	<div class="hero-vignette absolute inset-0" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
		<p class="section-eyebrow section-eyebrow--light hero-fade">{eyebrow}</p>
		<h1 class="font-display mt-3 max-w-3xl text-5xl leading-[1.02] font-semibold sm:text-6xl">
			{#each words as word, i (i)}<span class="hero-word" style="--wd: {140 + i * 90}ms">{word}</span>{' '}{/each}
		</h1>
		{#if subtitle}<p class="hero-fade mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg" style="--wd: 560ms">{subtitle}</p>{/if}
	</div>
</section>
