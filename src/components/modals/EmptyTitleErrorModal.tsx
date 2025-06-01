import { useAtom } from 'jotai';
import { currentModalAtom } from '../../atoms/layoutAtoms';

export default function EmptyTitleErrorModal() {
  const [, setCurrentModal] = useAtom(currentModalAtom);

  return (
    <div className="bg-white flex flex-col gap-4 rounded-lg shadow-lg p-6 w-[calc(100%-16px)] sm:w-fit z-50">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Error al guardar</h2>
        <p>El título de la tarea no puede estar vacío.</p>
      </div>
      <div className="flex w-full">
        <button
          className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-200"
          onClick={() => setCurrentModal(null)}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
} 