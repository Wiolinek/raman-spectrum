import { fetchSpectra } from '../lib/utils/fetchSpectra';

export const load = async () => {
  const spectra = await fetchSpectra();
  return { spectra };
};
