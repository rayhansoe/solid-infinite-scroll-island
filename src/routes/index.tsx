import { Show, Suspense } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import Pokemon from "~/components/Pokemon";
import { getPokemons } from "~/lib/utils.server";

export function routeData() {
	return createServerData$(getPokemons);
}

export default function Home() {
	const initialPokemon = useRouteData<typeof routeData>();
	return (
		<main class='flex min-h-screen flex-col container mb-8 mt-32'>
			<h1 class='text-2xl md:text-4xl font-bold mb-8 text-white text-center'>
				Infinite Scroll Island Example
			</h1>

			<Suspense fallback='Loading...'>
				<Show when={initialPokemon()}>
					<Pokemon pokemon={initialPokemon()?.results} />
				</Show>
			</Suspense>
		</main>
	);
}
