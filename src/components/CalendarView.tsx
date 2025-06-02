import { useTasks } from '../features/tasks/hooks/useTasks';
import { TaskColumn, TaskCard } from '../features/tasks/components';
import type { Task as TaskType } from '../lib/types';

const WEEKDAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

export default function CalendarView() {
  const { tasks } = useTasks();

  // Group tasks by weekday based on deadline
  const tasksByWeekday = WEEKDAYS.reduce((acc, day, index) => {
    acc[day] = tasks.filter((task) => {
      if (!task.deadline) return false;
      
      // Parse date properly to avoid timezone issues
      // Split the YYYY-MM-DD format and create date in local timezone
      const [year, month, dayOfMonth] = task.deadline.split('-').map(Number);
      const taskDate = new Date(year, month - 1, dayOfMonth); // month is 0-indexed
      const dayOfWeek = taskDate.getDay();
      
      // JavaScript getDay(): 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
      // Our WEEKDAYS array: 0=Lunes, 1=Martes, 2=Miércoles, 3=Jueves, 4=Viernes, 5=Sábado, 6=Domingo
      // Convert JavaScript day to our array index
      let adjustedDay;
      if (dayOfWeek === 0) {
        adjustedDay = 6; // Sunday -> Domingo (index 6)
      } else {
        adjustedDay = dayOfWeek - 1; // Monday(1)->Lunes(0), Tuesday(2)->Martes(1), etc.
      }
      
      return adjustedDay === index;
    });
    return acc;
  }, {} as Record<string, TaskType[]>);

  // Tasks without deadline go to a separate section
  const tasksWithoutDeadline = tasks.filter((task) => !task.deadline);

  return (
    <div className="w-full flex items-start lg:justify-start justify-start gap-4">
      {WEEKDAYS.map((day) => (
        <TaskColumn 
          key={day} 
          title={day} 
          taskCount={tasksByWeekday[day].length}
          icon="mdi:calendar-outline"
        >
          {tasksByWeekday[day].length === 0 ? (
            <span className="text-center text-gray-500">No hay tareas para {day.toLowerCase()}</span>
          ) : (
            tasksByWeekday[day].map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </TaskColumn>
      ))}
      
      {tasksWithoutDeadline.length > 0 && (
        <TaskColumn 
          title="Sin fecha" 
          taskCount={tasksWithoutDeadline.length}
          icon="mdi:calendar-remove"
        >
          {tasksWithoutDeadline.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </TaskColumn>
      )}
    </div>
  );
} 