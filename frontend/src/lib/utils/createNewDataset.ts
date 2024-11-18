import { get } from 'svelte/store';
import { Dataset, Spectrum } from "../../interfaces/spectrum.interfaces";
import { fetchSpectra } from "./fetchSpectra";
import { spectraStore } from '$stores/spectraStore';

export const createNewDataset = async (spectrumId: string, dataset: Dataset) => {
  const spectra: Spectrum[] = get(spectraStore);
  const spectrumToUpdate = spectra.find((spectrum) => spectrum.id === spectrumId);
  const datasetsToSend = [...spectrumToUpdate.datasets];
  if (!spectrumToUpdate) {
    console.error('Spectrum not found.');
    return;
  }

  datasetsToSend.push(dataset);
  const updatedSpectrum = {
    ...spectrumToUpdate,
    datasets: datasetsToSend,
  };

  try {
    const response = await fetch(`http://localhost:3001/spectra/${spectrumToUpdate.id}`, {
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
    console.error('Error adding new dataset:', error);
  }

};