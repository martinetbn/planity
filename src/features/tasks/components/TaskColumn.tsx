import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui';
import { cn } from '../../../lib/utils';

interface TaskColumnProps {
  title: string;
  taskCount: number;
  children: ReactNode;
  icon?: string;
  className?: string;
}

export function TaskColumn({ title, taskCount, children, icon, className }: TaskColumnProps) {
  return (
    <Card className={cn('w-full max-w-sm min-w-80 flex flex-col', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            {icon && <Icon icon={icon} className="h-5 w-5" />}
            {title}
          </div>
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {taskCount}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <div className="space-y-3 min-h-40">
          {children}
        </div>
      </CardContent>
    </Card>
  );
} 