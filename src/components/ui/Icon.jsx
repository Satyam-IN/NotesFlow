import { cn } from '../../utils/cn.js';

/** Material Symbols glyph, matching the Stitch icon usage. */
export default function Icon({ name, filled = false, size = 20, className = '', ...rest }) {
  return (
    <span
      aria-hidden="true"
      className={cn('material-symbols-outlined shrink-0 select-none leading-none', className)}
      style={{
        fontSize: `${size}px`,
        ...(filled ? { fontVariationSettings: "'FILL' 1" } : null),
      }}
      {...rest}
    >
      {name}
    </span>
  );
}
