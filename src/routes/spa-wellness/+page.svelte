<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr, usrcset } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { Clock, Waves, Dumbbell, Leaf, Sparkles, Check } from '@lucide/svelte';

import { SPA_TREATMENTS } from '#lib/data/spa-treatments';

	const FACILITIES = [
		{ icon: Waves, title: 'Temperature-controlled pool', text: 'Outdoor pool, 7 AM – 8 PM, with a shallow section for children.' },
		{ icon: Dumbbell, title: 'Fitness pavilion', text: 'Cardio, free weights and a trainer on request, 6 AM – 9 PM.' },
		{ icon: Leaf, title: 'Marble hammam', text: 'Steam and scrub rituals in a candlelit marble chamber.' },
		{ icon: Sparkles, title: 'Salon & grooming', text: 'Hair, shave and bridal styling by appointment.' }
	];

	let name = $state('');
	let phone = $state('');
	let treatment = $state(SPA_TREATMENTS[0].name);
	let date = $state('');
	let submitted = $state(false);
	let errors = $state<Record<string, string>>({});

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[+0-9][0-9\s-]{7,14}$/.test(phone.trim())) errors.phone = 'Please enter a valid phone number.';
		if (!date) errors.date = 'Please choose a date.';
		if (Object.keys(errors).length > 0) return;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-spa') ?? '[]') as unknown[];
			existing.push({ name: name.trim(), phone: phone.trim(), treatment, date, at: new Date().toISOString() });
			localStorage.setItem('aurelia-spa', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — request is still confirmed on screen
		}
		submitted = true;
	}
</script>

<PageHero
	eyebrow="Amara Spa & Wellness"
	title="Slow down. The palace will wait."
	subtitle="Ayurvedic rituals, a marble hammam and candlelit treatment suites — a quiet floor of the palace, kept just for this."
	image={IMAGES.spa}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid items-center gap-8 lg:grid-cols-2" use:reveal>
		<img src={IMAGES.spa2} srcset={usrcset(IMAGES.spa2)} sizes="(max-width: 1024px) 100vw, 50vw" alt="Treatment suite at Amara Spa" loading="lazy" decoding="async" class="aspect-[4/3] w-full rounded-md object-cover" />
		<div class="min-w-0">
			<p class="eyebrow">Amara Spa</p>
			<h2 class="section-title mt-2">Wellness, the palace way</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">
				Treatments begin with a consultation and a pot of herbal tea — never a clipboard. Our therapists
				train in Kerala and Jaipur, and every oil is blended in-house each morning.
			</p>
			<ul class="mt-6 space-y-3 text-sm text-ink/85">
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Separate suites for men and women, plus a couples suite</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Complimentary steam and relaxation lounge with every treatment</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Pregnancy-safe treatments available — please mention it when booking</li>
			</ul>
			<p class="mt-6 flex items-center gap-2 text-sm font-semibold text-ink"><Clock class="h-4 w-4 text-gold-dark" /> Open daily, 10:00 AM – 8:00 PM</p>
		</div>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Treatment menu</p>
		<h2 class="section-title mt-2">Choose your ritual</h2>
		<div class="mt-8 overflow-x-auto rounded-md border border-line bg-white">
			<table class="w-full min-w-[560px] text-left">
				<thead>
					<tr class="border-b border-line bg-cream text-xs tracking-[0.18em] text-muted uppercase">
						<th scope="col" class="px-5 py-4 font-semibold">Treatment</th>
						<th scope="col" class="px-5 py-4 font-semibold">Duration</th>
						<th scope="col" class="px-5 py-4 font-semibold">Price</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-line">
					{#each SPA_TREATMENTS as t (t.slug)}
						<tr>
							<td class="px-5 py-4">
								<span class="font-display block text-lg leading-tight font-semibold text-ink sm:text-xl">{t.name}</span>
								<span class="mt-0.5 block text-sm text-muted">{t.description}</span>
							</td>
							<td class="px-5 py-4 text-sm whitespace-nowrap text-ink/85">{t.duration} min</td>
							<td class="font-display px-5 py-4 text-lg font-semibold whitespace-nowrap text-gold-dark">{inr(t.price)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="mt-3 text-sm text-muted">All prices in Indian rupees, exclusive of applicable taxes. Suite guests receive a ₹5,000 spa credit per stay.</p>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Facilities</p>
		<h2 class="section-title mt-2">More than a spa</h2>
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each FACILITIES as f, i (f.title)}
				<div class="min-w-0 rounded-md border border-line bg-white p-5" use:reveal={{ delay: i * 80 }}>
					<f.icon class="h-7 w-7 text-gold-dark" />
					<h3 class="font-display mt-3 text-xl leading-tight font-semibold text-ink">{f.title}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="mx-auto mt-16 max-w-2xl rounded-md border border-line bg-white p-5 sm:mt-20 sm:p-8" use:reveal>
		<p class="eyebrow">Book a treatment</p>
		<h2 class="font-display mt-2 text-3xl font-semibold text-ink">Reserve your ritual</h2>
		{#if submitted}
			<div class="mt-6 rounded-sm border border-gold/40 bg-cream p-5" role="status">
				<p class="flex items-start gap-2 font-semibold text-pine"><Check class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> Treatment request received</p>
				<p class="mt-2 text-sm leading-relaxed text-ink/80">
					Thank you, {name.trim()}. Your {treatment} on {date} is saved. The spa will call {phone.trim()} shortly to confirm your time slot.
				</p>
				<button type="button" class="btn-ghost mt-4 !min-h-11 w-full" onclick={() => { submitted = false; name = ''; phone = ''; date = ''; treatment = SPA_TREATMENTS[0].name; }}>Book another treatment</button>
			</div>
		{:else}
			<form class="mt-6 space-y-4" onsubmit={submit} novalidate>
				<div>
					<label class="label" for="s-name">Full name</label>
					<input id="s-name" class="input" type="text" autocomplete="name" placeholder="Your name" bind:value={name} />
					{#if errors.name}<p class="mt-1 text-xs text-red-800">{errors.name}</p>{/if}
				</div>
				<div>
					<label class="label" for="s-phone">Phone</label>
					<input id="s-phone" class="input" type="tel" autocomplete="tel" placeholder="+91 98765 43210" bind:value={phone} />
					{#if errors.phone}<p class="mt-1 text-xs text-red-800">{errors.phone}</p>{/if}
				</div>
				<div>
					<label class="label" for="s-treatment">Treatment</label>
					<select id="s-treatment" class="input" bind:value={treatment}>
						{#each SPA_TREATMENTS as t (t.slug)}
							<option value={t.name}>{t.name} — {t.duration} min · {inr(t.price)}</option>
						{/each}
					</select>
				</div>
				<div>
					<label class="label" for="s-date">Preferred date</label>
					<input id="s-date" class="input" type="date" bind:value={date} />
					{#if errors.date}<p class="mt-1 text-xs text-red-800">{errors.date}</p>{/if}
				</div>
				<button type="submit" class="btn-gold w-full"><Sparkles class="h-4 w-4" /> Book a Treatment</button>
				<p class="text-center text-xs text-muted">Spa hours 10:00 AM – 8:00 PM. Free cancellation up to 6 hours before.</p>
			</form>
		{/if}
	</div>
</section>
