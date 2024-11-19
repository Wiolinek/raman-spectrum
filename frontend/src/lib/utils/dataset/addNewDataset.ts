import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import { Spectrum } from "../../../interfaces/spectrum.interfaces";
import { fetchSpectra } from "../spectrum/fetchSpectra";
import { spectraStore } from '$stores/spectraStore';
import { generateColor } from './generateColor';
export const MAX_DATASETS_COUNT = 12;

export const addNewDataset = async (event: Event, spectrumId: string) => {
  const spectra: Spectrum[] = get(spectraStore);
  const spectrumToUpdate = spectra.find((spectrum) => spectrum.id === spectrumId);
  if (!spectrumToUpdate) {
    toast.error('Spectrum not found.');
    return;
  }

  const files = (event.target as HTMLInputElement).files;

  if (!files) return;
  if (spectrumToUpdate.datasets.length >= MAX_DATASETS_COUNT) return;

  const remainingDatasetsCount = MAX_DATASETS_COUNT - spectrumToUpdate.datasets.length;
  const filesToUpload = Array.from(files).slice(0, remainingDatasetsCount);
  const datasetsToSend = [...spectrumToUpdate.datasets];

  for (const file of filesToUpload) {
    const color = generateColor();
    const content = await file.text();
    const data = content
      .trim()
      .split('\n')
      .map((line) => {
        const [x, y] = line.trim().split(/\s+/).map(Number);
        return { x, y };
      });

    const newDataset = {
      id: `d${Date.now()}`,
      name: file.name,
      data,
      color,
    };
    datasetsToSend.push(newDataset);
  }

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
      toast.success('New dataset was added');
    }
  } catch (error) {
    toast.error('Failed to add new dataset.');
  }
};