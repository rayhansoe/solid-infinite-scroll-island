import { PokemonType } from "~/lib/type";
import PokemonList from "./PokemonList";
import { unstable_island } from "solid-start";
export const PAGE_SIZE = 20;
const LoadMore = unstable_island(() => import("../components/LoadMore"));

export default function Pokemon(props: { pokemon?: PokemonType[] }) {
	return (
		<LoadMore initialOffset={PAGE_SIZE}>
			<div class='flex flex-col gap-4 items-center'>
				<div
					id='#PokemonListWrapper'
					class='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-12 relative'
				>
					<PokemonList pokemon={props.pokemon} />
				</div>
			</div>
		</LoadMore>
	);
}
