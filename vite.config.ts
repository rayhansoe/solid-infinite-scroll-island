import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

export default defineConfig({
	plugins: [
		solid({
			islands: true,
			islandsRouter: true,
			// adapter: vercel({ edge: true }),
		}),
	],
	ssr: {
		noExternal: ["@kobalte/core"],
	},
});