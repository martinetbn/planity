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
        <AddTask />

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
                  <span className="text-center text-gray-500">
                    No hay tareas activas
                  </span>
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
                  <span className="text-center text-gray-500">
                    No hay tareas completadas
                  </span>
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
        <AddTask />

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
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                  viewBox="61.8 94.1 351.7 311.8"
                  zoomAndPan="magnify"
                  width="1600"
                  height="1418.18"
                >
                  <g id="__id2_sc8fvyen1t">
                    <path d="M357.2,247.7c0,1.7,0,4.2,0,6.4v0.4c0,0.8,0,1.6,0,2.2v0c0,1-0.1,2-0.1,3c-0.7,24.1-4.2,45.2-10.2,63.1 c-6,17.9-14.6,32.7-25.7,44.6c-10.1,10.9-22.2,19.4-36.2,25.7c-14,6.3-30,10.3-48.1,11.9c-0.1,0-0.3,0.1-0.4,0.1 c-6.2,0.5-12.6,0.8-19.2,0.8h-15.2c-23,0-43.2-3.2-60.5-9.6c-17.3-6.4-31.9-15.8-43.8-28.4c-11.9-12.6-20.9-28.5-26.9-48 c-6.1-19.5-9.1-42.6-9.1-69.2c0-26.8,3.1-50,9.1-69.7c6-19.7,15-35.7,26.9-48.5c11.9-12.8,26.5-22.3,43.8-28.8 c15.7-5.8,33.7-9,54-9.6c-3.3,1.2-6.6,2.5-9.8,3.9c-15.1,6.7-28.2,15.9-39.2,27.5c-12.6,13.3-22.1,30-28.5,49.8 c-6.4,19.8-9.7,42.7-10.1,68.8c0,1.6,0,3.4,0,5.1c0,1.7,0,3.4,0,5.1v0c0.3,13.5,1.6,25.8,3.9,36.7c0.9,4.3,1.8,8.4,3,12.3 c3.6,12,8.8,22,15.6,29.9c7.5,8.8,17.5,15.3,29.5,19.6c5.6,2,11.6,3.5,18,4.5c0.5,0.1,1,0.2,1.4,0.2c0.3,0,0.6,0.1,0.8,0.1 c6.7,1,13.8,1.5,21.4,1.5h15.2c1.9,0,3.7,0,5.5-0.1c5.5-0.1,10.8-0.6,15.9-1.3h0c10.7-1.5,20.2-4.3,28.6-8.4 c8.4-4.1,15.5-9.6,21.4-16.4c7.7-8.8,13.2-20.3,16.9-34.1c3.7-13.8,5.4-30.1,5.4-48.8c0-18.7-1.8-34.9-5.4-48.8 c-3.6-13.8-9.1-25.3-16.7-34.2c-5.8-6.8-12.9-12.3-21.3-16.5c-0.3-0.1-0.6-0.3-1-0.4h6.8c7.4,0,14.4,0.5,20.7,1.4 c0.2,0,0.4,0,0.5,0.1c0.4,0.1,0.9,0.2,1.3,0.2c1,0.2,2.1,0.4,3.1,0.5c0.6,0.1,1.2,0.2,1.8,0.4c0.2,0,0.3,0.1,0.5,0.1l0.4,0.1 c0.3,0.1,0.6,0.1,0.9,0.2c0.6,0.1,1.1,0.3,1.7,0.4c1.5,0.4,3,0.8,4.4,1.2c0.3,0.1,0.5,0.2,0.8,0.3c1,0.3,1.9,0.6,2.9,1 c10.6,3.9,19,9.6,25.4,17.2c6.1,7.2,11,16.9,14.5,29c0.8,2.7,1.5,5.6,2.1,8.5c1.6,8.4,2.7,17.7,3.1,28.1c0,1.1,0.1,2.1,0.1,3v0 c0,0.6,0,1.4,0,2.2C357.3,245.2,357.2,246.1,357.2,247.7z" />
                  </g>
                  <g id="__id3_sc8fvyen1t">
                    <path d="M413.5,249.4c0,26.8-3.1,50-9.1,69.6c-6,19.7-15,35.7-26.9,48.5c-11.9,12.8-26.5,22.3-43.8,28.8 c-15.9,5.9-34.1,9.1-54.8,9.6c3.5-1.2,6.9-2.5,10.1-4c15.1-6.8,28.2-16.1,39.2-27.8c12.2-13,21.4-29.1,27.8-48.1 c6.4-19,9.9-41,10.7-65.8v0c0-0.9,0.1-2,0.1-3.1c0,0,0,0,0,0c0-0.9,0-1.7,0-2.4V254c0-2.2,0-4.7,0-6.4c0-1.5,0-2.3,0-3.3v-0.1 c0-0.7,0-1.5,0-2.4v0c0,0,0,0,0,0c0-1.1-0.1-2.1-0.1-3v-0.1c-0.6-16-2.7-30-6.3-42c-3.6-12-8.8-22-15.6-29.9 c-7.5-8.8-17.5-15.3-29.5-19.6c-12-4.3-26.1-6.3-42.2-6.4h-15.2c-7.4,0-14.4,0.5-20.9,1.4h0c-10.7,1.5-20.2,4.3-28.6,8.4 c-8.4,4.1-15.5,9.6-21.4,16.4c-7.6,8.8-13.2,20.3-16.9,34.1c-3.7,13.8-5.4,30.1-5.4,48.8c0,18.7,1.8,34.9,5.4,48.8 c3.6,13.8,9.1,25.3,16.7,34.2c5.8,6.8,12.9,12.3,21.3,16.5c0.3,0.1,0.6,0.3,1,0.4h-7.2c-15.1,0-28-2-38.6-5.9 c-10.6-3.9-19-9.6-25.4-17.2c-6.1-7.2-11-16.9-14.5-29c-3.5-12.1-5.4-26.6-5.8-43.4c0-1.7,0-3.3,0-5c0-1.7,0-3.3,0-5 c0.4-25.3,3.6-47.4,9.7-66c6-18.7,14.9-34,26.3-46.2c10.1-10.7,22.2-19.2,36.2-25.3c14-6.2,30-10.2,48.1-11.8 c6.4-0.6,13.1-0.9,20-0.9h15.2c23,0,43.2,3.2,60.5,9.6c17.3,6.4,31.9,15.8,43.8,28.4c5.9,6.3,11.2,13.4,15.6,21.4 c4.5,8,8.3,16.8,11.3,26.6C410.4,199.7,413.5,222.8,413.5,249.4z" />
                  </g>
                </svg>
                <h1 className="text-2xl font-bold text-gray-900">Planity</h1>
              </div>
              <span className="text-sm hidden md:block text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {tasks.length} tareas
              </span>
              <span className="text-sm md:hidden text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {tasks.length}
              </span>
            </div>
            <ViewToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">{renderCurrentView()}</div>
      </main>

      {/* Footer with Progress */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <Progress />
        </div>
      </footer>

      {/* Modal */}
      <Modal />
    </div>
  );
}
