<script lang="ts">
	import { ArrowRight, BedDouble, Check, Eye, Info, Maximize, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr, ROOMS, usrcset } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	let selectedSlugs = $state<string[]>([ROOMS[0].slug, ROOMS[1].slug]);

	const selected = $derived(ROOMS.filter((room) => selectedSlugs.includes(room.slug)));
	const canAddMore = $derived(selectedSlugs.length < 3);

	function toggle(slug: string) {
		if (selectedSlugs.includes(slug)) {
			selectedSlugs = selectedSlugs.filter((s) => s !== slug);
		} else if (canAddMore) {
			selectedSlugs = [...selectedSlugs, slug];
		}
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Rooms"
	title="Compare rooms, side by side"
	subtitle="Pick up to three rooms and see size, occupancy, bed, view, price and amenities in one table — then check availability for the one that fits."
	image={IMAGES.resort}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div use:reveal>
		<p class="eyebrow">Choose up to 3 rooms</p>
		<h2 class="section-title mt-2">Tap to add a room to the comparison</h2>
		<p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
			{selectedSlugs.length} of 3 selected. Untick a room to remove it, or tick another to add it.
		</p>
	</div>

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" use:reveal>
		{#each ROOMS as room, i (room.slug)}
			{@const isSelected = selectedSlugs.includes(room.slug)}
			{@const isDisabled = !isSelected && !canAddMore}
			<button
				type="button"
				class="card min-w-0 overflow-hidden p-0 text-left {isSelected ? 'ring-2 ring-gold' : ''} {isDisabled ? 'opacity-55' : ''}"
				onclick={() => toggle(room.slug)}
				aria-pressed={isSelected}
				disabled={isDisabled}
			>
				<span class="relative block">
					<img
						src={room.image}
						srcset={usrcset(room.image)}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						alt={room.name}
						loading="lazy"
						decoding="async"
						class="aspect-[16/10] w-full object-cover"
					/>
					<span
						class="absolute top-3 left-3 flex min-h-11 min-w-11 items-center justify-center rounded-sm {isSelected
							? 'bg-gold text-white'
							: 'bg-white/90 text-ink'}"
						aria-hidden="true"
					>
						{#if isSelected}<Check class="h-5 w-5" />{:else}<span class="text-sm font-semibold">{i + 1}</span>{/if}
					</span>
				</span>
				<span class="block p-5">
					<span class="font-display block text-xl leading-tight font-semibold">{room.name}</span>
					<span class="mt-1 block text-sm text-muted">{room.short}</span>
					<span class="mt-3 flex items-baseline gap-2">
						<span class="font-display text-xl font-semibold text-gold-dark">{inr(room.price)}</span>
						<span class="text-xs text-muted">/ night</span>
						<span class="ml-auto text-xs text-muted">{room.size} sqm · up to {room.occupancy}</span>
					</span>
					<span class="mt-3 block text-sm font-semibold {isSelected ? 'text-gold-dark' : 'text-ink/70'}">
						{isSelected ? 'Selected for comparison' : isDisabled ? 'Remove a room to add this one' : 'Tap to add to comparison'}
					</span>
				</span>
			</button>
		{/each}
	</div>

	{#if selected.length < 2}
		<div class="card mt-8 flex min-w-0 items-start gap-3 p-6" use:reveal>
			<Info class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
			<div class="min-w-0">
				<h2 class="font-display text-2xl font-semibold">Pick at least 2 rooms to compare</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					{#if selected.length === 1}
						You have {selected[0].name} selected. Tap one more room above to see them side by side.
					{:else}
						Tap any two rooms above and the comparison table will appear here.
					{/if}
				</p>
			</div>
		</div>
	{:else}
		<div class="mt-10" use:reveal>
			<p class="eyebrow">The comparison</p>
			<h2 class="section-title mt-2">How they measure up</h2>
		</div>
		<div class="mt-6 overflow-x-auto rounded-md border border-line bg-white" use:reveal>
			<table class="w-full min-w-[640px] border-collapse text-left text-sm">
				<thead>
					<tr class="align-top">
						<th scope="col" class="min-w-28 border-b border-line p-4 align-bottom text-xs font-semibold tracking-wide text-muted uppercase">Feature</th>
						{#each selected as room (room.slug)}
							<th scope="col" class="min-w-44 border-b border-line p-4">
								<img
									src={room.image}
									srcset={usrcset(room.image, [480, 800])}
									sizes="240px"
									alt={room.name}
									loading="lazy"
									decoding="async"
									class="aspect-[16/10] w-full rounded-sm object-cover"
								/>
								<span class="font-display mt-3 block text-lg leading-tight font-semibold">{room.name}</span>
								<a href="/book?room={room.slug}" class="btn-gold mt-3 inline-flex min-h-11 items-center"
									>Check availability <span class="sr-only">for {room.name}</span> <ArrowRight class="h-4 w-4" /></a
								>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" class="border-b border-line p-4 font-semibold">Price / night</th>
						{#each selected as room (room.slug)}
							<td class="border-b border-line p-4">
								<span class="font-display text-xl font-semibold text-gold-dark">{inr(room.price)}</span>
								<span class="block text-xs text-muted">Breakfast included</span>
							</td>
						{/each}
					</tr>
					<tr>
						<th scope="row" class="border-b border-line p-4 font-semibold">Size</th>
						{#each selected as room (room.slug)}
							<td class="border-b border-line p-4">
								<span class="flex items-center gap-2"><Maximize class="h-4 w-4 shrink-0 text-gold-dark" /> {room.size} sqm</span>
							</td>
						{/each}
					</tr>
					<tr>
						<th scope="row" class="border-b border-line p-4 font-semibold">Occupancy</th>
						{#each selected as room (room.slug)}
							<td class="border-b border-line p-4">
								<span class="flex items-center gap-2"><Users class="h-4 w-4 shrink-0 text-gold-dark" /> Up to {room.occupancy} guests</span>
							</td>
						{/each}
					</tr>
					<tr>
						<th scope="row" class="border-b border-line p-4 font-semibold">Bed</th>
						{#each selected as room (room.slug)}
							<td class="border-b border-line p-4">
								<span class="flex items-center gap-2"><BedDouble class="h-4 w-4 shrink-0 text-gold-dark" /> {room.bed}</span>
							</td>
						{/each}
					</tr>
					<tr>
						<th scope="row" class="border-b border-line p-4 font-semibold">View</th>
						{#each selected as room (room.slug)}
							<td class="border-b border-line p-4">
								<span class="flex items-center gap-2"><Eye class="h-4 w-4 shrink-0 text-gold-dark" /> {room.view}</span>
							</td>
						{/each}
					</tr>
					<tr>
						<th scope="row" class="p-4 align-top font-semibold">Key amenities</th>
						{#each selected as room (room.slug)}
							<td class="p-4">
								<ul class="space-y-2">
									{#each room.amenities.slice(0, 5) as amenity (amenity)}
										<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {amenity}</li>
									{/each}
								</ul>
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		<p class="mt-4 text-sm text-muted" use:reveal>
			All rates include breakfast at The Courtyard and taxes as shown at checkout. Suites include high tea and airport transfers.
			<a href="/rooms" class="font-semibold text-gold-dark underline underline-offset-2">See all rooms</a>.
		</p>
	{/if}
</section>
