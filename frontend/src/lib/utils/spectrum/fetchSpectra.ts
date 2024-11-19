import { spectraStore } from '../../../stores/spectraStore';

export const fetchSpectra = async () => {
  try {
    const response = await fetch('http://localhost:3001/spectra');
    if (!response.ok) {
      throw new Error(`Failed to fetch spectra: ${response.statusText}`);
    }
    const data = await response.json();
    spectraStore.set(data);
    return data;
  } catch (error) {
    console.error('Error fetching spectra:', error);
    spectraStore.set([]);
    throw error;
  }
};
