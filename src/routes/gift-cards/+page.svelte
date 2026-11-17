<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { IMAGES, inr } from '#lib/data/hotel';
	import { GIFT_AMOUNTS, GIFT_TERMS } from '#lib/data/gift-cards';
	import { reveal } from '#lib/reveal';
	import { Check, Crown, Gift, RotateCcw, ShieldCheck } from '@lucide/svelte';

	let amount = $state(10000);
	let customAmount = $state('');
	let useCustom = $state(false);
	let senderName = $state('');
	let recipientName = $state('');
	let recipientEmail = $state('');
	let message = $state('');
	let submitted = $state(false);
	let giftCode = $state('');
	let errors = $state<Record<string, string>>({});

	const selectedAmount = $derived(useCustom ? Number(customAmount) || 0 : amount);

	function chooseAmount(a: number) {
		amount = a;
		useCustom = false;
		customAmount = '';
	}

	function submit(e: Event) {
		e.preventDefault();
		errors = {};
		if (selectedAmount < 1000) errors.amount = 'Please choose an amount of at least ₹1,000.';
		if (senderName.trim().length < 2) errors.sender = 'Please enter your name.';
		if (recipientName.trim().length < 2) errors.recipient = 'Please enter the recipient’s name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) errors.email = 'Please enter a valid email address.';
		if (Object.keys(errors).length > 0) return;
		const code = 'AP-GIFT-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
		giftCode = code;
		try {
			const existing = JSON.parse(localStorage.getItem('aurelia-giftcard') ?? '[]') as unknown[];
			existing.push({
				code,
				amount: selectedAmount,
				sender: senderName.trim(),
				recipient: recipientName.trim(),
				email: recipientEmail.trim(),
				message: message.trim(),
				at: new Date().toISOString()
			});
			localStorage.setItem('aurelia-giftcard', JSON.stringify(existing));
		} catch {
			// localStorage unavailable — the card is still shown on screen
		}
		submitted = true;
	}

	function reset() {
		submitted = false;
		giftCode = '';
		amount = 10000;
		customAmount = '';
		useCustom = false;
		senderName = '';
		recipientName = '';
		recipientEmail = '';
		message = '';
		errors = {};
	}
</script>

<svelte:head>
	<title>Gift Cards — The Aurelia Palace, Jaipur | Give a Palace Stay</title>
	<meta name="description" content="Gift cards for The Aurelia Palace, Jaipur — from ₹5,000, valid 12 months, redeemable on rooms, dining, spa and experiences." />
</svelte:head>

<PageHero
	eyebrow="Gift Cards"
	title="Give them Jaipur"
	subtitle="A palace stay, a dinner at Saffron, a day at Amara Spa — wrapped in one card. Delivered by email, valid for 12 months."
	image={IMAGES.palace}
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-5 lg:gap-12">
		<div class="min-w-0 lg:col-span-3" use:reveal>
			<p class="eyebrow">Choose an amount</p>
			<h2 class="section-title mt-2">How much to give</h2>
			<div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
				{#each GIFT_AMOUNTS as a (a)}
					<button
						type="button"
						onclick={() => chooseAmount(a)}
						aria-pressed={!useCustom && amount === a}
						class="min-h-14 rounded-sm border px-3 py-3 text-center transition {(!useCustom && amount === a) ? 'border-gold bg-pine text-ivory' : 'border-line bg-white hover:border-gold'}"
					>
						<span class="font-display block text-xl font-semibold sm:text-2xl">{inr(a)}</span>
					</button>
				{/each}
			</div>
			<button
				type="button"
				onclick={() => { useCustom = true; }}
				aria-pressed={useCustom}
				class="mt-3 w-full rounded-sm border px-4 py-3 text-left text-sm font-medium transition {useCustom ? 'border-gold bg-cream' : 'border-line bg-white hover:border-gold'}"
			>
				Custom amount
			</button>
			{#if useCustom}
				<div class="mt-3">
					<label class="label" for="g-custom">Custom amount (₹)</label>
					<input id="g-custom" class="input" type="number" min="1000" max="200000" step="500" placeholder="e.g. 15000" bind:value={customAmount} />
				</div>
			{/if}
			{#if errors.amount}<p class="mt-2 text-xs text-red-800">{errors.amount}</p>{/if}

			{#if submitted}
				<div class="mt-8 rounded-sm border border-gold/40 bg-cream p-5 sm:p-6" role="status">
					<p class="flex items-start gap-2 font-semibold text-pine"><Check class="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /> Gift card ready for {recipientName.trim()}</p>
					<p class="mt-2 text-sm leading-relaxed text-ink/80">
						Your {inr(selectedAmount)} gift card has been created with code <strong>{giftCode}</strong>. A copy has been sent to {recipientEmail.trim()} — this is a demonstration, so no email is actually sent.
					</p>
					<button type="button" class="btn-ghost mt-4 !min-h-11 w-full" onclick={reset}><RotateCcw class="h-4 w-4" /> Create another gift card</button>
				</div>
			{:else}
				<form class="mt-8 space-y-4" onsubmit={submit} novalidate>
					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<label class="label" for="g-sender">Your name</label>
							<input id="g-sender" class="input" type="text" autocomplete="name" placeholder="Your name" bind:value={senderName} />
							{#if errors.sender}<p class="mt-1 text-xs text-red-800">{errors.sender}</p>{/if}
						</div>
						<div>
							<label class="label" for="g-recipient">Recipient’s name</label>
							<input id="g-recipient" class="input" type="text" placeholder="Who is it for?" bind:value={recipientName} />
							{#if errors.recipient}<p class="mt-1 text-xs text-red-800">{errors.recipient}</p>{/if}
						</div>
					</div>
					<div>
						<label class="label" for="g-email">Recipient’s email</label>
						<input id="g-email" class="input" type="email" autocomplete="email" placeholder="name@example.com" bind:value={recipientEmail} />
						{#if errors.email}<p class="mt-1 text-xs text-red-800">{errors.email}</p>{/if}
					</div>
					<div>
						<label class="label" for="g-message">Your message <span class="font-normal normal-case">(optional)</span></label>
						<textarea id="g-message" class="input min-h-24 resize-y" maxlength="200" placeholder="Happy anniversary — dinner at Saffron is on us." bind:value={message}></textarea>
						<p class="mt-1 text-right text-xs text-muted">{message.length}/200</p>
					</div>
					<button type="submit" class="btn-gold w-full"><Gift class="h-4 w-4" /> Send Gift Card — {inr(selectedAmount)}</button>
					<p class="text-center text-xs text-muted">Demonstration checkout — no payment is taken and no email is sent.</p>
				</form>
			{/if}
		</div>

		<div class="min-w-0 lg:col-span-2" use:reveal={{ variant: 'right' }}>
			<p class="eyebrow">Your card</p>
			<h2 class="font-display mt-2 text-3xl font-semibold">A preview</h2>
			<div class="relative mt-6 overflow-hidden rounded-md bg-pine p-6 text-ivory shadow-[0_16px_40px_rgba(18,46,40,0.35)] sm:p-8">
				<div class="absolute -top-10 -right-10 h-32 w-32 rounded-full border border-gold/30" aria-hidden="true"></div>
				<div class="absolute -right-4 -bottom-12 h-32 w-32 rounded-full border border-gold/20" aria-hidden="true"></div>
				<div class="relative">
					<p class="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-gold uppercase"><Crown class="h-4 w-4" /> The Aurelia Palace · Jaipur</p>
					<p class="font-display mt-6 text-5xl font-semibold sm:text-6xl">{inr(selectedAmount)}</p>
					<p class="mt-2 text-sm text-ivory/80">Gift card {recipientName ? `for ${recipientName.trim()}` : 'for someone special'}</p>
					{#if message.trim()}
						<p class="mt-4 border-l-2 border-gold pl-3 text-sm leading-relaxed text-ivory/85 italic">“{message.trim()}”</p>
					{/if}
					<div class="mt-6 flex items-end justify-between gap-3 border-t border-white/20 pt-4">
						<div>
							<p class="text-[11px] tracking-[0.2em] text-ivory/60 uppercase">Card code</p>
							<p class="mt-0.5 font-mono text-sm tracking-wider">{giftCode || 'AP-GIFT-••••••'}</p>
						</div>
						<p class="text-right text-xs text-ivory/70">Valid 12 months<br />Rooms · Dining · Spa</p>
					</div>
				</div>
			</div>
			<ul class="mt-6 space-y-2 text-sm text-ink/85">
				<li class="flex items-start gap-2"><ShieldCheck class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Valid for 12 months from purchase</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Usable across multiple visits until the balance runs out</li>
				<li class="flex items-start gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> Delivered instantly by email, with your message</li>
			</ul>
		</div>
	</div>

	<div class="mt-16 sm:mt-20" use:reveal>
		<p class="eyebrow">Good to know</p>
		<h2 class="section-title mt-2">Terms & conditions</h2>
		<ul class="mt-6 grid gap-3 sm:grid-cols-2">
			{#each GIFT_TERMS as term (term)}
				<li class="flex items-start gap-2 rounded-sm border border-line bg-white p-4 text-sm leading-relaxed text-ink/85"><Check class="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {term}</li>
			{/each}
		</ul>
	</div>
</section>
