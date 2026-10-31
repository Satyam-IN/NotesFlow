import { useApp } from '../store/AppProvider.jsx';
import TaskComposer from './tasks/TaskComposer.jsx';
import NoteComposer from './notes/NoteComposer.jsx';
import EventComposer from './calendar/EventComposer.jsx';
import FocusTimer from './dashboard/FocusTimer.jsx';
import AnalyticsSheet from './dashboard/AnalyticsSheet.jsx';

/** Single mount point for every overlay so any screen can open a composer. */
export default function ComposerHost() {
  const { composer, closeComposer } = useApp();
  if (!composer) return null;

  switch (composer.type) {
    case 'task':
      return (
        <TaskComposer
          key={composer.payload?.id ?? 'new-task'}
          task={composer.payload ?? null}
          onClose={closeComposer}
        />
      );
    case 'note':
      return (
        <NoteComposer
          key={composer.payload?.id ?? 'new-note'}
          note={composer.payload ?? null}
          onClose={closeComposer}
        />
      );
    case 'event':
      return (
        <EventComposer
          key={composer.payload?.event?.id ?? 'new-event'}
          event={composer.payload?.event ?? null}
          defaultDate={composer.payload?.defaultDate}
          onClose={closeComposer}
        />
      );
    case 'focus':
      return <FocusTimer onClose={closeComposer} />;
    case 'analytics':
      return <AnalyticsSheet onClose={closeComposer} />;
    default:
      return null;
  }
}
