import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import Pokemon from "~/components/Pokemon";
export const PAGE_SIZE = 20;

export type PokemonType = {
	name: string;
	url: string;
};

const getPokemons = async (offset: number = 0) => {
	const data = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species?limit=${PAGE_SIZE}&offset=${offset}`
	);
	const r: { results: PokemonType[] } = await data.json();
	return r;
};

export function routeData() {
	return createServerData$(getPokemons);
}

export default function Home() {
	const initialPokemon = useRouteData<typeof routeData>();
	return (
		<main class='flex min-h-screen flex-col container mb-8 mt-32'>
			<h1 class='text-2xl md:text-4xl font-bold mb-8 text-white text-center'>
				Infinite Scroll Server Actions Example
			</h1>

			<Show when={initialPokemon()}>
				<Pokemon pokemon={initialPokemon()} />
			</Show>
		</main>
	);
}
