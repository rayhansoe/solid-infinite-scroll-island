import { Switch as Sw } from "@kobalte/core";
import "./style.css";
export function Switch(props: { children: string }) {
	return (
		<Sw.Root class='switch'>
			<Sw.Label class='switch__label'>{props.children}</Sw.Label>
			<Sw.Input class='switch__input' />
			<Sw.Control class='switch__control'>
				<Sw.Thumb class='switch__thumb' />
			</Sw.Control>
		</Sw.Root>
	);
}
