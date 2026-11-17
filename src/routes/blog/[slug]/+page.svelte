<script lang="ts">
	import { ArrowLeft, ArrowRight, CalendarDays } from '@lucide/svelte';
	import { POSTS } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = $derived(data.post);
	const others = $derived(POSTS.filter((p) => p.slug !== post.slug));

	const bodies: Record<string, string[]> = {
		'jaipur-in-48-hours': [
			'Start at sunrise, not at nine. Hawa Mahal is at its best in the first hour of light, when the pink facade glows and the street below is still waking up. Climb to the top floor, look out over the old city, and then walk down into Johari Bazaar while the jewellers are opening their shutters.',
			'By late morning, leave the crowds behind. The block-printing workshops in Sanganer still work the way they did two hundred years ago — carved teak blocks, natural dyes, and fabric drying in the sun. Ask for a demonstration; most workshops are happy to show you, and the piece you print yourself is the souvenir worth keeping.',
			'Come back to the palace for lunch and a slow afternoon. The pool, a book, high tea at four. Jaipur rewards the traveller who does less, better — one fort, one market, one long dinner, rather than a checklist run at full speed.',
			'On day two, go to Amber Fort early and be back by lunch. The rest of the day is for the City Palace, a walk through Bapu Bazaar, and dinner at Saffron — laal maas, dal baati churma, and no hurry at all.',
			'If you only remember one thing: Jaipur is a morning city. The light, the air and the quiet all belong to the first three hours of the day. Plan around them, and the city does the rest.'
		],
		'inside-saffron': [
			'Laal maas takes six hours. There is no shortcut, and in the Saffron kitchen nobody pretends there is. The chillies are soaked, the meat is sealed slowly, and the pot is left alone — the way it was cooked in the royal kitchens that this dining room is named after.',
			'The kitchen starts at five in the morning, long before the first guest sits down. Breads are mixed by hand, the dal for the baati churma simmers for hours, and the tandoor is lit while the courtyard is still dark. By seven in the evening, when the dining room fills, everything on the pass has already been tasted twice.',
			'What surprises guests most is how little is on the menu. Twenty dishes, not sixty. Every one of them is cooked every day, from scratch, by the same small team. The chefs would rather do twenty things properly than sixty things adequately.',
			'If you come for one meal, order the royal thali and let the kitchen decide the order. And save room for the ghevar — it is made in small batches, and when it is gone, it is gone until tomorrow.'
		],
		'winter-in-jaipur': [
			'December is the month Jaipur shows off. Mornings are cool enough for a shawl, the light is clear and low, and the palace garden — which spends the summer in shade — is suddenly the best room in the house.',
			'Pack layers, not bulk. A light jacket for the morning walk, something sleeveless for the afternoon by the pool, and a shawl for dinner on the terrace. The temperature swings twenty degrees between sunrise and lunch, and visitors who pack for only one of them spend the day uncomfortable.',
			'Book the fort and the palace tours for the morning, and keep the afternoons free. Winter afternoons in Jaipur are for slow things: high tea, a spa ritual, a walk through the bazaars while the light turns gold.',
			'One thing to skip: the midday queue at the most famous viewpoints. In December, everyone has the same idea. Go at opening time, or go at sunset — the middle of the day belongs to the palace, not the crowds.',
			'December also books up first. If you are planning a winter stay, book the room before the flights; the suites go in October, and the best tables at Saffron go not long after.'
		]
	};
	const paragraphs = $derived(bodies[post.slug] ?? [post.excerpt, 'More from the palace journal soon.']);
</script>

<svelte:head>
	<title>{post.title} — The Aurelia Palace, Jaipur</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="mx-auto max-w-4xl px-4 pt-28 pb-14 sm:px-6 lg:px-8">
	<a href="/blog" class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.14em] text-gold-dark uppercase"><ArrowLeft class="h-4 w-4" /> Back to Journal</a>
	<div use:reveal>
		<img src={post.image} alt={post.title} class="mt-6 aspect-[16/9] w-full rounded-md object-cover" />
		<p class="eyebrow mt-8 flex items-center gap-1.5"><CalendarDays class="h-3.5 w-3.5" /> {post.date} · The Aurelia Palace, Jaipur</p>
		<h1 class="font-display mt-3 text-4xl leading-[1.05] font-semibold sm:text-5xl">{post.title}</h1>
		<p class="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
	</div>
	<div class="mt-8 space-y-5 text-base leading-relaxed text-ink/85" use:reveal>
		{#each paragraphs as para (para.slice(0, 40))}
			<p>{para}</p>
		{/each}
	</div>
	<p class="mt-8 rounded-sm bg-cream p-4 text-sm leading-relaxed text-muted">
		Demo note: this is mock editorial copy written for the client preview. Real stories, photos and
		bylines will replace it before launch.
	</p>
	<div class="mt-10 flex flex-wrap gap-3" use:reveal>
		<a href="/rooms" class="btn-gold">Stay at the Palace</a>
		<a href="/blog" class="btn-ghost">More Stories</a>
	</div>

	{#if others.length}
		<section class="mt-14 border-t border-line pt-10" use:reveal>
			<h2 class="font-display text-3xl font-semibold">More from the journal</h2>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				{#each others as other (other.slug)}
					<a href="/blog/{other.slug}" class="card group flex min-w-0 gap-4 p-4">
						<img src={other.image} alt={other.title} loading="lazy" class="h-20 w-28 shrink-0 rounded-sm object-cover" />
						<span class="min-w-0">
							<span class="block text-xs text-gold-dark">{other.date}</span>
							<span class="font-display mt-1 block text-xl leading-tight font-semibold transition group-hover:text-gold-dark">{other.title}</span>
							<span class="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark">Read <ArrowRight class="h-4 w-4" /></span>
						</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}
</article>
