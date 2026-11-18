// Motion (formerly Framer Motion) helpers — the `motion` package (v14),
// the framework-agnostic successor to Framer Motion, built on the Web
// Animations API. Framer Motion itself is React-only and cannot run in
// SvelteKit; this is the same team's Svelte-compatible package.
//
// Use these for spring/gesture animation where CSS can't reach (confirmation
// panels, staggered entrances). The site's standard scroll reveal stays
// `use:reveal` (src/lib/reveal.ts) — pure CSS + IntersectionObserver, 0 KB.
import { animate, inView } from 'motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function reducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Spring-like pop-in for panels that appear after an interaction (e.g. a
 *  booking confirmation). The element is already in view when it mounts. */
export function popIn(node: HTMLElement) {
	if (reducedMotion()) return {};
	const controls = animate(
		node,
		{ opacity: [0, 1], scale: [0.96, 1], y: [12, 0] },
		{ duration: 0.45, ease: EASE }
	);
	return { destroy: () => controls.stop() };
}

/** Fade-and-rise entrance when the element scrolls into view. Sets the
 *  start state inline, so content below the fold never flashes visible. */
export function motionIn(node: HTMLElement, opts: { y?: number; delay?: number } = {}) {
	const { y = 24, delay = 0 } = opts;
	if (reducedMotion()) return {};
	node.style.opacity = '0';
	const stop = inView(
		node,
		() => {
			animate(node, { opacity: [0, 1], y: [y, 0] }, { duration: 0.6, delay, ease: EASE });
		},
		{ margin: '-8% 0px' }
	);
	return {
		destroy: () => {
			stop();
			node.style.opacity = '';
		}
	};
}
