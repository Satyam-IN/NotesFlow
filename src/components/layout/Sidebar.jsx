import { NavLink, useNavigate } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg';
import logo from '../../assets/notesflow-icon.png';
import { useApp } from '../../store/AppProvider.jsx';
import Icon from '../ui/Icon.jsx';
import { NAV_ITEMS } from './BottomNav.jsx';
import { cn } from '../../utils/cn.js';

/** Desktop navigation. The Stitch export is mobile-only; this is the additive desktop shell. */
export default function Sidebar() {
  const { user, prefs, openComposer, signOut } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sticky top-0 hidden h-dvh w-[264px] shrink-0 flex-col gap-space-lg border-r border-outline-variant/40 bg-surface-container-lowest/70 px-space-md py-space-lg backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-space-sm px-space-sm">
        <img
          src={logo}
          alt="NotesFlow logo"
          className="h-9 w-9 rounded-xl object-contain"
        />
        <div className="flex flex-col">
          <span className="text-headline-sm tracking-tight text-on-surface">
            Notes<span className="text-primary-ink">Flow</span>
          </span>
          <span className="font-label-sm uppercase tracking-wider text-outline">Productivity suite</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => openComposer('task')}
        className="flex h-11 items-center justify-center gap-space-sm rounded-lg bg-primary px-space-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-surface-tint active:scale-[0.99]"
      >
        <Icon name="add_task" size={18} />
        New Task
      </button>

      <div className="flex flex-col gap-space-xs">
        <span className="px-space-sm pb-1 font-label-sm uppercase tracking-wider text-outline">
          Menu
        </span>
        <nav aria-label="Primary" className="flex flex-col gap-space-xs">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex h-11 items-center gap-space-sm rounded-lg px-space-sm font-label-md transition-colors',
                  isActive
                    ? 'bg-primary-fixed font-semibold text-on-primary-fixed'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={item.icon} size={20} filled={isActive} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm rounded-xl bg-surface-container-low p-space-sm">
          <Icon name="local_fire_department" size={20} filled className="text-primary-ink" />
          <div className="flex flex-col">
            <span className="font-label-md font-semibold text-on-surface">
              {prefs.analytics.streak} day streak
            </span>
            <span className="font-label-sm text-on-surface-variant">
              {prefs.analytics.dailyGoal}% of daily goal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm border-t border-outline-variant/40 pt-space-md">
          <img
            src={user.avatar || avatar}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-body-md font-medium text-on-surface">{user.name}</span>
            <span className="truncate font-label-sm text-on-surface-variant">{user.email}</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-outline transition-colors hover:bg-surface-container hover:text-error"
          >
            <Icon name="logout" size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
