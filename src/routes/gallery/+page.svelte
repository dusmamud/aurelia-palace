<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { GALLERY, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { X, ChevronLeft, ChevronRight } from '@lucide/svelte';

	let selected = $state<number | null>(null);

	function open(i: number) {
		selected = i;
	}
	function close() {
		selected = null;
	}
	function prev() {
		if (selected === null) return;
		selected = (selected - 1 + GALLERY.length) % GALLERY.length;
	}
	function next() {
		if (selected === null) return;
		selected = (selected + 1) % GALLERY.length;
	}
	function onKey(e: KeyboardEvent) {
		if (selected === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={onKey} />

<PageHero
	eyebrow="Gallery"
	title="The palace, in pictures"
	subtitle="Rooms, tables, the pool at dusk and the old city nearby. Tap any image to view it full-screen."
	image={IMAGES.pool}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
		{#each GALLERY as item, i (item.src)}
			<button
				type="button"
				class="group relative min-w-0 overflow-hidden rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
				use:reveal={{ delay: (i % 3) * 80 }}
				onclick={() => open(i)}
				aria-label="View {item.label} full-screen"
			>
				<img src={item.src} alt={item.label} loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
				<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3 text-sm font-medium text-white">{item.label}</span>
			</button>
		{/each}
	</div>
</section>

{#if selected !== null}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		aria-label={GALLERY[selected].label}
		onclick={(e) => { if (e.target === e.currentTarget) close(); }}
		onkeydown={(e) => { if (e.key === 'Escape') close(); }}
	>
		<button type="button" class="absolute top-4 right-4 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" onclick={close} aria-label="Close gallery">
			<X class="h-6 w-6" />
		</button>
		<button
			type="button"
			class="absolute top-1/2 left-3 z-10 flex min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
			onclick={(e) => { e.stopPropagation(); prev(); }}
			aria-label="Previous image"
		>
			<ChevronLeft class="h-6 w-6" />
		</button>
		<button
			type="button"
			class="absolute top-1/2 right-3 z-10 flex min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
			onclick={(e) => { e.stopPropagation(); next(); }}
			aria-label="Next image"
		>
			<ChevronRight class="h-6 w-6" />
		</button>
		<figure class="max-w-4xl">
			<img src={GALLERY[selected].src} alt={GALLERY[selected].label} class="max-h-[78vh] w-full rounded-md object-contain" />
			<figcaption class="mt-4 flex items-center justify-between gap-4 text-sm text-white/85">
				<span>{GALLERY[selected].label}</span>
				<span class="shrink-0 tabular-nums">{selected + 1} / {GALLERY.length}</span>
			</figcaption>
		</figure>
	</div>
{/if}
