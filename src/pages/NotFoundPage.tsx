import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-5xl font-bold mb-4">صفحه پیدا نشد 😢</h1>
      <p className="text-lg mb-6">مسیر وارد شده وجود ندارد یا حذف شده است.</p>
      <Link
        to="/"
        className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
      >
        بازگشت به داشبورد
      </Link>
    </div>
  );
}