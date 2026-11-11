const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

/** Monday-first initials, matching the Stitch month grid. */
export const WEEKDAY_INITIALS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const pad = (value) => String(value).padStart(2, '0');

export function startOfDay(date = new Date()) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

/** Monday 00:00 of the week containing the date (the calendar is Monday-first). */
export function startOfWeek(date = new Date()) {
  const next = startOfDay(date);
  const offset = (next.getDay() + 6) % 7;
  return addDays(next, -offset);
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function toISODate(date) {
  const value = new Date(date);
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
}

export function parseISODate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function daysFromToday(date) {
  const diff = startOfDay(date).getTime() - startOfDay(new Date()).getTime();
  return Math.round(diff / 86_400_000);
}

/** "17:00" -> "5:00 PM" */
export function formatTime(value) {
  if (!value) return '';
  const [rawHour, rawMinute] = String(value).split(':').map(Number);
  if (Number.isNaN(rawHour)) return '';
  const suffix = rawHour >= 12 ? 'PM' : 'AM';
  const hour = rawHour % 12 === 0 ? 12 : rawHour % 12;
  return `${hour}:${pad(Number.isNaN(rawMinute) ? 0 : rawMinute)} ${suffix}`;
}

export function formatMonthYear(date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "Friday, Oct 11" */
export function formatDayTitle(date) {
  return `${WEEKDAYS[date.getDay()]}, ${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
}

/** "Friday, October 11" */
export function formatLongDay(date) {
  return `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

/** "Fri" */
export function formatWeekdayShort(date) {
  return WEEKDAYS[date.getDay()].slice(0, 3);
}

/** "Oct 24" (adds the year when it is not the current one) */
export function formatShortDate(date) {
  const base = `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
  return date.getFullYear() === new Date().getFullYear()
    ? base
    : `${base}, ${date.getFullYear()}`;
}

/** "Oct 24, 2026" */
export function formatFullDate(date) {
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDuration(minutes) {
  const safe = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safe / 60);
  const rest = safe % 60;
  if (!hours) return `${rest}m`;
  if (!rest) return `${hours}h`;
  return `${hours}h ${rest}m`;
}

/** Task due label, e.g. "Due Today, 5:00 PM" / "Tomorrow" / "Was due 2 days ago". */
export function formatDueLabel(dueDate, dueTime) {
  const date = parseISODate(dueDate);
  if (!date) return 'No due date';
  const diff = daysFromToday(date);
  const time = dueTime ? `, ${formatTime(dueTime)}` : '';

  if (diff === 0) return `Due Today${time}`;
  if (diff === 1) return `Tomorrow${time}`;
  if (diff === -1) return 'Was due yesterday';
  if (diff < 0) return `Was due ${Math.abs(diff)} days ago`;
  return `${formatShortDate(date)}${time}`;
}

export function formatCompletedLabel(completedAt) {
  if (!completedAt) return '';
  const date = new Date(completedAt);
  const diff = daysFromToday(date);
  if (diff === 0) return 'Completed Today';
  if (diff === -1) return 'Completed Yesterday';
  return `Completed ${formatShortDate(date)}`;
}

export function formatEventTime(event) {
  if (!event.start) return '';
  if (event.type === 'task') return `${formatTime(event.start)} Deadline`;
  if (event.end) return `${formatTime(event.start)} - ${formatTime(event.end)}`;
  return formatTime(event.start);
}

/** Six-week (or five-week) Monday-first matrix for the month. */
export function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
  const start = addDays(first, -offset);

  return Array.from({ length: cellCount }, (_, index) => {
    const date = addDays(start, index);
    return { date, inMonth: date.getMonth() === month };
  });
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function monthLabel(month) {
  return MONTHS[month];
}
