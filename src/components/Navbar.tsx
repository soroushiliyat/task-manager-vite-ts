import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded transition ${
      isActive ? 'bg-white text-purple-700 font-bold' : 'text-white hover:bg-white/20'
    }`;

  return (
    <nav className="bg-purple-800 text-white px-4 py-3 shadow flex justify-between items-center">
      <div className="flex gap-4">
        <NavLink to="/" className={linkClass}>
          داشبورد
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
          تسک‌ها
        </NavLink>
      </div>
      <button
        onClick={toggleTheme}
        className="bg-white text-purple-700 px-3 py-1 rounded text-sm font-semibold"
      >
        تغییر تم ({theme === 'dark' ? 'تاریک' : 'روشن'})
      </button>
    </nav>
  );
}