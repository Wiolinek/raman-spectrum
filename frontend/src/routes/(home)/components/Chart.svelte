<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import Chart from 'chart.js/auto';
  import type { Spectrum, Dataset } from '$interfaces/spectrum.interfaces';
  import { chartScalesOptions } from '$lib/utils/spectrum/chartScalesOptions';
  import { DatasetOperationType } from '$interfaces/operationType.enum';
  import { ChartType } from '$interfaces/chartType.enum';

  export let type: ChartType;
  export let spectrum: Spectrum;

  let chartCanvas: HTMLCanvasElement;
  let chart: Chart | null = null;

  type LegendPosition = 'top' | 'left' | 'right' | 'bottom' | 'center' | 'chartArea';

  const processDatasets = (datasets: Dataset[]) => {
    return datasets.map((dataset, datasetIndex) => {
      const updatedData = dataset.data.map(({ x, y }) => {
        if (dataset?.operations) {
          const { type, constant } = dataset.operations;
          if (type === DatasetOperationType.AddConstant) {
            y += constant;
          } else if (type === DatasetOperationType.Multiply) {
            y *= constant;
          }
        }
        return { x, y };
      });

      return {
        id: dataset.id || `dataset-${datasetIndex}`,
        label: dataset.name || `Dataset ${datasetIndex + 1}`,
        data: updatedData.map((point) => point.y),
        borderColor: dataset.color,
        backgroundColor: dataset.color,
        borderWidth: 2,
        pointRadius: type === ChartType.Scatter ? 2 : 0,
        fill: false,
      };
    });
  };

  $: data = {
    labels: spectrum.datasets.length > 0 ? spectrum.datasets[0].data.map((point) => point.x) : [],
    datasets: processDatasets(spectrum.datasets),
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

  let previousType: ChartType = type;

  afterUpdate(() => {
    if (chart) {
      const currentTitle = chart.options.plugins?.title?.text;
      const currentXaxis = chart.options.scales?.x?.title?.text;
      const currentYaxis = chart.options.scales?.y?.title?.text;
      const { name, xAxisName, yAxisName } = spectrum;

      if (
        type !== previousType ||
        currentTitle !== name ||
        currentXaxis !== xAxisName ||
        currentYaxis !== yAxisName
      ) {
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
