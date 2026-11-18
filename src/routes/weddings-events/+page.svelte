<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, usrcset } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { Users, Check, Heart, Briefcase } from '@lucide/svelte';

	const VENUES = [
		{ name: 'Durbar Hall', capacity: 400, note: 'Frescoed hall for ceremonies and receptions, with a private entrance.' },
		{ name: 'The Courtyard', capacity: 800, note: 'Open-air under the stars, fairy lights and a live kitchen.' },
		{ name: 'The Terrace', capacity: 150, note: 'Sunset ceremonies above the old city, for intimate gatherings.' }
	];

	const ROOMS = [
		{ name: 'Sheesh Mahal Boardroom', capacity: 24, setup: 'Boardroom · 24 · Theatre · 40' },
		{ name: 'Rajmahal Conference Room', capacity: 120, setup: 'Theatre · 120 · Classroom · 80 · U-shape · 50' },
		{ name: 'Garden Pavilion', capacity: 200, setup: 'Theatre · 200 · Banquet · 150 · Outdoor breakout lawn' }
	];

	let name = $state('');
	let phone = $state('');
	let type = $state('Wedding');
	let date = $state('');
	let guests = $state(100);
	let submitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[+0-9][0-9\s-]{7,14}$/.test(phone.trim())) errors.phone = 'Please enter a valid phone number.';
		if (!date) errors.date = 'Please choose a date.';
		if (guests < 10 || guests > 1000) errors.guests = 'Guests must be between 10 and 1,000.';
		if (Object.keys(errors).length > 0) return;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-events') ?? '[]') as unknown[];
			existing.push({ name: name.trim(), phone: phone.trim(), type, date, guests, at: new Date().toISOString() });
			localStorage.setItem('aurelia-events', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — enquiry is still confirmed on screen
		}
		submitted = true;
	}
</script>

<PageHero
	eyebrow="Weddings & Events"
	title="A palace made for occasions"
	subtitle="Weddings under the stars, conferences with a courtyard view, and a team that has done this hundreds of times."
	image={IMAGES.wedding}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div use:reveal>
		<p class="eyebrow flex items-center gap-2"><Heart class="h-4 w-4" /> Weddings</p>
		<h2 class="section-title mt-2">Your wedding, in a palace</h2>
		<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">
			Three venues, one dedicated wedding planner, and a kitchen that can feed 800 without rushing a single
			plate. Packages include decor, sound, a bridal suite and a tasting for two.
		</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each VENUES as venue, i (venue.name)}
				<div class="card min-w-0 p-5 sm:p-6" use:reveal={{ delay: i * 90 }}>
					<h3 class="font-display text-2xl font-semibold text-ink">{venue.name}</h3>
					<p class="mt-2 flex items-center gap-2 text-sm font-semibold text-gold-dark"><Users class="h-4 w-4" /> Up to {venue.capacity} guests</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{venue.note}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<div class="min-w-0">
				<p class="eyebrow flex items-center gap-2"><Briefcase class="h-4 w-4" /> Meetings &amp; conferences</p>
				<h2 class="section-title mt-2">Meetings, minus the ballroom beige</h2>
				<p class="mt-4 text-base leading-relaxed text-muted">
					Fast Wi-Fi, proper coffee, natural light and a courtyard for breaks. Day-delegate packages from
					₹3,500 per person, including lunch at The Courtyard and two tea breaks.
				</p>
				<ul class="mt-6 space-y-3 text-sm text-ink/85">
					<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> AV, staging and a technician on site</li>
					<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Group room rates for 10+ rooms</li>
					<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Airport transfers and valet parking</li>
				</ul>
			</div>
			<img src={IMAGES.events} srcset={usrcset(IMAGES.events)} sizes="(max-width: 1024px) 100vw, 50vw" alt="Conference setup at the palace" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-md object-cover" />
		</div>
		<div class="mt-8 grid gap-4 sm:grid-cols-3">
			{#each ROOMS as room, i (room.name)}
				<div class="min-w-0 rounded-md border border-line bg-white p-5" use:reveal={{ delay: i * 90 }}>
					<h3 class="font-display text-xl leading-tight font-semibold text-ink">{room.name}</h3>
					<p class="mt-2 flex items-center gap-2 text-sm font-semibold text-gold-dark"><Users class="h-4 w-4" /> Up to {room.capacity} guests</p>
					<p class="mt-1.5 text-sm text-muted">{room.setup}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mx-auto mt-16 max-w-2xl rounded-md border border-line bg-white p-5 sm:mt-20 sm:p-8" use:reveal>
		<p class="eyebrow">Enquire</p>
		<h2 class="font-display mt-2 text-3xl font-semibold text-ink">Tell us about your event</h2>
		{#if submitted}
			<div class="mt-6 rounded-sm border border-gold/40 bg-cream p-5" role="status">
				<p class="flex items-start gap-2 font-semibold text-pine"><Check class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> Enquiry received</p>
				<p class="mt-2 text-sm leading-relaxed text-ink/80">
					Thank you, {name.trim()}. Your {type.toLowerCase()} enquiry for {guests} guests on {date} is saved.
					Our events team will call {phone.trim()} within one working day.
				</p>
				<button type="button" class="btn-ghost mt-4 !min-h-11 w-full" onclick={() => { submitted = false; name = ''; phone = ''; date = ''; guests = 100; type = 'Wedding'; }}>Send another enquiry</button>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
				<div>
					<label class="label" for="e-name">Full name</label>
					<input id="e-name" class="input" type="text" autocomplete="name" placeholder="Your name" bind:value={name} />
					{#if errors.name}<p class="mt-1 text-xs text-red-800">{errors.name}</p>{/if}
				</div>
				<div>
					<label class="label" for="e-phone">Phone</label>
					<input id="e-phone" class="input" type="tel" autocomplete="tel" placeholder="+91 98765 43210" bind:value={phone} />
					{#if errors.phone}<p class="mt-1 text-xs text-red-800">{errors.phone}</p>{/if}
				</div>
				<div>
					<label class="label" for="e-type">Event type</label>
					<select id="e-type" class="input" bind:value={type}>
						<option>Wedding</option>
						<option>Reception</option>
						<option>Conference</option>
						<option>Corporate offsite</option>
						<option>Private celebration</option>
					</select>
				</div>
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label class="label" for="e-date">Preferred date</label>
						<input id="e-date" class="input" type="date" bind:value={date} />
						{#if errors.date}<p class="mt-1 text-xs text-red-800">{errors.date}</p>{/if}
					</div>
					<div>
						<label class="label" for="e-guests">Guests</label>
						<input id="e-guests" class="input" type="number" min="10" max="1000" bind:value={guests} />
						{#if errors.guests}<p class="mt-1 text-xs text-red-800">{errors.guests}</p>{/if}
					</div>
				</div>
				<button type="submit" class="btn-gold w-full"><Heart class="h-4 w-4" /> Send Enquiry</button>
				<p class="text-center text-xs text-muted">Packages from ₹8.5 lakh for weddings and ₹3,500 per delegate for conferences. Final quote after a site visit.</p>
				<p class="mt-3 text-center text-sm"><a href="/meetings" class="font-medium text-gold-dark underline decoration-gold/50 underline-offset-4 transition hover:text-gold">Planning a corporate event instead? See Meetings & Conferences</a></p>
			</form>
		{/if}
	</div>
</section>
