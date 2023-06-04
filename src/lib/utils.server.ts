import server$ from "solid-start/server";
import { PokemonType } from "./type";
import PokemonList from "~/components/PokemonList";

export const PAGE_SIZE = 20;

export const getPokemons = async (offset: number = 0) => {
	const data = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species?limit=${PAGE_SIZE}&offset=${offset}`
	);
	const r: { results: PokemonType[] } = await data.json();
	return r;
};

export const loadMore = async (offset: number = 0) => {
	const pokemon = await getPokemons(offset);

	const nextOffset = pokemon.results.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

	return { pokemon, nextOffset };
};

export const loadMorePokemon$ = server$(loadMore);
