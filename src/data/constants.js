/** Semantic chip tones shared by tasks, notes, calendar and settings. */
export const CHIP_TONES = {
  neutral: 'bg-surface-container text-on-surface-variant',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  primary: 'bg-primary-fixed text-on-primary-fixed',
  error: 'bg-error-container text-on-error-container',
};

export const PRIORITY_TONE = {
  High: 'error',
  Medium: 'secondary',
  Low: 'neutral',
};

export const PRIORITIES = ['High', 'Medium', 'Low'];

const TAG_TONES = {
  'UI/UX': 'secondary',
  Design: 'neutral',
  Strategy: 'tertiary',
  Docs: 'secondary',
};

export const tagTone = (tag) => TAG_TONES[tag] ?? 'secondary';

export const NOTE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
  { id: 'ideas', label: 'Ideas' },
];

export const NOTE_ACCENTS = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
  'primary-container': 'bg-primary-container',
  secondary: 'bg-secondary',
};

export const NOTE_CATEGORY_TONE = {
  work: 'secondary',
  personal: 'tertiary',
  ideas: 'primary',
};

export const EVENT_TYPES = {
  meeting: {
    label: 'Meeting',
    dot: 'bg-primary-container',
    time: 'text-primary-container dark:text-primary-fixed-dim',
    badge: 'bg-primary-fixed text-on-primary-fixed',
  },
  task: {
    label: 'Task',
    dot: 'bg-error',
    time: 'text-error',
    badge: 'bg-error-container text-on-error-container',
  },
  review: {
    label: 'Review',
    dot: 'bg-tertiary-container dark:bg-tertiary',
    time: 'text-tertiary-container dark:text-tertiary',
    badge: 'bg-tertiary-fixed text-on-tertiary-fixed',
  },
  reminder: {
    label: 'Reminder',
    dot: 'bg-secondary',
    time: 'text-secondary',
    badge: 'bg-secondary-container text-on-secondary-container',
  },
};

export const EVENT_TYPE_OPTIONS = [
  { id: 'meeting', label: 'Meeting' },
  { id: 'task', label: 'Task' },
  { id: 'review', label: 'Review' },
  { id: 'reminder', label: 'Reminder' },
];
