<script lang="ts">
	import { ArrowRight, CalendarDays } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, POSTS } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
</script>

<svelte:head>
	<title>Journal — The Aurelia Palace, Jaipur | Jaipur Guides & Palace Stories</title>
	<meta name="description" content="The Aurelia Palace journal — Jaipur in 48 hours, inside the Saffron kitchen, and why December is the best month to visit Jaipur." />
</svelte:head>

<PageHero
	eyebrow="Journal"
	title="Notes from the palace"
	subtitle="Jaipur guides, kitchen stories and the small details that make a palace stay — written by the people who live here."
	image={IMAGES.heritage}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each POSTS as post, i (post.slug)}
			<article class="card group min-w-0" use:reveal={{ delay: i * 80 }}>
				<a href="/blog/{post.slug}" class="block overflow-hidden" aria-label={post.title}>
					<img src={post.image} alt={post.title} loading="lazy" class="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
				</a>
				<div class="p-5">
					<p class="flex items-center gap-1.5 text-xs tracking-[0.18em] text-gold-dark uppercase"><CalendarDays class="h-3.5 w-3.5" /> {post.date}</p>
					<h2 class="font-display mt-2 text-2xl leading-tight font-semibold"><a href="/blog/{post.slug}" class="transition hover:text-gold-dark">{post.title}</a></h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
					<a href="/blog/{post.slug}" class="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.14em] text-gold-dark uppercase">Read the story <ArrowRight class="h-4 w-4" /></a>
				</div>
			</article>
		{/each}
	</div>
</section>
