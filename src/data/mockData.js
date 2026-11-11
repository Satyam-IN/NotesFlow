import { addDays, toISODate } from '../utils/date.js';

const now = new Date();
const today = toISODate(now);
const dayOffset = (amount) => toISODate(addDays(now, amount));
const at = (hours, minutes = 0, day = 0) => {
  const base = addDays(now, day);
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), hours, minutes).toISOString();
};

/* ------------------------------------------------------------------ tasks */

export const seedTasks = [
  {
    id: 'task-1',
    title: 'Redesign mobile navigation bar',
    description: 'Implement new Material 3 bottom nav specs with active pill indicators.',
    priority: 'High',
    dueDate: today,
    dueTime: '17:00',
    tags: ['UI/UX', 'Design'],
    completedAt: null,
    createdAt: at(9, 10),
  },
  {
    id: 'task-2',
    title: 'Prepare quarterly design review presentation',
    description: 'Gather metrics on user retention and design system adoption rates.',
    priority: 'Medium',
    dueDate: dayOffset(1),
    dueTime: '',
    tags: ['Strategy'],
    completedAt: null,
    createdAt: at(10, 5),
  },
  {
    id: 'task-3',
    title: 'Update typography token documentation',
    description: 'Sync Inter font weights across all Figma and Tailwind configurations.',
    priority: 'Low',
    dueDate: dayOffset(4),
    dueTime: '',
    tags: ['Docs'],
    completedAt: null,
    createdAt: at(11, 40),
  },
  {
    id: 'task-4',
    title: 'Morning sync with engineering leads',
    description: 'Reviewed sprint blockers and accessibility compliance.',
    priority: 'Medium',
    dueDate: today,
    dueTime: '09:30',
    tags: [],
    completedAt: at(9, 45),
    createdAt: dayOffset(-1),
  },
  {
    id: 'task-5',
    title: 'Review pull request #402',
    description: 'Checked contrast ratios and color tokens on modal dialogs.',
    priority: 'High',
    dueDate: dayOffset(-1),
    dueTime: '',
    tags: [],
    completedAt: at(16, 20, -1),
    createdAt: dayOffset(-2),
  },
  {
    id: 'task-6',
    title: 'Submit annual security audit questionnaire',
    description: 'Required by IT compliance before shipping production updates.',
    priority: 'High',
    dueDate: dayOffset(-2),
    dueTime: '',
    tags: [],
    completedAt: null,
    createdAt: dayOffset(-5),
  },
];

/* ------------------------------------------------------------------ notes */

export const seedNotes = [
  {
    id: 'note-1',
    title: 'Q3 Product Strategy & Roadmap',
    body: 'Key milestones for the upcoming quarter focusing on AI-driven task automation, streamlined onboarding flows, and expanded enterprise integrations.',
    category: 'work',
    tags: ['Strategy'],
    accent: 'primary',
    createdAt: dayOffset(-3),
    updatedAt: dayOffset(-3),
  },
  {
    id: 'note-2',
    title: 'Weekend Cabin Trip & Packing List',
    body: "Don't forget warm jackets, hiking boots, coffee beans, board games, and extra firewood for the outdoor fire pit.",
    category: 'personal',
    tags: ['Trip'],
    accent: 'tertiary',
    createdAt: dayOffset(-7),
    updatedAt: dayOffset(-7),
  },
  {
    id: 'note-3',
    title: 'App Idea: Micro-habit Builder',
    body: 'A minimalist gamified companion app that prompts users to complete 2-minute daily micro-habits with delightful tactile feedback.',
    category: 'ideas',
    tags: ['Mobile'],
    accent: 'primary-container',
    createdAt: dayOffset(-11),
    updatedAt: dayOffset(-11),
  },
  {
    id: 'note-4',
    title: 'Book Notes: Designing Data-Intensive Apps',
    body: 'Reliability, scalability, and maintainability are the core pillars. Main takeaway: simplicity is not about having fewer features, but about removing unnecessary cognitive load.',
    category: 'work',
    tags: ['Reading'],
    accent: 'secondary',
    createdAt: dayOffset(-15),
    updatedAt: dayOffset(-15),
  },
];

/* ----------------------------------------------------------------- events */

const year = now.getFullYear();
const month = now.getMonth();
const inMonth = (day) => toISODate(new Date(year, month, day));

export const seedEvents = [
  {
    id: 'event-1',
    title: 'Product Strategy Sync',
    description: 'Quarterly roadmap alignment with design and engineering leads.',
    date: today,
    start: '09:30',
    end: '10:30',
    type: 'meeting',
    attendees: ['JD', 'AS'],
    extraAttendees: 3,
    project: '',
  },
  {
    id: 'event-2',
    title: 'Submit UX Wireframes',
    description: 'Finalize high-fidelity mockups for mobile navigation states.',
    date: today,
    start: '12:00',
    end: '',
    type: 'task',
    attendees: [],
    extraAttendees: 0,
    project: 'NotesFlow Project',
  },
  {
    id: 'event-3',
    title: 'Design System Audit',
    description: 'Review token inconsistencies and component padding specs.',
    date: today,
    start: '14:00',
    end: '15:00',
    type: 'review',
    attendees: [],
    extraAttendees: 0,
    project: '',
  },
  {
    id: 'event-4',
    title: 'Team Retro & Wrap-up',
    description: 'Weekly sync to discuss blockers and achievements.',
    date: today,
    start: '17:30',
    end: '',
    type: 'reminder',
    attendees: [],
    extraAttendees: 0,
    project: '',
  },
  {
    id: 'event-5',
    title: 'Sprint Planning',
    description: 'Scope the next iteration with the platform team.',
    date: inMonth(4),
    start: '10:00',
    end: '11:00',
    type: 'meeting',
    attendees: ['MK'],
    extraAttendees: 2,
    project: '',
  },
  {
    id: 'event-6',
    title: 'Component Library Review',
    description: 'Audit card and chip variants against the token set.',
    date: inMonth(15),
    start: '13:00',
    end: '14:00',
    type: 'review',
    attendees: [],
    extraAttendees: 0,
    project: '',
  },
  {
    id: 'event-7',
    title: 'Publish release notes',
    description: 'Ship the changelog for NotesFlow 2.4.',
    date: inMonth(2),
    start: '16:00',
    end: '',
    type: 'task',
    attendees: [],
    extraAttendees: 0,
    project: 'NotesFlow Project',
  },
];

/* ------------------------------------------------------- dashboard schedule */

export const dashboardSchedule = [
  {
    id: 'schedule-1',
    title: 'Product Strategy Sync',
    meta: 'Google Meet • 45 mins',
    time: '10:00',
    period: 'AM',
    accent: true,
  },
  {
    id: 'schedule-2',
    title: 'Deep Work / Code Review',
    meta: 'Focus Block • 90 mins',
    time: '11:30',
    period: 'AM',
    accent: false,
  },
  {
    id: 'schedule-3',
    title: 'Design System Review',
    meta: 'Figma / Zoom • 60 mins',
    time: '02:15',
    period: 'PM',
    accent: false,
  },
];

/* --------------------------------------------------------------- identity */

export const seedUser = {
  name: 'Alex Rivera',
  email: 'alex.rivera@notesflow.io',
  plan: 'Pro Plan Active',
  memberSince: '2024',
};

export const seedPrefs = {
  theme: 'light',
  pushNotifications: true,
  weeklyDigest: true,
  twoFactor: true,
  integrations: { google: 'connected', slack: 'disconnected' },
};
