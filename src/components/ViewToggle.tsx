import { useAtom } from 'jotai';
import { currentViewAtom, type ViewType, currentModalAtom } from '../atoms/layoutAtoms';
import { taskListAtom } from '../atoms/taskAtoms';
import { Icon } from '@iconify/react';

export default function ViewToggle() {
  const [currentView, setCurrentView] = useAtom(currentViewAtom);
  const [, setCurrentModal] = useAtom(currentModalAtom);
  const [taskList] = useAtom(taskListAtom);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleDeleteAll = () => {
    setCurrentModal('DeleteAllConfirmation');
  };

  const hasAnyTasks = taskList.length > 0;

  return (
    <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-2 shadow-xl">
      <button
        onClick={() => handleViewChange('list')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentView === 'list'
            ? 'bg-gray-500 text-gray-100'
            : 'text-gray-300 hover:text-gray-100 hover:bg-gray-600'
        }`}
      >
        <Icon icon="lucide:list" className="h-4" />
        <span className="text-sm font-medium">Lista</span>
      </button>
      
      <button
        onClick={() => handleViewChange('calendar')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentView === 'calendar'
            ? 'bg-gray-500 text-gray-100'
            : 'text-gray-300 hover:text-gray-100 hover:bg-gray-600'
        }`}
      >
        <Icon icon="lucide:calendar" className="h-4" />
        <span className="text-sm font-medium">Semanal</span>
      </button>

      <button
        onClick={() => handleViewChange('awards')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentView === 'awards'
            ? 'bg-gray-500 text-gray-100'
            : 'text-gray-300 hover:text-gray-100 hover:bg-gray-600'
        }`}
      >
        <Icon icon="lucide:award" className="h-4" />
        <span className="text-sm font-medium">Logros</span>
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={handleDeleteAll}
        disabled={!hasAnyTasks}
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-red-300 hover:text-red-100 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-300"
        title="Eliminar todas las tareas"
      >
        <Icon icon="tabler:trash" className="h-4" />
      </button>
    </div>
  );
} 