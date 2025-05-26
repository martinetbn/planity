import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';

export default function Progress() {
  const [taskList] = useAtom(taskListAtom);

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

  const completionPercentage =
    totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="w-full max-w-260 flex flex-col bg-gray-700 p-4 rounded-lg shadow-xl text-white gap-2">
      <div className="flex justify-between items-center w-full">
        <h3 className="font-semibold text-lg">Progreso</h3>
        <span className="font-semibold">{completionPercentage}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between w-full mt-2 text-sm">
        <span>Completadas: {totalCompleted}</span>
        <span>Pendientes: {totalPending}</span>
      </div>
    </div>
  );
}
