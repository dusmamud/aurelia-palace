<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { OFFERS, IMAGES } from '#lib/data/hotel';
	import { reveal } from '#lib/reveal';
	import { Tag, Copy, Check, ArrowRight } from '@lucide/svelte';

	const TERMS: Record<string, string[]> = {
		PALACE3: ['Valid on Deluxe and Premium rooms only', 'Breakfast included for two guests', 'Cannot be combined with other offers'],
		HONEYMOON: ['Suite bookings only, minimum 2 nights', 'Spa ritual subject to availability', 'Proof of marriage within 6 months may be requested'],
		DIRECT15: ['Book direct on this website only', 'Flexible cancellation up to 72 hours before check-in', 'Blackout dates may apply on festive weekends']
	};

	let copied = $state<string | null>(null);
	let copyFailed = $state(false);

	async function copyCode(code: string) {
		copyFailed = false;
		try {
			await navigator.clipboard.writeText(code);
			copied = code;
			setTimeout(() => { if (copied === code) copied = null; }, 2000);
		} catch {
			copyFailed = true;
		}
	}
</script>

<PageHero
	eyebrow="Offers"
	title="Book direct, stay better"
	subtitle="The best rates are always on this website — no commission, no surprises, and a little extra for booking direct."
	image={IMAGES.resort}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-6 md:grid-cols-3">
		{#each OFFERS as offer, i (offer.code)}
			<article class="card flex min-w-0 flex-col p-5 sm:p-6" use:reveal={{ delay: i * 90 }}>
				<p class="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-dark uppercase"><Tag class="h-4 w-4" /> {offer.valid}</p>
				<h2 class="font-display mt-3 text-3xl leading-tight font-semibold text-ink">{offer.title}</h2>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{offer.text}</p>
				<div class="mt-5 flex items-center gap-2 rounded-sm border border-dashed border-gold bg-cream px-3 py-2">
					<code class="min-w-0 flex-1 truncate text-base font-semibold tracking-[0.14em] text-pine">{offer.code}</code>
					<button type="button" class="btn-pine !min-h-11 shrink-0 !px-4" onclick={() => copyCode(offer.code)}>
						{#if copied === offer.code}<Check class="h-4 w-4" /> Copied{:else}<Copy class="h-4 w-4" /> Copy Code{/if}
					</button>
				</div>
				<ul class="mt-5 space-y-2 text-xs leading-relaxed text-muted">
					{#each TERMS[offer.code] ?? [] as term (term)}
						<li class="flex items-start gap-2"><Check class="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" /> {term}</li>
					{/each}
				</ul>
				<a href="/book" class="btn-gold mt-6 w-full">Book with this Offer <ArrowRight class="h-4 w-4" /></a>
			</article>
		{/each}
	</div>
	{#if copyFailed}
		<p class="mt-6 rounded-sm border border-line bg-white p-4 text-center text-sm text-muted" role="status">
			Copy did not work in this browser — please type the code manually at checkout.
		</p>
	{/if}
	<p class="mt-8 text-center text-sm text-muted">
		All offers are mock demo data for client preview. Rates include breakfast; taxes extra as shown at checkout.
	</p>
	<p class="mt-3 text-center text-sm">
		<a href="/packages" class="font-medium text-gold-dark underline decoration-gold/50 underline-offset-4 transition hover:text-gold">See stay packages — room, dining and spa bundled together</a>
	</p>
</section>
