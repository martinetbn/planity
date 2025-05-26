import { useState } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import { TaskCategory } from '../types/task.types';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Personal');
  const [parentTask, setParentTask] = useState<number>(0);
  const [deadline, setDeadline] = useState('');
  const [taskList, setTaskList] = useAtom(taskListAtom);

  const handleAddTask = () => {
    const lastId = localStorage.getItem('lastTaskId');
    const newId = lastId ? parseInt(lastId, 10) + 1 : 1;
    localStorage.setItem('lastTaskId', newId.toString());

    if (parentTask === 0) {
      setTaskList((prev) => [
        ...prev,
        {
          id: newId,
          name: title,
          description: description,
          category: category,
          deadline: deadline,
          isDone: false,
          isImportant: false,
          subTasks: [],
        },
      ]);
    } else {
      setTaskList((prev) =>
        prev.map((task) => {
          if (task.id === parentTask) {
            return {
              ...task,
              subTasks: [
                ...task.subTasks,
                {
                  id: newId,
                  name: title,
                  description: description,
                  category: category,
                  deadline: deadline,
                  isDone: false,
                  isImportant: false,
                },
              ],
            };
          }
          return task;
        }),
      );
    }

    setTitle('');
    setDescription('');
    setCategory('Personal');
    setDeadline('');
    setParentTask(0);
  };

  return (
    <form
      className="bg-gray-700 flex-col min-w-72 md:w-84 gap-2 flex items-center justify-between p-4 rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
    >
      <div className="w-full flex flex-col gap-1">
        <span className="text-white text-sm font-semibold">Título</span>
        <input
          className="p-2 bg-gray-500 text-gray-100 text-sm w-full rounded outline-none"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-white text-sm font-semibold">Descripción</span>
        <input
          className="p-2 bg-gray-500 text-gray-100 text-sm w-full rounded outline-none"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-white text-sm font-semibold">Categoria</span>
        <select
          className="p-2 bg-gray-500 text-gray-100 text-sm w-full rounded outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
        >
          <option value="Personal">Personal</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Estudio">Estudio</option>
        </select>
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-white text-sm font-semibold">Fecha Limite</span>
        <input
          className="p-2 bg-gray-500 text-gray-100 text-sm w-full rounded outline-none"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-white text-sm font-semibold">Tarea Padre</span>
        <select
          className="p-2 bg-gray-500 text-gray-100 text-sm w-full rounded outline-none"
          value={parentTask ?? 0}
          onChange={(e) => setParentTask(parseInt(e.target.value))}
        >
          <option value={0}>Ninguna</option>
          {taskList.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="p-2 w-full bg-blue-500 text-white text-sm cursor-pointer active:scale-97 disabled:opacity-50 transition-all duration-100 rounded"
        disabled={!title.trim() || !deadline.trim()}
        type="submit"
      >
        Agregar
      </button>
    </form>
  );
}
