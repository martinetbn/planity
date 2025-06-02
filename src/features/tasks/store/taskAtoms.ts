import { atomWithStorage } from 'jotai/utils';
import { Task } from '../../../lib/types';
import { STORAGE_KEYS } from '../../../lib/constants';

export const taskListAtom = atomWithStorage<Task[]>(STORAGE_KEYS.TASK_LIST, []); 