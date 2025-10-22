import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AppLayout() {
  return (
   <div className="min-h-screen w-screen transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Outlet />
    </div>
  );
}




















