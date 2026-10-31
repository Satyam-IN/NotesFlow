import { cn } from '../../utils/cn.js';

const VARIANTS = {
  primary:
    'bg-primary text-on-primary shadow-sm hover:bg-surface-tint active:scale-[0.99]',
  secondary:
    'bg-surface-container-high text-on-surface shadow-sm hover:bg-surface-variant active:scale-[0.99]',
  ghost: 'text-on-surface-variant hover:bg-surface-container',
  invert: 'bg-on-primary text-primary hover:bg-surface shadow-sm',
  danger: 'bg-error-container text-on-error-container hover:opacity-90',
};

const SIZES = {
  sm: 'h-9 px-space-md rounded-lg text-label-md',
  md: 'h-11 px-space-md rounded-lg text-label-md',
  lg: 'h-12 px-space-md rounded-lg text-label-md',
  icon: 'h-9 w-9 rounded-full',
};

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-space-sm font-label-md font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
