<script lang="ts">
import { toast } from 'svelte-sonner';
  import { PlusIcon, MinusIcon, Trash2, X } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import { removeDataset } from '$lib/utils/dataset/removeDataset';
  import { renameDataset } from '$lib/utils/dataset/renameDataset';
  import { DatasetOperationType } from '$interfaces/operationType.enum';
  import { updateOperations } from '$lib/utils/operations/updateOperations';
  import { changeConstant } from '$lib/utils/operations/changeConstant';
  import RadioInput from '$lib/components/ui/RadioInput.svelte';

  export let spectrumId: string;
  export let dataset;
  export let color: string;
  let operation: DatasetOperationType | null = null;
  let constantValue: string = '';
  let isOpen: boolean = false;

  $: {
    if (dataset.operations) {
      operation = dataset.operations.type || null;
      constantValue = dataset.operations.constant?.toString() || '';
    }
  }

  const handleOperationChange = (newOperation: DatasetOperationType) => {
    if (newOperation !== operation) {
      operation = newOperation;
      updateOperations(newOperation, constantValue, dataset.id);
    }
  };

  const handleConstantChange = (event: Event) => {
    let value = changeConstant(event);

    if (/^0*$/.test(value)) {
      value = '1';
      toast.error('Only positive or negative numbers are allowed');
    }

    constantValue = value;
    event.target.value = value;
    updateOperations(operation, constantValue, dataset.id);
  };

  const handleOperationsClear = () => {
    updateOperations(null, null, dataset.id);
    operation = null;
    constantValue = '';
  };
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
                <RadioInput value={op} name={`operation-${dataset.id}`} {operation} onChange={() => handleOperationChange(op)}/>
                {#if operation === op}
                  <TextInput
                    customClass="mx-2 w-20"
                    value={constantValue}
                    onInput={(event) => handleConstantChange(event)}
                  />
                {/if}
              </div>
            {/each}
          </div>
          <div class="flex gap-5 justify-end">
            <Button
              customClass="ml-auto mr-0 shadow-lg"
              variant="outlined"
              on:click={handleOperationsClear}
            >
              <X />
              Clear dataset
            </Button>
            <Button
              customClass="shadow-lg"
              variant="outlined"
              on:click={() => removeDataset(dataset.id)}
            >
              <Trash2 />
              Remove dataset
            </Button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
