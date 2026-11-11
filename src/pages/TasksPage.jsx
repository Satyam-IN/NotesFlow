import { useMemo, useState } from 'react';
import { useApp } from '../store/AppProvider.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import TaskCard from '../components/tasks/TaskCard.jsx';
import Tabs from '../components/ui/Tabs.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import Fab from '../components/ui/Fab.jsx';
import Icon from '../components/ui/Icon.jsx';
import { countByStatus, getTaskStatus } from '../utils/tasks.js';

const EMPTY_COPY = {
  pending: {
    icon: 'celebration',
    title: 'All caught up!',
    description: 'Take a breather or add a new goal for today.',
  },
  completed: {
    icon: 'task_alt',
    title: 'Nothing completed yet',
    description: 'Check off a task and it will land here.',
  },
  overdue: {
    icon: 'verified',
    title: 'No overdue tasks',
    description: 'You are perfectly on schedule.',
  },
};

export default function TasksPage() {
  const { tasks, toggleTask, openComposer } = useApp();
  const [filter, setFilter] = useState('pending');

  const counts = useMemo(() => countByStatus(tasks), [tasks]);
  const visible = useMemo(
    () => tasks.filter((task) => getTaskStatus(task) === filter),
    [tasks, filter],
  );

  const tabs = [
    { id: 'pending', label: `Pending (${counts.pending})`, icon: 'pending_actions' },
    { id: 'completed', label: `Completed (${counts.completed})`, icon: 'task_alt' },
    { id: 'overdue', label: `Overdue (${counts.overdue})`, icon: 'schedule' },
  ];

  const copy = EMPTY_COPY[filter];

  return (
    <div className="flex flex-col gap-space-md pb-space-lg">
      <PageHeader title="Tasks" description="Keep today’s focus moving">
        <button
          type="button"
          onClick={() => openComposer('task')}
          className="flex h-10 items-center gap-space-sm rounded-lg bg-primary px-space-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-surface-tint"
        >
          <Icon name="add_task" size={18} />
          New Task
        </button>
      </PageHeader>

      <div className="flex flex-col gap-space-xs px-space-md pt-space-md lg:px-0 lg:pt-0">
        <div className="flex items-center justify-between gap-space-sm">
          <span className="font-label-md font-bold uppercase tracking-wider text-primary-ink">
            Today&apos;s Focus
          </span>
          <span className="rounded-full bg-surface-container px-space-sm py-space-xs font-label-md text-on-surface-variant">
            {counts.pending + counts.overdue} pending
          </span>
        </div>
        <h2 className="text-headline-md text-on-surface">Keep crushing it! ✨</h2>
      </div>

      <div className="no-scrollbar flex gap-space-xs overflow-x-auto px-space-md pb-space-xs lg:px-0">
        <Tabs items={tabs} value={filter} onChange={setFilter} ariaLabel="Filter tasks" />
      </div>

      {visible.length ? (
        <div className="grid grid-cols-1 gap-space-md px-space-md md:grid-cols-2 lg:max-w-[920px] lg:px-0">
          {visible.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              status={getTaskStatus(task)}
              onToggle={toggleTask}
              onEdit={(selected) => openComposer('task', selected)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={copy.icon}
          title={copy.title}
          description={copy.description}
          className="px-space-md lg:px-0"
          action={<Button onClick={() => openComposer('task')}>Create task</Button>}
        />
      )}

      <Fab onClick={() => openComposer('task')} label="Create task" />
    </div>
  );
}
