import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

export default defineConfig({
	plugins: [
		solid({ ssr: true, islands: true, islandsRouter: true, adapter: vercel({ edge: false }) }),
	],
	ssr: {
		noExternal: ["@kobalte/core"],
	},
});
