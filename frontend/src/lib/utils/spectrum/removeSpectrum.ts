import { toast } from 'svelte-sonner';
import { fetchSpectra } from "./fetchSpectra";

export const removeSpectrum = async (spectrumId: string) => {
    try {
        const response = await fetch(`http://localhost:3001/spectra/${spectrumId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchSpectra();
            toast.success('Spectrum has been deleted');
        }
    } catch (error) {
        toast.error('Error deleting spectrum.');
    }
};