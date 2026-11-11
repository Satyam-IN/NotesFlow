import { cn } from '../../utils/cn.js';

export default function Switch({ checked, onChange, label, className }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-surface-container-highest',
        className,
      )}
    >
      <span
        className={cn(
          'h-5 w-5 rounded-full border bg-white shadow-sm transition-transform dark:bg-surface-container-lowest',
          checked
            ? 'translate-x-[22px] border-transparent'
            : 'translate-x-0.5 border-gray-300 dark:border-transparent',
        )}
      />
    </button>
  );
}
