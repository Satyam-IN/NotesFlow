import Card from '../ui/Card.jsx';
import Chip from '../ui/Chip.jsx';
import DropdownMenu from '../ui/DropdownMenu.jsx';
import { NOTE_ACCENTS, NOTE_CATEGORIES, NOTE_CATEGORY_TONE } from '../../data/constants.js';
import { formatFullDate } from '../../utils/date.js';
import { cn } from '../../utils/cn.js';

const categoryLabel = (id) =>
  NOTE_CATEGORIES.find((category) => category.id === id)?.label ?? 'Note';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <Card
      tone="lowest"
      className="group relative flex flex-col justify-between overflow-hidden p-space-md shadow-ambient-sm transition-all hover:shadow-ambient-lg"
    >
      <div
        className={cn(
          'absolute left-0 top-0 h-full w-1.5',
          NOTE_ACCENTS[note.accent] ?? NOTE_ACCENTS.primary,
        )}
      />

      <div className="flex flex-col gap-space-xs">
        <div className="flex items-start justify-between gap-space-sm">
          <button
            type="button"
            onClick={() => onEdit(note)}
            title="Edit note"
            className="min-w-0 flex-1 text-left"
          >
            <h3 className="line-clamp-1 text-body-lg font-medium text-on-surface transition-colors group-hover:text-primary-ink">
              {note.title}
            </h3>
          </button>
          <DropdownMenu
            label={`Note options for ${note.title}`}
            items={[
              { label: 'Edit note', icon: 'edit', onClick: () => onEdit(note) },
              { label: 'Delete note', icon: 'delete', danger: true, onClick: () => onDelete(note) },
            ]}
          />
        </div>
        {note.body ? (
          <p className="line-clamp-2 text-body-sm text-on-surface-variant">{note.body}</p>
        ) : null}
      </div>

      <div className="mt-space-md flex items-center justify-between gap-space-sm pt-space-sm text-label-sm text-outline">
        <div className="flex flex-wrap items-center gap-space-xs">
          <Chip
            size="sm"
            tone={NOTE_CATEGORY_TONE[note.category] ?? 'neutral'}
            className="text-label-sm"
          >
            {categoryLabel(note.category)}
          </Chip>
          {note.tags?.map((tag) => (
            <Chip key={tag} size="sm" tone="neutral" className="text-label-sm">
              {tag}
            </Chip>
          ))}
        </div>
        <span className="shrink-0">{formatFullDate(new Date(note.createdAt))}</span>
      </div>
    </Card>
  );
}
