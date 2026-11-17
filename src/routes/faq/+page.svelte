<script lang="ts">
	import { ChevronDown, MessageCircleQuestion } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { FAQS, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	let open = $state(0);
</script>

<svelte:head>
	<title>FAQ — The Aurelia Palace, Jaipur | Check-in, Cancellation, Breakfast & More</title>
	<meta name="description" content="Frequently asked questions about The Aurelia Palace, Jaipur — check-in 2 PM, check-out 12 PM, breakfast, airport transfers, cancellation and vegetarian food." />
</svelte:head>

<PageHero
	eyebrow="Good to know"
	title="Questions, answered"
	subtitle="Check-in, cancellation, breakfast, transfers — the answers guests ask for most, in one place."
	image={IMAGES.resort2}
/>

<section class="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="space-y-3" use:reveal>
		{#each FAQS as faq, i (faq.q)}
			<div class="overflow-hidden rounded-md border border-line bg-white">
				<button
					class="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
					onclick={() => (open = open === i ? -1 : i)}
					aria-expanded={open === i}
				>
					<span class="font-display min-w-0 text-xl font-semibold sm:text-2xl">{faq.q}</span>
					<ChevronDown class="h-5 w-5 shrink-0 text-gold-dark transition-transform {open === i ? 'rotate-180' : ''}" />
				</button>
				{#if open === i}
					<p class="border-t border-line px-5 py-4 leading-relaxed text-muted">{faq.a}</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="card mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" use:reveal>
		<div class="min-w-0">
			<h2 class="font-display flex items-center gap-2 text-2xl font-semibold"><MessageCircleQuestion class="h-6 w-6 text-gold-dark" /> Still curious?</h2>
			<p class="mt-1 text-sm leading-relaxed text-muted">The concierge answers around the clock — call, write, or send an enquiry and we will reply within a day.</p>
		</div>
		<a href="/contact" class="btn-pine shrink-0">Contact Us</a>
	</div>
</section>
