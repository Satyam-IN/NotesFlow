import Icon from '../ui/Icon.jsx';
import { EVENT_TYPES } from '../../data/constants.js';
import { formatEventTime } from '../../utils/date.js';
import { cn } from '../../utils/cn.js';

const ATTENDEE_TONES = [
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-fixed text-on-tertiary-fixed',
];

export default function EventCard({ event, onEdit }) {
  const config = EVENT_TYPES[event.type] ?? EVENT_TYPES.meeting;
  const hasAttendees = Boolean(event.attendees?.length);
  const hasFooter = hasAttendees || Boolean(event.project);

  return (
    <button
      type="button"
      onClick={() => onEdit(event)}
      title="Edit event"
      className="w-full rounded-xl bg-surface-container-low p-space-md text-left shadow-ambient transition-all hover:bg-surface-container"
    >
      <div className="mb-space-xs flex items-center justify-between gap-space-sm">
        <span className={cn('text-label-sm font-semibold', config.time)}>
          {formatEventTime(event)}
        </span>
        <span className={cn('shrink-0 rounded px-space-xs py-0.5 text-label-sm', config.badge)}>
          {config.label}
        </span>
      </div>

      <h4 className="mb-space-xs font-body-lg font-medium text-on-surface">{event.title}</h4>
      {event.description ? (
        <p className={cn('text-body-sm text-on-surface-variant', hasFooter && 'mb-space-md')}>
          {event.description}
        </p>
      ) : null}

      {hasAttendees ? (
        <div className="flex items-center gap-2">
          {event.attendees.slice(0, 3).map((initials, index) => (
            <div
              key={`${initials}-${index}`}
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full text-label-sm',
                ATTENDEE_TONES[index % ATTENDEE_TONES.length],
              )}
            >
              {initials}
            </div>
          ))}
          {event.extraAttendees > 0 ? (
            <span className="text-label-sm text-outline">+{event.extraAttendees} others</span>
          ) : null}
        </div>
      ) : null}

      {event.project ? (
        <div className="flex items-center gap-1 text-label-md text-outline">
          <Icon name="task_alt" size={16} />
          <span>{event.project}</span>
        </div>
      ) : null}
    </button>
  );
}
