import { atom } from 'jotai';

export const currentModalAtom = atom<string | null>(null);

export type ViewType = 'list' | 'calendar' | 'awards';
export const currentViewAtom = atom<ViewType>('list');
