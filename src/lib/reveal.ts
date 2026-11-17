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
