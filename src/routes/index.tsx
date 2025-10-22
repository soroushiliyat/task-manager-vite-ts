import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import DashboardPage from '../features/dashboard/DoshboardPage';
import TaskListPage from '../features/tasks/pages/TaskListPage';
import NotFoundPage from '../pages/NotFoundPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'tasks', element: <TaskListPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);