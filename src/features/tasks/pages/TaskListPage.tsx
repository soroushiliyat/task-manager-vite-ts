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
        console.log('تسک‌های دریافتی:', data);
        setTasks(data);
      })
      .catch(() => toast.error('خطا در دریافت تسک‌ها از سرور'));
  }, []);

  const handleAddOrEdit = async (task: Task) => {
    try {
      let updatedTasks;
      if (editingTask) {
        const updated = await updateTask(task);
        if (!updated) {
          toast.error('ویرایش ناموفق');
          return;
        }
        updatedTasks = tasks.map(t => (t.id === updated.id ? updated : t));
        toast.success('تسک با موفقیت ویرایش شد');
      } else {
        const created = await createTask(task);
        if (!created) {
          toast.error('ثبت ناموفق');
          return;
        }
        updatedTasks = [created, ...tasks];
        toast.success('تسک جدید ثبت شد');
      }
      setTasks(updatedTasks);
      setEditingTask(undefined);
    } catch (err) {
      console.error('خطا در ذخیره تسک:', err);
      toast.error('خطا در ذخیره تسک');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteTask(id);
      if (!success) {
        toast.error('حذف ناموفق');
        return;
      }
      const updated = tasks.filter(t => t.id !== id);
      setTasks(updated);
      toast.success('تسک حذف شد');
    } catch (err) {
      console.error('خطا در حذف تسک:', err);
      toast.error('خطا در حذف تسک');
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
      <h1 className="text-3xl font-bold mb-6 text-center">لیست تسک‌ها</h1>

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