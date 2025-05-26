import { Children } from 'react';
import { useAtom } from 'jotai';
import { currentModalAtom } from '../atoms/layoutAtoms';
import { Icon } from '@iconify/react';

interface ColumnProps {
  name: string;
  children: React.ReactNode;
  taskCount?: number;
}

export default function Column({
  name,
  children,
  taskCount: propTaskCount,
}: ColumnProps) {
  const [, setCurrentModal] = useAtom(currentModalAtom);

  const taskCount =
    propTaskCount !== undefined
      ? propTaskCount
      : Children.toArray(children).filter(
          (child) =>
            typeof child === 'object' &&
            child !== null &&
            'type' in child &&
            child.type !== 'span',
        ).length;

  return (
    <div className="flex flex-col min-w-72 md:w-84 h-103 items-center shadow-xl justify-betwen gap-4 p-4 text-gray-100 bg-gray-700 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <span className="font-semibold text-lg">
          {name} ({taskCount})
        </span>
        <button
          className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={taskCount === 0}
          onClick={() => setCurrentModal('DeleteAllConfirmation')}
        >
          <Icon icon="tabler:trash" height={18} />
        </button>
      </div>
      <div className="w-full flex flex-col gap-2 overflow-y-scroll h-full">
        {children}
      </div>
    </div>
  );
}
