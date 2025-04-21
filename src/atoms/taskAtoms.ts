import { atomWithStorage } from 'jotai/utils';

interface Task {
  id: number;
  name: string;
  description: string;
}

export const taskListAtom = atomWithStorage<Task[]>("taskList", []);
