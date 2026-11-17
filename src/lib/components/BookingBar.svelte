<script lang="ts">
	import { goto } from '$app/navigation';
	import { CalendarDays, Users, Search } from '@lucide/svelte';

	let {
		compact = false,
		initialCheckIn,
		initialCheckOut,
		initialGuests,
		initialRooms
	}: {
		compact?: boolean;
		initialCheckIn?: string;
		initialCheckOut?: string;
		initialGuests?: number;
		initialRooms?: number;
	} = $props();

	function todayPlus(n: number): string {
		const d = new Date();
		d.setDate(d.getDate() + n);
		return d.toISOString().slice(0, 10);
	}

	// svelte-ignore state_referenced_locally — these props are intentionally initial-only values.
	let checkIn = $state(initialCheckIn ?? todayPlus(7));
	// svelte-ignore state_referenced_locally
	let checkOut = $state(initialCheckOut ?? todayPlus(9));
	// svelte-ignore state_referenced_locally
	let guests = $state(initialGuests ?? 2);
	// svelte-ignore state_referenced_locally
	let rooms = $state(initialRooms ?? 1);

	// svelte-ignore state_referenced_locally
	if (typeof window !== 'undefined' && !initialCheckIn) {
		try {
			const saved = JSON.parse(localStorage.getItem('aurelia-search') ?? '{}');
			if (saved.checkIn) checkIn = saved.checkIn;
			if (saved.checkOut) checkOut = saved.checkOut;
			if (saved.guests) guests = saved.guests;
			if (saved.rooms) rooms = saved.rooms;
		} catch {
			/* ignore */
		}
	}

	function search() {
		const q = new URLSearchParams({ checkIn, checkOut, guests: String(guests), rooms: String(rooms) });
		try {
			localStorage.setItem('aurelia-search', JSON.stringify({ checkIn, checkOut, guests, rooms }));
		} catch {
			/* ignore */
		}
		goto(`/book?${q.toString()}`);
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		search();
	}}
	class="grid w-full gap-3 rounded-md border border-line bg-white p-3 shadow-[0_16px_40px_rgba(28,26,23,0.14)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] {compact
		? ''
		: ''}"
	aria-label="Check availability"
>
	<label class="block min-w-0">
		<span class="label flex items-center gap-1.5"><CalendarDays class="h-3.5 w-3.5" /> Check-in</span>
		<input type="date" class="input" bind:value={checkIn} min={todayPlus(0)} required />
	</label>
	<label class="block min-w-0">
		<span class="label flex items-center gap-1.5"><CalendarDays class="h-3.5 w-3.5" /> Check-out</span>
		<input type="date" class="input" bind:value={checkOut} min={checkIn} required />
	</label>
	<label class="block min-w-0">
		<span class="label flex items-center gap-1.5"><Users class="h-3.5 w-3.5" /> Guests</span>
		<select class="input" bind:value={guests} aria-label="Guests">
			{#each [1, 2, 3, 4, 5, 6] as n (n)}<option value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>{/each}
		</select>
	</label>
	<label class="block min-w-0">
		<span class="label">Rooms</span>
		<select class="input" bind:value={rooms} aria-label="Rooms">
			{#each [1, 2, 3, 4] as n (n)}<option value={n}>{n} {n === 1 ? 'room' : 'rooms'}</option>{/each}
		</select>
	</label>
	<button type="submit" class="btn-gold w-full sm:col-span-2 lg:col-span-1 lg:self-end">
		<Search class="h-4 w-4" /> Check Availability
	</button>
</form>
