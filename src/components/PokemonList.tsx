import { For } from "solid-js";
import { PokemonType } from "~/routes";
import { Card } from "./ui/Card";

const PokemonList = (props: { pokemon?: { results: PokemonType[] } }) => {
	return (
		<>
			<For each={props.pokemon?.results}>
				{(pokemon) => (
					<Card>
						<div class='flex flex-col items-center p-4 gap-4'>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
									pokemon.url.split("/")[6]
								}.png`}
								alt={pokemon.name}
							/>
							<span class='text-2xl font-bold text-white capitalize'>{pokemon.name}</span>
						</div>
					</Card>
				)}
			</For>
		</>
	);
};

export default PokemonList;
