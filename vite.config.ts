import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Inline the stylesheet into each HTML page instead of serving
			// it as a render-blocking request (PageSpeed flagged
			// render-blocking requests of 70–130ms on every page). The
			// built CSS is ~69KB, so the threshold must exceed that —
			// 20000 was too small and nothing inlined (verified live).
			inlineStyleThreshold: 100000,
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true
			})
		})
	]
});
