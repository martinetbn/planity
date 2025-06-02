import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { taskListAtom } from '../store/taskAtoms';
import { Task, Subtask, TaskFilters } from '../../../lib/types';
import { generateId } from '../../../lib/utils';

export function useTasks() {
  const [taskList, setTaskList] = useAtom(taskListAtom);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subTasks' | 'progress'>) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      subTasks: [],
      progress: 0,
    };
    setTaskList((prev: Task[]) => [...prev, newTask]);
  };

  const updateTask = (taskId: number, updates: Partial<Task>) => {
    setTaskList((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTaskList((prev: Task[]) => prev.filter((task: Task) => task.id !== taskId));
  };

  const deleteAllTasks = () => {
    setTaskList([]);
  };

  const duplicateTask = (taskId: number) => {
    const taskToDuplicate = taskList.find((task) => task.id === taskId);
    if (taskToDuplicate) {
      const now = new Date().toISOString();
      const duplicatedTask: Task = {
        ...taskToDuplicate,
        id: generateId(),
        name: taskToDuplicate.name + ' (copia)',
        isDone: false, // Reset completion status for the copy
        createdAt: now,
        updatedAt: now,
      };
      setTaskList((prev: Task[]) => [...prev, duplicatedTask]);
    }
  };

  const toggleTaskComplete = (taskId: number) => {
    updateTask(taskId, { isDone: !taskList.find((t) => t.id === taskId)?.isDone });
  };

  const toggleTaskImportant = (taskId: number) => {
    updateTask(taskId, { isImportant: !taskList.find((t) => t.id === taskId)?.isImportant });
  };

  const addSubtask = (taskId: number, subtaskData: Omit<Subtask, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newSubtask: Subtask = {
      ...subtaskData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    setTaskList((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: [...task.subTasks, newSubtask],
              updatedAt: now,
            }
          : task
      )
    );
  };

  const updateSubtask = (taskId: number, subtaskId: number, updates: Partial<Subtask>) => {
    setTaskList((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, ...updates, updatedAt: new Date().toISOString() }
                  : subtask
              ),
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteSubtask = (taskId: number, subtaskId: number) => {
    setTaskList((prev: Task[]) =>
      prev.map((task: Task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.filter((subtask) => subtask.id !== subtaskId),
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const toggleSubtaskComplete = (taskId: number, subtaskId: number) => {
    const task = taskList.find((t) => t.id === taskId);
    const subtask = task?.subTasks.find((st) => st.id === subtaskId);
    if (subtask) {
      updateSubtask(taskId, subtaskId, { isDone: !subtask.isDone });
    }
  };

  const getFilteredTasks = (filters: TaskFilters) => {
    return taskList.filter((task) => {
      if (filters.category && task.category !== filters.category) return false;
      if (filters.isImportant !== undefined && task.isImportant !== filters.isImportant) return false;
      if (filters.isDone !== undefined && task.isDone !== filters.isDone) return false;
      if (filters.dateRange) {
        const taskDate = new Date(task.deadline);
        const start = new Date(filters.dateRange.start);
        const end = new Date(filters.dateRange.end);
        if (taskDate < start || taskDate > end) return false;
      }
      return true;
    });
  };

  const stats = useMemo(() => {
    const total = taskList.length;
    const completed = taskList.filter((task) => task.isDone).length;
    const active = total - completed;
    const important = taskList.filter((task) => task.isImportant && !task.isDone).length;
    const overdue = taskList.filter((task) => !task.isDone && new Date(task.deadline) < new Date()).length;

    return {
      total,
      completed,
      active,
      important,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [taskList]);

  return {
    tasks: taskList,
    addTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    duplicateTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleTaskComplete,
    toggleTaskImportant,
    toggleSubtaskComplete,
    getFilteredTasks,
    stats,
  };
} 