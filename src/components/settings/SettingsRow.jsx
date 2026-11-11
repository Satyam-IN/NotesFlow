import Icon from '../ui/Icon.jsx';
import { cn } from '../../utils/cn.js';

export default function SettingsRow({ title, subtitle, onClick, tone = 'default' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-space-sm rounded-lg p-space-sm text-left transition-all hover:bg-surface-container"
    >
      <span className="flex min-w-0 flex-col">
        <span className="font-body-md font-medium text-on-surface">{title}</span>
        <span
          className={cn(
            'font-body-sm',
            tone === 'success'
              ? 'font-medium text-tertiary'
              : 'text-on-surface-variant',
          )}
        >
          {subtitle}
        </span>
      </span>
      <Icon
        name="chevron_right"
        size={20}
        className="shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
