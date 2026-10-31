import Icon from './Icon.jsx';
import { cn } from '../../utils/cn.js';

/** Mobile-only floating action button, matching the Stitch FAB placement. */
export default function Fab({ icon = 'add', label, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'fixed bottom-24 right-space-md z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-fab transition-all hover:scale-105 active:scale-95 lg:hidden',
        className,
      )}
    >
      <Icon name={icon} size={28} />
    </button>
  );
}
