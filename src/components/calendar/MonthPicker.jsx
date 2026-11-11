import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { formatMonthYear, monthLabel } from '../../utils/date.js';
import { cn } from '../../utils/cn.js';

/** Month title + year/month popover, replacing the Stitch placeholder chevron. */
export default function MonthPicker({ monthDate, onSelect }) {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(monthDate.getFullYear());
  const containerRef = useRef(null);

  useEffect(() => {
    if (open) setYear(monthDate.getFullYear());
  }, [open, monthDate]);

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
    <div ref={containerRef} className="relative flex items-center gap-space-sm">
      <h2 className="text-headline-md text-on-surface">{formatMonthYear(monthDate)}</h2>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Choose month and year"
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest"
      >
        <Icon name="expand_more" size={18} />
      </button>

      {open ? (
        <div className="absolute left-0 top-11 z-40 w-[264px] rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-3 shadow-ambient-lg">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setYear((value) => value - 1)}
              aria-label="Previous year"
              className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container"
            >
              <Icon name="chevron_left" size={18} />
            </button>
            <span className="font-label-md font-semibold text-on-surface">{year}</span>
            <button
              type="button"
              onClick={() => setYear((value) => value + 1)}
              aria-label="Next year"
              className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container"
            >
              <Icon name="chevron_right" size={18} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }, (_, index) => {
              const active =
                year === monthDate.getFullYear() && index === monthDate.getMonth();
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onSelect(new Date(year, index, 1));
                    setOpen(false);
                  }}
                  className={cn(
                    'h-9 rounded-lg font-label-md transition-colors',
                    active
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container',
                  )}
                >
                  {monthLabel(index).slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
