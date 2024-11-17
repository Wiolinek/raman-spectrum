<script lang="ts">
  import { PlusIcon, MinusIcon, Trash2 } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import { removeDataset } from '$lib/utils/removeDataset';
  import { renameDataset } from '$lib/utils/renameDataset';

  export let dataset;
  export let color: string;
  export let disabled: boolean;

  let isOpen = false;
</script>

<div
  class="shadow-xl border border-neutral-300 rounded-md bg-white text-primary"
  style="background-color: {color}"
>
  <button
    class="w-full px-4 py-3 md:py-5 md:px-6 outline-none rounded-md focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-2 items-center flex gap-x-3"
    on:click={() => (isOpen = !isOpen)}
    {disabled}
  >
    <h4 class="text-left text-base md:text-lg w-full font-medium">{dataset.name}</h4>
    <div
      class="relative size-7 transition-transform {isOpen
        ? 'rotate-180'
        : 'rotate-90'}"
    >
      {#key isOpen}
        <span transition:fade={{ duration: 100 }}>
          {#if isOpen}
            <MinusIcon class="size-7 absolute left-0" />
          {:else}
            <PlusIcon class="size-7 absolute left-0" />
          {/if}
        </span>
      {/key}
    </div>
  </button>
  {#if isOpen}
    <div transition:slide class="px-6 pb-5">
      <div class="pt-5 border-t">
        <div class="spectrum-management flex flex-col bg-white p-4 rounded-md gap-7">
          <div>
            <label
              class="h-full shadow-sm rounded-md font-medium flex items-center gap-2 cursor-pointer"
            >
              Name:
              <input
                class="ring-1 ring-inset ring-primary rounded-md p-2"
                type="text"
                bind:value={dataset.name}
                on:input={() => renameDataset(dataset.id, dataset.name)}
              />
            </label>
          </div>
          <div>
            <label for="operation">Operations on {dataset.name}:</label>
            <input type="text" id="operation" placeholder="e.g. +10" />
            <!-- <button on:click={() => performOperation(`${spectrum.name}+${document.getElementById('operation').value}`)}>Apply</button> -->
          </div>
          <Button
            customClass="ml-auto mr-0 shadow-lg"
            variant="outlined"
            on:click={() => removeDataset(dataset.id)}
          >
            <Trash2 />
            Remove dataset
          </Button>
        </div>
      </div>
    </div>
  {/if}
</div>
