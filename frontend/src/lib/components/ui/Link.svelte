<script lang="ts">
	export let href: string = '/';
	export let customClass: string = '';
	export let variant: 'default' | 'outlined' | 'fullfilled' = 'default';

	const defaultClass = 'uppercase rounded-md drop-shadow-custom-drop-shadow text-md py-2 px-3 font-medium text-primary';

	const buttonVariants = {
		default: '',
		outlined: 'ring-1 ring-inset ring-primary hover:bg-neutral-100',
		fullfilled: 'bg-primary text-white hover:bg-neutral-300',
	};
</script>

<a
	href={href}
	class={`${defaultClass} ${buttonVariants[variant]} ${customClass}`}
	on:click
>
	<slot />
</a>
