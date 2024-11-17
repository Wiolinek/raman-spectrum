<script lang="ts">
  import { addNewDataset } from '$lib/utils/addNewDataset';
  import { createNewDataset } from '$lib/utils/createNewDataset';

  export let spectrumId: string;
</script>

<button
  class="rounded-md font-medium flex items-center cursor-pointer h-[68px] border border-neutral-300 bg-white w-full outline-none focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-2 shadow-lg px-4 py-3 md:py-5 md:px-6 text-primary"
  on:click={createNewDataset}
>
  Create new dataset from existing datasets
</button>

<div
  class="relative h-[68px] border border-neutral-300 rounded-md bg-white w-full outline-none rounded-md focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-2 shadow-lg text-primary"
>
  <label class="h-full rounded-md font-medium flex items-center cursor-pointer">
    <input
      class="absolute opacity-0 cursor-pointer top-0 bottom-0 left-0 right-0"
      type="file"
      multiple
      accept=".txt"
      on:change={(e) => addNewDataset(e, spectrumId)}
    />
    <span class="px-4 py-3 md:py-5 md:px-6">Add new dataset</span>
  </label>
</div>
