/** Desktop-only page heading. Mobile uses the fixed app bar title instead. */
export default function PageHeader({ title, description, children }) {
  return (
    <div className="hidden items-center justify-between gap-space-md lg:flex">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-lg text-on-surface">{title}</h1>
        {description ? (
          <p className="text-body-sm text-on-surface-variant">{description}</p>
        ) : null}
      </div>
      {children ? <div className="flex items-center gap-space-sm">{children}</div> : null}
    </div>
  );
}
