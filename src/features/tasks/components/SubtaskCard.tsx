import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Subtask, TaskCategory } from '../../../lib/types';
import { Button } from '../../../shared/components/ui';
import { cn, formatDate, isOverdue } from '../../../lib/utils';
import { useTasks } from '../hooks/useTasks';

interface SubtaskCardProps {
  subtask: Subtask;
  taskId: number;
  className?: string;
}

export function SubtaskCard({ subtask, taskId, className }: SubtaskCardProps) {
  const { toggleSubtaskComplete, updateSubtask, deleteSubtask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(subtask.name);
  const [editedDescription, setEditedDescription] = useState(subtask.description || '');
  const [editedCategory, setEditedCategory] = useState<TaskCategory>(subtask.category);
  const [editedDeadline, setEditedDeadline] = useState(() => {
    // Convert date to proper format for date input (avoid timezone issues)
    if (subtask.deadline) {
      const date = new Date(subtask.deadline + 'T12:00:00'); // Add noon time to avoid timezone shifts
      return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD format
    }
    return '';
  });

  const handleToggleComplete = () => {
    toggleSubtaskComplete(taskId, subtask.id);
  };

  const handleDelete = () => {
    deleteSubtask(taskId, subtask.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Validate that the title is not empty
      if (!editedTitle.trim()) {
        alert('El título no puede estar vacío');
        return;
      }
      
      updateSubtask(taskId, subtask.id, {
        name: editedTitle,
        description: editedDescription,
        category: editedCategory,
        deadline: editedDeadline,
      });
    }
    setIsEditing((prev) => !prev);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Personal':
        return 'bg-blue-100 text-blue-600';
      case 'Trabajo':
        return 'bg-green-100 text-green-600';
      case 'Estudio':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const isTaskOverdue = isOverdue(subtask.deadline);

  return (
    <div className={cn(
      'flex flex-col gap-2 p-3 ml-4 border-l-2 border-gray-200 bg-gray-50 rounded-r-md text-sm',
      isTaskOverdue && !subtask.isDone ? 'border-l-red-300 bg-red-25' : '',
      subtask.isDone ? 'opacity-60' : '',
      className
    )}>
      {/* Title and Description */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            className="w-full font-medium text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-500"
            value={editedTitle}
            placeholder="Título de la subtarea"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h4
            className={cn(
              'font-medium text-xs',
              subtask.isDone ? 'line-through text-gray-400' : 'text-gray-700'
            )}
            title={subtask.name}
          >
            {subtask.name}
            {subtask.isImportant && (
              <Icon icon="mdi:star" className="inline ml-1 h-3 w-3 text-yellow-500" />
            )}
          </h4>
        )}

        {isEditing ? (
          <textarea
            className="w-full mt-1 text-xs text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Describe tu subtarea..."
            rows={2}
          />
        ) : (
          subtask.description && (
            <p className="text-xs text-gray-500 mt-1">
              {subtask.description}
            </p>
          )
        )}
      </div>

      {/* Category and Deadline */}
      <div className="flex items-center justify-between">
        {isEditing ? (
          <select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value as TaskCategory)}
            className="text-xs font-medium rounded px-1 py-0.5 outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100 text-blue-600"
          >
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
          </select>
        ) : (
          <span
            className={cn(
              'inline-flex items-center px-1 py-0.5 rounded text-xs font-medium',
              getCategoryColor(subtask.category)
            )}
          >
            {subtask.category}
          </span>
        )}

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Icon icon="mdi:clock-outline" className="h-2.5 w-2.5" />
          {isEditing ? (
            <input
              className="text-xs font-medium bg-white border border-gray-300 rounded px-1 py-0.5 outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              value={editedDeadline}
              onChange={(e) => setEditedDeadline(e.target.value)}
            />
          ) : (
            <span
              className={cn(
                'text-xs',
                isTaskOverdue && !subtask.isDone && 'text-red-500 font-medium'
              )}
            >
              {subtask.deadline ? formatDate(subtask.deadline) : '(Sin fecha)'}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start items-center gap-1">
        {/* Complete checkbox */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleComplete}
          className="h-6 w-6 p-0"
        >
          {subtask.isDone ? (
            <Icon icon="mdi:checkbox-marked" className="h-3 w-3 text-green-600" />
          ) : (
            <Icon icon="mdi:checkbox-blank-outline" className="h-3 w-3 text-gray-400" />
          )}
        </Button>

        {/* Edit/Save */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          className="h-6 w-6 p-0"
        >
          {isEditing ? (
            <Icon icon="mdi:content-save" className="h-3 w-3 text-blue-500" />
          ) : (
            <Icon icon="mdi:pencil" className="h-3 w-3 text-gray-400 hover:text-gray-600" />
          )}
        </Button>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-6 w-6 p-0"
        >
          <Icon icon="mdi:delete" className="h-3 w-3 text-gray-400 hover:text-red-500" />
        </Button>
      </div>
    </div>
  );
} 