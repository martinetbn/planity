import { useState } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setTaskList] = useAtom(taskListAtom);

  const handleAddTask = () => {
    const lastId = localStorage.getItem('lastTaskId');
    const newId = lastId ? parseInt(lastId, 10) + 1 : 1;
    localStorage.setItem('lastTaskId', newId.toString());

    setTaskList((prev) => [
      ...prev,
      {
        id: newId,
        name: title,
        description: description,
        isDone: false,
      },
    ]);
    setTitle('');
    setDescription('');
  };

  return (
    <form
      className="bg-gray-700 w-full flex-col max-w-84 gap-2 flex items-center justify-between p-4 rounded-lg"
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
      <button
        className="p-2 w-full bg-blue-500 text-white text-sm cursor-pointer active:scale-97 disabled:opacity-50 transition-all duration-100 rounded"
        disabled={!title.trim()}
        type="submit"
      >
        Agregar
      </button>
    </form>
  );
}
