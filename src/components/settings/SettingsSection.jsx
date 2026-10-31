import Icon from '../ui/Icon.jsx';
import { cn } from '../../utils/cn.js';

const TONES = {
  primary: 'bg-primary/10 text-primary-ink',
  tertiary: 'bg-tertiary/10 text-tertiary',
  secondary: 'bg-secondary-container text-on-secondary-container',
  primaryFixed: 'bg-primary-fixed text-on-primary-fixed',
  secondaryFixed: 'bg-secondary-fixed text-on-secondary-fixed',
};

export default function SettingsSection({ icon, tone = 'primary', title, children, className }) {
  return (
    <section
      className={cn(
        'flex flex-col rounded-xl bg-surface-container-low p-space-md shadow-ambient',
        className,
      )}
    >
      <div className="mb-space-md flex items-center gap-space-sm">
        <div className={cn('rounded-lg p-2', TONES[tone] ?? TONES.primary)}>
          <Icon name={icon} size={20} />
        </div>
        <h2 className="text-body-lg font-semibold text-on-surface">{title}</h2>
      </div>
      <div className="flex flex-col gap-space-xs">{children}</div>
    </section>
  );
}
