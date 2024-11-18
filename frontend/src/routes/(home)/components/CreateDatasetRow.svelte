<script lang="ts">
  import { PlusIcon, MinusIcon, Trash2, Check, X } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import { createNewDataset } from '$lib/utils/createNewDataset';
  import type { Dataset, Spectrum } from '$interfaces/spectrum.interfaces';
  import { CreateDatasetOperationType } from '$interfaces/operationType.enum';
  import { generateColor } from '$lib/utils/generateColor';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  export let spectrum: Spectrum;

  let isOpen = false;
  let selectedDatasets: string[] = [];
  let operation: CreateDatasetOperationType;
  let constantValue: string = '';
  let errorMessage: string = '';
  let datasetName: string = '';

  const handleCreateDataset = async () => {
    if (
      selectedDatasets.length !== 2 &&
      operation !== CreateDatasetOperationType.AddConstant &&
      operation !== CreateDatasetOperationType.Multiply
    ) {
      errorMessage = 'Please select exactly 2 datasets for this operation.';
      return;
    }

    if (
      (operation === CreateDatasetOperationType.AddConstant ||
        operation === CreateDatasetOperationType.Multiply) &&
      constantValue === null
    ) {
      errorMessage = 'Please enter a constant value.';
      return;
    }

    errorMessage = '';

    const [dataset1, dataset2] = selectedDatasets.map((id) =>
      spectrum.datasets.find((ds) => ds.id === id),
    );

    let newDatasetData;
    const color = generateColor();

    if (operation === OperationType.Add) {
      newDatasetData = dataset1.data.map((point, index) => ({
        x: point.x,
        y: point.y + dataset2.data[index]?.y || 0,
      }));
    } else if (operation === OperationType.Subtract) {
      newDatasetData = dataset1.data.map((point, index) => ({
        x: point.x,
        y: point.y - dataset2.data[index]?.y || 0,
      }));
    } else if (operation === OperationType.AddConstant) {
      newDatasetData = dataset1.data.map((point) => ({
        x: point.x,
        y: point.y + constantValue,
      }));
    } else if (operation === OperationType.Multiply) {
      newDatasetData = dataset1.data.map((point) => ({
        x: point.x,
        y: point.y * constantValue,
      }));
    }

    const newDataset = {
      id: `d${Date.now()}`,
      name: `New Dataset (${operation})`,
      data: newDatasetData,
      color,
    };

    await createNewDataset(spectrum.id, newDataset);

    selectedDatasets = [];
    constantValue = null;
    isOpen = false;
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
        <div class="flex flex-col bg-white p-4 rounded-md gap-7 shadow-lg border">
          <TextInput
            customClass="w-3/4"
            label="Name:"
            value={datasetName}
            onInput={() => console.log('set name')}
          />
          <div class="flex gap-20">
            <div class="flex flex-col gap-2">
              <h5 class="font-medium uppercase mb-3">Select Datasets (Max 2):</h5>
              {#each spectrum.datasets as dataset}
                <div class="flex gap-2 items-end h-8">
                  <label class="w-fit cursor-pointer">
                    <input
                      type="checkbox"
                      value={dataset.id}
                      on:change={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          if (selectedDatasets.length < 2)
                            selectedDatasets = [...selectedDatasets, dataset.id];
                        } else {
                          selectedDatasets = selectedDatasets.filter((id) => id !== dataset.id);
                        }
                      }}
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
                <div class="flex items-end h-8">
                  <label class="w-fit cursor-pointer">
                    <input type="radio" name="operation" value={op} bind:group={operation} />
                    {op}
                  </label>
                  {#if op === CreateDatasetOperationType.AddConstant || op === CreateDatasetOperationType.Multiply}
                    :
                    <TextInput
                      customClass="mx-2 w-20"
                      value={constantValue}
                      onInput={() => console.log('constant value')}
                    />
                    <span class="text-sm text-primary/50">Enter a positive or negative integer</span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>

          {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
          {/if}

          <div class="flex gap-5 justify-end">
            <Button customClass="shadow-lg" variant="outlined" on:click={handleCreateDataset}>
              <Check />
              Create dataset
            </Button>
            <Button
              customClass="shadow-lg"
              variant="outlined"
              on:click={() => console.log('usuń ten dataset')}
            >
              <X />
              Clear dataset
            </Button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
