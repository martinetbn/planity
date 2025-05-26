import { useAtom } from 'jotai';
import { taskListAtom } from './atoms/taskAtoms';
import Column from './components/Column';
import Task from './components/Task';
import SubTask from './components/SubTask';
import AddTask from './components/AddTask';
import Progress from './components/Progress';
import Awards from './components/Awards';
import Modal from './components/Modal';

export default function App() {
  const [taskList] = useAtom(taskListAtom);

  const activeTasks = taskList.filter((task) => !task.isDone);
  const completedTasks = taskList.filter((task) => task.isDone);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-1 px-2 bg-gray-50">
      <Awards />
      <div className="w-full flex overflow-x-scroll items-center lg:justify-center justify-start gap-4">
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
      <Progress />
      <Modal />
    </div>
  );
}
