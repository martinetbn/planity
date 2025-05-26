import { useState } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import { Icon } from '@iconify/react';
import type { Subtask, TaskCategory } from '../types/task.types';

interface SubTaskProps {
  subtask: Subtask;
}

export default function SubTask({ subtask }: SubTaskProps) {
  const [, setTaskList] = useAtom(taskListAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(subtask.name);
  const [editedDescription, setEditedDescription] = useState(
    subtask.description || '',
  );
  const [editedCategory, setEditedCategory] = useState<TaskCategory>(
    subtask.category,
  );
  const [editedDeadline, setEditedDeadline] = useState(subtask.deadline || '');

  const handleDelete = () => {
    setTaskList((prev) =>
      prev.map((_task) => {
        _task.subTasks = _task.subTasks.filter(
          (_subtaskItem) => _subtaskItem.id !== subtask.id,
        );
        return _task;
      }),
    );
  };

  const handleCheckbox = () => {
    setTaskList((prev) =>
      prev.map((_task) => {
        _task.subTasks = _task.subTasks.map((_subtaskItem) => {
          if (_subtaskItem.id === subtask.id) {
            return { ..._subtaskItem, isDone: !_subtaskItem.isDone };
          }
          return _subtaskItem;
        });
        return _task;
      }),
    );
  };

  const handleEdit = () => {
    if (isEditing) {
      setTaskList((prev) =>
        prev.map((_task) => {
          _task.subTasks = _task.subTasks.map((_subtask) => {
            if (_subtask.id === subtask.id) {
              return {
                ..._subtask,
                name: editedTitle,
                description: editedDescription,
                category: editedCategory,
                deadline: editedDeadline,
              };
            }
            return _subtask;
          });
          return _task;
        }),
      );
    }
    setIsEditing((prev) => !prev);
  };

  const handleImportant = () => {
    setTaskList((prev) =>
      prev.map((_task) => {
        _task.subTasks = _task.subTasks.map((_subtask) => {
          if (_subtask.id === subtask.id) {
            return { ..._subtask, isImportant: !_subtask.isImportant };
          }
          return _subtask;
        });
        return _task;
      }),
    );
  };

  const deadlinePassed = Date.parse(subtask.deadline || '') < Date.now();

  return (
    <div
      className={
        'flex flex-col max-w-full items-start gap-2 justify-start text-gray-100 p-3 bg-gray-500 rounded-lg relative' +
        (deadlinePassed ? ' bg-red-500' : '')
      }
    >
      <div className="flex flex-col justify-start h-full w-full min-w-0">
        {isEditing ? (
          <input
            type="text"
            className="font-medium text-sm truncate overflow-hidden outline-none"
            value={editedTitle}
            placeholder="Título de la tarea"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1
            className="font-medium text-sm truncate overflow-hidden"
            title={subtask.name}
          >
            {subtask.name}
          </h1>
        )}
        {isEditing ? (
          <textarea
            className="text-xs text-gray-200 text-wrap wrap-anywhere font-light resize-none outline-none"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Describe tu tarea..."
            rows={3}
          />
        ) : (
          <p className="text-xs text-gray-200 text-wrap wrap-anywhere font-light">
            {subtask.description || '(Sin descripción)'}
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
              {subtask.category}
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
                {subtask.deadline || '(Sin fecha limite)'}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between h-full w-full gap-1">
        <button className="cursor-pointer" onClick={handleCheckbox}>
          {subtask.isDone ? (
            <Icon icon="ci:checkbox-check" className="h-4" />
          ) : (
            <Icon icon="ci:checkbox-unchecked" className="h-4" />
          )}
        </button>
        <button className="cursor-pointer" onClick={handleImportant}>
          {subtask.isImportant ? (
            <Icon icon="pajamas:star" className="h-4" />
          ) : (
            <Icon icon="pajamas:star-o" className="h-4" />
          )}
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
