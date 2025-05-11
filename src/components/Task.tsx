import { useState } from 'react';
import { useAtom } from 'jotai';
import { taskListAtom } from '../atoms/taskAtoms';
import type { Task } from '../types/task.types';

interface TaskProp {
  task: Task;
}

export default function Task({ task }: TaskProp) {
  const [, setTaskList] = useAtom(taskListAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(
    task.description || '',
  );

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
      setTaskList((prev) =>
        prev.map((_task) => {
          if (_task.id === task.id) {
            return {
              ..._task,
              name: editedTitle,
              description: editedDescription,
            };
          }
          return _task;
        }),
      );
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="flex max-w-full items-start gap-2 justify-start text-gray-100 p-3 bg-gray-500 rounded-lg relative">
      <div className="flex flex-col justify-start h-full w-fit gap-1">
        <button className="cursor-pointer" onClick={handleCheckbox}>
          {task.isDone ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8 12l3 3l5-6M4 16.8V7.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105v9.607c0 1.118 0 1.677-.218 2.104a2 2 0 0 1-.875.874c-.427.218-.986.218-2.104.218H7.197c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C4 18.48 4 17.92 4 16.8"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h9.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V7.197c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.875-.874C18.48 4 17.92 4 16.8 4H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 5.52 4 6.08 4 7.2"
              />
            </svg>
          )}
        </button>
        <button className="cursor-pointer" onClick={handleEdit}>
          {isEditing ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m20.71 9.29l-6-6a1 1 0 0 0-.32-.21A1.1 1.1 0 0 0 14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a1 1 0 0 0-.29-.71M9 5h4v2H9Zm6 14H9v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1Zm4-1a1 1 0 0 1-1 1h-1v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.41l4 4Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.748 2.947a2 2 0 0 1 2.828 0l2.475 2.475a2 2 0 0 1 0 2.829L9.158 20.144l-6.38 1.076l1.077-6.38zm-.229 3.057l2.475 2.475l1.643-1.643l-2.475-2.474zm1.06 3.89l-2.474-2.475l-8.384 8.384l-.503 2.977l2.977-.502z"
              />
            </svg>
          )}
        </button>
        <button className="cursor-pointer" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col justify-start h-full w-full min-w-0">
        {isEditing ? (
          <input
            type="text"
            className="font-medium truncate leading-tight overflow-hidden"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1
            className="font-medium truncate leading-tight overflow-hidden"
            title={task.name}
          >
            {task.name}
          </h1>
        )}
        {isEditing ? (
          <textarea
            className="text-sm text-gray-200 text-wrap wrap-anywhere font-light"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <p className="text-sm text-gray-200 text-wrap wrap-anywhere font-light">
            {task.description || '(Sin descripción)'}
          </p>
        )}
      </div>
    </div>
  );
}
