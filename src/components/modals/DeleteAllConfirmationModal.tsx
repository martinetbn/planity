import { useAtom } from 'jotai';
import { useTasks } from '../../features/tasks/hooks/useTasks';
import { currentModalAtom } from '../../features/layout/store/layoutAtoms';

export default function DeleteAllConfirmationModal() {
  const { deleteAllTasks } = useTasks();
  const [, setCurrentModal] = useAtom(currentModalAtom);

  const handleDeleteAll = () => {
    deleteAllTasks();
    setCurrentModal(null);
  };

  return (
    <div className="bg-white flex flex-col gap-4 rounded-lg shadow-lg p-6 w-[calc(100%-16px)] sm:w-fit z-50">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Borrar todas las tareas</h2>
        <p>¿Esta seguro de que quiere borrar todas las tareas?</p>
      </div>
      <div className="flex w-full gap-2">
        <button
          className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-lg w-full hover:bg-red-600 transition duration-200"
          onClick={handleDeleteAll}
        >
          Aceptar
        </button>
        <button
          className="bg-gray-500 text-white cursor-pointer px-4 py-2 rounded-lg w-full hover:bg-gray-600 transition duration-200"
          onClick={() => setCurrentModal(null)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
