import { Children } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';

interface ColumnProps {
  name: string;
  children: React.ReactNode;
}

export default function Column({ name, children }: ColumnProps) {
  const [taskList, setTaskList] = useAtom(taskListAtom);

  const completedTasks = taskList.filter((task) => task.isDone).length;
  const pendingTasks = taskList.length - completedTasks;

  const handleDelete = () => {
    setTaskList([]);
  };

  return (
    <div className="flex flex-col w-full max-w-84 items-center shadow-xl justify-center gap-4 p-4 text-gray-100 bg-gray-700 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <span className="font-semibold text-lg">
          {name} ({Children.count(children) - 1})
        </span>
        <button className="cursor-pointer" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
            />
          </svg>
        </button>
      </div>
      <div className="w-full flex flex-col gap-2 overflow-y-scroll max-h-72">
        {children}
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="flex w-full justify-between">
          <div className="text-sm">
            <span>Completadas: </span>
            <span className="font-semibold">{completedTasks}</span>
          </div>
          <div className="text-sm">
            <span>Pendientes: </span>
            <span className="font-semibold">{pendingTasks}</span>
          </div>
        </div>
        {taskList.length !== 0 && (
          <div className="w-full flex items-center gap-2">
            <span className="font-semibold text-xs">{`${Math.round(
              (completedTasks / taskList.length) * 100,
            )}%`}</span>
            <div className="bg-gray-500 w-full h-1 rounded-lg relative">
              <div
                className="bg-blue-500 h-full rounded-lg"
                style={{
                  width: `${(completedTasks / taskList.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
