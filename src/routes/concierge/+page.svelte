<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, HOTEL } from '#lib/data/hotel';
	import { SERVICES, CONCIERGE_TEAM } from '#lib/data/concierge';
	import { reveal } from '#lib/reveal';
	import { Car, Plane, Landmark, UtensilsCrossed, ShoppingBag, Ticket, PartyPopper, BellRing, ArrowRight, Check, Clock, Phone } from '@lucide/svelte';

	const ICONS = {
		car: Car,
		plane: Plane,
		landmark: Landmark,
		utensils: UtensilsCrossed,
		shopping: ShoppingBag,
		ticket: Ticket,
		party: PartyPopper,
		bell: BellRing
	} as const;

	let name = $state('');
	let phone = $state('');
	let service = $state(SERVICES[0].id);
	let date = $state('');
	let message = $state('');
	let submitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[+0-9][0-9\s-]{7,14}$/.test(phone.trim())) errors.phone = 'Please enter a valid phone number.';
		if (!date) errors.date = 'Please choose a date.';
		if (!message.trim()) errors.message = 'Tell us briefly what you would like arranged.';
		if (Object.keys(errors).length > 0) return;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-concierge') ?? '[]') as unknown[];
			existing.push({ name: name.trim(), phone: phone.trim(), service, date, message: message.trim(), at: new Date().toISOString() });
			localStorage.setItem('aurelia-concierge', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — request is still confirmed on screen
		}
		submitted = true;
	}
</script>

<PageHero
	eyebrow="Concierge"
	title="Ask. It is probably already arranged."
	subtitle="One call, one desk, one team that knows Jaipur properly. Transfers, tours, tables, tickets and surprises — arranged quietly, while you enjoy the palace."
	image={IMAGES.heritage}
/>

<!-- Services grid -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="max-w-2xl" use:reveal>
		<p class="eyebrow">What we arrange</p>
		<h2 class="section-title mt-2">Eight ways the concierge earns its keep</h2>
		<p class="mt-3 text-base leading-relaxed text-muted">
			Every service is arranged by the desk in the lobby — in person, by phone on {HOTEL.phone}, or through the form below.
			If it is not on this list, ask anyway.
		</p>
	</div>
	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each SERVICES as svc, i (svc.id)}
			{@const Icon = ICONS[svc.icon]}
			<article class="card flex flex-col p-6" use:reveal={{ delay: (i % 3) * 100 }}>
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-pine text-gold"><Icon class="h-5 w-5" /></span>
				<h3 class="font-display mt-4 text-2xl font-semibold">{svc.title}</h3>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">{svc.text}</p>
				<ul class="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
					<li class="chip"><Clock class="mr-1.5 h-3.5 w-3.5 text-gold-dark" /> {svc.duration}</li>
					<li class="chip">From {svc.priceFrom}</li>
				</ul>
			</article>
		{/each}
		<article class="flex flex-col justify-between rounded-md bg-pine p-6 text-ivory sm:p-8" use:reveal={{ delay: 200 }}>
			<div>
				<p class="eyebrow !text-gold">Something else?</p>
				<h3 class="font-display mt-3 text-2xl font-semibold">If it exists in Jaipur, we can arrange it.</h3>
				<p class="mt-2 text-sm leading-relaxed text-ivory/85 sm:text-base">
					A block-printing workshop, a sunrise at Amber Fort, a jeweller who opens early just for you.
					Tell the concierge what you have in mind.
				</p>
			</div>
			<a href="#request" class="btn-gold mt-6 w-full sm:w-auto">Ask the Concierge <ArrowRight class="h-4 w-4" /></a>
		</article>
	</div>
</section>

<!-- Meet the concierge -->
<section class="bg-cream/60 py-14 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-2xl" use:reveal>
			<p class="eyebrow">Meet the concierge</p>
			<h2 class="section-title mt-2">The people behind the yes</h2>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each CONCIERGE_TEAM as member, i (member.name)}
				<article class="card flex gap-5 p-6 sm:p-8" use:reveal={{ delay: i * 100 }}>
					<span class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-pine font-display text-2xl font-semibold text-gold sm:h-20 sm:w-20 sm:text-3xl">{member.initials}</span>
					<div class="min-w-0">
						<h3 class="font-display text-2xl font-semibold">{member.name}</h3>
						<p class="text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase">{member.role}</p>
						<p class="mt-3 text-sm leading-relaxed text-muted sm:text-base">{member.detail}</p>
					</div>
				</article>
			{/each}
		</div>
		<p class="mt-6 flex items-start gap-2 text-sm text-muted" use:reveal>
			<Phone class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
			The concierge desk is in the lobby, open 24 hours — or call {HOTEL.phone} and ask for the concierge.
		</p>
	</div>
</section>

<!-- Request form -->
<section id="request" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid items-start gap-10 lg:grid-cols-5 lg:gap-16">
		<div class="lg:col-span-2" use:reveal>
			<p class="eyebrow">Make a request</p>
			<h2 class="section-title mt-2">Tell us what you need</h2>
			<p class="mt-4 max-w-xl text-base leading-relaxed text-muted">
				Fill in the form and the concierge will call you back within 30 minutes, between 7 AM and 10 PM.
				For anything urgent, call the desk directly — it is staffed around the clock.
			</p>
			<ul class="mt-6 space-y-3 text-sm text-muted">
				<li class="flex gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> No booking fee on tickets and reservations — you pay at cost</li>
				<li class="flex gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Shopping assistance is complimentary for guests</li>
				<li class="flex gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Most requests confirmed within the hour</li>
			</ul>
		</div>

		{#if submitted}
			<div class="rounded-md border border-line bg-white p-6 text-center sm:p-10 lg:col-span-3" use:reveal>
				<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pine text-gold"><Check class="h-6 w-6" /></span>
				<h3 class="font-display mt-5 text-3xl font-semibold">Thank you, {name.trim()}.</h3>
				<p class="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
					Your request for <strong class="text-ink">{SERVICES.find((s) => s.id === service)?.title}</strong> on
					<strong class="text-ink">{date}</strong> is with the concierge. They will call you on {phone.trim()} within 30 minutes, between 7 AM and 10 PM.
				</p>
				<button type="button" class="btn-ghost mt-6" onclick={() => { submitted = false; message = ''; date = ''; }}>Make another request</button>
			</div>
		{:else}
			<form class="card p-6 sm:p-8 lg:col-span-3" novalidate onsubmit={submit} use:reveal>
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label class="label" for="concierge-name">Full name</label>
						<input id="concierge-name" class="input" type="text" autocomplete="name" placeholder="Aarav Verma" bind:value={name} />
						{#if errors.name}<p class="mt-1 text-sm text-red-800">{errors.name}</p>{/if}
					</div>
					<div>
						<label class="label" for="concierge-phone">Phone</label>
						<input id="concierge-phone" class="input" type="tel" autocomplete="tel" placeholder="+91 98765 43210" bind:value={phone} />
						{#if errors.phone}<p class="mt-1 text-sm text-red-800">{errors.phone}</p>{/if}
					</div>
					<div>
						<label class="label" for="concierge-service">Service</label>
						<select id="concierge-service" class="input" bind:value={service}>
							{#each SERVICES as svc (svc.id)}
								<option value={svc.id}>{svc.title} — from {svc.priceFrom}</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="label" for="concierge-date">Date</label>
						<input id="concierge-date" class="input" type="date" bind:value={date} />
						{#if errors.date}<p class="mt-1 text-sm text-red-800">{errors.date}</p>{/if}
					</div>
				</div>
				<div class="mt-5">
					<label class="label" for="concierge-message">What would you like arranged?</label>
					<textarea id="concierge-message" class="input min-h-28 resize-y" placeholder="e.g. Airport pickup for two on Friday morning, flight lands 9:40 AM, Jaguar if available." bind:value={message}></textarea>
					{#if errors.message}<p class="mt-1 text-sm text-red-800">{errors.message}</p>{/if}
				</div>
				<button type="submit" class="btn-gold mt-6 w-full sm:w-auto">Send to the Concierge <ArrowRight class="h-4 w-4" /></button>
				<p class="mt-3 text-xs leading-relaxed text-muted">The concierge replies within 30 minutes, 7 AM – 10 PM. Your request is saved on this device only.</p>
			</form>
		{/if}
	</div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
	<div class="flex flex-col gap-4 rounded-md bg-pine p-6 text-ivory sm:flex-row sm:items-center sm:justify-between sm:p-8" use:reveal>
		<div class="min-w-0">
			<p class="font-display text-2xl font-semibold sm:text-3xl">Staying with us already?</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/85 sm:text-base">Members of Aurelia Circle get priority concierge hours and complimentary shopping assistance on every stay.</p>
		</div>
		<a href="/loyalty" class="btn-gold shrink-0">Join Aurelia Circle</a>
	</div>
</section>
