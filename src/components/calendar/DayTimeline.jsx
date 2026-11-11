import { EVENT_TYPES } from '../../data/constants.js';
import { formatDayTitle } from '../../utils/date.js';
import EmptyState from '../ui/EmptyState.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import EventCard from './EventCard.jsx';
import { cn } from '../../utils/cn.js';

export default function DayTimeline({ date, events, onEdit, onAdd, onToday, isToday }) {
  const sorted = [...events].sort((a, b) => (a.start ?? '').localeCompare(b.start ?? ''));

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between gap-space-sm">
        <div className="flex min-w-0 flex-wrap items-center gap-space-sm">
          <h3 className="text-headline-sm text-on-surface">{formatDayTitle(date)}</h3>
          <span className="rounded-full bg-secondary-container px-space-sm py-0.5 text-label-sm text-on-secondary-container">
            {events.length} {events.length === 1 ? 'Event' : 'Events'}
          </span>
        </div>
        <button
          type="button"
          onClick={onToday}
          aria-current={isToday ? 'date' : undefined}
          className="shrink-0 text-label-md text-outline transition-colors hover:text-primary-ink"
        >
          Today
        </button>
      </div>

      {sorted.length ? (
        <div className="relative flex flex-col gap-space-md pl-4 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-[2px] before:bg-surface-container-high">
          {sorted.map((event) => (
            <div key={event.id} className="relative flex items-start gap-space-md">
              <div
                className={cn(
                  'absolute -left-4 h-3.5 w-3.5 rounded-full ring-4 ring-surface',
                  EVENT_TYPES[event.type]?.dot ?? 'bg-primary-container',
                )}
              />
              <EventCard event={event} onEdit={onEdit} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="event_busy"
          title="Nothing scheduled"
          description="This day is wide open. Add an event to plan it."
          action={
            <Button size="sm" onClick={onAdd}>
              <Icon name="add" size={18} />
              Add event
            </Button>
          }
        />
      )}
    </div>
  );
}
