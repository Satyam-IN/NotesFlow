import { parseISODate, startOfDay } from './date.js';

/** A task is overdue purely from its due date — no status field is stored. */
export function getTaskStatus(task) {
  if (task.completedAt) return 'completed';
  const due = parseISODate(task.dueDate);
  if (due && startOfDay(due).getTime() < startOfDay(new Date()).getTime()) {
    return 'overdue';
  }
  return 'pending';
}

export function countByStatus(tasks) {
  return tasks.reduce(
    (acc, task) => {
      acc[getTaskStatus(task)] += 1;
      return acc;
    },
    { pending: 0, completed: 0, overdue: 0 },
  );
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
    const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
    return aDue - bDue;
  });
}
