import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import Sheet from '../ui/Sheet.jsx';
import Button from '../ui/Button.jsx';
import ProgressRing from '../ui/ProgressRing.jsx';
import { formatDuration } from '../../utils/date.js';

const SESSION_MINUTES = 25;
const SESSION_MS = SESSION_MINUTES * 60 * 1000;
const PROMPT_THRESHOLD_MS = 1000;

const clampElapsed = (ms) => Math.max(0, Math.min(SESSION_MS, ms));

const formatClock = (ms) => {
  const seconds = Math.ceil(clampElapsed(ms) / 1000);
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
};

export default function FocusTimer({ onClose }) {
  const { recordFocusSession, focusStats } = useApp();
  const [phase, setPhase] = useState('running');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [sessionStart, setSessionStart] = useState(() => new Date());
  const [saved, setSaved] = useState(false);
  const [asking, setAsking] = useState(false);

  const accumulatedRef = useRef(0);
  const resumedAtRef = useRef(Date.now());
  const recordedRef = useRef(false);
  const resumePhaseRef = useRef('running');
  const pendingActionRef = useRef('close');

  useEffect(() => {
    if (phase !== 'running') return undefined;
    const resumedAt = Date.now();
    resumedAtRef.current = resumedAt;

    const tick = () => {
      setElapsedMs(clampElapsed(accumulatedRef.current + (Date.now() - resumedAt)));
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => {
      window.clearInterval(interval);
      accumulatedRef.current = clampElapsed(
        accumulatedRef.current + (Date.now() - resumedAt),
      );
      const settled = accumulatedRef.current;
      setElapsedMs((prev) => (prev === settled ? prev : settled));
    };
  }, [phase]);

  useEffect(() => {
    if (elapsedMs < SESSION_MS || recordedRef.current) return;
    recordedRef.current = true;
    accumulatedRef.current = SESSION_MS;
    recordFocusSession({
      startedAt: sessionStart.toISOString(),
      endedAt: new Date().toISOString(),
      durationMs: SESSION_MS,
    });
    setSaved(true);
    setPhase('done');
  }, [elapsedMs, sessionStart, recordFocusSession]);

  const currentElapsed = () =>
    clampElapsed(
      phase === 'running'
        ? accumulatedRef.current + (Date.now() - resumedAtRef.current)
        : accumulatedRef.current,
    );

  const startNewSession = () => {
    accumulatedRef.current = 0;
    recordedRef.current = false;
    resumePhaseRef.current = 'running';
    setElapsedMs(0);
    setSessionStart(new Date());
    setSaved(false);
    setAsking(false);
    setPhase('running');
  };

  const finishPending = () => {
    if (pendingActionRef.current === 'reset') startNewSession();
    else onClose();
  };

  const requestEnd = (action) => {
    if (asking) return;
    pendingActionRef.current = action;

    if (saved || phase === 'done') {
      if (action === 'reset') startNewSession();
      else onClose();
      return;
    }

    const elapsed = currentElapsed();
    if (elapsed < PROMPT_THRESHOLD_MS) {
      if (action === 'reset') startNewSession();
      else onClose();
      return;
    }

    resumePhaseRef.current = phase;
    if (phase === 'running') setPhase('paused');
    setElapsedMs(elapsed);
    setAsking(true);
  };

  const keepFocusing = () => {
    setAsking(false);
    if (resumePhaseRef.current === 'running') setPhase('running');
  };

  const savePartial = () => {
    const ms = currentElapsed();
    if (!saved && ms > 0 && !recordedRef.current) {
      recordedRef.current = true;
      recordFocusSession({
        startedAt: sessionStart.toISOString(),
        endedAt: new Date().toISOString(),
        durationMs: ms,
      });
      setSaved(true);
    }
    finishPending();
  };

  const sessionMinutes = Math.round(elapsedMs / 60_000);
  const remainingMs = SESSION_MS - elapsedMs;
  const progress = (elapsedMs / SESSION_MS) * 100;

  const statusCopy =
    phase === 'done'
      ? 'Session complete — nicely done.'
      : asking
        ? `You focused ${formatDuration(sessionMinutes)} so far.`
        : phase === 'running'
          ? 'Focus in progress — stay with it.'
          : 'Paused — your timer is on hold.';

  return (
    <Sheet
      open
      onClose={() => requestEnd('close')}
      icon="timer"
      title="Focus session"
      subtitle={
        phase === 'done'
          ? 'Saved to your focus history'
          : `${SESSION_MINUTES} minutes of deep work`
      }
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
          label={formatClock(remainingMs)}
        />
        <p className="text-body-sm text-on-surface-variant">{statusCopy}</p>
        <p className="text-label-sm tabular-nums text-outline">
          This session {formatDuration(sessionMinutes)} · Today {formatDuration(focusStats.todayMinutes)}
        </p>
      </div>

      {asking ? (
        <div className="flex flex-col gap-space-sm">
          <p className="text-center text-label-sm text-on-surface-variant">
            Save this session to count it toward today&apos;s focus time, or discard it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            <Button onClick={savePartial}>Save session</Button>
            <Button variant="secondary" onClick={finishPending}>
              Discard
            </Button>
            <Button variant="ghost" onClick={keepFocusing}>
              Keep focusing
            </Button>
          </div>
        </div>
      ) : phase === 'done' ? (
        <div className="flex items-center justify-center gap-space-sm">
          <Button onClick={startNewSession}>
            <span className="material-symbols-outlined text-[18px]">replay</span>
            New session
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-space-sm">
          <Button onClick={() => setPhase(phase === 'running' ? 'paused' : 'running')}>
            <span className="material-symbols-outlined text-[18px]">
              {phase === 'running' ? 'pause' : 'play_arrow'}
            </span>
            {phase === 'running' ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="secondary" onClick={() => requestEnd('reset')}>
            Reset
          </Button>
          <Button variant="ghost" onClick={() => requestEnd('close')}>
            End
          </Button>
        </div>
      )}
    </Sheet>
  );
}
