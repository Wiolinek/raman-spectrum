<script lang="ts">
  import { PlusIcon, MinusIcon, Trash2 } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import { removeDataset } from '$lib/utils/removeDataset';
  import { renameDataset } from '$lib/utils/renameDataset';
  import { DatasetOperationType } from '$interfaces/operationType.enum';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  export let dataset;
  export let color: string;
  let operation: DatasetOperationType;
  let constantValue: string = '';

  let isOpen = false;
</script>

<div
  class="shadow-xl border border-neutral-300 rounded-md bg-white text-primary"
  style="background-color: {color}"
>
  <Button
    customClass="w-full px-4 py-3 md:py-5 md:px-6 gap-x-3"
    on:click={() => (isOpen = !isOpen)}
  >
    <p class="text-left text-base md:text-lg w-full font-medium">{dataset.name}</p>
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
        <div class="flex flex-col bg-white p-4 rounded-md gap-7">
            <TextInput
              customClass="w-3/4"
              label="Name:"
              value={dataset.name}
              onInput={(event) => renameDataset(dataset.id, event.target.value)}
            />
          <div class="flex flex-col gap-2">
            <h5 class="font-medium uppercase mb-3">Choose Operation:</h5>
            {#each Object.values(DatasetOperationType) as op}
              <div class="flex items-end h-8">
                <label class="w-fit cursor-pointer">
                  <input type="radio" name="operation" value={op} bind:group={operation} />
                  {op}
                </label>
                :
                <TextInput
                  customClass="mx-2 w-20"
                  value={constantValue}
                  onInput={() => console.log('constant value')}
                />
                <span class="text-sm text-primary/50">Enter a positive or negative integer</span>
              </div>
            {/each}
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
