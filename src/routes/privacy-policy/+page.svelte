<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHero eyebrow="Legal" title="Privacy policy" subtitle="How we collect, use and protect your information." image={IMAGES.palace} />

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="space-y-6 leading-relaxed text-muted">
		<p><strong class="text-ink">Last updated: 17 November 2026.</strong> This is mock demo copy for the client preview. The live hotel will publish its final privacy policy, reviewed by its legal advisers, before launch.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">What we collect</h2>
		<p>When you book, enquire or apply for a role, we collect the details you give us: your name, email, phone number, stay dates, room preferences and any special requests. We also collect the booking reference and payment method you choose — in this demo, no real payment is taken and no card details leave your device.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">How we use it</h2>
		<p>To confirm and manage your booking, arrange transfers and special requests, reply to your enquiries, and — only if you ask us to — send you offers and news from the palace. We do not sell your information to anyone.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">How long we keep it</h2>
		<p>Booking records are kept for as long as needed to manage your stay and meet tax and legal record-keeping requirements, then deleted. Enquiries are kept for up to 12 months.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Your rights</h2>
		<p>You can ask us for a copy of your information, ask us to correct it, or ask us to delete it, by writing to {HOTEL.email}. We will reply within 30 days.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Contact</h2>
		<p>Questions about this policy: {HOTEL.email} or {HOTEL.phone}. Postal address: {HOTEL.address}.</p>
	</div>
</section>
