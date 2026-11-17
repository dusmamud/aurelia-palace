<script lang="ts">
	import { CheckCircle2, Clock, Mail, MapPin, MessageCircleQuestion, Phone, Send } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let subject = $state('Reservation enquiry');
	let message = $state('');
	let error = $state('');
	let saved = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		const digits = phone.replace(/\D/g, '').replace(/^91/, '');
		if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
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
		try {
			const list = JSON.parse(localStorage.getItem('aurelia-contact') ?? '[]');
			list.push({ name: name.trim(), email: email.trim(), phone: digits, subject, message: message.trim(), at: new Date().toISOString() });
			localStorage.setItem('aurelia-contact', JSON.stringify(list));
		} catch {
			/* storage unavailable — still show success */
		}
		saved = true;
	}
</script>

<svelte:head>
	<title>Contact — The Aurelia Palace, Jaipur | Reservations & Concierge</title>
	<meta name="description" content="Contact The Aurelia Palace, Jaipur — call +91 141 456 7890, email stay@aureliapalace.in, or send an enquiry. 12 Rajmahal Road, C-Scheme, Jaipur 302001." />
</svelte:head>

<PageHero
	eyebrow="Contact"
	title="Talk to a person, not a form"
	subtitle="Call, write, or send an enquiry — the concierge answers the phone around the clock."
	image={IMAGES.palace}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" use:reveal>
		<a href="tel:{HOTEL.phoneHref}" class="card min-w-0 p-6">
			<Phone class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Phone</h2>
			<p class="mt-1 text-muted">{HOTEL.phone}</p>
			<p class="mt-1 text-sm text-muted">24-hour front desk</p>
		</a>
		<a href="mailto:{HOTEL.email}" class="card min-w-0 p-6">
			<Mail class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Email</h2>
			<p class="mt-1 break-words text-muted">{HOTEL.email}</p>
			<p class="mt-1 text-sm text-muted">Replies within a day</p>
		</a>
		<a href="/location" class="card min-w-0 p-6">
			<MapPin class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Address</h2>
			<p class="mt-1 text-sm leading-relaxed text-muted">{HOTEL.address}</p>
		</a>
		<div class="card min-w-0 p-6">
			<Clock class="h-6 w-6 text-gold-dark" />
			<h2 class="font-display mt-4 text-2xl font-semibold">Hours</h2>
			<p class="mt-1 text-muted">Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}</p>
			<p class="mt-1 text-sm text-muted">Restaurants 7 AM – 12:30 AM</p>
		</div>
	</div>

	<div class="mt-12 grid gap-8 lg:grid-cols-5" use:reveal>
		<div class="min-w-0 lg:col-span-3">
			<p class="eyebrow">Send an enquiry</p>
			<h2 class="section-title mt-2">We reply within a day</h2>
			{#if saved}
				<div class="mt-6 flex gap-3 rounded-md border border-pine/20 bg-pine/5 p-5">
					<CheckCircle2 class="h-6 w-6 shrink-0 text-pine" />
					<div>
						<p class="font-semibold">Thank you, {name.trim()} — your enquiry is saved.</p>
						<p class="mt-1 text-sm text-muted">
							This is a demo form: your message is stored on this device only and no email is
							sent. For a real enquiry, call {HOTEL.phone}.
						</p>
						<button class="btn-ghost mt-4 !min-h-11" onclick={() => { saved = false; name = ''; email = ''; phone = ''; message = ''; }}>Send Another Enquiry</button>
					</div>
				</div>
			{:else}
				<form class="mt-6 grid gap-4 sm:grid-cols-2" onsubmit={submit} novalidate>
					<label class="min-w-0"><span class="label">Full name *</span><input class="input" bind:value={name} placeholder="Your full name" autocomplete="name" required /></label>
					<label class="min-w-0"><span class="label">Email *</span><input type="email" class="input" bind:value={email} placeholder="you@example.com" autocomplete="email" required /></label>
					<label class="min-w-0"><span class="label">Phone (+91) *</span><input type="tel" class="input" bind:value={phone} placeholder="98765 43210" autocomplete="tel" inputmode="tel" required /></label>
					<label class="min-w-0">
						<span class="label">Subject *</span>
						<select class="input" bind:value={subject}>
							{#each ['Reservation enquiry', 'Wedding or event', 'Dining reservation', 'Spa booking', 'Feedback', 'Something else'] as s (s)}<option value={s}>{s}</option>{/each}
						</select>
					</label>
					<label class="min-w-0 sm:col-span-2"><span class="label">Message *</span><textarea class="input min-h-32 resize-y" bind:value={message} placeholder="Dates, occasion, anything we should know…" required></textarea></label>
					{#if error}<p class="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-800 sm:col-span-2" role="alert">{error}</p>{/if}
					<div class="sm:col-span-2"><button type="submit" class="btn-gold"><Send class="h-4 w-4" /> Send Enquiry</button></div>
				</form>
			{/if}
		</div>
		<aside class="min-w-0 lg:col-span-2">
			<div class="card p-6">
				<MessageCircleQuestion class="h-6 w-6 text-gold-dark" />
				<h2 class="font-display mt-4 text-2xl font-semibold">Before you write</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Check-in, cancellation, breakfast and airport transfers — the answers guests ask for
					most are already on the FAQ page.
				</p>
				<a href="/faq" class="btn-pine mt-5 w-full">Read the FAQs</a>
				<a href="/book" class="btn-ghost mt-3 w-full">Book a Room Instead</a>
			</div>
			<div class="card mt-4 p-6">
				<h3 class="font-display text-2xl font-semibold">Weddings & events</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					For weddings, write to us with your date and guest count, or call the events team on
					{HOTEL.phone} and ask for Events.
				</p>
				<a href="/weddings-events" class="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-gold-dark">Explore weddings & events →</a>
			</div>
		</aside>
	</div>
</section>
