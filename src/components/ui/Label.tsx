import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = (props: any) => (
	<label ref={props.ref} class={cn(labelVariants(), props.class)} {...props} />
);

export { Label };
