import { useMemo, useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import Sheet from '../ui/Sheet.jsx';
import Chip from '../ui/Chip.jsx';
import Icon from '../ui/Icon.jsx';
import {
  addDays,
  formatDuration,
  formatShortDate,
  isSameDay,
  parseISODate,
  toISODate,
} from '../../utils/date.js';
import { buildProductivityRange, sumRange } from '../../utils/analytics.js';
import { cn } from '../../utils/cn.js';

const RANGE_DAYS = 7;

const trendTone = (value) => (value > 0 ? 'primary' : value < 0 ? 'error' : 'neutral');
const trendLabel = (value, unit) =>
  value === 0 ? `0 ${unit}` : `${value > 0 ? '+' : '-'}${Math.abs(value)} ${unit}`;

export default function AnalyticsSheet({ onClose }) {
  const { taskStats, focusStats, tasks, focusSessions } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);

  const endIso = toISODate(addDays(new Date(), -weekOffset * RANGE_DAYS));
  const previousEndIso = toISODate(addDays(new Date(), -(weekOffset + 1) * RANGE_DAYS));

  const days = useMemo(
    () => buildProductivityRange(tasks, focusSessions, parseISODate(endIso), RANGE_DAYS),
    [tasks, focusSessions, endIso],
  );
  const previousDays = useMemo(
    () => buildProductivityRange(tasks, focusSessions, parseISODate(previousEndIso), RANGE_DAYS),
    [tasks, focusSessions, previousEndIso],
  );

  const totals = sumRange(days);
  const previousTotals = sumRange(previousDays);
  const peak = Math.max(...days.map((day) => day.focusMinutes), 0);
  const rangeLabel = `${formatShortDate(days[0].date)} – ${formatShortDate(days[6].date)}`;
  const hasActivity = totals.created + totals.completed + totals.focusMinutes > 0;

  return (
    <Sheet
      open
      onClose={onClose}
      icon="insights"
      title="Productivity analytics"
      subtitle="Your real task and focus activity, computed live"
    >
      <div className="grid grid-cols-3 gap-space-sm">
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Tasks done</p>
          <p className="text-headline-sm text-on-surface">
            {taskStats.completed}/{taskStats.total}
          </p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Completion</p>
          <p className="text-headline-sm text-on-surface">{taskStats.completionRate}%</p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Focus today</p>
          <p className="text-headline-sm text-on-surface">{formatDuration(focusStats.todayMinutes)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-space-sm">
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Done today</p>
          <p className="text-headline-sm text-on-surface">{taskStats.daily}</p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Done this week</p>
          <p className="text-headline-sm text-on-surface">{taskStats.weekly}</p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="font-label-sm text-on-surface-variant">Focus this week</p>
          <p className="text-headline-sm text-on-surface">{formatDuration(focusStats.weekMinutes)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-outline-variant/40 p-space-md">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-label-md font-semibold text-on-surface">
                {weekOffset === 0 ? 'Last 7 days' : '7-day history'}
              </span>
              <Chip tone="primary" size="sm">
                {formatDuration(totals.focusMinutes)} focus
              </Chip>
            </div>
            <p className="mt-space-xs text-label-sm text-outline">{rangeLabel}</p>
          </div>
          <div className="flex shrink-0 items-center gap-space-xs">
            <button
              type="button"
              aria-label="Earlier seven days"
              onClick={() => setWeekOffset((value) => value + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest"
            >
              <Icon name="chevron_left" size={18} />
            </button>
            <button
              type="button"
              aria-label="Later seven days"
              onClick={() => setWeekOffset((value) => Math.max(0, value - 1))}
              disabled={weekOffset === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="chevron_right" size={18} />
            </button>
          </div>
        </div>

        <div className="mt-space-sm flex h-36 items-end gap-space-xs border-b border-outline-variant/40">
          {days.map((day) => {
            const isToday = isSameDay(day.date, new Date());
            const isPeak = peak > 0 && day.focusMinutes === peak;
            return (
              <div
                key={day.iso}
                className="flex h-full flex-1 flex-col items-center justify-end gap-space-xs"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    title={`${day.weekday}: ${formatDuration(day.focusMinutes)} focus · ${day.completed} completed`}
                    className={cn(
                      'w-full rounded-t-md transition-all',
                      isPeak ? 'bg-primary' : 'bg-primary-fixed',
                    )}
                    style={{ height: `${peak ? (day.focusMinutes / peak) * 100 : 0}%` }}
                  />
                </div>
                <span
                  className={cn(
                    'font-label-sm',
                    isToday ? 'font-semibold text-primary-ink' : 'text-outline',
                  )}
                >
                  {day.weekday}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-space-sm flex flex-wrap items-center gap-space-xs">
          <Chip tone={trendTone(totals.completed - previousTotals.completed)} size="sm">
            {trendLabel(totals.completed - previousTotals.completed, 'tasks')}
          </Chip>
          <Chip tone={trendTone(totals.focusMinutes - previousTotals.focusMinutes)} size="sm">
            {trendLabel(totals.focusMinutes - previousTotals.focusMinutes, 'min focus')}
          </Chip>
          <span className="text-label-sm text-outline">vs previous 7 days</span>
        </div>

        {!hasActivity ? (
          <p className="mt-space-sm rounded-lg bg-surface-container-low p-space-sm text-label-sm text-on-surface-variant">
            No tasks or focus sessions recorded in this range yet. Days without activity stay at
            zero.
          </p>
        ) : null}
      </div>

      <div className="rounded-xl border border-outline-variant/40 p-space-md">
        <div className="mb-space-sm flex items-center justify-between gap-space-sm">
          <span className="font-label-md font-semibold text-on-surface">Daily breakdown</span>
          <Chip tone="neutral" size="sm">
            {totals.created} created
          </Chip>
        </div>
        <table className="w-full text-label-sm">
          <thead>
            <tr className="text-on-surface-variant">
              <th className="pb-space-xs text-left font-semibold">Day</th>
              <th className="pb-space-xs text-right font-semibold">Created</th>
              <th className="pb-space-xs text-right font-semibold">Done</th>
              <th className="pb-space-xs text-right font-semibold">Pending</th>
              <th className="pb-space-xs text-right font-semibold">Focus</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const isToday = isSameDay(day.date, new Date());
              return (
                <tr key={day.iso} className="border-t border-outline-variant/30">
                  <td
                    className={cn(
                      'py-space-xs text-left tabular-nums',
                      isToday ? 'font-semibold text-primary-ink' : 'text-on-surface',
                    )}
                  >
                    {day.weekday} {day.date.getDate()}
                  </td>
                  <td className="py-space-xs text-right tabular-nums text-on-surface-variant">
                    {day.created}
                  </td>
                  <td className="py-space-xs text-right tabular-nums text-on-surface-variant">
                    {day.completed}
                  </td>
                  <td className="py-space-xs text-right tabular-nums text-on-surface-variant">
                    {day.pending}
                  </td>
                  <td className="py-space-xs text-right tabular-nums text-on-surface-variant">
                    {formatDuration(day.focusMinutes)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-label-sm text-on-surface-variant">
        Every figure is derived from your task list and saved focus sessions. Each day is calculated
        separately — no activity means zero, and nothing is carried over from another day.
      </p>
    </Sheet>
  );
}
