import { fetchSpectra } from "./fetchSpectra";

export const removeSpectrum = async (spectrumId: string) => {
    try {
        const response = await fetch(`http://localhost:3001/spectra/${spectrumId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchSpectra();
        }
    } catch (error) {
        console.error('Error deleting spectrum:', error);
    }
};