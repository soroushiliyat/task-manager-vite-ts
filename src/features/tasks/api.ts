import type { Task } from './types';

const STORAGE_KEY = 'tasks';

function getStoredTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function fetchTasks(): Promise<Task[]> {
  return getStoredTasks();
}

export async function createTask(task: Task): Promise<Task | null> {
  try {
    const newTask = { ...task, id: crypto.randomUUID() };
    const tasks = getStoredTasks();
    const updated = [newTask, ...tasks];
    saveTasks(updated);
    return newTask;
  } catch (err) {
    console.error('خطا در ذخیره تسک:', err);
    return null;
  }
}

export async function updateTask(task: Task): Promise<Task | null> {
  try {
    const tasks = getStoredTasks();
    const updated = tasks.map(t => (t.id === task.id ? task : t));
    saveTasks(updated);
    return task;
  } catch (err) {
    console.error('خطا در ویرایش تسک:', err);
    return null;
  }
}

export async function deleteTask(id: string): Promise<boolean> {
  try {
    const tasks = getStoredTasks();
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
    return true;
  } catch (err) {
    console.error('خطا در حذف تسک:', err);
    return false;
  }
}