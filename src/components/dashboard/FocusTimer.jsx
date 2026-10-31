import { useEffect, useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import Sheet from '../ui/Sheet.jsx';
import Button from '../ui/Button.jsx';
import ProgressRing from '../ui/ProgressRing.jsx';

const SESSION_MINUTES = 25;
const SESSION_SECONDS = SESSION_MINUTES * 60;

const formatClock = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
};

export default function FocusTimer({ onClose }) {
  const { addFocusMinutes, showToast } = useApp();
  const [remaining, setRemaining] = useState(SESSION_SECONDS);
  const [running, setRunning] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (remaining !== 0 || completed) return;
    setRunning(false);
    setCompleted(true);
    addFocusMinutes(SESSION_MINUTES);
    showToast(`Focus session complete · +${SESSION_MINUTES} min`, 'timer');
  }, [remaining, completed, addFocusMinutes, showToast]);

  const progress = ((SESSION_SECONDS - remaining) / SESSION_SECONDS) * 100;

  const reset = () => {
    setRemaining(SESSION_SECONDS);
    setCompleted(false);
    setRunning(true);
  };

  return (
    <Sheet
      open
      onClose={onClose}
      icon="timer"
      title="Focus session"
      subtitle={`${SESSION_MINUTES} minutes of deep work`}
      size="sm"
    >
      <div className="flex flex-col items-center gap-space-sm rounded-xl bg-surface-container-low p-space-lg">
        <ProgressRing
          value={progress}
          size={168}
          stroke={2.6}
          trackClass="text-surface-container-high"
          barClass="text-primary-ink"
          labelClass="text-headline-lg font-bold tabular-nums text-on-surface"
          label={formatClock(remaining)}
        />
        <p className="text-body-sm text-on-surface-variant">
          {completed
            ? 'Session complete — nicely done.'
            : running
              ? 'Focus in progress — stay with it.'
              : 'Paused. Resume when you are ready.'}
        </p>
      </div>

      <div className="flex items-center justify-center gap-space-sm">
        <Button onClick={() => setRunning((value) => !value)} disabled={completed}>
          <span className="material-symbols-outlined text-[18px]">
            {running ? 'pause' : 'play_arrow'}
          </span>
          {running ? 'Pause' : 'Resume'}
        </Button>
        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
        <Button variant="ghost" onClick={onClose}>
          End
        </Button>
      </div>
    </Sheet>
  );
}
