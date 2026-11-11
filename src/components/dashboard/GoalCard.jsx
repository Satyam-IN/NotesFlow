import Icon from '../ui/Icon.jsx';
import ProgressRing from '../ui/ProgressRing.jsx';

export default function GoalCard({ stats, onViewAnalytics }) {
  const remaining = Math.max(0, stats.pending);
  const momentum = !stats.total
    ? 'Ready when you are'
    : remaining === 0
      ? 'Everything is complete'
      : stats.completionRate >= 75
        ? 'Momentum is high'
        : stats.completionRate >= 40
          ? 'Momentum is building'
          : 'One task at a time';
  const progressCopy = !stats.total
    ? 'Add your first task to start tracking your progress.'
    : remaining === 0
      ? 'All tasks complete — beautiful work.'
      : `You’re crushing it! Just ${remaining} ${remaining === 1 ? 'task' : 'tasks'} left to hit peak productivity.`;

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-space-lg text-on-primary shadow-xl">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-surface-tint/20 blur-2xl" />

      <div className="z-10 flex items-start justify-between gap-space-md">
        <div className="flex flex-col">
          <span className="text-label-md uppercase tracking-wider text-on-primary/80">Overall Progress</span>
          <h2 className="mt-space-xs text-headline-sm text-on-primary">
            {stats.completionRate}% Completed
          </h2>
          <p className="mt-1 text-body-sm text-on-primary/80">{progressCopy}</p>
        </div>
        <ProgressRing value={stats.completionRate} />
      </div>

      <div className="z-10 mt-space-lg flex items-center justify-between gap-space-sm border-t border-on-primary/10 pt-space-md">
        <span className="flex items-center gap-space-xs text-body-sm text-on-primary/90">
          <Icon name="bolt" size={16} />
          {momentum}
        </span>
        <button
          type="button"
          onClick={onViewAnalytics}
          className="rounded-lg bg-on-primary px-space-md py-space-xs text-label-md font-bold text-primary shadow-sm transition-all hover:bg-surface"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
