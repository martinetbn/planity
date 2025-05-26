import { atomWithStorage } from 'jotai/utils';
import type { Award } from '../types/awards.types';

export const awardsAtom = atomWithStorage<Award[]>('awards', []);
