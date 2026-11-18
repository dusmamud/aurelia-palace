<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import CountUp from '#lib/components/CountUp.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { INITIATIVES, STATS } from '#lib/data/sustainability';
	import { reveal } from '#lib/reveal';
	import { Droplets, GraduationCap, HandHeart, Leaf, Palette, Recycle, Sprout, Sun } from '@lucide/svelte';

	const ICONS = {
		'no-single-use-plastic': Recycle,
		'solar-hot-water': Sun,
		'rainwater-harvesting': Droplets,
		'local-produce': Leaf,
		'kitchen-garden': Sprout,
		'artisan-programme': Palette,
		'school-support': GraduationCap
	} as const;
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Sustainability"
	title="A palace that gives back"
	subtitle="A heritage palace cannot just take from its city. Here is what we do — in numbers, not promises — to tread lightly on Jaipur and to give back to the people who keep it beautiful."
	image={IMAGES.heritage}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" use:reveal>
		{#each STATS as stat (stat.label)}
			<div class="card min-w-0 p-6">
				<p class="font-display text-5xl font-semibold text-gold-dark">
					<CountUp value={stat.value} suffix={stat.suffix} />
				</p>
				<p class="mt-3 text-sm font-semibold">{stat.label}</p>
				<p class="mt-1 text-sm leading-relaxed text-muted">{stat.text}</p>
			</div>
		{/each}
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">What we do</p>
		<h2 class="section-title mt-2">Seven commitments, kept every day</h2>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
			None of this is a one-off project. Each initiative below is part of how the palace runs — checked monthly, reported to the owners, and improved a little every year.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" use:reveal>
		{#each INITIATIVES as init (init.slug)}
			{@const Icon = ICONS[init.slug as keyof typeof ICONS]}
			<div class="card min-w-0 p-6">
				<Icon class="h-6 w-6 text-gold-dark" />
				<h3 class="font-display mt-4 text-2xl font-semibold">{init.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{init.text}</p>
			</div>
		{/each}
		<div class="card min-w-0 bg-pine p-6 text-ivory">
			<HandHeart class="h-6 w-6 text-gold" />
			<h3 class="font-display mt-4 text-2xl font-semibold">The community around us</h3>
			<p class="mt-2 text-sm leading-relaxed text-ivory/85">
				Most of our 140 staff live within a few kilometres of the palace. We hire locally first, train in-house, and buy from the bazaars around us — because a palace is only as healthy as its neighbourhood.
			</p>
			<p class="mt-4 text-sm leading-relaxed text-ivory/85">
				Guests who would like to visit the schools we support, or meet the artisans in the programme, can ask the concierge — visits are arranged most weeks.
			</p>
		</div>
	</div>

	<div class="mt-16 flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="text-sm font-semibold tracking-[0.18em] text-gold uppercase">Questions about our impact</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">
				Ask us anything — about sourcing, energy, or the community programme. Write to {HOTEL.email} and the sustainability team will reply.
			</p>
		</div>
		<a href="mailto:{HOTEL.email}" class="btn-gold shrink-0">Email Us</a>
	</div>
</section>
