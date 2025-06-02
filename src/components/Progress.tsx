import { Icon } from '@iconify/react';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { cn } from '../lib/utils';

export default function Progress() {
  const { tasks, stats } = useTasks();

  const completedTasksCount = tasks.filter((task) => task.isDone).length;
  const pendingTasksCount = tasks.filter((task) => !task.isDone).length;

  const completedSubtasksCount = tasks.reduce(
    (count, task) =>
      count + task.subTasks.filter((subtask) => subtask.isDone).length,
    0,
  );
  const pendingSubtasksCount = tasks.reduce(
    (count, task) =>
      count + task.subTasks.filter((subtask) => !subtask.isDone).length,
    0,
  );
  
  const totalCompleted = completedTasksCount + completedSubtasksCount;
  const totalPending = pendingTasksCount + pendingSubtasksCount;
  const totalTasks = totalCompleted + totalPending;
  
  const completionPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  // Get color based on completion percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-50';
    if (percentage >= 60) return 'bg-blue-50';
    if (percentage >= 40) return 'bg-yellow-50';
    if (percentage >= 20) return 'bg-orange-50';
    return 'bg-red-50';
  };

  const getTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-700';
    if (percentage >= 60) return 'text-blue-700';
    if (percentage >= 40) return 'text-yellow-700';
    if (percentage >= 20) return 'text-orange-700';
    return 'text-red-700';
  };

  if (totalTasks === 0) {
    return (
      <div className="w-full flex items-center justify-center py-2">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Icon icon="mdi:information-outline" className="h-4 w-4" />
          <span>Agrega tu primera tarea para ver el progreso</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full transition-all duration-300",
      getProgressBgColor(completionPercentage),
      "border rounded-lg p-4"
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:chart-line" className={cn("h-5 w-5", getTextColor(completionPercentage))} />
          <h3 className={cn("font-semibold text-base", getTextColor(completionPercentage))}>
            Progreso General
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-2xl font-bold", getTextColor(completionPercentage))}>
            {completionPercentage}%
          </span>
          {completionPercentage === 100 && (
            <Icon icon="mdi:party-popper" className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner">
        <div
          className={cn(
            "h-full transition-all duration-700 ease-out rounded-full",
            getProgressColor(completionPercentage)
          )}
          style={{ width: `${completionPercentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {/* Completed Tasks */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
            <Icon icon="mdi:check-circle" className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{completedTasksCount}</div>
            <div className="text-gray-500 text-xs">Tareas completadas</div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
            <Icon icon="mdi:clock-outline" className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{pendingTasksCount}</div>
            <div className="text-gray-500 text-xs">Tareas pendientes</div>
          </div>
        </div>

        {/* Completed Subtasks */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
            <Icon icon="mdi:format-list-checks" className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{completedSubtasksCount}</div>
            <div className="text-gray-500 text-xs">Subtareas hechas</div>
          </div>
        </div>

        {/* Important Tasks */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
            <Icon icon="mdi:star" className="h-4 w-4 text-yellow-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{stats.important}</div>
            <div className="text-gray-500 text-xs">Importantes</div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      {completionPercentage > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:lightbulb-on" className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">
              {completionPercentage === 100 
                ? "¡Excelente! Has completado todas tus tareas 🎉"
                : completionPercentage >= 80 
                ? "¡Casi listo! Solo un poco más 💪"
                : completionPercentage >= 60 
                ? "Buen progreso, sigue así 👍"
                : completionPercentage >= 40 
                ? "Vas por buen camino 🚀"
                : "Cada tarea completada cuenta ✨"
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
