import { get } from 'svelte/store';
import { spectraStore } from '$stores/spectraStore';
import type { Spectrum } from "$interfaces/spectrum.interfaces";
import { fetchSpectra } from '../spectrum/fetchSpectra';

export const renameDataset = async (datasetId: string, newName: string) => {
  const spectra: Spectrum[] = get(spectraStore);

  const parentSpectrum = spectra.find(spectrum =>
    spectrum.datasets.some(dataset => dataset.id === datasetId)
  );

  if (!parentSpectrum) {
    console.error('Parent spectrum not found for dataset:', datasetId);
    return;
  }

  const updatedDatasets = parentSpectrum.datasets.map(dataset =>
    dataset.id === datasetId ? { ...dataset, name: newName } : dataset
  );

  const updatedSpectrum = {
    ...parentSpectrum,
    datasets: updatedDatasets,
  };

  const updatedSpectra = spectra.map(spectrum =>
    spectrum.id === parentSpectrum.id ? updatedSpectrum : spectrum
  );

  spectraStore.set(updatedSpectra);

  try {
    const response = await fetch(`http://localhost:3001/spectra/${parentSpectrum.id}`, {
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
    console.error('Error renaming dataset:', error);
  }
};
