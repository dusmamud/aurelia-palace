<script lang="ts">
	import { BadgeCheck, CalendarDays, Clock, Mail, MapPin, Phone, Send, Users } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { DINING, HOTEL, IMAGES } from '#lib/data/hotel';
	import { popIn } from '#lib/motion';
	import { reveal } from '#lib/reveal';

	const LUNCH_SLOTS = ['12:00', '13:00', '14:00'];
	const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00'];

	function todayStr(): string {
		const d = new Date();
		return d.toISOString().slice(0, 10);
	}

	function makeRef(prefix: string): string {
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		return prefix + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
	}

	let outlet = $state(DINING[0].slug);
	let date = $state(todayStr());
	let time = $state('20:00');
	let party = $state(2);
	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let requests = $state('');
	let error = $state('');
	let reference = $state('');
	let saved = $state(false);

	const today = todayStr();
	const chosen = $derived(DINING.find((d) => d.slug === outlet) ?? DINING[0]);

	function fmtDate(s: string): string {
		return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
		if (!name.trim() || !email.trim() || !phone.trim() || !date || !time) {
			error = 'Please fill in all required fields.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (!/^[6-9]\d{9}$/.test(digits)) {
			error = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.';
			return;
		}
		if (party < 1 || party > 12) {
			error = 'Party size must be between 1 and 12 guests. For larger parties, please call the concierge.';
			return;
		}
		reference = makeRef('AP-TBL-');
		const booking = {
			reference,
			outlet: chosen.name,
			date,
			time,
			party,
			name: name.trim(),
			phone: digits,
			email: email.trim(),
			requests: requests.trim(),
			at: new Date().toISOString()
		};
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-table') ?? '[]');
			list.push(booking);
			localStorage.setItem('aurelia-table', JSON.stringify(list));
		} catch {
			/* storage unavailable — the confirmation is still shown on screen */
		}
		saved = true;
	}

	function reset() {
		outlet = DINING[0].slug;
		date = todayStr();
		time = '20:00';
		party = 2;
		name = '';
		phone = '';
		email = '';
		requests = '';
		error = '';
		reference = '';
		saved = false;
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Dining"
	title="Reserve a table"
	subtitle="Saffron, The Courtyard or Zoya at sunset — pick your restaurant, your time, and the palace will have the table ready."
	image={IMAGES.pool2}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	{#if saved}
		<div class="card mx-auto max-w-2xl p-6 sm:p-8" use:popIn>
			<BadgeCheck class="h-10 w-10 text-gold-dark" />
			<h2 class="font-display mt-4 text-3xl font-semibold">Your table is reserved</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Thank you, {name.trim()}. A confirmation has been sent to {email.trim()}. Please show your reference at the restaurant entrance.
			</p>
			<p class="mt-5 text-sm text-muted">Reservation reference</p>
			<p class="font-mono text-2xl font-semibold tracking-wider text-gold-dark">{reference}</p>
			<dl class="mt-6 space-y-3 border-t border-line pt-6 text-sm">
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Restaurant</dt><dd class="font-semibold">{chosen.name} · {chosen.kind}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Date</dt><dd class="font-semibold">{fmtDate(date)}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Time</dt><dd class="font-semibold">{time}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Party size</dt><dd class="font-semibold">{party} {party === 1 ? 'guest' : 'guests'}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Name</dt><dd class="font-semibold">{name.trim()}</dd></div>
				<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Phone</dt><dd class="font-semibold">+91 {phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')}</dd></div>
				{#if requests.trim()}
					<div class="flex flex-wrap justify-between gap-2"><dt class="text-muted">Special requests</dt><dd class="max-w-md text-right font-semibold">{requests.trim()}</dd></div>
				{/if}
			</dl>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<button type="button" class="btn-gold min-h-11" onclick={reset}>Make another reservation</button>
				<a href="/dining" class="btn-ghost min-h-11">Browse our restaurants</a>
			</div>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-3">
			<form class="min-w-0 lg:col-span-2" onsubmit={submit} use:reveal>
				<p class="eyebrow">Table reservation</p>
				<h2 class="section-title mt-2">Book in under a minute</h2>
				<p class="mt-3 text-sm leading-relaxed text-muted sm:text-base">
					Tables are held for 15 minutes past the reservation time. For parties above 12, please call
					<a href="tel:{HOTEL.phoneHref}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.phone}</a>.
				</p>

				{#if error}
					<p role="alert" class="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">{error}</p>
				{/if}

				<div class="mt-8 grid gap-5 sm:grid-cols-2">
					<label class="min-w-0 sm:col-span-2">
						<span class="label">Restaurant *</span>
						<select class="input min-h-11" bind:value={outlet} required>
							{#each DINING as d (d.slug)}
								<option value={d.slug}>{d.name} — {d.kind} · {d.hours}</option>
							{/each}
						</select>
					</label>
					<label class="min-w-0">
						<span class="label">Date *</span>
						<input type="date" class="input min-h-11" bind:value={date} min={today} required />
					</label>
					<label class="min-w-0">
						<span class="label">Party size *</span>
						<select class="input min-h-11" bind:value={party} required>
							{#each Array.from({ length: 12 }, (_, i) => i + 1) as n (n)}
								<option value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
							{/each}
						</select>
					</label>
				</div>

				<fieldset class="mt-8 min-w-0">
					<legend class="label">Time *</legend>
					<p class="mt-1 text-xs text-muted">Lunch</p>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each LUNCH_SLOTS as slot (slot)}
							<button
								type="button"
								class="min-h-11 rounded-sm border px-4 text-sm font-semibold {time === slot
									? 'border-gold-dark bg-gold-dark text-white'
									: 'border-line bg-white text-ink'}"
								onclick={() => (time = slot)}
								aria-pressed={time === slot}>{slot}</button
							>
						{/each}
					</div>
					<p class="mt-4 text-xs text-muted">Dinner</p>
					<div class="mt-2 flex flex-wrap gap-2">
						{#each DINNER_SLOTS as slot (slot)}
							<button
								type="button"
								class="min-h-11 rounded-sm border px-4 text-sm font-semibold {time === slot
									? 'border-gold-dark bg-gold-dark text-white'
									: 'border-line bg-white text-ink'}"
								onclick={() => (time = slot)}
								aria-pressed={time === slot}>{slot}</button
							>
						{/each}
					</div>
				</fieldset>

				<div class="mt-8 grid gap-5 sm:grid-cols-2">
					<label class="min-w-0">
						<span class="label">Full name *</span>
						<input class="input min-h-11" bind:value={name} placeholder="Your full name" autocomplete="name" required />
					</label>
					<label class="min-w-0">
						<span class="label">Phone (+91) *</span>
						<input
							type="tel"
							class="input min-h-11"
							bind:value={phone}
							placeholder="98765 43210"
							autocomplete="tel"
							inputmode="tel"
							required
						/>
					</label>
					<label class="min-w-0 sm:col-span-2">
						<span class="label">Email *</span>
						<input
							type="email"
							class="input min-h-11"
							bind:value={email}
							placeholder="you@example.com"
							autocomplete="email"
							required
						/>
					</label>
					<label class="min-w-0 sm:col-span-2">
						<span class="label">Special requests</span>
						<textarea
							class="input min-h-28 resize-y"
							bind:value={requests}
							placeholder="Birthday, window seat, dietary needs, high chair…"
						></textarea>
					</label>
				</div>

				<button type="submit" class="btn-gold mt-8 min-h-11 w-full sm:w-auto">
					<Send class="h-4 w-4" /> Reserve My Table
				</button>
			</form>

			<aside class="min-w-0" use:reveal>
				<div class="card p-6">
					<h3 class="font-display text-2xl font-semibold">{chosen.name}</h3>
					<p class="mt-1 text-sm text-muted">{chosen.kind}</p>
					<p class="mt-4 text-sm leading-relaxed text-muted">{chosen.description}</p>
					<ul class="mt-5 space-y-3 text-sm">
						<li class="flex items-center gap-2"><Clock class="h-4 w-4 shrink-0 text-gold-dark" /> {chosen.hours}</li>
						<li class="flex items-center gap-2"><Users class="h-4 w-4 shrink-0 text-gold-dark" /> {chosen.price}</li>
						<li class="flex items-center gap-2"><CalendarDays class="h-4 w-4 shrink-0 text-gold-dark" /> Tables held 15 minutes past time</li>
					</ul>
				</div>
				<div class="card mt-4 p-6">
					<h3 class="font-display text-2xl font-semibold">Need help?</h3>
					<ul class="mt-4 space-y-3 text-sm">
						<li class="flex items-center gap-2">
							<Phone class="h-4 w-4 shrink-0 text-gold-dark" />
							<a href="tel:{HOTEL.phoneHref}" class="font-semibold text-gold-dark underline underline-offset-2">{HOTEL.phone}</a>
						</li>
						<li class="flex items-center gap-2">
							<Mail class="h-4 w-4 shrink-0 text-gold-dark" />
							<a href="mailto:{HOTEL.email}" class="break-all font-semibold text-gold-dark underline underline-offset-2">{HOTEL.email}</a>
						</li>
						<li class="flex items-start gap-2">
							<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> <span class="text-muted">{HOTEL.address}</span>
						</li>
					</ul>
					<a href="/dining" class="btn-ghost mt-5 min-h-11">View all restaurants</a>
				</div>
			</aside>
		</div>
	{/if}
</section>
