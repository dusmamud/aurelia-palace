<script lang="ts">
	import { Briefcase, CheckCircle2, Clock, MapPin, Send } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	const roles = [
		{ title: 'Front Office Manager', dept: 'Front Office', type: 'Full-time', location: 'Jaipur', text: 'Lead the front desk and concierge team. Five years in a 5-star hotel, and a calm head at 2 AM.' },
		{ title: 'Executive Chef — Indian', dept: 'Culinary', type: 'Full-time', location: 'Jaipur', text: 'Lead Saffron and The Courtyard. Royal Rajasthani cooking, a small team, and a menu you will be proud of.' },
		{ title: 'Spa Therapist', dept: 'Amara Spa', type: 'Full-time', location: 'Jaipur', text: 'Ayurvedic and Western therapies in our candlelit treatment suites. Certification and two years of experience.' },
		{ title: 'Guest Relations Executive', dept: 'Guest Experience', type: 'Full-time', location: 'Jaipur', text: 'The person guests remember. Fluent English and Hindi, a third language a bonus, and genuine warmth.' }
	];

	let name = $state('');
	let email = $state('');
	let role = $state(roles[0].title);
	let error = $state('');
	let saved = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!name.trim() || !email.trim()) { error = 'Please enter your name and email.'; return; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { error = 'Please enter a valid email address.'; return; }
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-careers') ?? '[]');
			list.push({ name: name.trim(), email: email.trim(), role, at: new Date().toISOString() });
			localStorage.setItem('aurelia-careers', JSON.stringify(list));
		} catch { /* ignore */ }
		saved = true;
	}
</script>

<!-- Meta now comes from the layout via src/lib/data/meta.ts. -->

<PageHero
	eyebrow="Careers"
	title="Work in a palace"
	subtitle="A small team, a beautiful building, and guests who notice the difference. These are the roles open right now."
	image={IMAGES.resort3}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2" use:reveal>
		{#each roles as r (r.title)}
			<article class="card min-w-0 p-6">
				<div class="flex items-start justify-between gap-3">
					<h2 class="font-display min-w-0 text-2xl font-semibold">{r.title}</h2>
					<Briefcase class="h-5 w-5 shrink-0 text-gold-dark" />
				</div>
				<p class="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
				<ul class="mt-4 flex flex-wrap gap-2 text-xs">
					<li class="chip">{r.dept}</li>
					<li class="chip flex items-center gap-1"><MapPin class="h-3 w-3" /> {r.location}</li>
					<li class="chip flex items-center gap-1"><Clock class="h-3 w-3" /> {r.type}</li>
				</ul>
				<button class="btn-pine mt-5 !min-h-11" onclick={() => { role = r.title; document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }); }}>Apply for This Role</button>
			</article>
		{/each}
	</div>

	<div id="apply" class="mx-auto mt-12 max-w-2xl scroll-mt-28" use:reveal>
		<p class="eyebrow">Apply</p>
		<h2 class="section-title mt-2">Tell us about yourself</h2>
		<p class="mt-3 text-muted">This is a demo form for the client preview — applications are stored on this device only, and no email is sent.</p>
		{#if saved}
			<div class="mt-6 flex gap-3 rounded-md border border-pine/20 bg-pine/5 p-5">
				<CheckCircle2 class="h-6 w-6 shrink-0 text-pine" />
				<div>
					<p class="font-semibold">Thank you, {name.trim()} — your application for {role} is saved.</p>
					<p class="mt-1 text-sm text-muted">In the live hotel, this would go straight to the hiring manager.</p>
				</div>
			</div>
		{:else}
			<form class="mt-6 grid gap-4" onsubmit={submit} novalidate>
				<label class="min-w-0"><span class="label">Full name *</span><input class="input" bind:value={name} placeholder="Your full name" autocomplete="name" required /></label>
				<label class="min-w-0"><span class="label">Email *</span><input type="email" class="input" bind:value={email} placeholder="you@example.com" autocomplete="email" required /></label>
				<label class="min-w-0">
					<span class="label">Role *</span>
					<select class="input" bind:value={role}>
						{#each roles as r (r.title)}<option value={r.title}>{r.title} — {r.dept}</option>{/each}
					</select>
				</label>
				{#if error}<p class="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>{/if}
				<button type="submit" class="btn-gold"><Send class="h-4 w-4" /> Submit Application</button>
			</form>
		{/if}
		<p class="mt-6 text-sm text-muted">Prefer email? Write to {HOTEL.email} with the role in the subject line.</p>
	</div>
</section>
