import { useApp } from '../store/AppProvider.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import GoalCard from '../components/dashboard/GoalCard.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import ScheduleList from '../components/dashboard/ScheduleList.jsx';
import Icon from '../components/ui/Icon.jsx';
import { formatDuration, formatLongDay, getGreeting } from '../utils/date.js';

export default function DashboardPage() {
  const { user, taskStats, focusStats, openComposer } = useApp();
  const firstName = user.name.split(' ')[0];
  const greeting = getGreeting();

  return (
    <div className="flex flex-col gap-space-lg pb-space-xl">
      <PageHeader title="Dashboard" description={formatLongDay(new Date())}>
        <button
          type="button"
          onClick={() => openComposer('task')}
          className="flex h-10 items-center gap-space-sm rounded-lg bg-primary px-space-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-surface-tint"
        >
          <Icon name="add_task" size={18} />
          New Task
        </button>
      </PageHeader>

      <div className="grid gap-space-lg lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-space-lg lg:col-span-7">
          <div className="flex items-center justify-between gap-space-sm pt-space-md lg:pt-0">
            <div className="flex min-w-0 flex-col">
              <span className="text-label-md font-semibold uppercase tracking-wider text-primary-ink">
                Today&apos;s Focus
              </span>
              <h1 className="text-headline-md text-on-surface">
                {greeting}, {firstName}
              </h1>
            </div>
            <div className="shrink-0 rounded-full bg-surface-container-high px-space-md py-space-xs">
              <span className="whitespace-nowrap text-label-md font-semibold text-on-surface">
                {taskStats.streak} day streak
              </span>
            </div>
          </div>

          <GoalCard stats={taskStats} onViewAnalytics={() => openComposer('analytics')} />

          <div className="grid grid-cols-3 gap-space-md">
            <StatCard
              icon="task_alt"
              value={`${taskStats.completed}/${taskStats.total}`}
              label="Tasks Done"
              tone="secondary"
            />
            <StatCard
              icon="schedule"
              value={formatDuration(focusStats.todayMinutes)}
              label="Focus Time"
              tone="tertiary"
            />
            <StatCard
              icon="trending_up"
              value={`${taskStats.completionRate}%`}
              label="Efficiency"
              tone="primary"
            />
          </div>

          <div className="no-scrollbar flex items-center gap-space-md overflow-x-auto pb-space-xs">
            <button
              type="button"
              onClick={() => openComposer('task')}
              className="flex shrink-0 items-center gap-space-sm rounded-xl bg-primary px-space-lg py-space-md text-label-md font-semibold text-on-primary shadow-md transition-all hover:bg-surface-tint"
            >
              <Icon name="add_task" size={18} />
              New Task
            </button>
            <button
              type="button"
              onClick={() => openComposer('focus')}
              className="flex shrink-0 items-center gap-space-sm rounded-xl bg-surface-container-high px-space-lg py-space-md text-label-md font-semibold text-on-surface shadow-sm transition-all hover:bg-surface-variant"
            >
              <Icon name="timer" size={18} />
              Start Focus
            </button>
            <button
              type="button"
              onClick={() => openComposer('note')}
              className="flex shrink-0 items-center gap-space-sm rounded-xl bg-surface-container-high px-space-lg py-space-md text-label-md font-semibold text-on-surface shadow-sm transition-all hover:bg-surface-variant"
            >
              <Icon name="edit_note" size={18} />
              Quick Note
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ScheduleList />
        </div>
      </div>
    </div>
  );
}
