<script lang="ts">
  import { PlusIcon, MinusIcon } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import { renameSpectrum } from '$lib/utils/renameSpectrum';
  import { ChartType } from '$interfaces/chartType.enum';

  export let chartType: ChartType;
  export let id: string;
  export let name: string;

  let isOpen = false;
</script>

<div class="shadow-xl border border-neutral-300 rounded-md bg-white text-primary">
  <button
    class="w-full px-4 py-3 md:py-5 md:px-6 outline-none rounded-md focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-2 items-center flex gap-x-3"
    on:click={() => (isOpen = !isOpen)}
  >
    <h4 class="text-left text-base md:text-lg w-full font-medium">Spectrum chart settings</h4>
    <div class="relative size-7 transition-transform {isOpen ? 'rotate-180' : 'rotate-90'}">
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
    <div transition:slide class="flex flex-col gap-4 px-6 py-5">
      <div class="flex align-center gap-4">
        <p class="flex items-center">Chart settings</p>
        {#each Object.values(ChartType) as type}
          <Button
            variant="outlined"
            customClass="w-20 shadow-lg"
            on:click={() => (chartType = type)}
          >
            {type}
          </Button>
        {/each}
      </div>
      <div class="flex gap-4">
        <label class="h-full shadow-sm rounded-md flex items-center gap-2 cursor-pointer">
          Chart title:
          <input
            class="ring-1 ring-inset ring-primary rounded-md p-2 shadow-lg"
            type="text"
            bind:value={name}
            on:input={() => renameSpectrum(id, name)}
          />
        </label>
      </div>
    </div>
  {/if}
</div>
