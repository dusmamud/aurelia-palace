<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { AWARDS, PRESS_CONTACT, PRESS_QUOTES } from '#lib/data/press-awards';
	import { reveal } from '#lib/reveal';
	import { Award, Mail, Newspaper, Phone, Quote } from '@lucide/svelte';
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Press & Awards"
	title="Quietly, the word got out"
	subtitle="Awards we are grateful for, and what the press has said about the palace, the kitchen and the spa."
	image={IMAGES.hero}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div use:reveal>
		<p class="eyebrow">Awards</p>
		<h2 class="section-title mt-2">Recognised, gratefully</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2">
			{#each AWARDS as a (a.title)}
				<article class="card min-w-0 p-6 sm:p-8">
					<div class="flex items-start justify-between gap-3">
						<Award class="h-8 w-8 shrink-0 text-gold-dark" />
						<span class="font-display text-3xl font-semibold text-gold-dark">{a.year}</span>
					</div>
					<h3 class="font-display mt-4 text-2xl leading-tight font-semibold sm:text-3xl">{a.title}</h3>
					<p class="mt-1 text-sm font-semibold tracking-[0.14em] text-gold-dark uppercase">{a.organisation}</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">{a.detail}</p>
				</article>
			{/each}
		</div>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">In the press</p>
		<h2 class="section-title mt-2">What they wrote</h2>
		<div class="mt-8 grid gap-4 lg:grid-cols-3">
			{#each PRESS_QUOTES as q (q.publication)}
				<figure class="flex min-w-0 flex-col rounded-md border border-line bg-white p-6 sm:p-8">
					<Quote class="h-7 w-7 text-gold-dark" />
					<blockquote class="font-display mt-4 flex-1 text-xl leading-snug font-medium text-ink sm:text-2xl">
						“{q.quote}”
					</blockquote>
					<figcaption class="mt-6 border-t border-line pt-4">
						<p class="flex items-center gap-2 font-semibold text-ink"><Newspaper class="h-4 w-4 text-gold-dark" /> {q.publication}</p>
						<p class="mt-0.5 text-sm text-muted">{q.context}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>

	<div class="mt-16 grid gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:p-8 lg:grid-cols-5" use:reveal>
		<div class="min-w-0 lg:col-span-3">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">For journalists</p>
			<h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">Press enquiries</h2>
			<p class="mt-3 max-w-xl text-sm leading-relaxed text-ivory/85 sm:text-base">{PRESS_CONTACT.note}</p>
		</div>
		<div class="min-w-0 space-y-3 lg:col-span-2">
			<a href="mailto:{PRESS_CONTACT.email}" class="flex items-center gap-3 rounded-sm border border-white/25 px-4 py-3 text-sm transition hover:border-gold">
				<Mail class="h-5 w-5 shrink-0 text-gold" /> <span class="min-w-0 break-all">{PRESS_CONTACT.email}</span>
			</a>
			<a href="tel:{HOTEL.phoneHref}" class="flex items-center gap-3 rounded-sm border border-white/25 px-4 py-3 text-sm transition hover:border-gold">
				<Phone class="h-5 w-5 shrink-0 text-gold" /> {PRESS_CONTACT.phone}
			</a>
			<p class="text-xs leading-relaxed text-ivory/70">Press visits are by arrangement. Please allow two weeks’ notice for stays and photography.</p>
		</div>
	</div>
</section>
