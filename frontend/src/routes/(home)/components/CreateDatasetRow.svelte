<script lang="ts">
  import { PlusIcon, MinusIcon, Check, X } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import { createNewDataset } from '$lib/utils/dataset/createNewDataset';
  import type { Spectrum } from '$interfaces/spectrum.interfaces';
  import { CreateDatasetOperationType } from '$interfaces/operationType.enum';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import RadioInput from '$lib/components/ui/RadioInput.svelte';

  export let spectrum: Spectrum;

  let isOpen = false;
  let selectedDatasets: string[] = [];
  let operation: CreateDatasetOperationType | null = null;
  let datasetName: string = '';

  const handleCreateDataset = async () => {
    const response = await createNewDataset(spectrum.id, selectedDatasets, operation, datasetName);

    if (response?.success) {
      selectedDatasets = [];
      operation = null;
      datasetName = '';
      isOpen = false;
    }
  };

  const isDatasetSelected = (id: string) => selectedDatasets.includes(id);

  const toggleDatasetSelection = (id: string, checked: boolean) => {
    if (checked) {
      if (selectedDatasets.length < 2) {
        selectedDatasets = [...selectedDatasets, id];
      }
    } else {
      selectedDatasets = selectedDatasets.filter((datasetId) => datasetId !== id);
    }
  };
</script>

<div class="shadow-xl border border-neutral-300 rounded-md bg-white text-primary">
  <Button
    customClass="w-full px-4 py-3 md:py-5 md:px-6 gap-x-3"
    on:click={() => (isOpen = !isOpen)}
  >
    <p class="text-left text-base md:text-lg w-full font-medium">
      Create new dataset from existing datasets
    </p>
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
        {#if spectrum.datasets.length === 0}
          <p class="text-red">First, you need to upload at least 2 datasets to this chart</p>
        {:else}
          <div class="flex flex-col bg-white p-4 rounded-md gap-7 shadow-lg border">
            <TextInput
              customClass="w-3/4"
              label="Name:"
              value={datasetName}
              onInput={(event) => (datasetName = event.target.value)}
            />
            <div class="flex gap-20">
              <div class="flex flex-col gap-2">
                <h5 class="font-medium uppercase mb-3">Select Datasets (Max. 2):</h5>
                {#each spectrum.datasets as dataset}
                  <div class="flex gap-2 items-end h-8 w-full">
                    <label class="w-full cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDatasetSelected(dataset.id)}
                        on:change={(e) => toggleDatasetSelection(dataset.id, e.target.checked)}
                        disabled={selectedDatasets.length >= 2 &&
                          !selectedDatasets.includes(dataset.id)}
                      />
                      {dataset.name}
                    </label>
                  </div>
                {/each}
              </div>
              <div class="flex flex-col gap-2">
                <h5 class="font-medium uppercase mb-3">Choose Operation:</h5>
                {#each Object.values(CreateDatasetOperationType) as op}
                  <div class="flex items-end h-8 w-full">
                    <RadioInput
                      value={op}
                      name="operation-create"
                      {operation}
                      onChange={() => (operation = op)}
                    />
                  </div>
                {/each}
              </div>
            </div>
            <div class="flex gap-5 justify-end">
              <Button
                customClass="shadow-lg"
                variant="outlined"
                on:click={() => {
                  selectedDatasets = [];
                  operation = null;
                  datasetName = '';
                }}
              >
                <X />
                Clear dataset
              </Button>
              <Button
                customClass="bg-custom-gradient"
                variant="outlined"
                on:click={handleCreateDataset}
              >
                <Check />
                Create dataset
              </Button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
