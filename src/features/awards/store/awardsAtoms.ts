import { atomWithStorage } from 'jotai/utils';
import { Award } from '../../../lib/types';
import { STORAGE_KEYS } from '../../../lib/constants';

export const awardsAtom = atomWithStorage<Award[]>(STORAGE_KEYS.AWARDS, [
  {
    id: 1,
    name: 'Primera tarea',
    description: 'Completa tu primera tarea',
    icon: 'mdi:check-circle',
    unlockedAt: null,
    criteria: {
      type: 'tasksCompleted',
      target: 1,
    },
  },
  {
    id: 2,
    name: 'Empezando',
    description: 'Completa 5 tareas',
    icon: 'mdi:star',
    unlockedAt: null,
    criteria: {
      type: 'tasksCompleted',
      target: 5,
    },
  },
  {
    id: 3,
    name: 'Productivo',
    description: 'Completa 10 tareas',
    icon: 'mdi:trophy',
    unlockedAt: null,
    criteria: {
      type: 'tasksCompleted',
      target: 10,
    },
  },
  {
    id: 4,
    name: 'Imparable',
    description: 'Completa 25 tareas',
    icon: 'mdi:rocket',
    unlockedAt: null,
    criteria: {
      type: 'tasksCompleted',
      target: 25,
    },
  },
  {
    id: 5,
    name: 'Maestro de tareas',
    description: 'Completa 50 tareas',
    icon: 'mdi:crown',
    unlockedAt: null,
    criteria: {
      type: 'tasksCompleted',
      target: 50,
    },
  },
  {
    id: 8,
    name: 'Profesional dedicado',
    description: 'Completa 10 tareas de trabajo',
    icon: 'mdi:briefcase',
    unlockedAt: null,
    criteria: {
      type: 'categoryMastery',
      target: 10,
      category: 'Trabajo',
    },
  },
  {
    id: 9,
    name: 'Maestro del trabajo',
    description: 'Completa 20 tareas de trabajo',
    icon: 'mdi:office-building',
    unlockedAt: null,
    criteria: {
      type: 'categoryMastery',
      target: 20,
      category: 'Trabajo',
    },
  },
  {
    id: 10,
    name: 'Vida equilibrada',
    description: 'Completa 10 tareas personales',
    icon: 'mdi:heart',
    unlockedAt: null,
    criteria: {
      type: 'categoryMastery',
      target: 10,
      category: 'Personal',
    },
  },
  {
    id: 11,
    name: 'Estudiante dedicado',
    description: 'Completa 10 tareas de estudio',
    icon: 'mdi:school',
    unlockedAt: null,
    criteria: {
      type: 'categoryMastery',
      target: 10,
      category: 'Estudio',
    },
  },
  {
    id: 12,
    name: 'Académico experto',
    description: 'Completa 20 tareas de estudio',
    icon: 'mdi:book-open-page-variant',
    unlockedAt: null,
    criteria: {
      type: 'categoryMastery',
      target: 20,
      category: 'Estudio',
    },
  },
  {
    id: 13,
    name: 'Empezando',
    description: 'Primera tarea creada',
    icon: 'mdi:book-open-page-variant',
    unlockedAt: null,
    criteria: {
      type: 'tasksCreated',
      target: 1,
    },
  },
  {
    id: 14,
    name: '5 tareas',
    description: '5 tareas creadas',
    icon: 'mdi:book-open-page-variant',
    unlockedAt: null,
    criteria: {
      type: 'tasksCreated',
      target: 5,
    },
  },
]); 