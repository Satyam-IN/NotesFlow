import Icon from './Icon.jsx';
import { cn } from '../../utils/cn.js';

export default function EmptyState({ icon = 'celebration', title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-space-sm px-space-md py-space-xl text-center',
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-outline">
        <Icon name={icon} size={32} />
      </div>
      <span className="text-body-lg font-semibold text-on-surface">{title}</span>
      {description ? (
        <span className="max-w-xs text-body-sm text-on-surface-variant">{description}</span>
      ) : null}
      {action}
    </div>
  );
}
