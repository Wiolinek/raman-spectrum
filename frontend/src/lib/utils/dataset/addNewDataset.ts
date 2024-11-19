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
  if (spectrumToUpdate.datasets.length >= MAX_DATASETS_COUNT) {
    toast.error(`Maximum of ${MAX_DATASETS_COUNT} datasets allowed.`);
    return;
  }

  const remainingDatasetsCount = MAX_DATASETS_COUNT - spectrumToUpdate.datasets.length;
  const filesToUpload = Array.from(files).slice(0, remainingDatasetsCount);
  const datasetsToSend = [...spectrumToUpdate.datasets];

  for (const file of filesToUpload) {
    const content = await file.text();
    const isValid = validateFileContent(content);

    if (!isValid && files.length === 1) {
      toast.error(`File "${file.name}" has incorrect format. Each line should contain two numeric values separated by space or tab.`);
      return;
    }
    if (!isValid && files.length > 1) {
      toast.error(`File "${file.name}" has incorrect format. Each line should contain two numeric values separated by space or tab.`);
      continue;
    }

    const color = generateColor();
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
      toast.success('New dataset(s) were added.');
    } else {
      toast.error('Failed to update spectrum with new datasets.');
    }
  } catch (error) {
    toast.error('Failed to add new dataset.');
  }
};

const validateFileContent = (content: string): boolean => {
  const lines = content.trim().split('\n');
  return lines.every((line) => {
    const values = line.trim().split(/\s+/);
    return values.length === 2 && values.every((v) => !isNaN(Number(v)));
  });
};