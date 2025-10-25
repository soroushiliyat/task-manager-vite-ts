import { useEffect, useState } from 'react';
import type { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

interface Props {
  onSubmit: (task: Task) => void;
  editingTask?: Task;
}

export default function TaskForm({ onSubmit, editingTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate || '');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      setError('Invalid status');
      return;
    }

    const newTask: Task = {
      id: editingTask?.id || uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate: dueDate || undefined,
    };

    onSubmit(newTask);
    setTitle('');
    setDescription('');
    setStatus('pending');
    setDueDate('');
    setError('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      noValidate
      className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        {editingTask ? 'Edit task' : 'New task'}
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        placeholder="Task title"
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="- Description"
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <select
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={status}
        onChange={e => setStatus(e.target.value as Task['status'])}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">  In Progress</option>
        <option value="completed">اCompleted</option>
      </select>

      <input
        type="date"
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />

      <button
        type="submit"
        className="bg-purple-700 text-white px-4 py-2 rounded hover:scale-105 hover:bg-purple-800 transition-transform duration-200"
      >
        {editingTask ? 'Save Changes' : 'Add Task'}
      </button>
    </motion.form>
  );
}
