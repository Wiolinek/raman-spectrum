import { get } from 'svelte/store';
import { Spectrum } from "../../types/spectrum.types";
import { fetchSpectra } from "./fetchSpectra";
import { spectraStore } from '$stores/spectraStore';

export const addNewSpectrum = async () => {
    const spectra: Spectrum[] = get(spectraStore);
    const newSpectrum = {
        name: `New Spectrum ${spectra.length + 1}`,
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
        }
    } catch (error) {
        console.error('Error adding new spectrum:', error);
    }
};