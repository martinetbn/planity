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
    <div className="flex flex-col w-full items-start justify-start text-gray-100 p-4 bg-gray-500 rounded-lg relative">
      <button
        className="absolute top-2 right-2 text-gray-200 select-none cursor-pointer"
        onClick={handleDelete}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </button>
      <h1 className="font-medium w-full text-lg truncate" title={name}>
        {name}
      </h1>
      <p className="text-sm text-gray-200 text-wrap wrap-anywhere w-full">{description}</p>
    </div>
  );
}
