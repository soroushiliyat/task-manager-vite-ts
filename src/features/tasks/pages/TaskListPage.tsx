import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import type { Task } from '../types';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';
import { toast } from 'react-toastify';

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks()
      .then(data => {
        console.log('Received Tasks:', data);
        setTasks(data);
      })
      .catch(() => toast.error('Failed to fetch tasks from server'));
  }, []);

  const handleAddOrEdit = async (task: Task) => {
    try {
      let updatedTasks;
      if (editingTask) {
        const updated = await updateTask(task);
        if (!updated) {
          toast.error('Edit failed');
          return;
        }
        updatedTasks = tasks.map(t => (t.id === updated.id ? updated : t));
        toast.success('Tasks edited successfully');
      } else {
        const created = await createTask(task);
        if (!created) {
          toast.error('Submission failed');
          return;
        }
        updatedTasks = [created, ...tasks];
        toast.success('New task created');
      }
      setTasks(updatedTasks);
      setEditingTask(undefined);
    } catch (err) {
      console.error('Failed to save task:', err);
      toast.error('Failed to save task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteTask(id);
      if (!success) {
        toast.error('Delete failed');
        return;
      }
      const updated = tasks.filter(t => t.id !== id);
      setTasks(updated);
      toast.success('Task deleted');
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (!task || typeof task.title !== 'string') return false;

    const statusMatch = statusFilter ? task.status === statusFilter : true;
    const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tasks list</h1>

      <TaskForm onSubmit={handleAddOrEdit} editingTask={editingTask} />

      <TaskFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onEdit={setEditingTask}
        />
      ))}
    </div>
  );
}
