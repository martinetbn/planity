import { Children } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import { currentModalAtom } from '../atoms/layoutAtoms';
import { Icon } from '@iconify/react';

interface ColumnProps {
  name: string;
  children: React.ReactNode;
}

export default function Column({ name, children }: ColumnProps) {
  const [taskList] = useAtom(taskListAtom);
  const [, setCurrentModal] = useAtom(currentModalAtom);

  const completedTasks = taskList.filter((task) => task.isDone).length;
  const pendingTasks = taskList.length - completedTasks;

  return (
    <div className="flex flex-col w-full max-w-84 items-center shadow-xl justify-center gap-4 p-4 text-gray-100 bg-gray-700 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <span className="font-semibold text-lg">
          {name} ({Children.count(children) - 1})
        </span>
        <button
          className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={taskList.length === 0}
          onClick={() => setCurrentModal('DeleteAllConfirmation')}
        >
          <Icon icon="tabler:trash" height={18} />
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
