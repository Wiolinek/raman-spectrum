<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { Spectrum } from '../../../interfaces/spectrum.interfaces';
  import { chartScalesOptions } from '$lib/chartScalesOptions';

  export let type: 'line' | 'bar' | 'scatter';
  export let spectrum: Spectrum;

  let chartCanvas: HTMLCanvasElement;
  let chart: Chart | null = null;

  type LegendPosition = 'top' | 'left' | 'right' | 'bottom' | 'center' | 'chartArea';

  $: data = {
    labels: spectrum.datasets.length > 0 ? spectrum.datasets[0].data.map((point) => point.x) : [],
    datasets: spectrum.datasets.map((dataset, datasetIndex) => ({
      id: dataset.id || `dataset-${datasetIndex}`,
      label: dataset.name || `Dataset ${datasetIndex + 1}`,
      data: dataset.data ? dataset.data.map((point) => point.y) : [],
      borderColor: dataset.color,
      backgroundColor: dataset.color,
      borderWidth: 2,
      fill: false,
    })),
  };

  $: options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: spectrum.name,
      },
      legend: {
        display: true,
        position: 'bottom' as LegendPosition,
      },
    },
    scales: chartScalesOptions(spectrum.xAxisName, spectrum.yAxisName),
  };

  onMount(() => {
    if (chartCanvas) {
      chart = new Chart(chartCanvas, {
        type,
        data,
        options,
      });
    }
  });

  let previousType: 'line' | 'bar' | 'scatter' = type;

  afterUpdate(() => {
    if (chart) {
      const currentTitle = chart.options.plugins?.title?.text;
      const currentXaxis = chart.options.scales?.x?.title?.text;
      const currentYaxis = chart.options.scales?.x?.title?.text;
      const { name, xAxisName, yAxisName } = spectrum;
      if (type !== previousType || currentTitle !== name || currentXaxis !== xAxisName || currentYaxis !== yAxisName) {
        previousType = type;
        chart.destroy();
        chart = new Chart(chartCanvas, {
          type,
          data,
          options,
        });
      } else {
        chart.data = data;
        chart.update();
      }
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<canvas bind:this={chartCanvas}></canvas>

<style>
  canvas {
    width: 100%;
    height: 400px;
  }
</style>
