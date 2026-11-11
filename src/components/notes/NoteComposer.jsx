import { useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import { NOTE_CATEGORIES } from '../../data/constants.js';
import Sheet from '../ui/Sheet.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { Field, SelectInput, TextArea, TextInput } from '../ui/Field.jsx';

const ACCENT_BY_CATEGORY = {
  work: 'primary',
  personal: 'tertiary',
  ideas: 'primary-container',
};

const EMPTY = { title: '', body: '', category: 'work', tags: '' };

function toForm(note) {
  if (!note) return EMPTY;
  return {
    title: note.title,
    body: note.body ?? '',
    category: note.category,
    tags: (note.tags ?? []).join(', '),
  };
}

export default function NoteComposer({ note, onClose }) {
  const { addNote, updateNote, deleteNote } = useApp();
  const [form, setForm] = useState(() => toForm(note));
  const [errors, setErrors] = useState({});

  const setField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      setErrors({ title: 'Give your note a title.' });
      return;
    }
    if (trimmedTitle.length < 3) {
      setErrors({ title: 'Use at least 3 characters.' });
      return;
    }

    const tags = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 4);

    const payload = {
      title: trimmedTitle,
      body: form.body.trim(),
      category: form.category,
      tags,
    };

    if (note) {
      const accent =
        note.category === form.category
          ? note.accent
          : ACCENT_BY_CATEGORY[form.category] ?? 'primary';
      updateNote(note.id, { ...payload, accent });
    } else {
      addNote({ ...payload, accent: ACCENT_BY_CATEGORY[form.category] ?? 'primary' });
    }
    onClose();
  };

  const handleDelete = () => {
    deleteNote(note.id);
    onClose();
  };

  return (
    <Sheet
      open
      onClose={onClose}
      icon="edit_note"
      title={note ? 'Edit note' : 'New note'}
      subtitle={note ? 'Changes are saved locally' : 'Capture a thought before it escapes'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
        <Field label="Title" htmlFor="note-title" error={errors.title}>
          <TextInput
            id="note-title"
            data-autofocus
            value={form.title}
            onChange={setField('title')}
            placeholder="e.g. Q4 planning notes"
            maxLength={80}
            error={errors.title}
          />
        </Field>

        <Field label="Note" htmlFor="note-body">
          <TextArea
            id="note-body"
            value={form.body}
            onChange={setField('body')}
            placeholder="Write freely — markdown is not required"
            rows={6}
            maxLength={800}
          />
        </Field>

        <div className="grid grid-cols-2 gap-space-md">
          <Field label="Category" htmlFor="note-category">
            <SelectInput id="note-category" value={form.category} onChange={setField('category')}>
              {NOTE_CATEGORIES.filter((category) => category.id !== 'all').map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Tags" htmlFor="note-tags" hint="Comma separated, up to 4">
            <TextInput
              id="note-tags"
              value={form.tags}
              onChange={setField('tags')}
              placeholder="Strategy, Reading"
            />
          </Field>
        </div>

        <div className="mt-space-xs flex items-center justify-between gap-space-sm">
          {note ? (
            <Button variant="ghost" onClick={handleDelete} className="text-error">
              <Icon name="delete" size={18} />
              Delete
            </Button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-space-sm">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{note ? 'Save changes' : 'Save note'}</Button>
          </div>
        </div>
      </form>
    </Sheet>
  );
}
