<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr, usrcset } from '#lib/data/hotel';
	import { PACKAGES, CATEGORIES, type PackageCategory } from '#lib/data/packages';
	import { reveal } from '#lib/reveal';
	import { Check, ArrowRight, Moon, Tag } from '@lucide/svelte';

	let filter = $state<'All' | PackageCategory>('All');

	const visible = $derived(filter === 'All' ? PACKAGES : PACKAGES.filter((p) => p.category === filter));
</script>

<PageHero
	eyebrow="Stay Packages"
	title="Palace stays, thoughtfully bundled"
	subtitle="Nights, meals, spa rituals and city tours — put together at a better price than booking each part alone. Every package includes breakfast and 18% GST."
	image={IMAGES.resort}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Filter chips -->
	<div class="flex flex-wrap gap-2" use:reveal role="group" aria-label="Filter packages by type">
		{#each CATEGORIES as cat (cat)}
			<button
				type="button"
				class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition {filter === cat
					? 'border-pine bg-pine text-ivory'
					: 'border-line bg-white text-ink hover:border-gold hover:text-gold-dark'}"
				aria-pressed={filter === cat}
				onclick={() => (filter = cat)}
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Package cards -->
	<div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each visible as pkg, i (pkg.slug)}
			<article class="card flex min-w-0 flex-col" use:reveal={{ delay: (i % 3) * 90 }}>
				<div class="relative">
					<img src={pkg.image} srcset={usrcset(pkg.image)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt={pkg.name} loading="lazy" decoding="async" class="aspect-[16/10] w-full object-cover" />
					<span class="absolute top-3 left-3 rounded-full bg-pine/90 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-ivory uppercase">{pkg.category}</span>
				</div>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<p class="flex items-center gap-2 text-sm font-semibold text-gold-dark"><Moon class="h-4 w-4" /> {pkg.nights} nights</p>
					<h2 class="font-display mt-2 text-2xl leading-tight font-semibold text-ink">{pkg.name}</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{pkg.short}</p>
					<ul class="mt-4 space-y-2 border-t border-line pt-4">
						{#each pkg.inclusions as item (item)}
							<li class="flex items-start gap-2 text-sm text-ink/85"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {item}</li>
						{/each}
					</ul>
					<div class="mt-auto pt-5">
						<p class="text-xs font-semibold tracking-[0.18em] text-muted uppercase">From</p>
						<p class="font-display mt-1 text-3xl font-semibold text-pine">{inr(pkg.priceFrom)} <span class="font-sans text-sm font-normal text-muted">· incl. GST</span></p>
						<a href="/book" class="btn-gold mt-4 w-full">Book this package <ArrowRight class="h-4 w-4" /></a>
						<p class="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-muted"><Tag class="mt-0.5 h-3.5 w-3.5 shrink-0" /> {pkg.validity}. {pkg.terms}</p>
					</div>
				</div>
			</article>
		{/each}
	</div>

	{#if visible.length === 0}
		<p class="mt-10 text-center text-muted" role="status">No packages in this category yet — try another filter.</p>
	{/if}

	<!-- Note -->
	<div class="mt-14 rounded-md border border-line bg-white p-6 text-center sm:p-8" use:reveal>
		<h2 class="font-display text-2xl font-semibold text-ink sm:text-3xl">Want something made for you?</h2>
		<p class="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
			All package prices are in INR and include 18% GST and breakfast. We can build a custom package around
			a celebration, a shoot, or a longer stay — just ask.
		</p>
		<a href="/contact" class="btn-pine mt-5">Ask for a Custom Package <ArrowRight class="h-4 w-4" /></a>
	</div>
</section>
