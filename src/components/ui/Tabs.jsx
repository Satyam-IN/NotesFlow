import Icon from './Icon.jsx';
import { cn } from '../../utils/cn.js';

/** Pill segmented control used for task filters and event types. */
export default function Tabs({ items, value, onChange, className, ariaLabel }) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn('flex gap-space-xs', className)}>
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              'flex items-center gap-space-xs whitespace-nowrap rounded-full px-space-md py-space-sm font-label-md transition-all',
              active
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high',
            )}
          >
            {item.icon ? <Icon name={item.icon} size={18} filled={active} /> : null}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
