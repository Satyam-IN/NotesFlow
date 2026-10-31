export default function SocialButtons({ onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-space-md">
      <button
        type="button"
        onClick={() => onSelect('Google')}
        className="flex h-11 items-center justify-center gap-space-sm rounded-lg bg-surface-container-low font-label-md text-on-surface transition-colors hover:bg-surface-container"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            fill="#4285F4"
          />
          <path
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.18 21.31 7.23 24 12 24z"
            fill="#34A853"
          />
          <path
            d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.2C.43 8.15 0 9.92 0 12s.43 3.85 1.2 5.4l4.07-3.16z"
            fill="#FBBC05"
          />
          <path
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.69 1.2 6.6l4.07 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
            fill="#EA4335"
          />
        </svg>
        Google
      </button>

      <button
        type="button"
        onClick={() => onSelect('Apple')}
        className="flex h-11 items-center justify-center gap-space-sm rounded-lg bg-surface-container-low font-label-md text-on-surface transition-colors hover:bg-surface-container"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 5.35c.57-.69.96-1.65.85-2.61-.84.04-1.87.56-2.45 1.25-.53.62-.99 1.61-.87 2.55.94.07 1.9-.49 2.47-1.19z" />
        </svg>
        Apple
      </button>
    </div>
  );
}
