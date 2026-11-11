import { useMemo } from 'react';
import { EVENT_TYPES } from '../../data/constants.js';
import {
  WEEKDAY_INITIALS,
  formatFullDate,
  getMonthMatrix,
  isSameDay,
  toISODate,
} from '../../utils/date.js';
import { cn } from '../../utils/cn.js';

export default function MonthGrid({ monthDate, selectedDate, events, onSelect }) {
  const cells = useMemo(
    () => getMonthMatrix(monthDate.getFullYear(), monthDate.getMonth()),
    [monthDate],
  );

  const typesByDate = useMemo(() => {
    const map = new Map();
    events.forEach((event) => {
      const list = map.get(event.date) ?? [];
      if (!list.includes(event.type)) list.push(event.type);
      map.set(event.date, list);
    });
    return map;
  }, [events]);

  return (
    <div className="rounded-xl bg-surface-container-low p-space-md shadow-ambient">
      <div className="mb-space-sm grid grid-cols-7 text-center">
        {WEEKDAY_INITIALS.map((initial, index) => (
          <span key={`${initial}-${index}`} className="text-label-sm text-outline">
            {initial}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {cells.map(({ date, inMonth }) => {
          const selected = isSameDay(date, selectedDate);
          const types = (typesByDate.get(toISODate(date)) ?? []).slice(0, 3);
          const eventCount = typesByDate.get(toISODate(date))?.length ?? 0;

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelect(date)}
              aria-pressed={selected}
              aria-label={`${formatFullDate(date)}${eventCount ? `, ${eventCount} events` : ''}`}
              className={cn(
                'relative flex h-10 flex-col items-center justify-center rounded-lg text-body-sm transition-all',
                selected
                  ? 'scale-105 bg-primary text-on-primary shadow-sm'
                  : inMonth
                    ? 'text-on-surface hover:bg-surface-container'
                    : 'text-outline/40 hover:bg-surface-container',
              )}
            >
              <span>{date.getDate()}</span>
              {types.length ? (
                <span className="absolute bottom-1 flex gap-0.5">
                  {types.map((type) => (
                    <span
                      key={type}
                      className={cn(
                        'h-1 w-1 rounded-full',
                        selected ? 'bg-on-primary' : (EVENT_TYPES[type]?.dot ?? 'bg-primary'),
                      )}
                    />
                  ))}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
