<script lang="ts">
  import { onMount } from 'svelte';
  import { Trash2, ArrowUp, ArrowDown } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Chart from './components/Chart.svelte';
  import DatasetRow from './components/DatasetRow.svelte';
  import { MAX_DATASETS_COUNT } from '$lib/utils/dataset/addNewDataset';
  import { addNewSpectrum } from '$lib/utils/spectrum/addNewSpectrum';
  import { fetchSpectra } from '$lib/utils/spectrum/fetchSpectra';
  import { removeSpectrum } from '$lib/utils/spectrum/removeSpectrum';
  import { spectraStore } from '$stores/spectraStore';
  import AddDatasetRow from './components/AddDatasetRow.svelte';
  import SpectrumChartSettings from './components/SpectrumChartSettings.svelte';
  import CreateDatasetRow from './components/CreateDatasetRow.svelte';

  let isAscending = false;

  onMount(async () => {
    await fetchSpectra();
  });

  const sortSpectra = () => {
    isAscending = !isAscending;
    spectraStore.update((spectra) => {
      return [...spectra].sort((a, b) => {
        return isAscending
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Ascending
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Descending
      });
    });
  };
</script>

<main class="flex flex-col w-full max-w-screen-xl mx-auto pt-36 pb-16 gap-10 px-8">
  <div class="flex flex-col w-full gap-10">
    <h1 class="text-2xl font-extrabold mb-8">Raman Spectra Viewer</h1>
    <div class="flex justify-between items-end w-full">
      <Button
        customClass="shadow-xl border border-neutral-300 h-[68px] w-96 bg-custom-gradient"
        on:click={addNewSpectrum}
      >
        Create spectrum
      </Button>
      <Button customClass="shadow-xl border border-neutral-300" on:click={sortSpectra}>
        Sort by Created Date
        {#if isAscending}
          <ArrowUp />
        {:else}
          <ArrowDown />
        {/if}
      </Button>
    </div>
  </div>

  <section>
    {#if $spectraStore.length > 0}
      {#each $spectraStore as spectrum}
        <div
          class="flex flex-col gap-16 rounded-md shadow-heavy-box-shadow py-8 px-16"
          id={spectrum.id}
        >
          <SpectrumChartSettings
            id={spectrum.id}
            name={spectrum.name}
            xAxisName={spectrum.xAxisName}
            yAxisName={spectrum.yAxisName}
            chartType={spectrum.chartType}
          />
          <Chart type={spectrum.chartType} {spectrum} />
          <div class="flex flex-col gap-3">
            {#each spectrum.datasets as dataset}
              <DatasetRow spectrumId={spectrum.id} {dataset} color={dataset.color} />
            {/each}
            {#if spectrum.datasets.length < MAX_DATASETS_COUNT}
              <CreateDatasetRow {spectrum} />
              <AddDatasetRow spectrumId={spectrum.id} />
            {/if}
            <Button
              customClass="ml-auto mr-0 mt-10 shadow-lg"
              variant="fullfilled"
              on:click={() => removeSpectrum(spectrum.id)}
            >
              <Trash2 />
              Remove spectrum
            </Button>
          </div>
        </div>
      {/each}
    {:else}
      <h2>No data available. Upload a spectrum file to view the chart.</h2>
    {/if}
  </section>
</main>

<style>
  .transition-transform {
    transition: transform 0.3s ease-in-out;
  }
</style>
