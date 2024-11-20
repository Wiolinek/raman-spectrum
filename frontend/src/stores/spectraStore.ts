import { writable } from 'svelte/store';
import type { Spectrum } from '$interfaces/spectrum.interfaces';

export const spectraStore = writable<Spectrum[]>([]);
