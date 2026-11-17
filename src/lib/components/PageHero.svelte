<script lang="ts">
	let { eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image: string } = $props();
</script>

<section class="relative flex min-h-[46vh] items-end overflow-hidden bg-pine text-white sm:min-h-[52vh]">
	<img src={image} alt="" class="absolute inset-0 h-full w-full object-cover" fetchpriority="high" />
	<div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"></div>
	<div class="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
		<p class="eyebrow !text-gold">{eyebrow}</p>
		<h1 class="font-display mt-3 max-w-3xl text-5xl leading-[1.02] font-semibold sm:text-6xl">{title}</h1>
		{#if subtitle}<p class="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{subtitle}</p>{/if}
	</div>
</section>
