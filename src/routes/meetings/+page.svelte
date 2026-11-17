<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr } from '#lib/data/hotel';
	import { VENUES, DAY_DELEGATE, TEAM_BUILDING, CLIENTS, LAYOUTS } from '#lib/data/meetings';
	import { reveal } from '#lib/reveal';
	import {
		Briefcase, Users, Wifi, Monitor, Presentation, Coffee, UtensilsCrossed, UserCheck,
		Check, ArrowRight, CalendarDays, Sparkles, Phone, Mail
	} from '@lucide/svelte';

	let company = $state('');
	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let delegates = $state(20);
	let layout = $state('Theatre');
	let submitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (company.trim().length < 2) errors.company = 'Please enter your company name.';
		if (name.trim().length < 2) errors.name = 'Please enter a contact name.';
		if (!/^[+0-9][0-9\s-]{7,14}$/.test(phone.trim())) errors.phone = 'Please enter a valid phone number.';
		if (!date) errors.date = 'Please choose a date.';
		if (delegates < 5 || delegates > 200) errors.delegates = 'Delegates must be between 5 and 200.';
		if (Object.keys(errors).length > 0) return;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-meetings') ?? '[]') as unknown[];
			existing.push({ company: company.trim(), name: name.trim(), phone: phone.trim(), date, delegates, layout, at: new Date().toISOString() });
			localStorage.setItem('aurelia-meetings', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — enquiry is still confirmed on screen
		}
		submitted = true;
	}
</script>

<PageHero
	eyebrow="Meetings & Conferences"
	title="Business, done the palace way"
	subtitle="Board meetings, offsites and summits with natural light, fast Wi-Fi, proper coffee — and a courtyard to think in between sessions."
	image={IMAGES.events}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<!-- Stats strip -->
	<div class="grid grid-cols-2 gap-4 lg:grid-cols-4" use:reveal>
		<div class="rounded-md border border-line bg-white p-5 text-center">
			<p class="font-display text-4xl font-semibold text-pine">4</p>
			<p class="mt-1 text-xs font-semibold tracking-[0.18em] text-muted uppercase">Meeting venues</p>
		</div>
		<div class="rounded-md border border-line bg-white p-5 text-center">
			<p class="font-display text-4xl font-semibold text-pine">200</p>
			<p class="mt-1 text-xs font-semibold tracking-[0.18em] text-muted uppercase">Max delegates</p>
		</div>
		<div class="rounded-md border border-line bg-white p-5 text-center">
			<p class="font-display text-4xl font-semibold text-pine">{inr(DAY_DELEGATE.price)}</p>
			<p class="mt-1 text-xs font-semibold tracking-[0.18em] text-muted uppercase">Day delegate package</p>
		</div>
		<div class="rounded-md border border-line bg-white p-5 text-center">
			<p class="font-display text-4xl font-semibold text-pine">1:1</p>
			<p class="mt-1 text-xs font-semibold tracking-[0.18em] text-muted uppercase">Dedicated coordinator</p>
		</div>
	</div>

	<!-- Venues -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow flex items-center gap-2"><Briefcase class="h-4 w-4" /> Venues</p>
		<h2 class="section-title mt-2">Four rooms, every scale of meeting</h2>
		<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">
			From a 14-seat boardroom to a 200-delegate pavilion. Every venue has natural light, blackout on request,
			and a technician who stays for the whole day.
		</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-2">
			{#each VENUES as venue, i (venue.name)}
				<article class="card min-w-0" use:reveal={{ delay: i * 90 }}>
					<img src={venue.image} alt={venue.name} loading="lazy" class="aspect-[16/9] w-full object-cover" />
					<div class="p-5 sm:p-6">
						<div class="flex items-start justify-between gap-3">
							<h3 class="font-display text-2xl leading-tight font-semibold text-ink">{venue.name}</h3>
							<span class="chip shrink-0">{venue.size}</span>
						</div>
						<p class="mt-2 text-sm leading-relaxed text-muted">{venue.short}</p>
						<div class="mt-4 flex flex-wrap gap-2">
							<span class="chip"><Users class="mr-1.5 h-3.5 w-3.5 text-gold-dark" /> Theatre · {venue.layouts.theatre}</span>
							<span class="chip">Classroom · {venue.layouts.classroom}</span>
							<span class="chip">Boardroom · {venue.layouts.boardroom}</span>
							<span class="chip">U-shape · {venue.layouts.ushape}</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<!-- Capacity table -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<h2 class="section-title">Capacity at a glance</h2>
		<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">Maximum delegates by seating layout. Tell us your headcount and we will suggest the right room.</p>
		<div class="mt-6 overflow-x-auto rounded-md border border-line bg-white">
			<table class="w-full min-w-[560px] text-left text-sm">
				<thead>
					<tr class="border-b border-line bg-cream text-xs font-semibold tracking-[0.14em] text-muted uppercase">
						<th scope="col" class="px-4 py-3 sm:px-5">Venue</th>
						<th scope="col" class="px-4 py-3">Theatre</th>
						<th scope="col" class="px-4 py-3">Classroom</th>
						<th scope="col" class="px-4 py-3">Boardroom</th>
						<th scope="col" class="px-4 py-3">U-shape</th>
					</tr>
				</thead>
				<tbody>
					{#each VENUES as venue (venue.name)}
						<tr class="border-b border-line last:border-0">
							<th scope="row" class="px-4 py-3.5 font-semibold text-ink sm:px-5">{venue.name}</th>
							<td class="px-4 py-3.5">{venue.layouts.theatre}</td>
							<td class="px-4 py-3.5">{venue.layouts.classroom}</td>
							<td class="px-4 py-3.5">{venue.layouts.boardroom}</td>
							<td class="px-4 py-3.5">{venue.layouts.ushape}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- AV & services -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<div class="min-w-0">
				<p class="eyebrow flex items-center gap-2"><Monitor class="h-4 w-4" /> Included in every booking</p>
				<h2 class="section-title mt-2">The tech just works</h2>
				<p class="mt-4 text-base leading-relaxed text-muted">
					No borrowed projectors, no buffering on the video call. Our AV is in-house, tested the morning
					of your meeting, and backed by a technician on site.
				</p>
				<ul class="mt-6 grid gap-3 sm:grid-cols-2">
					<li class="flex items-start gap-2 text-sm text-ink/85"><Wifi class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> High-speed Wi-Fi for every delegate</li>
					<li class="flex items-start gap-2 text-sm text-ink/85"><Presentation class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Projector, screen and PA system</li>
					<li class="flex items-start gap-2 text-sm text-ink/85"><Monitor class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Video-conference ready, hybrid setup</li>
					<li class="flex items-start gap-2 text-sm text-ink/85"><Coffee class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Two coffee breaks, proper coffee</li>
					<li class="flex items-start gap-2 text-sm text-ink/85"><UtensilsCrossed class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Lunch at The Courtyard</li>
					<li class="flex items-start gap-2 text-sm text-ink/85"><UserCheck class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Dedicated coordinator, start to finish</li>
				</ul>
			</div>
			<img src={IMAGES.resort2} alt="Courtyard Pavilion set for a conference" loading="lazy" class="aspect-[4/3] w-full rounded-md object-cover" />
		</div>
	</div>

	<!-- Day delegate package -->
	<div class="mt-16 rounded-md bg-pine p-6 text-ivory sm:mt-20 sm:p-10" use:reveal>
		<div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
			<div class="min-w-0">
				<p class="eyebrow !text-gold">{DAY_DELEGATE.title}</p>
				<h2 class="font-display mt-2 text-3xl font-semibold sm:text-4xl">{inr(DAY_DELEGATE.price)} <span class="text-xl text-white/70">per person, per day</span></h2>
				<ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
					{#each DAY_DELEGATE.inclusions as item (item)}
						<li class="flex items-start gap-2 text-sm text-white/85"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {item}</li>
					{/each}
				</ul>
				<p class="mt-5 text-xs text-white/60">{DAY_DELEGATE.note} Group room rates available for 10+ rooms.</p>
			</div>
			<a href="#enquire" class="btn-gold w-full lg:w-auto">Enquire Now <ArrowRight class="h-4 w-4" /></a>
		</div>
	</div>

	<!-- Team building -->
	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow flex items-center gap-2"><Sparkles class="h-4 w-4" /> After the meeting</p>
		<h2 class="section-title mt-2">Team building, the Jaipur way</h2>
		<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">
			Add one of these to your day-delegate package and give the team something to talk about on the way home.
		</p>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each TEAM_BUILDING as item, i (item.title)}
				<div class="min-w-0 rounded-md border border-line bg-white p-5" use:reveal={{ delay: i * 90 }}>
					<h3 class="font-display text-xl leading-tight font-semibold text-ink">{item.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
					<p class="mt-3 text-sm font-semibold text-gold-dark">{inr(item.price)} per person</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Clients strip -->
	<div class="mt-16 border-y border-line py-10 text-center sm:mt-20" use:reveal>
		<p class="text-xs font-semibold tracking-[0.3em] text-muted uppercase">Trusted by teams from</p>
		<div class="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
			{#each CLIENTS as client (client)}
				<span class="font-display text-xl font-semibold text-ink/50 sm:text-2xl">{client}</span>
			{/each}
		</div>
		<p class="mt-4 text-xs text-muted">Client names shown are illustrative demo references.</p>
	</div>

	<!-- Enquiry form -->
	<div id="enquire" class="mx-auto mt-16 max-w-2xl scroll-mt-28 rounded-md border border-line bg-white p-5 sm:mt-20 sm:p-8" use:reveal>
		<p class="eyebrow">Enquire</p>
		<h2 class="font-display mt-2 text-3xl font-semibold text-ink">Plan your meeting</h2>
		<p class="mt-2 text-sm leading-relaxed text-muted">Tell us the basics and our meetings team will call you within one working day with availability and a quote.</p>
		{#if submitted}
			<div class="mt-6 rounded-sm border border-gold/40 bg-cream p-5" role="status">
				<p class="flex items-start gap-2 font-semibold text-pine"><Check class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> Enquiry received</p>
				<p class="mt-2 text-sm leading-relaxed text-ink/80">
					Thank you, {name.trim()}. Your enquiry for {delegates} delegates from {company.trim()} on {date} ({layout} layout) is saved.
					Our meetings team will call {phone.trim()} within one working day.
				</p>
				<button type="button" class="btn-ghost mt-4 !min-h-11 w-full" onclick={() => { submitted = false; company = ''; name = ''; phone = ''; date = ''; delegates = 20; layout = 'Theatre'; }}>Send another enquiry</button>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
				<div>
					<label class="label" for="m-company">Company</label>
					<input id="m-company" class="input" type="text" autocomplete="organization" placeholder="Company name" bind:value={company} />
					{#if errors.company}<p class="mt-1 text-xs text-red-800">{errors.company}</p>{/if}
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="label" for="m-name">Contact name</label>
						<input id="m-name" class="input" type="text" autocomplete="name" placeholder="Your name" bind:value={name} />
						{#if errors.name}<p class="mt-1 text-xs text-red-800">{errors.name}</p>{/if}
					</div>
					<div>
						<label class="label" for="m-phone">Phone</label>
						<input id="m-phone" class="input" type="tel" autocomplete="tel" placeholder="+91 98765 43210" bind:value={phone} />
						{#if errors.phone}<p class="mt-1 text-xs text-red-800">{errors.phone}</p>{/if}
					</div>
				</div>
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label class="label" for="m-date">Preferred date</label>
						<input id="m-date" class="input" type="date" bind:value={date} />
						{#if errors.date}<p class="mt-1 text-xs text-red-800">{errors.date}</p>{/if}
					</div>
					<div>
						<label class="label" for="m-delegates">Delegates</label>
						<input id="m-delegates" class="input" type="number" min="5" max="200" bind:value={delegates} />
						{#if errors.delegates}<p class="mt-1 text-xs text-red-800">{errors.delegates}</p>{/if}
					</div>
				</div>
				<div>
					<label class="label" for="m-layout">Preferred layout</label>
					<select id="m-layout" class="input" bind:value={layout}>
						{#each LAYOUTS as l (l)}<option>{l}</option>{/each}
					</select>
				</div>
				<button type="submit" class="btn-gold w-full"><Briefcase class="h-4 w-4" /> Send Enquiry</button>
				<p class="text-center text-xs text-muted">Day-delegate packages from {inr(DAY_DELEGATE.price)} per person, including GST. Final quote after a site visit.</p>
			</form>
		{/if}
		<div class="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-sm text-muted sm:flex-row sm:gap-6">
			<span class="flex items-center gap-2"><Phone class="h-4 w-4 text-gold-dark" /> +91 141 456 7890</span>
			<span class="flex items-center gap-2"><Mail class="h-4 w-4 text-gold-dark" /> stay@aureliapalace.in</span>
			<span class="flex items-center gap-2"><CalendarDays class="h-4 w-4 text-gold-dark" /> Site visits Mon–Sat, 10 AM–6 PM</span>
		</div>
	</div>
</section>
