<script lang="ts">
	import { BedDouble, Users, Maximize, Eye } from '@lucide/svelte';
	import { inr, usrcset, type Room } from '#lib/data/hotel';

	let { room }: { room: Room } = $props();
</script>

<article class="card group min-w-0">
	<a href="/rooms/{room.slug}" class="block overflow-hidden" aria-label={room.name}>
		<img
			src={room.image}
			srcset={usrcset(room.image)}
			sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
			alt={room.name}
			loading="lazy"
			decoding="async"
			class="aspect-[4/3] w-full object-cover transition duration-[600ms] ease-out group-hover:scale-[1.04]"
		/>
	</a>
	<div class="p-5">
		<div class="flex items-start justify-between gap-3">
			<h3 class="font-display min-w-0 text-2xl leading-tight font-semibold text-ink">
				<a href="/rooms/{room.slug}" class="transition hover:text-gold-dark">{room.name}</a>
			</h3>
			<p class="shrink-0 text-right">
				<span class="font-display block text-xl font-semibold text-ink">{inr(room.price)}</span>
				<span class="text-xs text-muted">/ night</span>
			</p>
		</div>
		<p class="mt-2 text-sm leading-relaxed text-muted">{room.short}</p>
		<ul class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink/75">
			<li class="flex items-center gap-1.5"><Maximize class="h-3.5 w-3.5 text-gold-dark" /> {room.size} sqm</li>
			<li class="flex items-center gap-1.5"><Users class="h-3.5 w-3.5 text-gold-dark" /> Up to {room.occupancy} guests</li>
			<li class="flex items-center gap-1.5"><BedDouble class="h-3.5 w-3.5 text-gold-dark" /> {room.bed}</li>
			<li class="flex items-center gap-1.5"><Eye class="h-3.5 w-3.5 text-gold-dark" /> {room.view}</li>
		</ul>
		<div class="mt-5 flex gap-2">
			<a href="/rooms/{room.slug}" class="btn-pine flex-1 !min-h-11 !px-4">View Room</a>
			<a href="/book?room={room.slug}" class="btn-gold flex-1 !min-h-11 !px-4">Book This Room</a>
		</div>
	</div>
</article>
