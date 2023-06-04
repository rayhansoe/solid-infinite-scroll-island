import { JSX, Show, createEffect, createResource, createSignal, onMount } from "solid-js";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Card } from "./ui/Card";
import { Switch } from "./ui/Switch";
import { loadMore } from "~/lib/utils.server";
import { PokemonType } from "~/lib/type";
import PokemonList from "./PokemonList";
import { createStore, produce } from "solid-js/store";

const LoadMored = <T extends number = any>(props: { initialOffset: T; children: JSX.Element }) => {
	let ref: HTMLButtonElement | undefined;
	const [currentOffsetRef, setCurrentOffsetRef] = createSignal<number>();

	const [newPokemon] = createResource(currentOffsetRef, loadMore);

	const [loadMorePokemon, setLoadMorePokemon] = createStore<PokemonType[]>([]);

	const [disabled, setDisabled] = createSignal(false);
	const [scrollLoad, setScrollLoad] = createSignal(true);
	const [loading, setLoading] = createSignal(false);

	const handleLoadMore = () => {
		if (newPokemon.latest?.nextOffset) {
			setCurrentOffsetRef(newPokemon.latest.nextOffset);
			return;
		}
		setCurrentOffsetRef(() => props.initialOffset);
	};

	createEffect(() => {
		const newDerPokemon = newPokemon.latest?.pokemon.results;
		if (newDerPokemon) {
			setLoadMorePokemon(
				produce((pokemons) => {
					pokemons.push(...newDerPokemon);
				})
			);
		}
	});

	return (
		<>
			<div class='flex flex-col gap-4 items-center'>
				<div class='fixed container top-4 z-50 flex justify-end'>
					<Label class='cursor-pointer'>
						<Card class='w-max flex p-4 gap-4 items-center m-2'>
							<Switch
								id='scrollLoad'
								onChange={() => setScrollLoad((prev) => !prev)}
								checked={scrollLoad()}
							></Switch>
							<span>Fetch on scroll</span>
						</Card>
					</Label>
				</div>

				{props.children}
				<Show when={loadMorePokemon}>
					<div
						id='#PokemonListWrapper'
						class='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 relative'
					>
						<PokemonList pokemon={loadMorePokemon} />
					</div>
				</Show>

				<Button
					variant='outline'
					size='lg'
					ref={ref}
					disabled={disabled() || newPokemon.loading}
					onClick={handleLoadMore}
				>
					<Show when={newPokemon.loading} fallback={<span>Load More</span>}>
						<span>Loading...</span>
					</Show>
				</Button>
			</div>
		</>
	);
};

export default LoadMored;
