import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-space-md bg-surface px-space-md text-center text-on-surface">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container shadow-lg shadow-primary/20">
        <Icon name="explore_off" size={36} filled />
      </div>
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-md uppercase tracking-wider text-primary-ink">404</span>
        <h1 className="text-headline-md text-on-surface">This page wandered off</h1>
        <p className="max-w-sm text-body-md text-on-surface-variant">
          The screen you are looking for does not exist. Head back to your dashboard and pick up
          where you left off.
        </p>
      </div>
      <Link
        to="/"
        className="flex h-11 items-center gap-space-sm rounded-lg bg-primary px-space-lg font-label-md text-on-primary shadow-md shadow-primary/25 transition-all hover:bg-surface-tint"
      >
        <Icon name="arrow_back" size={18} />
        Back to dashboard
      </Link>
    </div>
  );
}
