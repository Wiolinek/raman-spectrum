import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import { Dataset, Spectrum } from "$interfaces/spectrum.interfaces";
import { fetchSpectra } from "../spectrum/fetchSpectra";
import { spectraStore } from '$stores/spectraStore';
import { CreateDatasetOperationType } from '$interfaces/operationType.enum';
import { generateColor } from '$lib/utils/dataset/generateColor';

export const createNewDataset = async (
  spectrumId: string,
  selectedDatasets: string[],
  operation: CreateDatasetOperationType | null,
  datasetName: string
) => {
  const spectra: Spectrum[] = get(spectraStore);
  const spectrumToUpdate = spectra.find((spectrum) => spectrum.id === spectrumId);
  const datasetsToSend = [...spectrumToUpdate.datasets];

  if (!spectrumToUpdate) {
    toast.error('Spectrum not found.');
    return;
  }

  if (selectedDatasets.length !== 2) {
    toast.error('Please select exactly 2 datasets.');
    return;
  }

  const [dataset1, dataset2] = selectedDatasets.map((id) =>
    spectrumToUpdate.datasets.find((dataset) => dataset.id === id),
  );

  if (!dataset1 || !dataset2) {
    toast.error('Selected datasets are not valid.');
    return;
  }

  const maxLength = Math.max(dataset1.data.length, dataset2.data.length);

  const paddedDataset1 = Array.from({ length: maxLength }, (_, index) => ({
    x: dataset1.data[index]?.x || 0,
    y: dataset1.data[index]?.y || 0,
  }));

  const paddedDataset2 = Array.from({ length: maxLength }, (_, index) => ({
    x: dataset2.data[index]?.x || 0,
    y: dataset2.data[index]?.y || 0,
  }));

  const color = generateColor();

  let newDatasetData = [];
  if (operation === CreateDatasetOperationType.Add) {
    newDatasetData = paddedDataset1.map((point, index) => ({
      x: point.x + paddedDataset2[index].x,
      y: point.y + paddedDataset2[index].y,
    }));
  } else if (operation === CreateDatasetOperationType.Subtract) {
    newDatasetData = paddedDataset1.map((point, index) => ({
      x: point.x - paddedDataset2[index].x,
      y: point.y - paddedDataset2[index].y,
    }));
  } else {
    toast.error('Please select a valid operation.');
    return;
  }

  const newDataset: Dataset = {
    id: `d${Date.now()}`,
    name: datasetName || `New Dataset - ${Date.now()}`,
    data: newDatasetData,
    color,
  };

  datasetsToSend.push(newDataset);

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
      toast.success('New dataset was created.');
      return { success: true };
    }
  } catch (error) {
    toast.error('Failed to create dataset.');
  }
};
