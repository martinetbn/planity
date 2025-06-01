import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import Column from './Column';
import Task from './Task';
import SubTask from './SubTask';
import type { Task as TaskType } from '../types/task.types';

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
  const [taskList] = useAtom(taskListAtom);

  // Group tasks by weekday based on deadline
  const tasksByWeekday = WEEKDAYS.reduce((acc, day, index) => {
    acc[day] = taskList.filter((task) => {
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
  const tasksWithoutDeadline = taskList.filter((task) => !task.deadline);

  return (
    <div className="w-full flex items-center lg:justify-start justify-start gap-4">
      {WEEKDAYS.map((day) => (
        <Column key={day} name={day} taskCount={tasksByWeekday[day].length}>
          {tasksByWeekday[day].length === 0 && (
            <span className="text-center">No hay tareas para {day.toLowerCase()}</span>
          )}
          {tasksByWeekday[day].map((task, index) => (
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
      ))}
      
      {tasksWithoutDeadline.length > 0 && (
        <Column name="Sin fecha" taskCount={tasksWithoutDeadline.length}>
          {tasksWithoutDeadline.map((task, index) => (
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
      )}
    </div>
  );
} 