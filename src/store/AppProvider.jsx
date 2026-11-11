import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { seedEvents, seedNotes, seedPrefs, seedTasks, seedUser } from '../data/mockData.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { computeFocusAnalytics, computeTaskAnalytics } from '../utils/analytics.js';
import { uid } from '../utils/cn.js';

const AppContext = createContext(null);
const SESSION_KEY = 'taskflow:session';
const INITIALIZED_KEY = 'taskflow:initialized';

function readSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

/** First run opens signed in so the designed dashboard is the landing screen. */
function seedSession(user) {
  const existing = readSession();
  if (existing) return existing;
  try {
    if (window.localStorage.getItem(INITIALIZED_KEY)) return null;
    window.localStorage.setItem(INITIALIZED_KEY, 'true');
    const session = { name: user.name, email: user.email };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  } catch (error) {
    return null;
  }
}

export function AppProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('taskflow:tasks', seedTasks);
  const [notes, setNotes] = useLocalStorage('taskflow:notes', seedNotes);
  const [events, setEvents] = useLocalStorage('taskflow:events', seedEvents);
  const [prefs, setPrefs] = useLocalStorage('taskflow:prefs', seedPrefs);
  const [user, setUser] = useLocalStorage('taskflow:user', seedUser);
  const [focusSessions, setFocusSessions] = useLocalStorage('taskflow:focusSessions', []);

  const [session, setSession] = useState(() => seedSession(seedUser));
  const [toast, setToast] = useState(null);
  const [composer, setComposer] = useState(null);
  const toastTimer = useRef(null);

  /* ------------------------------------------------------------- feedback */

  const showToast = useCallback((message, icon = 'check_circle') => {
    setToast({ id: Date.now(), message, icon });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  /* ---------------------------------------------------------------- theme */

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', prefs.theme === 'dark');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', prefs.theme === 'dark' ? '#0f1116' : '#f7f9fb');
  }, [prefs.theme]);

  /* ----------------------------------------------------------- preferences */

  const updatePrefs = useCallback(
    (patch) => setPrefs((prev) => ({ ...prev, ...patch })),
    [setPrefs],
  );

  const setIntegration = useCallback(
    (app, status) =>
      setPrefs((prev) => ({
        ...prev,
        integrations: { ...prev.integrations, [app]: status },
      })),
    [setPrefs],
  );

  /* ----------------------------------------------------------------- tasks */

  const addTask = useCallback(
    (values) => {
      const task = {
        id: uid('task'),
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        dueTime: '',
        tags: [],
        completedAt: null,
        createdAt: new Date().toISOString(),
        ...values,
      };
      setTasks((prev) => [task, ...prev]);
      showToast('Task created');
      return task;
    },
    [setTasks, showToast],
  );

  const updateTask = useCallback(
    (id, patch) => {
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...patch } : task)));
      showToast('Task updated');
    },
    [setTasks, showToast],
  );

  const toggleTask = useCallback(
    (id) => {
      const target = tasks.find((task) => task.id === id);
      if (!target) return;
      const completed = !target.completedAt;
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completedAt: completed ? new Date().toISOString() : null }
            : task,
        ),
      );
      showToast(completed ? 'Task completed' : 'Task reopened', completed ? 'task_alt' : 'undo');
    },
    [tasks, setTasks, showToast],
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      showToast('Task deleted', 'delete');
    },
    [setTasks, showToast],
  );

  /* -------------------------------------------------------------- analytics */

  // Bumped at midnight (or when the tab wakes up on a new day) so "today"
  // and "this week" windows stay accurate without a reload.
  const [dayStamp, setDayStamp] = useState(() => Date.now());

  useEffect(() => {
    const rollOver = () => {
      const current = new Date();
      setDayStamp((prev) =>
        new Date(prev).toDateString() === current.toDateString() ? prev : current.getTime(),
      );
    };
    const interval = window.setInterval(rollOver, 60_000);
    document.addEventListener('visibilitychange', rollOver);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', rollOver);
    };
  }, []);

  const taskStats = useMemo(
    () => computeTaskAnalytics(tasks, new Date(dayStamp)),
    [tasks, dayStamp],
  );

  const focusStats = useMemo(
    () => computeFocusAnalytics(focusSessions, new Date(dayStamp)),
    [focusSessions, dayStamp],
  );

  const recordFocusSession = useCallback(
    ({ startedAt, endedAt, durationMs }) => {
      const ms = Math.round(Number(durationMs));
      if (!Number.isFinite(ms) || ms <= 0) return null;

      const end = endedAt ? new Date(endedAt) : new Date();
      const endTime = Number.isNaN(end.getTime()) ? Date.now() : end.getTime();
      const start = startedAt ? new Date(startedAt) : null;
      const startTime = start && !Number.isNaN(start.getTime()) ? start.getTime() : endTime - ms;

      const session = {
        id: uid('focus'),
        startedAt: new Date(startTime).toISOString(),
        endedAt: new Date(endTime).toISOString(),
        durationMs: ms,
      };
      setFocusSessions((prev) => [...(Array.isArray(prev) ? prev : []), session]);

      const label =
        ms < 60_000 ? `${Math.max(1, Math.round(ms / 1000))}s` : `${Math.round(ms / 60_000)} min`;
      showToast(`Focus session saved · +${label}`, 'timer');
      return session;
    },
    [setFocusSessions, showToast],
  );

  /* ----------------------------------------------------------------- notes */

  const addNote = useCallback(
    (values) => {
      const timestamp = new Date().toISOString();
      const note = {
        id: uid('note'),
        title: '',
        body: '',
        category: 'work',
        tags: [],
        accent: 'primary',
        createdAt: timestamp,
        updatedAt: timestamp,
        ...values,
      };
      setNotes((prev) => [note, ...prev]);
      showToast('Note saved');
      return note;
    },
    [setNotes, showToast],
  );

  const updateNote = useCallback(
    (id, patch) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, ...patch, updatedAt: new Date().toISOString() } : note,
        ),
      );
      showToast('Note updated');
    },
    [setNotes, showToast],
  );

  const deleteNote = useCallback(
    (id) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      showToast('Note deleted', 'delete');
    },
    [setNotes, showToast],
  );

  /* ---------------------------------------------------------------- events */

  const addEvent = useCallback(
    (values) => {
      const event = {
        id: uid('event'),
        title: '',
        description: '',
        date: '',
        start: '09:00',
        end: '',
        type: 'meeting',
        attendees: [],
        extraAttendees: 0,
        project: '',
        ...values,
      };
      setEvents((prev) => [...prev, event]);
      showToast('Event added to your calendar', 'event_available');
      return event;
    },
    [setEvents, showToast],
  );

  const updateEvent = useCallback(
    (id, patch) => {
      setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...patch } : event)));
      showToast('Event updated');
    },
    [setEvents, showToast],
  );

  const deleteEvent = useCallback(
    (id) => {
      setEvents((prev) => prev.filter((event) => event.id !== id));
      showToast('Event deleted', 'delete');
    },
    [setEvents, showToast],
  );

  /* ---------------------------------------------------------------- account */

  const persistSession = useCallback((value, remember) => {
    try {
      const target = remember ? window.localStorage : window.sessionStorage;
      const other = remember ? window.sessionStorage : window.localStorage;
      other.removeItem(SESSION_KEY);
      target.setItem(SESSION_KEY, JSON.stringify(value));
      window.localStorage.setItem(INITIALIZED_KEY, 'true');
    } catch (error) {
      // storage can be unavailable — the in-memory session still works
    }
    setSession(value);
  }, []);

  const signIn = useCallback(
    ({ email, password, remember }) => {
      const normalized = email.trim().toLowerCase();
      if (normalized !== user.email.toLowerCase()) {
        return {
          ok: false,
          field: 'email',
          message: 'No account matches that email.',
        };
      }
      if (password.length < 8) {
        return { ok: false, field: 'password', message: 'Password must be at least 8 characters.' };
      }
      persistSession({ name: user.name, email: user.email }, remember);
      return { ok: true };
    },
    [persistSession, user.email, user.name],
  );

  const signUp = useCallback(
    ({ name, email, password, remember }) => {
      const nextUser = {
        ...user,
        name: name.trim(),
        email: email.trim().toLowerCase(),
      };
      setUser(nextUser);
      persistSession({ name: nextUser.name, email: nextUser.email }, remember);
      showToast(`Welcome to NotesFlow, ${nextUser.name.split(' ')[0]}`, 'celebration');
      return { ok: true };
    },
    [persistSession, setUser, showToast, user],
  );

  const signOut = useCallback(() => {
    try {
      window.localStorage.removeItem(SESSION_KEY);
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.setItem(INITIALIZED_KEY, 'true');
    } catch (error) {
      // ignore
    }
    setSession(null);
    showToast('You have been signed out', 'logout');
  }, [showToast]);

  const updateUser = useCallback(
    (patch) => {
      setUser((prev) => ({ ...prev, ...patch }));
      setSession((prev) => (prev ? { ...prev, ...patch } : prev));
      showToast('Profile updated');
    },
    [setUser, showToast],
  );

  /* --------------------------------------------------------------- overlays */

  const openComposer = useCallback((type, payload = null) => setComposer({ type, payload }), []);
  const closeComposer = useCallback(() => setComposer(null), []);

  const value = useMemo(
    () => ({
      tasks,
      notes,
      events,
      prefs,
      user,
      session,
      toast,
      composer,
      taskStats,
      focusStats,
      focusSessions,
      isAuthenticated: Boolean(session),
      showToast,
      updatePrefs,
      setIntegration,
      recordFocusSession,
      addTask,
      updateTask,
      toggleTask,
      deleteTask,
      addNote,
      updateNote,
      deleteNote,
      addEvent,
      updateEvent,
      deleteEvent,
      signIn,
      signUp,
      signOut,
      updateUser,
      openComposer,
      closeComposer,
    }),
    [
      tasks,
      notes,
      events,
      prefs,
      user,
      session,
      toast,
      composer,
      taskStats,
      focusStats,
      focusSessions,
      showToast,
      updatePrefs,
      setIntegration,
      recordFocusSession,
      addTask,
      updateTask,
      toggleTask,
      deleteTask,
      addNote,
      updateNote,
      deleteNote,
      addEvent,
      updateEvent,
      deleteEvent,
      signIn,
      signUp,
      signOut,
      updateUser,
      openComposer,
      closeComposer,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside <AppProvider>');
  return context;
}
