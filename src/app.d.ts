// Vite asset imports (e.g. font preloads via `*.woff2?url` in +layout.svelte).
declare module '*.woff2?url' {
	const src: string;
	export default src;
}

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
