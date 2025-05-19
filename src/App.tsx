import { useAtom } from 'jotai';
import { taskListAtom } from './atoms/taskAtoms';
import Column from './components/Column';
import Task from './components/Task';
import AddTask from './components/AddTask';
import Modal from './components/Modal';

export default function App() {
  const [taskList] = useAtom(taskListAtom);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center gap-4 bg-gray-50">
      <AddTask />
      <Column name="Activas">
        {taskList.length === 0 && (
          <span className="text-center">No hay tareas</span>
        )}
        {taskList.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </Column>
      <Modal />
    </div>
  );
}
