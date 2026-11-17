/**
 * Scroll-linked parallax Svelte action (Tier 1 motion: pure CSS + JS fallback).
 *
 * Usage: <div class="overflow-hidden rounded-md" use:parallax><img … /></div>
 * The action animates the node's first <img> (or the node itself): it drifts
 * ±amount/2 % vertically as the element travels through the viewport, on top
 * of a 1.12× scale so the edges never show. Apply `overflow-hidden` on the
 * wrapper — the image is deliberately oversized.
 *
 * - Preferred path: CSS `animation-timeline: view()` (no scroll listeners).
 * - Fallback: IntersectionObserver + rAF-throttled scroll handler, active
 *   only while the element is in view.
 * - Disabled entirely under `prefers-reduced-motion` (image stays static).
 */
export function parallax(node: HTMLElement, opts: { amount?: number } = {}) {
	const amount = opts.amount ?? 8;
	const half = amount / 2;
	const target = (node.querySelector('img') ?? node) as HTMLElement;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	if (CSS.supports('animation-timeline: view()')) {
		target.classList.add('parallax-scroll');
		return;
	}

	let inView = false;
	let ticking = false;

	const update = () => {
		ticking = false;
		if (!inView) return;
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight || 1;
		const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2)));
		target.style.transform = `translateY(${(progress * half).toFixed(2)}%) scale(1.12)`;
	};
	const onScroll = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(update);
		}
	};
	const io = new IntersectionObserver(
		(entries) => {
			inView = entries[0]?.isIntersecting ?? false;
			if (inView) update();
			else target.style.transform = '';
		},
		{ rootMargin: '15% 0px' }
	);
	io.observe(node);
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	update();

	return {
		destroy() {
			io.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}
	};
}
/**
 * Scroll-reveal Svelte action (Tier 1 motion: pure CSS + IntersectionObserver).
 *
 * Usage: <div use:reveal>…</div> or <div use:reveal={{ delay: 120, variant: 'left' }}>…</div>
 *
 * - Hiding styles live in app.css behind `.motion-ok` (set before paint in
 *   app.html only when reduced motion is NOT preferred), so no-JS and
 *   reduced-motion visitors always see fully-rendered content.
 * - The observer fires once (threshold 0.15) and disconnects; no scroll listeners.
 * - Only `opacity`/`transform` are animated (compositor thread, no layout shift).
 */
export function reveal(
	node: HTMLElement,
	opts: { delay?: number; variant?: 'up' | 'fade' | 'scale' | 'left' | 'right' } = {}
) {
	const delay = opts.delay ?? 0;
	const variant = opts.variant ?? 'up';
	node.dataset.reveal = variant === 'up' ? '' : variant;
	if (delay > 0) node.style.transitionDelay = `${delay}ms`;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('is-in');
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
