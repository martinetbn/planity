import { TASK_CATEGORIES, VIEW_TYPES } from '../constants';

export type TaskCategory = (typeof TASK_CATEGORIES)[number];
export type ViewType = (typeof VIEW_TYPES)[number];

export interface BaseTask {
  id: number;
  name: string;
  description: string;
  category: TaskCategory;
  deadline: string;
  isDone: boolean;
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subtask extends BaseTask {
  // Subtasks inherit all properties from BaseTask
  // No additional properties needed for now
}

export interface Task extends BaseTask {
  subTasks: Subtask[];
  progress: number; // 0-100
}

export interface Award {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  criteria: {
    type: 'tasksCompleted' | 'categoryMastery' | 'tasksCreated';
    target: number;
    category?: TaskCategory;
  };
}

export interface AppState {
  currentView: ViewType;
  selectedTask: Task | null;
  isModalOpen: boolean;
  modalType: 'task' | 'subtask' | 'awards' | null;
}

// API Response types (for future use)
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface TaskFilters {
  category?: TaskCategory;
  isImportant?: boolean;
  isDone?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
} 