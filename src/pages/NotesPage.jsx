import { useMemo, useState } from 'react';
import { useApp } from '../store/AppProvider.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import NoteCard from '../components/notes/NoteCard.jsx';
import SearchInput from '../components/ui/SearchInput.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import Fab from '../components/ui/Fab.jsx';
import Icon from '../components/ui/Icon.jsx';
import { NOTE_CATEGORIES } from '../data/constants.js';
import { cn } from '../utils/cn.js';

function NoteViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center rounded-lg bg-surface-container p-1">
      {[
        { id: 'grid', icon: 'grid_view', label: 'Grid view' },
        { id: 'list', icon: 'view_agenda', label: 'List view' },
      ].map((option) => {
        const active = view === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-label={option.label}
            aria-pressed={active}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md transition-all',
              active
                ? 'bg-surface-container-lowest text-primary-ink shadow-sm'
                : 'text-outline hover:text-on-surface',
            )}
          >
            <Icon name={option.icon} size={18} />
          </button>
        );
      })}
    </div>
  );
}

export default function NotesPage() {
  const { notes, openComposer, deleteNote, showToast } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState('grid');

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesCategory = category === 'all' || note.category === category;
      const haystack = [note.title, note.body, ...(note.tags ?? [])]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [notes, query, category]);

  const filtering = Boolean(query.trim()) || category !== 'all';

  return (
    <div className="flex flex-col gap-space-md pb-space-lg">
      <PageHeader title="Notes" description="Capture ideas before they float away">
        <button
          type="button"
          onClick={() => openComposer('note')}
          className="flex h-10 items-center gap-space-sm rounded-lg bg-primary px-space-md font-label-md font-semibold text-on-primary shadow-sm transition-all hover:bg-surface-tint"
        >
          <Icon name="note_add" size={18} />
          New Note
        </button>
      </PageHeader>

      <div className="sticky top-16 z-30 -mx-space-md flex flex-col gap-space-sm bg-surface/90 px-space-md py-space-sm backdrop-blur-xl lg:static lg:z-auto lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <div className="flex items-center gap-space-sm">
          <div className="min-w-0 flex-1">
            <SearchInput
              id="notes-search"
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
              placeholder="Search notes, tags, or content..."
            />
          </div>
          <div className="hidden lg:block">
            <NoteViewToggle view={view} onChange={setView} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-space-sm">
          <div className="no-scrollbar flex min-w-0 flex-1 gap-space-xs overflow-x-auto">
            {NOTE_CATEGORIES.map((item) => {
              const active = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={active}
                  className={cn(
                    'whitespace-nowrap rounded-full px-space-md py-2 text-label-md font-medium transition-all',
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high',
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="lg:hidden">
            <NoteViewToggle view={view} onChange={setView} />
          </div>
        </div>
      </div>

      {visible.length ? (
        <div
          className={cn(
            view === 'grid'
              ? 'grid grid-cols-1 gap-space-md md:grid-cols-2 xl:grid-cols-3'
              : 'flex flex-col gap-space-sm',
          )}
        >
          {visible.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(selected) => openComposer('note', selected)}
              onDelete={(selected) => {
                deleteNote(selected.id);
                showToast('Note deleted');
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="description"
          title={filtering ? 'No notes found' : 'No notes yet'}
          description={
            filtering
              ? 'We could not find anything matching your search. Try adjusting filters or create a new note.'
              : 'Start a note to capture a thought, meeting takeaway or idea.'
          }
          action={
            <div className="flex flex-wrap items-center justify-center gap-space-sm">
              <Button onClick={() => openComposer('note')}>Create note</Button>
              {filtering ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setQuery('');
                    setCategory('all');
                  }}
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          }
        />
      )}

      <Fab onClick={() => openComposer('note')} label="Create note" />
    </div>
  );
}
