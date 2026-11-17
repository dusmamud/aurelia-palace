<script lang="ts">
	import { ArrowRight, Check, ChevronDown, Clock, Mail, MapPin, Phone, Star } from '@lucide/svelte';
	import BookingBar from '#lib/components/BookingBar.svelte';
	import CountUp from '#lib/components/CountUp.svelte';
	import RoomCard from '#lib/components/RoomCard.svelte';
	import { reveal, parallax } from '#lib/reveal';
	import { DINING, EXPERIENCES, FAQS, HOTEL, IMAGES, OFFERS, ROOMS, TESTIMONIALS, inr } from '#lib/data/hotel';

	const heroWords = ['A', 'palace', 'stay,', 'quietly', 'perfected.'];

	// Testimonial rotator: one quote at a time, fades every 6s, pauses on hover/focus.
	let tIndex = $state(0);
	let tPaused = $state(false);

	$effect(() => {
		if (tPaused) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			tIndex = (tIndex + 1) % TESTIMONIALS.length;
		}, 6000);
		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<title>{HOTEL.name} · Five Star Palace Hotel in {HOTEL.city}</title>
	<meta
		name="description"
		content="The Aurelia Palace, Jaipur — 118 rooms and suites, royal Indian dining at Saffron, Amara Spa, and a 25-minute airport transfer. Book direct for the best rate."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative flex min-h-[92svh] items-end overflow-hidden bg-pine text-white">
	<img
		src={IMAGES.hero}
		alt="The Aurelia Palace, Jaipur at dusk"
		fetchpriority="high"
		class="animate-kenburns absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15"></div>
	<div class="hero-vignette absolute inset-0" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
		<p class="section-eyebrow section-eyebrow--light hero-fade">Jaipur · Five Star Palace Hotel</p>
		<h1 class="font-display mt-4 max-w-3xl text-5xl leading-[1.02] font-semibold sm:text-7xl">
			{#each heroWords as word, i (i)}<span class="hero-word" style="--wd: {140 + i * 90}ms">{word}</span>{' '}{/each}
		</h1>
		<p class="hero-fade mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg" style="--wd: 640ms">
			118 rooms and suites behind a 19th-century facade — hand-painted ceilings, a candlelit
			dining room, and a spa that runs on palace time.
		</p>
		<div class="hero-fade mt-8 flex flex-wrap items-center gap-3" style="--wd: 760ms">
			<a href="#booking" class="btn-gold">Check Availability <ArrowRight class="h-4 w-4" /></a>
			<a href="#rooms" class="btn-ghost-light">Explore Rooms</a>
		</div>
		<p class="hero-fade mt-6 flex flex-wrap items-center gap-2 text-sm text-white/85" style="--wd: 880ms">
			<span class="flex items-center gap-0.5" aria-label="Rated 4.9 out of 5">
				{#each Array(5) as _, i (i)}<Star class="h-4 w-4 fill-gold text-gold" />{/each}
			</span>
			<span><strong class="font-semibold text-white">4.9/5</strong> · 2,841 verified guest reviews</span>
		</p>
	</div>
	<div class="absolute right-6 bottom-32 hidden flex-col items-center gap-3 lg:flex" aria-hidden="true">
		<span class="text-[0.65rem] font-semibold tracking-[0.35em] text-white/70 uppercase [writing-mode:vertical-rl]">Scroll</span>
		<span class="scroll-line"></span>
		<ChevronDown class="h-4 w-4 text-gold" />
	</div>
</section>

<!-- Booking bar overlapping the hero -->
<div id="booking" class="relative z-10 mx-auto -mt-10 w-full max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
	<BookingBar />
	<p class="mt-3 text-center text-xs text-muted">
		Best rate guaranteed when you book direct · Free cancellation up to 72 hours before check-in
	</p>
</div>

<!-- Welcome -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" use:reveal>
	<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
		<div class="min-w-0 overflow-hidden rounded-md" use:parallax>
			<img
				src={IMAGES.palace}
				alt="The palace facade of The Aurelia Palace"
				loading="lazy"
				class="aspect-[4/3] w-full rounded-md object-cover"
			/>
		</div>
		<div class="min-w-0">
			<p class="section-eyebrow">Welcome to {HOTEL.name}</p>
			<h2 class="section-title mt-3">A palace that still feels like a home.</h2>
			<p class="mt-5 leading-relaxed text-muted">
				Built in 1899 as a royal guest house, The Aurelia Palace has spent more than a century
				learning the quiet arts — remembering how you take your chai, keeping the courtyard
				silent after dusk, and never hurrying a dinner at Saffron.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Every room looks onto a garden, a courtyard or the old city. Every stay includes
				breakfast at The Courtyard, high tea by the pool, and a concierge who actually answers
				the phone.
			</p>
			<dl class="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8">
				<div class="min-w-0">
					<dt class="sr-only">Rooms and suites</dt>
					<dd class="font-display text-4xl font-semibold text-pine"><CountUp value={118} /></dd>
					<dd class="mt-1 text-sm text-muted">Rooms &amp; suites</dd>
				</div>
				<div class="min-w-0">
					<dt class="sr-only">Guest rating</dt>
					<dd class="font-display text-4xl font-semibold text-pine"><CountUp value={4.9} decimals={1} /></dd>
					<dd class="mt-1 text-sm text-muted">Guest rating / 5</dd>
				</div>
				<div class="min-w-0">
					<dt class="sr-only">Restaurants</dt>
					<dd class="font-display text-4xl font-semibold text-pine"><CountUp value={3} /></dd>
					<dd class="mt-1 text-sm text-muted">Restaurants &amp; bars</dd>
				</div>
				<div class="min-w-0">
					<dt class="sr-only">Concierge hours</dt>
					<dd class="font-display text-4xl font-semibold text-pine"><CountUp value={24} suffix="h" /></dd>
					<dd class="mt-1 text-sm text-muted">Concierge, day &amp; night</dd>
				</div>
			</dl>
		</div>
	</div>
</section>

<!-- Rooms preview -->
<section id="rooms" class="bg-cream/60 py-16 sm:py-24" use:reveal>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="min-w-0">
				<p class="section-eyebrow">Rooms &amp; Suites</p>
				<h2 class="section-title mt-3">Choose your corner of the palace.</h2>
			</div>
			<a href="/rooms" class="btn-ghost">View All Rooms <ArrowRight class="h-4 w-4" /></a>
		</div>
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each ROOMS.slice(0, 3) as room, i (room.slug)}
				<div use:reveal={{ delay: i * 80 }} class="min-w-0"><RoomCard {room} /></div>
			{/each}
		</div>
		<p class="mt-6 text-sm text-muted">
			Rates from {inr(HOTEL.priceFrom)} per night, breakfast included. Taxes at 18% GST at checkout.
		</p>
	</div>
</section>

<!-- Dining preview -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" use:reveal>
	<p class="section-eyebrow">Dining</p>
	<h2 class="section-title mt-3">Three tables, three moods.</h2>
	<div class="mt-10 grid gap-6 md:grid-cols-3">
		{#each DINING as restaurant, i (restaurant.slug)}
			<article class="card img-zoom min-w-0" use:reveal={{ delay: i * 80 }}>
				<img
					src={restaurant.image}
					alt={restaurant.name}
					loading="lazy"
					class="aspect-[16/10] w-full object-cover"
				/>
				<div class="p-5">
					<div class="flex items-start justify-between gap-3">
						<h3 class="font-display min-w-0 text-2xl font-semibold text-ink">{restaurant.name}</h3>
						<span class="chip shrink-0">{restaurant.price}</span>
					</div>
					<p class="mt-1 text-xs font-semibold tracking-[0.14em] text-gold-dark uppercase">
						{restaurant.kind}
					</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">{restaurant.description}</p>
					<p class="mt-4 flex items-center gap-1.5 text-xs text-ink/75">
						<Clock class="h-3.5 w-3.5 text-gold-dark" /> {restaurant.hours}
					</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<!-- Spa split -->
<section class="bg-pine py-16 text-white sm:py-24" use:reveal>
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
		<div class="min-w-0">
			<p class="section-eyebrow section-eyebrow--light">Amara Spa &amp; Hammam</p>
			<h2 class="font-display mt-3 text-4xl leading-[1.05] font-semibold sm:text-5xl">
				Slow down. The palace insists.
			</h2>
			<p class="mt-5 leading-relaxed text-white/80">
				Ayurvedic rituals, a marble hammam and candlelit treatment suites tucked behind the
				garden wing. The 90-minute signature ritual is the one guests book before they even
				arrive.
			</p>
			<ul class="mt-6 space-y-3 text-sm text-white/85">
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Signature 90-minute ritual from ₹8,500</li>
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Marble hammam, sauna and plunge pool</li>
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Couples suites and private garden terrace</li>
				<li class="flex items-start gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Open daily, 9:00 AM – 9:00 PM</li>
			</ul>
			<a href="/book" class="btn-gold mt-8">Reserve a Ritual</a>
		</div>
		<div class="min-w-0 overflow-hidden rounded-md" use:parallax>
			<img
				src={IMAGES.spa}
				alt="Amara Spa treatment suite"
				loading="lazy"
				class="aspect-[4/3] w-full rounded-md object-cover"
			/>
		</div>
	</div>
</section>

<!-- Experiences -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" use:reveal>
	<p class="section-eyebrow">Experiences</p>
	<h2 class="section-title mt-3">Jaipur, the palace way.</h2>
	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each EXPERIENCES as experience, i (experience.title)}
			<article class="card img-zoom min-w-0" use:reveal={{ delay: i * 80 }}>
				<img
					src={experience.image}
					alt={experience.title}
					loading="lazy"
					class="aspect-[4/3] w-full object-cover"
				/>
				<div class="p-5">
					<h3 class="font-display text-xl leading-tight font-semibold text-ink">{experience.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{experience.text}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<!-- Testimonials -->
<section
	aria-label="Guest testimonials"
	class="bg-cream/60 py-16 sm:py-24"
	use:reveal
	onmouseenter={() => (tPaused = true)}
	onmouseleave={() => (tPaused = false)}
	onfocusin={() => (tPaused = true)}
	onfocusout={() => (tPaused = false)}
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="section-eyebrow section-eyebrow--center">Guest Words</p>
		<h2 class="section-title mt-3 text-center">What guests tell us at checkout.</h2>
		<div class="mx-auto mt-10 max-w-3xl text-center">
			<span class="flex items-center justify-center gap-0.5" aria-label="5 out of 5 stars">
				{#each Array(5) as _, j (j)}<Star class="h-4 w-4 fill-gold text-gold" />{/each}
			</span>
			{#key tIndex}
				<figure class="testimonial-fade">
					<blockquote class="font-display mt-6 text-2xl leading-snug font-medium text-ink sm:text-3xl">
						“{TESTIMONIALS[tIndex].text}”
					</blockquote>
					<figcaption class="mt-6 text-sm">
						<span class="block font-semibold text-ink">{TESTIMONIALS[tIndex].name}</span>
						<span class="text-muted">{TESTIMONIALS[tIndex].place}</span>
					</figcaption>
				</figure>
			{/key}
			<div class="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Choose testimonial">
				{#each TESTIMONIALS as _, i (i)}
					<button
						type="button"
						role="tab"
						aria-selected={i === tIndex}
						aria-label="Show testimonial {i + 1} of {TESTIMONIALS.length}"
						onclick={() => (tIndex = i)}
						class="flex min-h-11 min-w-11 items-center justify-center"
					>
						<span
							class="h-2 rounded-full transition-all duration-300 {i === tIndex
								? 'w-8 bg-gold'
								: 'w-2 bg-line hover:bg-gold/60'}"
						></span>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Location teaser -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" use:reveal>
	<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
		<div class="min-w-0">
			<img
				src={IMAGES.heritage}
				alt="The old city of Jaipur near the palace"
				loading="lazy"
				class="aspect-[4/3] w-full rounded-md object-cover"
			/>
		</div>
		<div class="min-w-0">
			<p class="section-eyebrow">Location</p>
			<h2 class="section-title mt-3">In the heart of Jaipur, above the noise.</h2>
			<p class="mt-5 leading-relaxed text-muted">
				Ten minutes from Hawa Mahal and Johari Bazaar, twenty-five minutes from Jaipur
				International Airport — close enough to walk to the old city, quiet enough to forget it.
			</p>
			<ul class="mt-6 space-y-3 text-sm">
				<li class="flex items-start gap-2.5"><MapPin class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> <span>{HOTEL.address}</span></li>
				<li class="flex items-start gap-2.5"><Clock class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> <span>Airport 25 min · Hawa Mahal 10 min · Railway station 15 min</span></li>
				<li class="flex items-start gap-2.5"><Phone class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> <a href="tel:{HOTEL.phoneHref}" class="hover:text-gold-dark">{HOTEL.phone}</a></li>
				<li class="flex items-start gap-2.5"><Mail class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> <a href="mailto:{HOTEL.email}" class="hover:text-gold-dark">{HOTEL.email}</a></li>
			</ul>
			<a
				href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(HOTEL.address)}"
				target="_blank"
				rel="noreferrer"
				class="btn-ghost mt-8"
			>
				View on Map <ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</section>

<!-- Offers strip -->
<section class="bg-pine py-14 text-white" use:reveal>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="min-w-0">
				<p class="section-eyebrow section-eyebrow--light">Offers</p>
				<h2 class="font-display mt-3 text-3xl font-semibold sm:text-4xl">Book direct, stay more.</h2>
			</div>
			<a href="/book" class="btn-gold">See All Offers</a>
		</div>
		<div class="mt-8 grid gap-6 md:grid-cols-2">
			{#each OFFERS.slice(0, 2) as offer (offer.code)}
				<article class="min-w-0 rounded-md border border-white/20 bg-white/5 p-6">
					<div class="flex flex-wrap items-start justify-between gap-3">
						<h3 class="font-display min-w-0 text-2xl font-semibold">{offer.title}</h3>
						<span class="chip !border-gold/60 !bg-transparent !text-gold">Code: {offer.code}</span>
					</div>
					<p class="mt-2 text-sm leading-relaxed text-white/80">{offer.text}</p>
					<p class="mt-4 text-xs tracking-wide text-white/60 uppercase">{offer.valid}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ teaser -->
<section class="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24" use:reveal>
	<p class="section-eyebrow section-eyebrow--center">Good to Know</p>
	<h2 class="section-title mt-3 text-center">Before you arrive.</h2>
	<div class="mt-10 space-y-4">
		{#each FAQS.slice(0, 3) as faq (faq.q)}
			<details class="card !overflow-hidden p-5">
				<summary class="min-h-11 cursor-pointer list-none font-semibold text-ink marker:text-gold-dark [&::-webkit-details-marker]:hidden">
					{faq.q}
				</summary>
				<p class="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
			</details>
		{/each}
	</div>
</section>
