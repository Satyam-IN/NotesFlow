import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { cn } from '../../utils/cn.js';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/tasks', label: 'Tasks', icon: 'task_alt' },
  { to: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { to: '/notes', label: 'Notes', icon: 'description' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
];

export default function BottomNav() {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 bg-surface/90 shadow-header backdrop-blur-xl lg:hidden">
      <div className="flex h-20 items-center justify-around px-space-xs">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex h-16 w-16 flex-col items-center justify-center gap-space-xs transition-all',
                isActive
                  ? 'text-primary-ink'
                  : 'text-on-surface-variant hover:text-on-surface',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} size={24} filled={isActive} />
                <span className={cn('text-label-sm', isActive && 'font-bold')}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
