import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { TaskCategory } from '../lib/types';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../shared/components/ui';
import { cn } from '../lib/utils';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Personal');
  const [deadline, setDeadline] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const { tasks, addTask, addSubtask } = useTasks();

  const handleAddTask = () => {
    addTask({
      name: title,
      description: description,
      category: category,
      deadline: deadline,
      isDone: false,
      isImportant: isImportant,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Personal');
    setDeadline('');
    setIsImportant(false);
  };

  const getCategoryColor = (category: string) => {
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

  const isFormValid = title.trim() && deadline.trim();

  return (
    <Card className="w-full max-w-sm min-w-80 shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
          <Icon icon="mdi:plus-circle" className="h-5 w-5 text-blue-500" />
          Nueva Tarea
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) handleAddTask();
          }}
          className="space-y-4"
        >
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Icon icon="mdi:text" className="h-4 w-4" />
              Título *
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              required
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los detalles..."
              rows={3}
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Icon icon="mdi:tag" className="h-4 w-4" />
              Categoría
            </label>
            <select
              className={cn(
                "w-full px-3 py-2 border rounded-md text-sm font-medium outline-none transition-colors",
                getCategoryColor(category)
              )}
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          {/* Important Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="important"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <label htmlFor="important" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Icon icon="mdi:star" className="h-4 w-4 text-yellow-500" />
              Marcar como importante
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:plus" className="h-4 w-4" />
            Crear Tarea
          </Button>

          {/* Form Validation Message */}
          {!isFormValid && (title || deadline) && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <Icon icon="mdi:alert-circle" className="h-3 w-3" />
              Título y fecha límite son obligatorios
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
