<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHero eyebrow="Legal" title="Terms & conditions" subtitle="The terms that apply when you book and stay with us." image={IMAGES.palace} />

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="space-y-6 leading-relaxed text-muted">
		<p><strong class="text-ink">Last updated: 17 November 2026.</strong> This is mock demo copy for the client preview. The live hotel will publish its final terms, reviewed by its legal advisers, before launch.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Bookings</h2>
		<p>Rates are shown in Indian rupees and include 18% GST unless stated otherwise. Breakfast at The Courtyard is included in the rates shown on this site. A booking is confirmed once you receive a booking reference — in this demo, the reference is generated on your device and no payment is taken.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Check-in & check-out</h2>
		<p>Check-in is from {HOTEL.checkIn} and check-out is until {HOTEL.checkOut}. Guests must present a valid government photo ID at check-in. Early check-in and late check-out are complimentary when the room is available.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Your stay</h2>
		<p>Guests are responsible for their belongings; in-room safes are provided. Smoking is not permitted inside rooms. Pets are not permitted, except registered assistance animals. The hotel may charge for damage to the room or its contents.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Cancellation</h2>
		<p>Cancellation terms depend on the rate you book. See our <a class="font-semibold text-gold-dark underline underline-offset-2" href="/cancellation-policy">cancellation policy</a> for the full terms.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Liability</h2>
		<p>Nothing in these terms limits liability that cannot be limited by law. The hotel is not liable for valuables left outside the in-room safe, or for delays caused by events outside its reasonable control.</p>
		<h2 class="font-display text-3xl font-semibold text-ink">Contact</h2>
		<p>{HOTEL.name}, {HOTEL.address}. Phone {HOTEL.phone}, email {HOTEL.email}.</p>
	</div>
</section>
