import { cn } from '../../utils/cn.js';

/** Two-up segmented switch with the sliding indicator from the Stitch auth card. */
export default function AuthTabs({ mode, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Authentication mode"
      className="relative mb-space-lg flex rounded-lg bg-surface-container p-1"
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-md bg-surface-container-lowest shadow-sm transition-transform duration-300 ease-out',
          mode === 'signup' && 'translate-x-full',
        )}
      />
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'login'}
        onClick={() => onChange('login')}
        className={cn(
          'relative z-10 flex-1 py-2 text-label-md transition-colors duration-200',
          mode === 'login' ? 'text-primary-ink' : 'text-on-surface-variant',
        )}
      >
        Sign In
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'signup'}
        onClick={() => onChange('signup')}
        className={cn(
          'relative z-10 flex-1 py-2 text-label-md transition-colors duration-200',
          mode === 'signup' ? 'text-primary-ink' : 'text-on-surface-variant',
        )}
      >
        Create Account
      </button>
    </div>
  );
}
