import { useAtom } from 'jotai';
import {
  currentViewAtom,
  currentModalAtom,
} from '../features/layout/store/layoutAtoms';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { useAwards } from '../features/awards';
import { ViewType } from '../lib/types';
import { Icon } from '@iconify/react';
import { cn } from '../lib/utils';

export default function ViewToggle() {
  const [currentView, setCurrentView] = useAtom(currentViewAtom);
  const [, setCurrentModal] = useAtom(currentModalAtom);
  const { tasks } = useTasks();
  const { unlockedAwards, lockedAwards } = useAwards();

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleDeleteAll = () => {
    setCurrentModal('DeleteAllConfirmation');
  };

  const hasAnyTasks = tasks.length > 0;

  const viewOptions = [
    {
      id: 'list' as ViewType,
      label: 'Lista',
      icon: 'mdi:view-list',
      description: 'Vista de lista de tareas',
    },
    {
      id: 'calendar' as ViewType,
      label: 'Semanal',
      icon: 'mdi:calendar-week',
      description: 'Vista semanal del calendario',
    },
    {
      id: 'awards' as ViewType,
      label: `Logros (${unlockedAwards.length}/${unlockedAwards.length + lockedAwards.length})`,
      icon: 'mdi:trophy',
      description: 'Ver logros y estadísticas',
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {/* Main View Toggle */}
      <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-sm border">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleViewChange(option.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
              currentView === option.id
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            )}
            title={option.description}
          >
            <Icon
              icon={option.icon}
              className={cn(
                'h-4 w-4 transition-colors',
                currentView === option.id ? 'text-blue-600' : 'text-gray-500',
              )}
            />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-300 mx-2" />

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {/* Delete All Button */}
        <button
          onClick={handleDeleteAll}
          disabled={!hasAnyTasks}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium',
            'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1',
            hasAnyTasks
              ? 'text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 bg-white'
              : 'text-gray-400 bg-gray-50 border border-gray-200 cursor-not-allowed',
          )}
          title={
            hasAnyTasks
              ? 'Eliminar todas las tareas'
              : 'No hay tareas para eliminar'
          }
        >
          <Icon
            icon="mdi:delete-sweep"
            className={cn(
              'h-4 w-4',
              hasAnyTasks ? 'text-red-500' : 'text-gray-400',
            )}
          />
          <span className="hidden md:inline">
            {hasAnyTasks ? 'Limpiar todo' : 'Sin tareas'}
          </span>
        </button>
      </div>
    </div>
  );
}
