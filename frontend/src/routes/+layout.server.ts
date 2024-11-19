import { fetchSpectra } from '../lib/utils/spectrum/fetchSpectra';

export const load = async () => {
  const spectra = await fetchSpectra();
  return { spectra };
};
