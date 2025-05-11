import { atomWithStorage } from 'jotai/utils';
import type { Task } from '../types/task.types';

export const taskListAtom = atomWithStorage<Task[]>('taskList', []);
