const APPS = {
  google: { name: 'Google Calendar', meta: 'Synced events & reminders', initial: 'G' },
};

export default function ConnectedAppRow({ app, connected, onToggle }) {
  const config = APPS[app];

  return (
    <div className="flex items-center justify-between gap-space-sm rounded-lg bg-surface p-space-sm">
      <div className="flex min-w-0 items-center gap-space-sm">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-sm font-bold text-primary-ink">
          {config.initial}
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="font-body-md font-medium text-on-surface">{config.name}</span>
          <span className="font-body-sm text-on-surface-variant">{config.meta}</span>
        </div>
      </div>

      {connected ? (
        <button
          type="button"
          onClick={onToggle}
          title={`Disconnect ${config.name}`}
          className="shrink-0 rounded-full bg-tertiary-container px-space-sm py-1 font-label-sm text-on-tertiary-container transition-opacity hover:opacity-90"
        >
          Connected
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 rounded-lg bg-primary px-space-sm py-1 font-label-md text-on-primary transition-opacity hover:opacity-90"
        >
          Connect
        </button>
      )}
    </div>
  );
}
