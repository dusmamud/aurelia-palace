<script lang="ts">
	import { MessageCircle, Send, X } from '@lucide/svelte';
	import { popIn } from '#lib/motion';

	type Msg = { from: 'user' | 'bot'; text: string; href?: string; linkLabel?: string };

	let open = $state(false);
	let input = $state('');
	let messages = $state<Msg[]>([
		{
			from: 'bot',
			text: 'Namaste, and welcome to The Aurelia Palace. I am the palace concierge — ask me about rooms, dining, spa, weddings or transfers.'
		}
	]);

	const QUICK = ['Check-in time', 'Airport transfer', 'Spa hours', 'Wedding enquiry', 'Room prices'];

	function reply(q: string): Msg {
		const s = q.toLowerCase();
		if (/(price|rate|cost|room)/.test(s))
			return {
				from: 'bot',
				text: 'Rooms start at ₹18,999 per night and suites go up to ₹1,25,000. The best rate is always direct — shall I show you the rooms?',
				href: '/rooms',
				linkLabel: 'See rooms & suites'
			};
		if (/spa/.test(s))
			return {
				from: 'bot',
				text: 'Amara Spa is open daily, 10 AM to 8 PM. Treatments start at ₹3,500 — the Signature Abhyanga (60 min, ₹8,500) is the one guests ask for most.',
				href: '/spa/book',
				linkLabel: 'Book a treatment'
			};
		if (/wedding/.test(s))
			return {
				from: 'bot',
				text: 'Our Durbar Hall seats 220 for a ceremony and the courtyard hosts 400 under the stars. A dedicated wedding host plans everything with you.',
				href: '/weddings-events',
				linkLabel: 'Weddings & events'
			};
		if (/(airport|transfer|taxi|car)/.test(s))
			return {
				from: 'bot',
				text: 'The airport is 25 minutes away. A sedan transfer is ₹1,800 and a vintage car arrival is ₹6,500 — both can be booked in advance.',
				href: '/transfers',
				linkLabel: 'Book a transfer'
			};
		if (/(check-?in|check ?in|arrival)/.test(s))
			return {
				from: 'bot',
				text: 'Check-in is from 2 PM and check-out until 12 PM. Early check-in is complimentary when the room is ready — just tell us your arrival time.'
			};
		if (/(dining|restaurant|table|food|dinner)/.test(s))
			return {
				from: 'bot',
				text: 'Saffron serves royal Rajasthani thalis (7–11 PM), The Courtyard does all-day dining, and Zoya is our rooftop bar. Shall I reserve a table?',
				href: '/dining/reserve',
				linkLabel: 'Reserve a table'
			};
		if (/(book|reserve|availability)/.test(s))
			return {
				from: 'bot',
				text: 'You can check availability in under a minute — pick your dates and the palace holds the best rooms for 48 hours, no payment needed.',
				href: '/book',
				linkLabel: 'Check availability'
			};
		return {
			from: 'bot',
			text: 'Thank you — I have noted that. For anything detailed, our concierge desk answers on +91 141 456 7890 (24 hours) or stay@aureliapalace.in.'
		};
	}

	function send(text: string) {
		const q = text.trim();
		if (!q) return;
		messages = [...messages, { from: 'user', text: q }];
		input = '';
		setTimeout(() => {
			messages = [...messages, reply(q)];
		}, 450);
	}
</script>

{#if open}
	<section
		aria-label="Palace concierge chat"
		use:popIn
		class="fixed right-4 bottom-[7.5rem] z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-md border border-line bg-ivory shadow-[0_16px_48px_rgba(28,26,23,0.28)] lg:bottom-24"
	>
		<header class="flex items-center gap-3 bg-pine px-4 py-3 text-ivory">
			<span class="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold">
				<MessageCircle class="h-5 w-5" />
				<span class="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-pine bg-emerald-400"></span>
			</span>
			<div class="min-w-0 flex-1">
				<p class="font-display text-lg leading-tight font-semibold">Palace Concierge</p>
				<p class="text-xs text-ivory/70">Online · replies instantly (demo)</p>
			</div>
			<button type="button" aria-label="Close chat" onclick={() => (open = false)} class="flex h-9 w-9 items-center justify-center rounded-sm text-ivory/80 transition hover:bg-white/10 hover:text-ivory">
				<X class="h-5 w-5" />
			</button>
		</header>

		<div class="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
			{#each messages as m (m.text + m.from)}
				<div class="flex {m.from === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="max-w-[85%] rounded-md px-3.5 py-2.5 text-sm leading-relaxed {m.from === 'user'
							? 'bg-pine text-ivory'
							: 'border border-line bg-cream text-ink'}"
					>
						<p>{m.text}</p>
						{#if m.href}
							<a href={m.href} onclick={() => (open = false)} class="mt-1.5 inline-flex font-semibold text-gold-dark underline underline-offset-2">{m.linkLabel}</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<div class="flex flex-wrap gap-2 px-4 pb-3">
			{#each QUICK as q (q)}
				<button type="button" onclick={() => send(q)} class="rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-medium text-ink/80 transition hover:border-gold hover:text-gold-dark">
					{q}
				</button>
			{/each}
		</div>

		<form
			class="flex items-center gap-2 border-t border-line p-3"
			onsubmit={(e) => {
				e.preventDefault();
				send(input);
			}}
		>
			<label for="chat-input" class="sr-only">Message the concierge</label>
			<input
				id="chat-input"
				type="text"
				bind:value={input}
				placeholder="Ask about rooms, dining, spa…"
				autocomplete="off"
				class="min-w-0 flex-1 rounded-sm border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
			/>
			<button type="submit" aria-label="Send message" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold text-white transition hover:bg-gold-dark">
				<Send class="h-4 w-4" />
			</button>
		</form>
	</section>
{/if}

<button
	type="button"
	aria-label={open ? 'Close concierge chat' : 'Chat with the concierge'}
	aria-expanded={open}
	onclick={() => (open = !open)}
	class="fixed right-4 bottom-20 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-pine text-gold shadow-[0_10px_28px_rgba(28,26,23,0.35)] transition hover:bg-pine-2 lg:bottom-6"
>
	{#if open}<X class="h-5 w-5" />{:else}<MessageCircle class="h-5 w-5" />{/if}
</button>
