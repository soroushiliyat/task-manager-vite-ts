import type { Task } from '../types';
import { motion } from 'framer-motion';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{task.title}</h3>
        <span className="text-sm px-2 py-1 rounded bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-white">
          {task.status === 'pending'
            ? 'Pending'
            : task.status === 'in-progress'
            ? 'In Progress'
            : 'اDone'}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
      )}

      {task.dueDate && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Deadline: {new Date(task.dueDate).toLocaleDateString('fa-IR')}
        </p>
      )}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform duration-200"
        >
    Delete
        </button>
      </div>
    </motion.div>
  );
}
