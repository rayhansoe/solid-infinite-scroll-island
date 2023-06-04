import { For } from "solid-js";
import { Card } from "./ui/Card";
import { PokemonType } from "~/lib/type";

const PokemonList = (props: { pokemon?: PokemonType[] }) => {
	return (
		<>
			<For each={props.pokemon}>
				{(pokemon) => (
					<Card>
						<div class='flex flex-col items-center p-4 gap-4'>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
									pokemon.url.split("/")[6]
								}.png`}
								alt={pokemon.name}
								loading='lazy'
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
