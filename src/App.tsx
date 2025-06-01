import { useAtom } from 'jotai';
import { taskListAtom } from './atoms/taskAtoms';
import { currentViewAtom } from './atoms/layoutAtoms';
import Column from './components/Column';
import Task from './components/Task';
import SubTask from './components/SubTask';
import AddTask from './components/AddTask';
import Progress from './components/Progress';
import Awards from './components/Awards';
import Modal from './components/Modal';
import ViewToggle from './components/ViewToggle';
import CalendarView from './components/CalendarView';

export default function App() {
  const [taskList] = useAtom(taskListAtom);
  const [currentView] = useAtom(currentViewAtom);

  const activeTasks = taskList.filter((task) => !task.isDone);
  const completedTasks = taskList.filter((task) => task.isDone);

  const renderListView = () => (
    <div className="w-full flex overflow-x-scroll max-w-260 items-center lg:justify-center justify-start gap-4">
      <AddTask />
      <Column name="Activas" taskCount={activeTasks.length}>
        {activeTasks.length === 0 && (
          <span className="text-center">No hay tareas activas</span>
        )}
        {activeTasks.map((task, index) => (
          <div className="flex flex-col gap-1 w-full" key={index}>
            <Task task={task} />
            {task.subTasks.length > 0 && (
              <div className="pl-4 border-l-3 border-gray-400 flex flex-col gap-1">
                {task.subTasks.map((subTask, subIndex) => (
                  <SubTask key={subIndex} subtask={subTask} />
                ))}
              </div>
            )}
          </div>
        ))}
      </Column>

      <Column name="Completadas" taskCount={completedTasks.length}>
        {completedTasks.length === 0 && (
          <span className="text-center">No hay tareas completadas</span>
        )}
        {completedTasks.map((task, index) => (
          <div className="flex flex-col gap-1 w-full" key={index}>
            <Task task={task} />
            {task.subTasks.length > 0 && (
              <div className="pl-4 border-l-3 border-gray-400 flex flex-col gap-1">
                {task.subTasks.map((subTask, subIndex) => (
                  <SubTask key={subIndex} subtask={subTask} />
                ))}
              </div>
            )}
          </div>
        ))}
      </Column>
    </div>
  );

  const renderCalendarView = () => (
    <div className="w-full overflow-x-scroll max-w-260 flex gap-4">
      <AddTask />
      <CalendarView />
    </div>
  );

  const renderAwardsView = () => (
    <div className="w-full flex justify-center max-w-260">
      <Awards />
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
    <div className="w-full h-screen flex flex-col items-center justify-center gap-1 px-2 bg-gray-50">
      <ViewToggle />
      {renderCurrentView()}
      <Progress />
      <Modal />
    </div>
  );
}
