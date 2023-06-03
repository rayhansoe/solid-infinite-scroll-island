import { cn } from "~/lib/utils";

const Card = (props: any) => (
	<div
		ref={props.ref}
		class={cn("rounded-lg border bg-card text-card-foreground shadow-sm", props.class)}
		{...props}
	/>
);
Card.displayName = "Card";

export { Card };
