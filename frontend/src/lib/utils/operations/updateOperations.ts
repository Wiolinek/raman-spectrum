import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import { spectraStore } from '$stores/spectraStore';
import type { Spectrum } from "$interfaces/spectrum.interfaces";
import { fetchSpectra } from '../spectrum/fetchSpectra';
import { DatasetOperationType } from "$interfaces/operationType.enum";

export const updateOperations = async (
  newOperation: DatasetOperationType | null,
  newConstant: string | null,
  datasetId: string,
) => {
  const spectra: Spectrum[] = get(spectraStore);

  const parentSpectrum = spectra.find((spectrum) =>
    spectrum.datasets.some((ds) => ds.id === datasetId),
  );

  if (!parentSpectrum) {
    console.error('Parent spectrum not found for dataset:', datasetId);
    return;
  }

  const updatedDatasets = parentSpectrum.datasets.map((ds) =>
    ds.id === datasetId
      ? {
        ...ds,
        operations: newOperation
          ? {
            type: newOperation,
            constant: newConstant ? Number(newConstant) : null,
          }
          : undefined,
      }
      : ds,
  );

  if (newOperation && newConstant) {
    const updatedSpectrum = {
      ...parentSpectrum,
      datasets: updatedDatasets,
    };

    try {
      const response = await fetch(`http://localhost:3001/spectra/${parentSpectrum.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSpectrum),
      });

      if (response.ok) {
        fetchSpectra();
        toast.success('Dataset has been updated.');
      }
    } catch (error) {
      toast.error('Failed to update the dataset.');
    }
  }
};