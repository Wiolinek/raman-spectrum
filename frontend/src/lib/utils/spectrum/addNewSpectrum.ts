import { toast } from 'svelte-sonner';
import { get } from 'svelte/store';
import { Spectrum } from "$interfaces/spectrum.interfaces";
import { fetchSpectra } from "./fetchSpectra";
import { spectraStore } from '$stores/spectraStore';
import { ChartType } from '$interfaces/chartType.enum';

export const addNewSpectrum = async () => {
  const spectra: Spectrum[] = get(spectraStore);
  const newSpectrum = {
    name: `New Spectrum ${spectra.length + 1}`,
    xAxisName: "X-axis",
    yAxisName: "Y-axis",
    chartType: ChartType.Line,
    datasets: [],
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch('http://localhost:3001/spectra', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSpectrum),
    });

    if (response.ok) {
      fetchSpectra();
      toast.success('New spectrum has been created');
    }
  } catch (error) {
    toast.error('Error adding new spectrum.');
  }
};