import { writable } from 'svelte/store';
import type { Spectrum } from '../types/spectrum.types';

export const spectraStore = writable<Spectrum[]>([]);
