<script lang="ts">
	export let customClass: string = '';
	export let variant: 'default' | 'outlined' | 'fullfilled' = 'default';

	const defaultClass = 'flex items-center justify-center gap-1 rounded-md drop-shadow-custom-drop-shadow text-md p-2 font-medium text-primary focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-2';

	const buttonVariants = {
		default: '',
		outlined: 'ring-1 ring-inset ring-primary hover:bg-neutral-100',
		fullfilled: 'bg-primary text-white hover:bg-neutral-300',
	};
</script>

<button
	class={`${defaultClass} ${buttonVariants[variant]} ${customClass}`}
	on:click
>
	<slot />
</button>
