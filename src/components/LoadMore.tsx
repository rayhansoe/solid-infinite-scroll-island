import { JSX, createSignal } from "solid-js";
import { Switch } from "@kobalte/core";

const LoadMore = <T extends string | number = any>(props: {
	initialOffset: T;
	children: JSX.Element;
}) => {
	let ref: HTMLButtonElement | undefined;

	const [disabled, setDisabled] = createSignal(false);
	const [scrollLoad, setScrollLoad] = createSignal(true);
	const [loading, setLoading] = createSignal(false);

	return (
		<>
			<div class='flex flex-col gap-4 items-center'>
				<div class='fixed container top-4 z-50 flex justify-end'>
					<Switch.Root
						checked={scrollLoad()}
						onChange={() => setScrollLoad((p) => !p)}
						class='switch rounded-lg border bg-card text-card-foreground shadow-sm w-max flex p-4 gap-4 items-center cursor-pointer'
					>
						<Switch.Input class='switch__input' />
						<Switch.Control class='switch__control'>
							<Switch.Thumb class='switch__thumb' />
						</Switch.Control>
						<Switch.Label class='switch__label cursor-pointer'>Fetch on Scroll</Switch.Label>
					</Switch.Root>
				</div>

				{props.children}
				<button
					onClick={() => console.log("d")}
					disabled={disabled() || loading()}
					class='inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md'
				>
					{loading() ? "Loading..." : "Load More"}
				</button>
			</div>
		</>
	);
};

export default LoadMore;
