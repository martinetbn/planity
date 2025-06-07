import { useState } from 'react';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react';
import { Task, TaskCategory } from '../../../lib/types';
import { Card, CardContent, Button } from '../../../shared/components/ui';
import { cn, formatDate, isOverdue } from '../../../lib/utils';
import { useTasks } from '../hooks/useTasks';
import { currentModalAtom } from '../../layout/store/layoutAtoms';
import { SubtaskCard } from './SubtaskCard';

interface TaskCardProps {
  task: Task;
  className?: string;
}

export function TaskCard({ task, className }: TaskCardProps) {
  const { toggleTaskComplete, toggleTaskImportant, deleteTask, updateTask, duplicateTask, addSubtask } = useTasks();
  const [, setCurrentModal] = useAtom(currentModalAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedCategory, setEditedCategory] = useState<TaskCategory>(task.category);
  const [editedDeadline, setEditedDeadline] = useState(() => {
    // Convert date to proper format for date input (avoid timezone issues)
    if (task.deadline) {
      const date = new Date(task.deadline + 'T12:00:00'); // Add noon time to avoid timezone shifts
      return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD format
    }
    return '';
  });
  
  // Subtask form state
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [subtaskDescription, setSubtaskDescription] = useState('');
  const [subtaskCategory, setSubtaskCategory] = useState<TaskCategory>(task.category);
  const [subtaskDeadline, setSubtaskDeadline] = useState('');

  const handleToggleComplete = () => {
    toggleTaskComplete(task.id);
  };

  const handleToggleImportant = () => {
    toggleTaskImportant(task.id);
  };

  const handleDuplicate = () => {
    duplicateTask(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Validate that the title is not empty
      if (!editedTitle.trim()) {
        setCurrentModal('EmptyTitleError');
        return;
      }
      
      updateTask(task.id, {
        name: editedTitle,
        description: editedDescription,
        category: editedCategory,
        deadline: editedDeadline,
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleAddSubtask = () => {
    if (!subtaskTitle.trim() || !subtaskDeadline.trim()) {
      setCurrentModal('EmptyTitleError');
      return;
    }

    addSubtask(task.id, {
      name: subtaskTitle,
      description: subtaskDescription,
      category: subtaskCategory,
      deadline: subtaskDeadline,
      isDone: false,
      isImportant: false,
    });

    // Reset form
    setSubtaskTitle('');
    setSubtaskDescription('');
    setSubtaskCategory(task.category);
    setSubtaskDeadline('');
    setIsAddingSubtask(false);
  };

  const handleCancelAddSubtask = () => {
    setSubtaskTitle('');
    setSubtaskDescription('');
    setSubtaskCategory(task.category);
    setSubtaskDeadline('');
    setIsAddingSubtask(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Personal':
        return 'bg-blue-200 text-blue-500';
      case 'Trabajo':
        return 'bg-green-200 text-green-500';
      case 'Estudio':
        return 'bg-purple-200 text-purple-500';
      default:
        return 'bg-gray-200 text-gray-500';
    }
  };

  const getSubtaskCategoryColor = (category: string) => {
    switch (category) {
      case 'Personal':
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'Trabajo':
        return 'border-green-200 bg-green-50 text-green-700';
      case 'Estudio':
        return 'border-purple-200 bg-purple-50 text-purple-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const isTaskOverdue = isOverdue(task.deadline);
  const completedSubtasks = task.subTasks.filter((st) => st.isDone).length;
  const totalSubtasks = task.subTasks.length;
  const isSubtaskFormValid = subtaskTitle.trim() && subtaskDeadline.trim();

  return (
    <div className="w-full">
      <Card className={cn(
        'w-full transition-all hover:shadow-md',
        isTaskOverdue && !task.isDone ? 'border-red-500 bg-red-50' : '',
        task.isDone ? 'opacity-75' : '',
        className
      )}>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {/* Title and Description */}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full font-medium text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                  value={editedTitle}
                  placeholder="Título de la tarea"
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <h3
                  className={cn(
                    'font-medium text-sm',
                    task.isDone ? 'line-through text-gray-500' : 'text-gray-900'
                  )}
                  title={task.name}
                >
                  {task.name}
                  {task.isImportant && (
                    <Icon icon="mdi:star" className="inline ml-1 h-4 w-4 text-yellow-500" />
                  )}
                </h3>
              )}

              {isEditing ? (
                <textarea
                  className="w-full mt-2 text-sm text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Describe tu tarea..."
                  rows={3}
                />
              ) : (
                task.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {task.description || '(Sin descripción)'}
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
                  className="text-xs font-medium rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 bg-blue-200 text-blue-500"
                >
                  <option value="Personal">Personal</option>
                  <option value="Trabajo">Trabajo</option>
                  <option value="Estudio">Estudio</option>
                </select>
              ) : (
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                    getCategoryColor(task.category)
                  )}
                >
                  {task.category}
                </span>
              )}

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Icon icon="mdi:clock-outline" className="h-3 w-3" />
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
                      'text-xs font-medium',
                      isTaskOverdue && !task.isDone && 'text-red-500 font-medium'
                    )}
                  >
                    {task.deadline ? formatDate(task.deadline) : '(Sin fecha límite)'}
                  </span>
                )}
              </div>
            </div>

            {/* Subtasks Progress */}
            {totalSubtasks > 0 && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Icon icon="mdi:format-list-checks" className="h-3 w-3" />
                <span>{completedSubtasks}/{totalSubtasks} subtareas</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center w-full gap-1 pt-2 border-t border-gray-100">
              {/* Complete checkbox */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleComplete}
                className="h-8 w-8 p-0 group"
              >
                {task.isDone ? (
                  <Icon icon="mdi:checkbox-marked" className="h-4 w-4 text-green-600" />
                ) : (
                  <Icon icon="mdi:checkbox-blank-outline" className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                )}
              </Button>

              {/* Important star */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleImportant}
                className="h-8 w-8 p-0 group"
              >
                {task.isImportant ? (
                  <Icon icon="mdi:star" className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Icon icon="mdi:star-outline" className="h-4 w-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                )}
              </Button>

              {/* Add Subtask */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddingSubtask(true)}
                className="h-8 w-8 p-0 group"
                title="Agregar subtarea"
              >
                <Icon icon="mdi:plus" className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </Button>

              {/* Duplicate */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDuplicate}
                className="h-8 w-8 p-0 group"
              >
                <Icon icon="mdi:content-copy" className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </Button>

              {/* Edit/Save */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEdit}
                className="h-8 w-8 p-0 group"
              >
                {isEditing ? (
                  <Icon icon="mdi:content-save" className="h-4 w-4 text-blue-500" />
                ) : (
                  <Icon icon="mdi:pencil" className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                )}
              </Button>

              {/* Delete */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="h-8 w-8 p-0 group"
              >
                <Icon icon="mdi:delete" className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Subtask Form */}
      {isAddingSubtask && (
        <div className="mt-3">
          <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-base font-semibold text-blue-800">
                    <div className="p-1 bg-blue-500 rounded-md">
                      <Icon icon="mdi:plus" className="h-4 w-4 text-white" />
                    </div>
                    Nueva Subtarea
                  </div>
                  <Button
                    onClick={handleCancelAddSubtask}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon="mdi:close" className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Icon icon="mdi:text" className="h-4 w-4" />
                    Título *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                    placeholder="¿Qué subtarea necesitas completar?"
                    autoFocus
                  />
                </div>
                
                {/* Description Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Icon icon="mdi:text-long" className="h-4 w-4" />
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    value={subtaskDescription}
                    onChange={(e) => setSubtaskDescription(e.target.value)}
                    placeholder="Describe los detalles de la subtarea..."
                    rows={2}
                  />
                </div>
                
                {/* Category and Deadline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Icon icon="mdi:tag" className="h-4 w-4" />
                      Categoría
                    </label>
                    <select
                      value={subtaskCategory}
                      onChange={(e) => setSubtaskCategory(e.target.value as TaskCategory)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md text-xs font-medium outline-none transition-colors",
                        getSubtaskCategoryColor(subtaskCategory)
                      )}
                    >
                      <option value="Personal">📘 Personal</option>
                      <option value="Trabajo">💼 Trabajo</option>
                      <option value="Estudio">📚 Estudio</option>
                    </select>
                  </div>
                  
                  {/* Deadline Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Icon icon="mdi:calendar" className="h-4 w-4" />
                      Fecha Límite *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      value={subtaskDeadline}
                      onChange={(e) => setSubtaskDeadline(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleAddSubtask}
                    disabled={!isSubtaskFormValid}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <Icon icon="mdi:plus" className="h-4 w-4" />
                    Crear
                  </Button>
                  <Button
                    onClick={handleCancelAddSubtask}
                    variant="ghost"
                    className="flex-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 text-sm py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Icon icon="mdi:close" className="h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
                
                {/* Form Validation Message */}
                {!isSubtaskFormValid && (subtaskTitle || subtaskDeadline) && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <Icon icon="mdi:alert-circle" className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700">
                      Título y fecha límite son obligatorios para crear una subtarea
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Subtasks */}
      {task.subTasks.length > 0 && (
        <div className="mt-2 space-y-1">
          {task.subTasks.map((subtask) => (
            <SubtaskCard
              key={subtask.id}
              subtask={subtask}
              taskId={task.id}
            />
          ))}
        </div>
      )}
    </div>
  );
} 