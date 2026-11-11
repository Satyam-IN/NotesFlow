import Card from '../ui/Card.jsx';
import Icon from '../ui/Icon.jsx';
import { cn } from '../../utils/cn.js';

const TONES = {
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-fixed/30 text-tertiary',
  primary: 'bg-primary-fixed text-on-primary-fixed',
};

export default function StatCard({ icon, value, label, tone = 'secondary' }) {
  return (
    <Card tone="low" className="flex flex-col justify-between p-space-md">
      <div
        className={cn(
          'mb-space-sm flex h-10 w-10 items-center justify-center rounded-lg',
          TONES[tone] ?? TONES.secondary,
        )}
      >
        <Icon name={icon} size={20} filled />
      </div>
      <div>
        <span className="text-headline-sm text-on-surface">{value}</span>
        <p className="text-label-sm text-secondary">{label}</p>
      </div>
    </Card>
  );
}
