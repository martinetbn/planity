import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';

interface TaskProp {
  id: number;
  name: string;
  description?: string;
}

export default function Task({ id, name, description }: TaskProp) {
  const [, setTaskList] = useAtom(taskListAtom);

  const handleDelete = () => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col w-full items-center justify-center text-gray-100 gap-2 p-4 bg-gray-500 rounded-lg relative">
      <button
        className="absolute top-1 right-3 select-none cursor-pointer"
        onClick={handleDelete}
      >
        x
      </button>
      <h1 className="font-medium text-lg">{name}</h1>
      <p>{description}</p>
      <span className="w-full text-end text-xs">ID #{id}</span>
    </div>
  );
}
