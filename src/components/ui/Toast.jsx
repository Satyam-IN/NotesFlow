import { useApp } from '../../store/AppProvider.jsx';
import Icon from './Icon.jsx';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast fixed bottom-24 left-1/2 z-[90] flex max-w-[calc(100vw-32px)] items-center gap-space-sm rounded-full bg-inverse-surface px-space-lg py-space-sm text-inverse-on-surface shadow-xl lg:bottom-8"
    >
      <Icon name={toast.icon} size={18} className="text-tertiary-fixed-dim" />
      <span className="text-body-md">{toast.message}</span>
    </div>
  );
}
