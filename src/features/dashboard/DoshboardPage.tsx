import { useEffect, useState } from 'react';
import { fetchTasks } from '../tasks/api';
import { type Task } from '../tasks/types';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks()
      .then(data => {
        console.log('تسک‌های داشبورد:', data);
        setTasks(data);
      })
      .catch(() => console.error('خطا در دریافت تسک‌ها برای داشبورد'));
  }, []);

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
  داشبورد تسک‌ها
</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="کل تسک‌ها" value={total} color="bg-gray-700" />
        <StatCard label="در انتظار" value={pending} color="bg-yellow-600" />
        <StatCard label="در حال انجام" value={inProgress} color="bg-blue-600" />
        <StatCard label="انجام شده" value={completed} color="bg-green-600" />
      </div>

      
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded p-4 text-center ${color}`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}