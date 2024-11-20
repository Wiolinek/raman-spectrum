import { get } from 'svelte/store';
import { Spectrum } from "$interfaces/spectrum.interfaces";
import { fetchSpectra } from './fetchSpectra';
import { spectraStore } from '$stores/spectraStore';
import { ChartType } from "$interfaces/chartType.enum";

export const updateChartType = async (spectrumId: string, chartType: ChartType) => {
  const spectra: Spectrum[] = get(spectraStore);

  const parentSpectrum = spectra.find(spectrum => spectrum.id === spectrumId)

  if (!parentSpectrum) {
    console.error('Parent spectrum not found for dataset:', spectrumId);
    return;
  }

  const updatedSpectrum = {
    ...parentSpectrum,
    chartType: chartType,
  };

  try {
    const response = await fetch(`http://localhost:3001/spectra/${spectrumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSpectrum),
    });

    if (response.ok) {
      fetchSpectra();
    }
  } catch (error) {
    console.error('Error changing chart type', error);
  }
};