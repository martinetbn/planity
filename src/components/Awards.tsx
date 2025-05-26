import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import { awardsAtom } from '../atoms/awardsAtoms';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

export default function Awards() {
  const [taskList] = useAtom(taskListAtom);
  const [awards, setAwards] = useAtom(awardsAtom);

  useEffect(() => {
    const completedTasksCount = taskList.filter((task) => task.isDone).length;
    const pendingTasksCount = taskList.filter((task) => !task.isDone).length;

    const completedSubtasksCount = taskList.reduce(
      (count, task) =>
        count + task.subTasks.filter((subtask) => subtask.isDone).length,
      0,
    );
    const pendingSubtasksCount = taskList.reduce(
      (count, task) =>
        count + task.subTasks.filter((subtask) => !subtask.isDone).length,
      0,
    );

    const totalCompleted = completedTasksCount + completedSubtasksCount;
    const totalPending = pendingTasksCount + pendingSubtasksCount;
    const totalTasks = totalCompleted + totalPending;

    const lastId = localStorage.getItem('lastTaskId');

    setAwards((prevAwards) => {
      const newAwards = [...prevAwards];

      if (
        lastId &&
        parseInt(lastId) >= 1 &&
        !newAwards.some((a) => a.name === 'Primera Tarea')
      ) {
        newAwards.push({
          name: 'Primera Tarea',
          icon: 'mdi:trophy',
        });
      }

      if (
        totalCompleted >= 1 &&
        !newAwards.some((a) => a.name === 'Primera Completada')
      ) {
        newAwards.push({
          name: 'Primera Completada',
          icon: 'bxs:party',
        });
      }

      if (
        lastId &&
        parseInt(lastId) >= 5 &&
        !newAwards.some((a) => a.name === '5 Tareas Creadas')
      ) {
        newAwards.push({
          name: '5 Tareas Creadas',
          icon: 'mdi:star',
        });
      }

      if (
        totalCompleted >= 5 &&
        !newAwards.some((a) => a.name === '5 Tareas Completadas')
      ) {
        newAwards.push({
          name: '5 Tareas Completadas',
          icon: 'mdi:star',
        });
      }

      return newAwards;
    });
  }, [taskList]);

  return (
    <div className="w-full max-w-260 flex flex-col bg-gray-700 p-4 rounded-lg shadow-xl text-white gap-2">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-semibold text-lg">Logros</h3>
      </div>
      <div className="flex gap-2 h-10 overflow-x-scroll">
        {awards.length === 0 && (
          <span className="text-gray-400 text-sm">
            No tienes ningún logro todavía.
          </span>
        )}
        {awards.map((award, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg"
          >
            <Icon
              icon={award.icon}
              className="text-yellow-400"
              width={24}
              height={24}
            />
            <span className="text-sm w-fit text-nowrap">{award.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
