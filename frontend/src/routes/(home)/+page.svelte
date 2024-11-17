<script lang="ts">
  import { onMount } from 'svelte';
  import { Trash2 } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Chart from './components/Chart.svelte';
  import DatasetRow from './components/DatasetRow.svelte';
  import NewDatasetRow from './components/NewDatasetRow.svelte';
  import { MAX_DATASETS_COUNT } from '$lib/utils/addNewDataset';
  import { addNewSpectrum } from '$lib/utils/addNewSpectrum';
  import { fetchSpectra } from '$lib/utils/fetchSpectra';
  import { removeSpectrum } from '$lib/utils/removeSpectrum';
  import { spectraStore } from '$stores/spectraStore';
  import AddDatasetButtons from './components/AddDatasetButtons.svelte';
  import SpectrumChartSettings from './components/SpectrumChartSettings.svelte';
  import { ChartType } from '$interfaces/chartType.enum';

  let newDatasetRows: { id: number; color: string }[] = [];
  let chartType = ChartType.Line;

  onMount(async () => {
    await fetchSpectra();
  });
</script>

<main class="flex flex-col w-full max-w-screen-xl mx-auto py-16 gap-10">
  <h1>Raman Spectra Viewer</h1>

  <Button customClass="shadow-xl border border-neutral-300 h-[68px] w-96" on:click={addNewSpectrum}>
    Create spectrum
  </Button>

  {#if $spectraStore.length > 0}
    {#each $spectraStore as spectrum}
      <div
        class="flex flex-col gap-6 rounded-md shadow-heavy-box-shadow py-8 px-16"
        id={spectrum.id}
      >
        <SpectrumChartSettings id={spectrum.id} name={spectrum.name} bind:chartType />
        <div class="flex flex-col gap-6 rounded-md">
          <div class="flex flex-col gap-10">
            <Chart type={chartType} {spectrum} />
            <div class="flex flex-col gap-3">
              {#each spectrum.datasets as dataset}
                <DatasetRow
                  {dataset}
                  color={dataset.color}
                  disabled={spectrum.datasets.length === MAX_DATASETS_COUNT}
                />
              {/each}
              {#each newDatasetRows as row (row.id)}
                <NewDatasetRow
                  color={row.color}
                  disabled={spectrum.datasets.length === MAX_DATASETS_COUNT}
                />
              {/each}
              {#if spectrum.datasets.length < MAX_DATASETS_COUNT}
                <AddDatasetButtons spectrumId={spectrum.id} />
              {/if}
              <Button
                customClass="ml-auto mr-0 mt-10 shadow-lg"
                variant="outlined"
                on:click={() => removeSpectrum(spectrum.id)}
              >
                <Trash2 />
                Remove spectrum
              </Button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <h2>No data available. Upload a spectrum file to view the chart.</h2>
  {/if}
</main>
