import { useState } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import { currentModalAtom } from '../atoms/layoutAtoms';
import { Icon } from '@iconify/react';
import type { Task, TaskCategory } from '../types/task.types';

interface TaskProp {
  task: Task;
}

export default function Task({ task }: TaskProp) {
  const [, setTaskList] = useAtom(taskListAtom);
  const [, setCurrentModal] = useAtom(currentModalAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(
    task.description || '',
  );
  const [editedCategory, setEditedCategory] = useState<TaskCategory>(
    task.category,
  );
  const [editedDeadline, setEditedDeadline] = useState(task.deadline || '');

  const handleDelete = () => {
    setTaskList((prev) => prev.filter((_task) => _task.id !== task.id));
  };

  const handleCheckbox = () => {
    setTaskList((prev) =>
      prev.map((_task) => {
        if (_task.id === task.id) {
          return { ..._task, isDone: !_task.isDone };
        }
        return _task;
      }),
    );
  };

  const handleEdit = () => {
    if (isEditing) {
      // Validate that the title is not empty
      if (!editedTitle.trim()) {
        setCurrentModal('EmptyTitleError');
        return;
      }
      
      setTaskList((prev) =>
        prev.map((_task) => {
          if (_task.id === task.id) {
            return {
              ..._task,
              name: editedTitle,
              description: editedDescription,
              category: editedCategory,
              deadline: editedDeadline,
            };
          }
          return _task;
        }),
      );
    }
    setIsEditing((prev) => !prev);
  };

  const handleImportant = () => {
    setTaskList((prev) =>
      prev.map((_task) => {
        if (_task.id === task.id) {
          return { ..._task, isImportant: !_task.isImportant };
        }
        return _task;
      }),
    );
  };

  const handleDuplicate = () => {
    const duplicatedTask: Task = {
      ...task,
      id: Date.now(), // Generate new unique ID as number
      name: task.name + ' (copia)',
      isDone: false, // Reset completion status for the copy
    };
    setTaskList((prev) => [...prev, duplicatedTask]);
  };

  const deadlinePassed = Date.parse(task.deadline || '') < Date.now();

  return (
    <div
      className={
        'flex flex-col max-w-full items-start gap-2 justify-start text-gray-100 p-3 bg-gray-500 rounded-lg relative ' +
        (deadlinePassed ? ' bg-red-500' : '')
      }
    >
      <div className="flex flex-col justify-start h-full w-full min-w-0">
        {isEditing ? (
          <input
            type="text"
            className="font-medium truncate overflow-hidden outline-none"
            value={editedTitle}
            placeholder="Título de la tarea"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1
            className="font-medium truncate overflow-hidden"
            title={task.name}
          >
            {task.name}
          </h1>
        )}
        {isEditing ? (
          <textarea
            className="text-sm text-gray-200 text-wrap wrap-anywhere font-light resize-none outline-none"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Describe tu tarea..."
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-200 text-wrap wrap-anywhere font-light">
            {task.description || '(Sin descripción)'}
          </p>
        )}
        <div className="flex mt-1 items-center justify-between w-full">
          {isEditing ? (
            <select
              value={editedCategory}
              onChange={(e) =>
                setEditedCategory(e.target.value as TaskCategory)
              }
              className="bg-blue-200 text-blue-500 w-fit leading-none rounded-md py-0.5 outline-none text-xs font-medium"
            >
              <option value="Personal">Personal</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Estudio">Estudio</option>
            </select>
          ) : (
            <span className="bg-blue-200 text-blue-500 w-fit leading-none rounded-md p-1 text-xs font-medium">
              {task.category}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Icon icon="lucide:clock" className="h-3" />
            {isEditing ? (
              <input
                className="text-xs font-medium"
                type="date"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
              />
            ) : (
              <span className="text-xs font-medium">
                {task.deadline || '(Sin fecha limite)'}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between h-full w-full gap-1">
        <button className="cursor-pointer" onClick={handleCheckbox}>
          {task.isDone ? (
            <Icon icon="ci:checkbox-check" className="h-4" />
          ) : (
            <Icon icon="ci:checkbox-unchecked" className="h-4" />
          )}
        </button>
        <button className="cursor-pointer" onClick={handleImportant}>
          {task.isImportant ? (
            <Icon icon="pajamas:star" className="h-4" />
          ) : (
            <Icon icon="pajamas:star-o" className="h-4" />
          )}
        </button>
        <button className="cursor-pointer" onClick={handleDuplicate}>
          <Icon icon="lucide:copy" className="h-4" />
        </button>
        <button className="cursor-pointer" onClick={handleEdit}>
          {isEditing ? (
            <Icon icon="lucide:save" className="h-4" />
          ) : (
            <Icon icon="uil:pen" className="h-4" />
          )}
        </button>
        <button className="cursor-pointer" onClick={handleDelete}>
          <Icon icon="tabler:trash" className="h-4" />
        </button>
      </div>
    </div>
  );
}
