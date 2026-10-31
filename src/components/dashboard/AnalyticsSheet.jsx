import { useApp } from '../../store/AppProvider.jsx';
import Sheet from '../ui/Sheet.jsx';
import Chip from '../ui/Chip.jsx';
import { formatDuration } from '../../utils/date.js';
import { cn } from '../../utils/cn.js';

export default function AnalyticsSheet({ onClose }) {
  const { prefs } = useApp();
  const { analytics } = prefs;
  const peak = Math.max(...analytics.week.map((day) => day.minutes), 1);
  const weekTotal = analytics.week.reduce((total, day) => total + day.minutes, 0);

  return (
    <Sheet
      open
      onClose={onClose}
      icon="insights"
      title="Productivity analytics"
      subtitle="Focus time across the last seven days"
    >
      <div className="grid grid-cols-3 gap-space-sm">
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Tasks done</p>
          <p className="text-headline-sm text-on-surface">
            {analytics.tasksDone}/{analytics.tasksTotal}
          </p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Focus time</p>
          <p className="text-headline-sm text-on-surface">
            {formatDuration(analytics.focusMinutes)}
          </p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Efficiency</p>
          <p className="text-headline-sm text-on-surface">{analytics.efficiency}%</p>
        </div>
      </div>

      <div className="rounded-xl border border-outline-variant/40 p-space-md">
        <div className="mb-space-sm flex items-center justify-between">
          <span className="font-label-md font-semibold text-on-surface">This week</span>
          <Chip tone="primary">{formatDuration(weekTotal)} total</Chip>
        </div>
        <div className="flex h-36 items-end gap-space-xs">
          {analytics.week.map((day) => {
            const isPeak = day.minutes === peak;
            return (
              <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-space-xs">
                <div className="flex w-full flex-1 items-end">
                  <div
                    title={`${day.day}: ${formatDuration(day.minutes)}`}
                    className={cn(
                      'w-full rounded-t-md transition-all',
                      isPeak ? 'bg-primary' : 'bg-primary-fixed',
                    )}
                    style={{ height: `${Math.max(6, (day.minutes / peak) * 100)}%` }}
                  />
                </div>
                <span className="font-label-sm text-outline">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-label-sm text-on-surface-variant">
        Analytics are demo data derived from your focus sessions.
      </p>
    </Sheet>
  );
}
