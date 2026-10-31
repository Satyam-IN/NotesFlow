import { cn } from '../../utils/cn.js';

const ARC = 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';

export default function ProgressRing({
  value,
  size = 64,
  stroke = 3.5,
  label,
  trackClass = 'text-on-primary/20',
  barClass = 'text-on-tertiary-fixed',
  labelClass = 'text-label-md font-bold text-on-primary',
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      role="img"
      aria-label={`${clamped}% complete`}
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <path className={trackClass} d={ARC} fill="none" stroke="currentColor" strokeWidth={stroke} />
        <path
          className={barClass}
          d={ARC}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${clamped}, 100`}
        />
      </svg>
      <span className={cn('absolute', labelClass)}>{label ?? `${clamped}%`}</span>
    </div>
  );
}
