import Icon from './Icon.jsx';

export default function SearchInput({ id, value, onChange, onClear, placeholder }) {
  return (
    <div className="relative flex items-center">
      <Icon
        name="search"
        size={20}
        className="pointer-events-none absolute left-space-md text-outline"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl bg-surface-container pl-12 pr-12 text-body-md text-on-surface outline-none transition-all placeholder:text-outline focus:ring-2 focus:ring-primary"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-space-md flex h-8 w-8 items-center justify-center rounded-full text-outline transition-colors hover:text-on-surface"
        >
          <Icon name="close" size={18} />
        </button>
      ) : null}
    </div>
  );
}
