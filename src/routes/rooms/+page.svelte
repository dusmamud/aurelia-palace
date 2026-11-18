<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import RoomCard from '#lib/components/RoomCard.svelte';
	import { reveal } from '#lib/reveal';
	import { IMAGES, ROOMS, inr } from '#lib/data/hotel';

	type Filter = 'All' | 'Up to 2 guests' | '3+ guests' | 'Garden view' | 'City & hills view';

	const FILTERS: Filter[] = ['All', 'Up to 2 guests', '3+ guests', 'Garden view', 'City & hills view'];

	let active = $state<Filter>('All');

	let filtered = $derived(
		active === 'All'
			? ROOMS
			: active === 'Up to 2 guests'
				? ROOMS.filter((r) => r.occupancy <= 2)
				: active === '3+ guests'
					? ROOMS.filter((r) => r.occupancy >= 3)
					: active === 'Garden view'
						? ROOMS.filter((r) => r.view.toLowerCase().includes('garden'))
						: ROOMS.filter((r) => /aravalli|panoramic|city/i.test(r.view))
	);
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Rooms & Suites"
	title="Rooms & Suites"
	subtitle="Six ways to stay in the palace — from a 42 sqm garden room to a 180 sqm presidential suite with its own plunge pool."
	image={IMAGES.pool}
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" use:reveal>
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter rooms">
		{#each FILTERS as filter (filter)}
			<button
				type="button"
				aria-pressed={active === filter}
				onclick={() => (active = filter)}
				class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition {active === filter
					? 'border-pine bg-pine text-ivory'
					: 'border-line bg-white text-ink hover:border-gold'}"
			>
				{filter}
			</button>
		{/each}
	</div>
	<p class="mt-4 text-sm text-muted" aria-live="polite">
		{filtered.length} {filtered.length === 1 ? 'room' : 'rooms'} shown
	</p>

	{#if filtered.length > 0}
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as room, i (room.slug)}
				<div use:reveal={{ delay: (i % 3) * 80 }} class="min-w-0"><RoomCard {room} /></div>
			{/each}
		</div>
	{:else}
		<p class="mt-8 rounded-md border border-line bg-white p-6 text-muted">
			No rooms match that filter. Try “All” to see every room and suite.
		</p>
	{/if}
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8" use:reveal>
	<h2 class="section-title">Compare at a glance.</h2>
	<div class="mt-8 overflow-x-auto rounded-md border border-line bg-white">
		<table class="w-full min-w-[640px] text-left text-sm">
			<thead>
				<tr class="border-b border-line bg-cream/60 text-xs tracking-[0.14em] text-muted uppercase">
					<th scope="col" class="px-4 py-3 font-semibold">Room</th>
					<th scope="col" class="px-4 py-3 font-semibold">Size</th>
					<th scope="col" class="px-4 py-3 font-semibold">Guests</th>
					<th scope="col" class="px-4 py-3 font-semibold">View</th>
					<th scope="col" class="px-4 py-3 text-right font-semibold">From / night</th>
				</tr>
			</thead>
			<tbody>
				{#each ROOMS as room (room.slug)}
					<tr class="border-b border-line last:border-0">
						<th scope="row" class="min-w-0 px-4 py-3 font-semibold text-ink">
							<a href="/rooms/{room.slug}" class="hover:text-gold-dark">{room.name}</a>
						</th>
						<td class="px-4 py-3 whitespace-nowrap text-muted">{room.size} sqm</td>
						<td class="px-4 py-3 whitespace-nowrap text-muted">Up to {room.occupancy}</td>
						<td class="px-4 py-3 text-muted">{room.view}</td>
						<td class="px-4 py-3 text-right whitespace-nowrap font-semibold text-ink">{inr(room.price)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="mt-4 text-sm text-muted">
		Prices in INR, +18% GST at checkout, breakfast included. Suite rates also include high tea and
		airport transfers.
	</p>
</section>
