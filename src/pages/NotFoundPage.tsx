import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-5xl font-bold mb-4">Not found page😢</h1>
      <Link
        to="/"
        className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
      >
        Back To Dashboard
      </Link>
    </div>
  );
}
