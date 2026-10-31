import Switch from '../ui/Switch.jsx';

export default function SwitchRow({ title, subtitle, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-space-sm p-space-sm">
      <div className="flex min-w-0 flex-col">
        <span className="font-body-md font-medium text-on-surface">{title}</span>
        <span className="font-body-sm text-on-surface-variant">{subtitle}</span>
      </div>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
