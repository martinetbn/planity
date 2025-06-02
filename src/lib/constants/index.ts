export const TASK_CATEGORIES = ['Personal', 'Trabajo', 'Estudio'] as const;

export const VIEW_TYPES = ['list', 'calendar', 'awards'] as const;

export const STORAGE_KEYS = {
  TASK_LIST: 'taskList',
  CURRENT_VIEW: 'currentView',
  AWARDS: 'awards',
} as const;

export const ROUTES = {
  HOME: '/',
  CALENDAR: '/calendar',
  AWARDS: '/awards',
} as const; 