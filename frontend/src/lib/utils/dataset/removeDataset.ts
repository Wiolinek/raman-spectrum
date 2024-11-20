import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import { Spectrum } from "$interfaces/spectrum.interfaces";
import { fetchSpectra } from '../spectrum/fetchSpectra';
import { spectraStore } from '$stores/spectraStore';

export const removeDataset = async (datasetId: string) => {
  const spectra: Spectrum[] = get(spectraStore);

  const parentSpectrum = spectra.find(spectrum =>
    spectrum.datasets.some(dataset => dataset.id === datasetId)
  );

  if (!parentSpectrum) {
    console.error('Parent spectrum not found for dataset:', datasetId);
    return;
  }

  const updatedDatasets = parentSpectrum.datasets.filter(ds => ds.id !== datasetId);

  const updatedSpectrum = {
    ...parentSpectrum,
    datasets: updatedDatasets,
  };

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
      toast.success('Dataset was removed.');
    }
  } catch (error) {
    toast.error('Error removing dataset.');
  }
};