interface ColumnProps {
  name: string;
  children: React.ReactNode;
}

export default function Column({ name, children }: ColumnProps) {
  return (
    <div className="flex flex-col w-full max-w-84 items-center shadow-xl justify-center gap-4 p-4 text-gray-100 bg-gray-700 rounded-lg">
      <span className="font-semibold text-lg">{name}</span>
      <div className="w-full flex flex-col gap-2 overflow-y-scroll overflow-x-hidden max-h-72">{children}</div>
    </div>
  );
}
