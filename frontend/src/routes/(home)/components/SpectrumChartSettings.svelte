<script lang="ts">
  import { PlusIcon, MinusIcon } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import { renameSpectrum } from '$lib/utils/spectrum/renameSpectrum';
  import { renameAxis } from '$lib/utils/spectrum/renameAxis';
  import { ChartType } from '$interfaces/chartType.enum';
  import { Axis } from '$interfaces/spectrum.interfaces';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  export let chartType: ChartType;
  export let id: string;
  export let name: string;
  export let xAxisName: string;
  export let yAxisName: string;

  let isOpen = false;
</script>

<div class="shadow-xl border border-neutral-300 rounded-md bg-white text-primary">
  <Button
    customClass="w-full px-4 py-3 md:py-5 md:px-6 gap-x-3"
    on:click={() => (isOpen = !isOpen)}
  >
    <p class="text-left text-base md:text-lg w-full font-medium">Spectrum chart settings</p>
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
  </Button>
  {#if isOpen}
    <div transition:slide class="px-6 pb-5">
      <div class="pt-5 border-t">
        <div class="flex flex-col bg-white p-4 rounded-md gap-7 shadow-lg border">
          <div class="flex align-center gap-4">
            <p class="flex items-center">Chart type:</p>
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
          <div class="flex h-8 w-3/4">
            <TextInput
              customClass="w-full"
              label="Chart title:"
              value={name}
              onInput={(event) => renameSpectrum(id, event.target.value)}
            />
          </div>
          <div class="flex flex-col gap-7 w-3/4">
            <TextInput
              customClass="w-full"
              label="X-axis:"
              value={xAxisName}
              onInput={(event) => renameAxis(id, Axis.X, event.target.value)}
            />
            <TextInput
              customClass="w-full"
              label="Y-axis:"
              value={yAxisName}
              onInput={(event) => renameAxis(id, Axis.Y, event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
