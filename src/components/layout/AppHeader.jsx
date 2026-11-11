import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/notesflow-icon.png';
import Icon from '../ui/Icon.jsx';

const TITLES = {
  '/': 'Dashboard',
  '/tasks': 'Tasks',
  '/calendar': 'Calendar',
  '/notes': 'Notes',
  '/settings': 'Settings',
};

/** Fixed, translucent mobile app bar — matches the Stitch header on every screen. */
export default function AppHeader() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? 'NotesFlow';

  return (
    <header className="pt-safe fixed inset-x-0 top-0 z-50 bg-surface/80 shadow-header backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center justify-between px-space-md">
        <div className="flex min-w-0 items-center gap-space-sm">
          <img
            src={logo}
            alt="NotesFlow"
            className="h-8 w-8 shrink-0 rounded-lg object-contain"
          />
          <span className="truncate text-body-lg font-medium tracking-tight text-on-surface">
            {title}
          </span>
        </div>
        <Link
          to="/settings"
          aria-label="Open profile settings"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-opacity hover:opacity-90"
        >
          <Icon name="person" size={18} />
        </Link>
      </div>
    </header>
  );
}
