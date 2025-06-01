import { useAtom } from 'jotai';
import { createElement } from 'react';
import DeleteAllConfirmationModal from './modals/DeleteAllConfirmationModal';
import EmptyTitleErrorModal from './modals/EmptyTitleErrorModal';
import { currentModalAtom } from '../atoms/layoutAtoms';

export default function Modal() {
  const [currentModal, setCurrentModal] = useAtom<string | null>(
    currentModalAtom,
  );

  if (!currentModal) {
    return null;
  }

  const modalList = {
    DeleteAllConfirmation: <DeleteAllConfirmationModal />,
    EmptyTitleError: <EmptyTitleErrorModal />,
  };

  return (
    <div className="w-[100dvw] h-[100dvh] flex items-center justify-center fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50"
        onClick={() => setCurrentModal(null)}
      />
      {currentModal &&
        createElement(modalList[currentModal as keyof typeof modalList].type)}
    </div>
  );
}
