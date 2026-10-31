import logo from '../../assets/notesflow-icon.png';
import Icon from '../ui/Icon.jsx';

const HIGHLIGHTS = [
  'Focus-first daily planning',
  'Notes that stay out of your way',
  'A calendar that mirrors your tasks',
];

/** Desktop-only brand panel; mobile keeps the Stitch hero above the card. */
export default function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-primary p-space-xl text-on-primary lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-surface-tint/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-tertiary/20 blur-3xl" />

      <div className="relative flex items-center gap-space-sm">
        <img src={logo} alt="" className="h-10 w-10 rounded-xl object-contain shadow-lg" />
        <span className="text-headline-sm tracking-tight">
          Notes<span className="text-on-primary-fixed-variant">Flow</span>
        </span>
      </div>

      <div className="relative flex flex-col gap-space-md">
        <h1 className="max-w-md text-headline-xl">
          Streamline your workflow with intelligence &amp; elegance.
        </h1>
        <p className="max-w-sm text-body-lg text-on-primary/80">
          One calm workspace for tasks, notes, and your schedule.
        </p>
        <ul className="mt-space-md flex flex-col gap-space-sm">
          {HIGHLIGHTS.map((text) => (
            <li key={text} className="flex items-center gap-space-sm text-body-md text-on-primary/90">
              <Icon name="check_circle" size={18} />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <figure className="relative max-w-sm rounded-xl border border-on-primary/15 bg-on-primary/10 p-space-md backdrop-blur">
        <blockquote className="text-body-md text-on-primary/90">
          “NotesFlow gives our design team one calm place to plan the week.”
        </blockquote>
        <figcaption className="mt-space-sm font-label-sm uppercase tracking-wider text-on-primary/60">
          Priya N. · Design lead
        </figcaption>
      </figure>
    </div>
  );
}
