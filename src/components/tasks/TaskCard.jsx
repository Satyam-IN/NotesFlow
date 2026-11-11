import Card from '../ui/Card.jsx';
import Chip from '../ui/Chip.jsx';
import Icon from '../ui/Icon.jsx';
import { PRIORITY_TONE, tagTone } from '../../data/constants.js';
import { formatCompletedLabel, formatDueLabel } from '../../utils/date.js';
import { cn } from '../../utils/cn.js';

export default function TaskCard({ task, status, onToggle, onEdit }) {
  const completed = status === 'completed';
  const overdue = status === 'overdue';

  const metaIcon = completed ? 'done_all' : overdue ? 'warning' : 'calendar_today';
  const metaLabel = completed
    ? formatCompletedLabel(task.completedAt)
    : formatDueLabel(task.dueDate, task.dueTime);

  return (
    <Card
      tone="lowest"
      className={cn(
        'flex flex-col gap-space-sm p-space-md transition-all hover:-translate-y-0.5 hover:shadow-ambient-lg',
        completed && 'opacity-75',
      )}
    >
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex min-w-0 flex-1 items-start gap-space-sm">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(task.id)}
            aria-label={completed ? `Reopen ${task.title}` : `Complete ${task.title}`}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-primary"
          />
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="flex min-w-0 flex-col items-start text-left"
            title="Edit task"
          >
            <span
              className={cn(
                'w-full truncate font-body-lg font-medium text-on-surface',
                completed && 'line-through',
              )}
            >
              {task.title}
            </span>
            {task.description ? (
              <span className="line-clamp-1 font-body-sm text-on-surface-variant">
                {task.description}
              </span>
            ) : null}
          </button>
        </div>
        <Chip tone={PRIORITY_TONE[task.priority] ?? 'neutral'}>{task.priority}</Chip>
      </div>

      <div className="flex items-center justify-between gap-space-sm pt-space-xs">
        <div
          className={cn(
            'flex min-w-0 items-center gap-space-xs',
            overdue ? 'text-error' : 'text-on-surface-variant',
          )}
        >
          <Icon name={metaIcon} size={16} />
          <span className={cn('font-label-md leading-tight', overdue && 'font-bold')}>
            {metaLabel}
          </span>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-space-xs">
          {!completed &&
            task.tags?.map((tag) => (
              <Chip key={tag} tone={tagTone(tag)}>
                {tag}
              </Chip>
            ))}
          {overdue ? (
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="rounded-full bg-primary px-space-sm py-space-xs font-label-sm text-on-primary transition-opacity hover:opacity-90"
            >
              Reschedule
            </button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
