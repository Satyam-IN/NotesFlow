import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import { cn } from '../../utils/cn.js';

/**
 * Bottom sheet on mobile, centered dialog on desktop — the Stitch pattern for
 * "Create New Event" extended to every modal in the app.
 */
export default function Sheet({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  size = 'md',
}) {
  const panelRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector(
        '[data-autofocus], input:not([type="hidden"]), textarea, select, button',
      );
      target?.focus({ preventScroll: true });
    }, 80);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="animate-overlay fixed inset-0 z-[80] flex items-end justify-center bg-inverse-surface/40 backdrop-blur-sm lg:items-center lg:p-space-lg"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          'animate-sheet flex max-h-[92dvh] w-full flex-col gap-space-md overflow-y-auto rounded-t-2xl bg-surface-container-lowest p-space-lg shadow-2xl lg:rounded-2xl',
          size === 'sm' ? 'max-w-[440px]' : 'max-w-[520px]',
        )}
      >
        <div className="flex items-start justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            {icon ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-on-primary-fixed">
                <Icon name={icon} size={20} />
              </div>
            ) : null}
            <div className="flex flex-col">
              <h2 id={titleId} className="text-headline-sm text-on-surface">
                {title}
              </h2>
              {subtitle ? (
                <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {children}

        {footer ? <div className="mt-space-xs flex justify-end gap-space-sm">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
