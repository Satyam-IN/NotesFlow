import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { cn } from '../../utils/cn.js';

export default function DropdownMenu({ items, label = 'More options', icon = 'more_vert' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-container hover:text-on-surface',
          open ? 'bg-surface-container text-on-surface' : 'text-outline',
        )}
      >
        <Icon name={icon} size={20} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-9 z-30 w-44 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-1 shadow-ambient-lg"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
                item.onClick?.();
              }}
              className={cn(
                'flex w-full items-center gap-space-sm rounded-lg px-space-sm py-2 text-left text-body-sm transition-colors hover:bg-surface-container',
                item.danger ? 'text-error' : 'text-on-surface',
              )}
            >
              {item.icon ? <Icon name={item.icon} size={18} /> : null}
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
