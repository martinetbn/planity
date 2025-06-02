import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { ViewType, AppState } from '../../../lib/types';
import { STORAGE_KEYS } from '../../../lib/constants';

export const currentViewAtom = atomWithStorage<ViewType>(STORAGE_KEYS.CURRENT_VIEW, 'list');

export const currentModalAtom = atom<string | null>(null);

export const appStateAtom = atom<AppState>({
  currentView: 'list',
  selectedTask: null,
  isModalOpen: false,
  modalType: null,
}); 