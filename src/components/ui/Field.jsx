import Icon from './Icon.jsx';
import { cn } from '../../utils/cn.js';

export function Field({ label, htmlFor, error, hint, children, className }) {
  return (
    <div className={cn('flex flex-col gap-space-xs', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="font-label-md text-on-surface">
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="flex items-center gap-1 font-label-sm font-medium text-error">
          <Icon name="error" size={14} />
          {error}
        </p>
      ) : null}
      {!error && hint ? (
        <p className="font-label-sm text-on-surface-variant">{hint}</p>
      ) : null}
    </div>
  );
}

const TONES = {
  low: 'bg-surface-container-low',
  container: 'bg-surface-container',
};

export function TextInput({ id, icon, trailing, error, tone = 'container', className, ...rest }) {
  return (
    <div
      className={cn(
        'flex h-12 items-center gap-space-sm rounded-lg px-space-md transition-all focus-within:ring-2 focus-within:ring-primary',
        TONES[tone] ?? TONES.container,
        error && 'ring-1 ring-error',
        className,
      )}
    >
      {icon ? <Icon name={icon} size={20} className="text-outline" /> : null}
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className="h-full w-full min-w-0 bg-transparent text-body-md text-on-surface outline-none placeholder:text-outline"
        {...rest}
      />
      {trailing}
    </div>
  );
}

export function TextArea({ id, error, tone = 'container', className, rows = 3, ...rest }) {
  return (
    <textarea
      id={id}
      rows={rows}
      aria-invalid={Boolean(error)}
      className={cn(
        'w-full resize-none rounded-lg px-space-md py-space-sm text-body-md text-on-surface outline-none transition-all placeholder:text-outline focus:ring-2 focus:ring-primary',
        TONES[tone] ?? TONES.container,
        error && 'ring-1 ring-error',
        className,
      )}
      {...rest}
    />
  );
}

export function SelectInput({ id, error, tone = 'container', className, children, ...rest }) {
  return (
    <div
      className={cn(
        'relative flex h-12 items-center rounded-lg focus-within:ring-2 focus-within:ring-primary',
        TONES[tone] ?? TONES.container,
        error && 'ring-1 ring-error',
        className,
      )}
    >
      <select
        id={id}
        aria-invalid={Boolean(error)}
        className="h-full w-full appearance-none bg-transparent px-space-md pr-10 text-body-md text-on-surface outline-none"
        {...rest}
      >
        {children}
      </select>
      <Icon name="expand_more" size={20} className="pointer-events-none absolute right-space-sm text-outline" />
    </div>
  );
}
