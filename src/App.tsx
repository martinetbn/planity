import { useAtom } from 'jotai';
import { currentViewAtom } from './features/layout/store/layoutAtoms';
import { useTasks } from './features/tasks/hooks/useTasks';
import { TaskCard, TaskColumn } from './features/tasks/components';
import { AwardsView } from './features/awards';

// Import existing components (to be refactored later)
import AddTask from './components/AddTask';
import Progress from './components/Progress';
import Modal from './components/Modal';
import ViewToggle from './components/ViewToggle';
import CalendarView from './components/CalendarView';

export default function App() {
  const [currentView] = useAtom(currentViewAtom);
  const { tasks } = useTasks();

  const activeTasks = tasks.filter((task) => !task.isDone);
  const completedTasks = tasks.filter((task) => task.isDone);

  const renderListView = () => (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Add Task Section - Always visible */}
        <div className="lg:w-80 w-full flex-shrink-0">
          <AddTask />
        </div>
        
        {/* Task Columns Section - Scrollable on mobile */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-4 overflow-x-auto pb-4">
            <div className="flex-shrink-0 w-80">
              <TaskColumn 
                title="Activas" 
                taskCount={activeTasks.length}
                icon="mdi:clock-outline"
              >
                {activeTasks.length === 0 ? (
                  <span className="text-center text-gray-500">No hay tareas activas</span>
                ) : (
                  activeTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                )}
              </TaskColumn>
            </div>

            <div className="flex-shrink-0 w-80">
              <TaskColumn 
                title="Completadas" 
                taskCount={completedTasks.length}
                icon="mdi:check-circle"
              >
                {completedTasks.length === 0 ? (
                  <span className="text-center text-gray-500">No hay tareas completadas</span>
                ) : (
                  completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                )}
              </TaskColumn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendarView = () => (
    <div className="w-full">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Add Task Section */}
        <div className="xl:w-80 w-full flex-shrink-0">
          <AddTask />
        </div>
        
        {/* Calendar Section - Scrollable */}
        <div className="flex-1 min-w-0">
          <div className="overflow-x-auto pb-4">
            <CalendarView />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAwardsView = () => (
    <div className="w-full">
      <AwardsView />
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'list':
        return renderListView();
      case 'calendar':
        return renderCalendarView();
      case 'awards':
        return renderAwardsView();
      default:
        return renderListView();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Planity</h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {tasks.length} tareas
              </span>
            </div>
            <ViewToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {renderCurrentView()}
        </div>
      </main>

      {/* Footer with Progress */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Progress />
        </div>
      </footer>

      {/* Modal */}
      <Modal />
    </div>
  );
}
