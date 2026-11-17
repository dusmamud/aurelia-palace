<script lang="ts">
	import { page } from '$app/state';
	import { BedDouble, Home, Search } from '@lucide/svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'This Suite Seems to Be Booked — Page Not Found' : 'Something Went Wrong'} — The Aurelia Palace, Jaipur</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
	<p class="eyebrow">Error {page.status}</p>
	<h1 class="font-display mx-auto mt-4 max-w-2xl text-5xl leading-[1.05] font-semibold sm:text-6xl">
		{page.status === 404 ? 'This suite seems to be booked.' : 'Something went wrong.'}
	</h1>
	<p class="mx-auto mt-4 max-w-md leading-relaxed text-muted">
		{page.status === 404
			? 'The page you are looking for does not exist, or has moved to another wing of the palace. Let us show you back to the rooms.'
			: 'An unexpected error stopped this page loading. Please try again — or call the front desk and we will help.'}
	</p>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<a href="/" class="btn-gold"><Home class="h-4 w-4" /> Back to Home</a>
		<a href="/rooms" class="btn-pine"><BedDouble class="h-4 w-4" /> Browse Rooms</a>
		<a href="/book" class="btn-ghost"><Search class="h-4 w-4" /> Book a Stay</a>
	</div>
</section>
