<script lang="ts">
	import { CalendarX, CheckCircle2, Info } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { HOTEL, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
</script>

<svelte:head>
	<title>Cancellation Policy — The Aurelia Palace, Jaipur | Free Cancellation up to 72 Hours</title>
	<meta name="description" content="Cancellation policy for The Aurelia Palace, Jaipur — free cancellation up to 72 hours before check-in, 50% charge 24–72 hours, no refund under 24 hours." />
</svelte:head>

<PageHero eyebrow="Good to know" title="Cancellation policy" subtitle="Clear, upfront, and the same for every guest. No surprises." image={IMAGES.resort} />

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid gap-4" use:reveal>
		<div class="card flex gap-4 p-6">
			<CheckCircle2 class="h-6 w-6 shrink-0 text-pine" />
			<div><h2 class="font-display text-2xl font-semibold">More than 72 hours before check-in — free</h2><p class="mt-1 leading-relaxed text-muted">Cancel any time up to 72 hours before check-in (2:00 PM on your arrival day) and you pay nothing. Any amount already paid is refunded in full to the original payment method.</p></div>
		</div>
		<div class="card flex gap-4 p-6">
			<Info class="h-6 w-6 shrink-0 text-gold-dark" />
			<div><h2 class="font-display text-2xl font-semibold">24 to 72 hours before check-in — 50%</h2><p class="mt-1 leading-relaxed text-muted">Cancel between 24 and 72 hours before check-in and 50% of the first night’s rate (including GST) is charged. The rest is refunded.</p></div>
		</div>
		<div class="card flex gap-4 p-6">
			<CalendarX class="h-6 w-6 shrink-0 text-red-800" />
			<div><h2 class="font-display text-2xl font-semibold">Under 24 hours, or no-show — no refund</h2><p class="mt-1 leading-relaxed text-muted">Cancel less than 24 hours before check-in, or do not arrive, and the first night’s rate is charged in full. No refund is due for the first night; remaining nights are not charged.</p></div>
		</div>
	</div>

	<div class="mt-10 space-y-5 leading-relaxed text-muted" use:reveal>
		<h2 class="font-display text-3xl font-semibold text-ink">Also worth knowing</h2>
		<p><strong class="text-ink">Advance-purchase rates.</strong> Some discounted rates are marked non-refundable before you pay. Those rates cannot be cancelled or changed, and this is shown clearly on the booking page before payment.</p>
		<p><strong class="text-ink">Date changes.</strong> Changing your dates is free up to 72 hours before check-in, subject to availability and any difference in rate. Inside 72 hours, the same charges as a cancellation apply to the nights you move.</p>
		<p><strong class="text-ink">How to cancel.</strong> Use <a class="font-semibold text-gold-dark underline underline-offset-2" href="/manage-booking">Manage My Booking</a> with your booking reference, or call {HOTEL.phone}. The cancellation time is the time we receive your request.</p>
		<p><strong class="text-ink">Refunds.</strong> Refunds are made to the original payment method within 7 working days. In this demo, no real payment is taken, so no real refund applies.</p>
		<p class="text-sm">This is mock demo copy for the client preview. The live hotel will publish its final policy, reviewed by its legal advisers, before launch.</p>
		<div class="flex flex-wrap gap-3 pt-2">
			<a href="/manage-booking" class="btn-pine">Manage My Booking</a>
			<a href="/contact" class="btn-ghost">Ask the Concierge</a>
		</div>
	</div>
</section>
