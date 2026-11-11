import {
  addDays,
  formatWeekdayShort,
  isSameDay,
  startOfDay,
  startOfWeek,
  toISODate,
} from './date.js';

const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 86_400_000;

function completedDate(task) {
  if (!task.completedAt) return null;
  const date = new Date(task.completedAt);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** A focus session belongs to the local day it was saved on (its end). */
function sessionDate(session) {
  const raw = session?.endedAt ?? session?.startedAt;
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function sessionDuration(session) {
  const ms = Number(session?.durationMs);
  return Number.isFinite(ms) && ms > 0 ? ms : 0;
}

/** Consecutive days with at least one completion, counting back from today (or yesterday). */
function countStreak(completionDays, today) {
  let cursor = completionDays.has(today.getTime()) ? today : addDays(today, -1);
  let streak = 0;
  while (completionDays.has(cursor.getTime())) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/**
 * Task statistics derived from the tasks array — the single source of truth.
 * Toggles set/clear completedAt, so counts can never double-count.
 */
export function computeTaskAnalytics(tasks, now = new Date()) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const total = safeTasks.length;
  const today = startOfDay(now);
  const weekStart = startOfWeek(now);
  const completionDays = new Set();

  let completed = 0;
  let daily = 0;
  let weekly = 0;

  for (const task of safeTasks) {
    const date = completedDate(task);
    if (!date) continue;
    completed += 1;
    completionDays.add(startOfDay(date).getTime());
    if (isSameDay(date, now)) daily += 1;
    if (startOfDay(date).getTime() >= weekStart.getTime()) weekly += 1;
  }

  return {
    total,
    completed,
    pending: total - completed,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
    daily,
    weekly,
    streak: countStreak(completionDays, today),
  };
}

/**
 * Focus statistics derived from the persisted session log.
 * Each session is counted once — there are no running counters to desync.
 */
export function computeFocusAnalytics(sessions, now = new Date()) {
  const safeSessions = Array.isArray(sessions) ? sessions : [];
  const weekStart = startOfWeek(now);

  let todayMs = 0;
  let weekMs = 0;
  let totalMs = 0;
  let todaySessions = 0;
  let weekSessions = 0;

  for (const session of safeSessions) {
    const ms = sessionDuration(session);
    const date = sessionDate(session);
    if (!ms || !date) continue;
    totalMs += ms;
    if (isSameDay(date, now)) {
      todayMs += ms;
      todaySessions += 1;
    }
    if (startOfDay(date).getTime() >= weekStart.getTime()) {
      weekMs += ms;
      weekSessions += 1;
    }
  }

  return {
    todayMs,
    weekMs,
    totalMs,
    todayMinutes: Math.round(todayMs / MS_PER_MINUTE),
    weekMinutes: Math.round(weekMs / MS_PER_MINUTE),
    totalMinutes: Math.round(totalMs / MS_PER_MINUTE),
    todaySessions,
    weekSessions,
  };
}

/** Tasks still open at the end of a given calendar day, from current task history. */
function pendingAtEndOfDay(tasks, dayBoundaryMs) {
  let pending = 0;
  for (const task of tasks) {
    const created = new Date(task.createdAt);
    if (Number.isNaN(created.getTime()) || created.getTime() >= dayBoundaryMs) continue;
    const done = completedDate(task);
    if (!done || done.getTime() >= dayBoundaryMs) pending += 1;
  }
  return pending;
}

/**
 * Per-calendar-day productivity buckets for the `days` days ending on `endDate`.
 * Every day is keyed by its local YYYY-MM-DD and calculated independently, so a
 * day with no activity reports honest zeros — nothing is carried forward.
 */
export function buildProductivityRange(tasks, sessions, endDate = new Date(), days = 7) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const safeSessions = Array.isArray(sessions) ? sessions : [];
  const span = Math.max(1, Math.floor(days));
  const end = startOfDay(endDate);
  const buckets = new Map();
  const range = [];

  for (let offset = span - 1; offset >= 0; offset -= 1) {
    const date = addDays(end, -offset);
    const bucket = {
      iso: toISODate(date),
      date,
      weekday: formatWeekdayShort(date),
      created: 0,
      completed: 0,
      pending: 0,
      focusMs: 0,
    };
    buckets.set(bucket.iso, bucket);
    range.push(bucket);
  }

  for (const task of safeTasks) {
    const created = new Date(task.createdAt);
    if (!Number.isNaN(created.getTime())) {
      const bucket = buckets.get(toISODate(created));
      if (bucket) bucket.created += 1;
    }
    const completed = completedDate(task);
    if (completed) {
      const bucket = buckets.get(toISODate(completed));
      if (bucket) bucket.completed += 1;
    }
  }

  for (const session of safeSessions) {
    const ms = sessionDuration(session);
    const date = sessionDate(session);
    if (!ms || !date) continue;
    const bucket = buckets.get(toISODate(date));
    if (bucket) bucket.focusMs += ms;
  }

  return range.map((bucket) => ({
    ...bucket,
    pending: pendingAtEndOfDay(safeTasks, startOfDay(bucket.date).getTime() + MS_PER_DAY),
    focusMinutes: Math.round(bucket.focusMs / MS_PER_MINUTE),
  }));
}

/** Aggregates a range built by buildProductivityRange. */
export function sumRange(days) {
  const safeDays = Array.isArray(days) ? days : [];
  return safeDays.reduce(
    (total, day) => ({
      created: total.created + (day.created ?? 0),
      completed: total.completed + (day.completed ?? 0),
      focusMinutes: total.focusMinutes + (day.focusMinutes ?? 0),
    }),
    { created: 0, completed: 0, focusMinutes: 0 },
  );
}
