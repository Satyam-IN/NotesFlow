import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useApp } from './store/AppProvider.jsx';
import AppShell from './components/layout/AppShell.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function RequireAuth({ children }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
