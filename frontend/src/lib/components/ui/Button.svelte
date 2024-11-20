<script lang="ts">
  export let type: "button" | "submit" = 'button';
  export let customClass: string = '';
  export let disabled: boolean = false;
  export let variant: 'default' | 'outlined' | 'fullfilled' = 'default';

  const defaultClass =
    'flex items-center justify-center gap-1 rounded-md drop-shadow-custom-drop-shadow text-md py-2 px-3 font-medium text-primary outline-none focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-2';

  const buttonVariants = {
    default: '',
    outlined: 'ring-1 ring-inset ring-primary hover:bg-neutral-100',
    fullfilled: 'bg-primary text-white',
  };
</script>

<button {type} class={`${defaultClass} ${buttonVariants[variant]} ${customClass}`} {disabled} on:click>
  <slot />
</button>
