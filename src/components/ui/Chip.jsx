import { CHIP_TONES } from '../../data/constants.js';
import { cn } from '../../utils/cn.js';

const SIZES = {
  md: 'px-space-sm py-space-xs rounded-full',
  sm: 'px-2 py-0.5 rounded-md',
};

export default function Chip({ tone = 'neutral', size = 'md', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap font-label-sm',
        SIZES[size],
        CHIP_TONES[tone] ?? CHIP_TONES.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}
