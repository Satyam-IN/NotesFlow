import Icon from '../ui/Icon.jsx';
import ProgressRing from '../ui/ProgressRing.jsx';

export default function GoalCard({ analytics, onViewAnalytics }) {
  const remaining = Math.max(0, analytics.tasksTotal - analytics.tasksDone);

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-primary p-space-lg text-on-primary shadow-xl">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-surface-tint/20 blur-2xl" />

      <div className="z-10 flex items-start justify-between gap-space-md">
        <div className="flex flex-col">
          <span className="text-label-md uppercase tracking-wider text-on-primary/80">Daily Goal</span>
          <h2 className="mt-space-xs text-headline-sm text-on-primary">
            {analytics.dailyGoal}% Completed
          </h2>
          <p className="mt-1 text-body-sm text-on-primary/80">
            You’re crushing it! Just {remaining} tasks left to hit peak productivity.
          </p>
        </div>
        <ProgressRing value={analytics.dailyGoal} />
      </div>

      <div className="z-10 mt-space-lg flex items-center justify-between gap-space-sm border-t border-on-primary/10 pt-space-md">
        <span className="flex items-center gap-space-xs text-body-sm text-on-primary/90">
          <Icon name="bolt" size={16} />
          Momentum is high
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
