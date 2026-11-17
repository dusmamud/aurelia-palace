<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, ROOMS } from '#lib/data/hotel';
	import { RATING_SUMMARY, REVIEW_CATEGORIES, REVIEWS } from '#lib/data/reviews';
	import { reveal } from '#lib/reveal';
	import { BadgeCheck, Check, MessageSquare, Star } from '@lucide/svelte';

	let filter = $state<(typeof REVIEW_CATEGORIES)[number]>('All');
	const filtered = $derived(filter === 'All' ? REVIEWS : REVIEWS.filter((r) => r.category === filter));

	let name = $state('');
	let room = $state(ROOMS[0].name);
	let category = $state<'Rooms' | 'Dining' | 'Spa' | 'Service' | 'Weddings'>('Rooms');
	let rating = $state(5);
	let title = $state('');
	let text = $state('');
	let submitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (title.trim().length < 3) errors.title = 'Please give your review a short title.';
		if (text.trim().length < 20) errors.text = 'Please write at least a few lines about your stay.';
		if (Object.keys(errors).length > 0) return;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-review') ?? '[]') as unknown[];
			existing.push({ name: name.trim(), room, category, rating, title: title.trim(), text: text.trim(), at: new Date().toISOString() });
			localStorage.setItem('aurelia-review', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — the review is still acknowledged on screen
		}
		submitted = true;
	}
</script>

<PageHero
	eyebrow="Guest Reviews"
	title="What our guests say"
	subtitle="2,841 verified reviews, and a 4.9 out of 5 that we work very hard to keep. Read them — the good and the one slow breakfast — then come and judge for yourself."
	image={IMAGES.resort}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Summary -->
	<div class="grid gap-6 rounded-md border border-line bg-white p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center" use:reveal>
		<div class="text-center lg:text-left">
			<p class="font-display text-6xl leading-none font-semibold text-pine sm:text-7xl">{RATING_SUMMARY.overall}</p>
			<div class="mt-2 flex justify-center gap-0.5 lg:justify-start" aria-label="Rated 4.9 out of 5">
				{#each [1, 2, 3, 4, 5] as s (s)}
					<Star class="h-5 w-5 fill-gold text-gold" />
				{/each}
			</div>
			<p class="mt-2 text-sm text-muted">{RATING_SUMMARY.total.toLocaleString('en-IN')} verified reviews</p>
		</div>
		<div class="mx-auto w-full max-w-md space-y-2">
			{#each RATING_SUMMARY.bars as bar (bar.stars)}
				<div class="flex items-center gap-3 text-sm">
					<span class="flex w-8 shrink-0 items-center justify-end gap-1 font-medium text-ink/85">{bar.stars}<Star class="h-3.5 w-3.5 fill-gold text-gold" /></span>
					<div class="h-2.5 flex-1 overflow-hidden rounded-full bg-cream">
						<div class="h-full rounded-full bg-gold" style="width: {bar.percent}%"></div>
					</div>
					<span class="w-10 shrink-0 text-muted">{bar.percent}%</span>
				</div>
			{/each}
		</div>
		<div class="text-center lg:text-right">
			<p class="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Also rated on</p>
			<ul class="mt-3 space-y-1.5 text-sm font-medium text-ink/85">
				<li>Tripadvisor — 4.9 / 5 · Travellers’ Choice</li>
				<li>Google — 4.9 / 5 · 1,900+ reviews</li>
				<li>Booking.com — 9.6 / 10 · Exceptional</li>
			</ul>
			<p class="mt-3 text-xs text-muted">Source scores are mock demo data for client preview.</p>
		</div>
	</div>

	<!-- Filters -->
	<div class="mt-10 flex flex-wrap gap-2" use:reveal>
		{#each REVIEW_CATEGORIES as c (c)}
			<button
				type="button"
				onclick={() => (filter = c)}
				aria-pressed={filter === c}
				class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition {filter === c
					? 'border-pine bg-pine text-ivory'
					: 'border-line bg-white text-ink hover:border-gold'}"
			>
				{c}
			</button>
		{/each}
	</div>

	<!-- Review cards -->
	<div class="mt-8 grid gap-4 md:grid-cols-2">
		{#each filtered as r, i (r.name + r.date)}
			<article class="card flex flex-col p-5 sm:p-6" use:reveal={{ delay: (i % 2) * 80 }}>
				<div class="flex items-center justify-between gap-3">
					<div class="flex gap-0.5" aria-label="Rated {r.rating} out of 5">
						{#each [1, 2, 3, 4, 5] as s (s)}
							<Star class="h-4 w-4 {s <= r.rating ? 'fill-gold text-gold' : 'text-line'}" />
						{/each}
					</div>
					<span class="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-muted">{r.source}</span>
				</div>
				<h3 class="font-display mt-3 text-2xl leading-tight font-semibold text-ink">{r.title}</h3>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-ink/80 sm:text-base">{r.text}</p>
				<footer class="mt-4 flex items-start justify-between gap-3 border-t border-line pt-4">
					<div class="min-w-0">
						<p class="flex items-center gap-1.5 text-sm font-semibold text-ink">
							{r.name}
							<BadgeCheck class="h-4 w-4 shrink-0 text-gold-dark" aria-label="Verified stay" />
						</p>
						<p class="mt-0.5 text-xs text-muted">{r.place} · {r.date}</p>
						<p class="mt-0.5 text-xs text-muted">Stayed in the {r.room} · {r.category}</p>
					</div>
					<span class="shrink-0 rounded-full bg-pine px-2.5 py-1 text-xs font-medium text-ivory">Verified stay</span>
				</footer>
			</article>
		{/each}
	</div>
	{#if filtered.length === 0}
		<p class="mt-8 text-center text-muted">No reviews in this category yet.</p>
	{/if}

	<!-- Write a review -->
	<div class="mx-auto mt-16 max-w-2xl rounded-md border border-line bg-white p-5 sm:mt-20 sm:p-8" use:reveal>
		<p class="eyebrow flex items-center gap-2"><MessageSquare class="h-4 w-4" /> Share your stay</p>
		<h2 class="font-display mt-2 text-3xl font-semibold text-ink">Write a review</h2>
		{#if submitted}
			<div class="mt-6 rounded-sm border border-gold/40 bg-cream p-5" role="status">
				<p class="flex items-start gap-2 font-semibold text-pine"><Check class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> Thank you, {name.trim()}</p>
				<p class="mt-2 text-sm leading-relaxed text-ink/80">
					Your {rating}-star review of the {room} is saved. Our team reads every review, and yours will appear here once it has been checked.
				</p>
				<button type="button" class="btn-ghost mt-4 !min-h-11 w-full" onclick={() => { submitted = false; name = ''; title = ''; text = ''; }}>Write another review</button>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
				<div>
					<label class="label" for="r-name">Your name</label>
					<input id="r-name" class="input" type="text" autocomplete="name" placeholder="Your name" bind:value={name} />
					{#if errors.name}<p class="mt-1 text-xs text-red-800">{errors.name}</p>{/if}
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="label" for="r-room">Room you stayed in</label>
						<select id="r-room" class="input" bind:value={room}>
							{#each ROOMS as rm (rm.slug)}
								<option value={rm.name}>{rm.name}</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="label" for="r-category">What is this about?</label>
						<select id="r-category" class="input" bind:value={category}>
							{#each REVIEW_CATEGORIES.filter((c) => c !== 'All') as c (c)}
								<option value={c}>{c}</option>
							{/each}
						</select>
					</div>
				</div>
				<div>
					<label class="label" for="r-rating">Your rating</label>
					<select id="r-rating" class="input" bind:value={rating}>
						<option value={5}>5 — Exceptional</option>
						<option value={4}>4 — Very good</option>
						<option value={3}>3 — Good</option>
						<option value={2}>2 — Disappointing</option>
						<option value={1}>1 — Poor</option>
					</select>
				</div>
				<div>
					<label class="label" for="r-title">Review title</label>
					<input id="r-title" class="input" type="text" placeholder="Sum up your stay in a line" bind:value={title} />
					{#if errors.title}<p class="mt-1 text-xs text-red-800">{errors.title}</p>{/if}
				</div>
				<div>
					<label class="label" for="r-text">Your review</label>
					<textarea id="r-text" class="input min-h-28 resize-y" placeholder="What did you love — and what could we do better?" bind:value={text}></textarea>
					{#if errors.text}<p class="mt-1 text-xs text-red-800">{errors.text}</p>{/if}
				</div>
				<button type="submit" class="btn-gold w-full"><Star class="h-4 w-4" /> Submit Review</button>
				<p class="text-center text-xs text-muted">Demo form — reviews are stored in this browser only and are checked before publishing.</p>
			</form>
		{/if}
	</div>
</section>
