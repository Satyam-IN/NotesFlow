import { cn } from '../../utils/cn.js';

const TONES = {
  low: 'bg-surface-container-low',
  lowest: 'bg-surface-container-lowest',
  container: 'bg-surface-container',
};

export default function Card({ as: Tag = 'div', tone = 'low', className, children, ...rest }) {
  return (
    <Tag className={cn('rounded-xl shadow-ambient', TONES[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
