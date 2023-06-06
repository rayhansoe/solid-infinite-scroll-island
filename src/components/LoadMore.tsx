import {
	JSX,
	Show,
	createEffect,
	createMemo,
	createResource,
	createSignal,
	onMount,
} from "solid-js";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Card } from "./ui/Card";
import { Switch } from "./ui/Switch";
import { loadMore } from "~/lib/utils.server";
import { PokemonType } from "~/lib/type";
import { createStore, produce } from "solid-js/store";

const LoadMored = <T extends number = any>(props: { initialOffset: T; children: JSX.Element }) => {
	let ref: HTMLButtonElement | undefined;
	let PokemonListWrapper: HTMLElement | HTMLDivElement | null | undefined;

	const [currentOffsetRef, setCurrentOffsetRef] = createSignal<number>();

	const [newPokemon] = createResource(currentOffsetRef, loadMore);

	const [loadMorePokemon, setLoadMorePokemon] = createStore<PokemonType[]>([]);

	const [scrollLoad, setScrollLoad] = createSignal(true);

	const handleLoadMore = () => {
		if (newPokemon.latest?.nextOffset) {
			setCurrentOffsetRef(newPokemon.latest.nextOffset);
			return;
		}
		setCurrentOffsetRef(() => props.initialOffset);
	};

	const morePokemon = createMemo(() => {
		if (newPokemon.latest?.pokemon.results) {
			setLoadMorePokemon(
				produce((pokemons) => {
					pokemons.push(...newPokemon().pokemon.results);
				})
			);
			return loadMorePokemon;
		}
		return loadMorePokemon;
	});

	onMount(() => {
		PokemonListWrapper = document.getElementById("#PokemonListWrapper");
	});

	createEffect(() => {
		if (PokemonListWrapper && morePokemon().length) {
			const newP = morePokemon().map((pokemon) => (
				<div class='rounded-lg border bg-card text-card-foreground shadow-sm'>
					<div class='flex flex-col items-center p-4 gap-4'>
						<img
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
								pokemon.url.split("/")[6]
							}.png`}
							width={288}
							height={288}
							alt={pokemon.name}
							loading='lazy'
						/>
						<span class='text-2xl font-bold text-white capitalize'>{pokemon.name}</span>
					</div>
				</div>
			));

			PokemonListWrapper.append(...newP);
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
				{/* <Suspense fallback='Loading'>
					<Show when={morePokemon()}>
						<div
							id='#PokemonListWrapper'
							class='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 relative'
						>
							<PokemonList pokemon={morePokemon()} />
						</div>
					</Show>
				</Suspense> */}

				<Button
					variant='outline'
					size='lg'
					ref={ref}
					disabled={newPokemon.loading}
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
