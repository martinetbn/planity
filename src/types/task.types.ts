export type TaskCategory = 'Personal' | 'Trabajo' | 'Estudio';

export interface Task {
  id: number;
  name: string;
  description: string;
  category: TaskCategory;
  deadline: string;
  isDone: boolean;
  isImportant: boolean;
}
