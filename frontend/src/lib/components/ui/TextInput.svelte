<script lang="ts">
  export let customClass: string = '';
  export let value: string = '';
  export let label: string = '';
  export let onInput;

  const defaultClass = 'border-b border-secondary px-2 py-0.5 shadow-lg flex items-end';
</script>

<label class="h-full w-full rounded-md flex items-end gap-2 h-8 text-nowrap">
  {label}
  <input type="text" class={`${defaultClass} ${customClass}`} bind:value on:input={onInput} />
</label>
