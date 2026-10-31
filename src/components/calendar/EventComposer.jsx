import { useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import { EVENT_TYPE_OPTIONS } from '../../data/constants.js';
import { toISODate } from '../../utils/date.js';
import Sheet from '../ui/Sheet.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import Tabs from '../ui/Tabs.jsx';
import { Field, TextInput } from '../ui/Field.jsx';

/**
 * The Stitch sheet exposes Title / Date / Type; Time and the type pills are
 * additive so every saved event can render on the timeline.
 */
export default function EventComposer({ event, defaultDate, onClose }) {
  const { addEvent, updateEvent, deleteEvent } = useApp();
  const [form, setForm] = useState(() => ({
    title: event?.title ?? '',
    date: event?.date ?? defaultDate ?? toISODate(new Date()),
    start: event?.start ?? '09:00',
    type: event?.type ?? 'meeting',
  }));
  const [errors, setErrors] = useState({});

  const setField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const title = form.title.trim();
    const nextErrors = {};
    if (!title) nextErrors.title = 'An event title is required.';
    else if (title.length < 3) nextErrors.title = 'Use at least 3 characters.';
    if (!form.date) nextErrors.date = 'Pick a date for this event.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload = {
      title,
      date: form.date,
      start: form.start || '09:00',
      type: form.type,
    };

    if (event) {
      const end = event.start === form.start ? event.end : '';
      updateEvent(event.id, { ...payload, end });
    } else {
      addEvent({ ...payload, end: '' });
    }
    onClose();
  };

  return (
    <Sheet
      open
      onClose={onClose}
      icon="event"
      title={event ? 'Edit event' : 'Create new event'}
      subtitle={event ? 'Adjust the schedule details' : 'Block time for what matters'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
        <Field label="Event title" htmlFor="event-title" error={errors.title}>
          <TextInput
            id="event-title"
            data-autofocus
            value={form.title}
            onChange={(inputEvent) => setField('title')(inputEvent.target.value)}
            placeholder="e.g. Client pitch meeting"
            maxLength={80}
            error={errors.title}
          />
        </Field>

        <div className="grid grid-cols-2 gap-space-md">
          <Field label="Date" htmlFor="event-date" error={errors.date}>
            <TextInput
              id="event-date"
              type="date"
              value={form.date}
              onChange={(inputEvent) => setField('date')(inputEvent.target.value)}
              error={errors.date}
            />
          </Field>
          <Field label="Start time" htmlFor="event-time">
            <TextInput
              id="event-time"
              type="time"
              value={form.start}
              onChange={(inputEvent) => setField('start')(inputEvent.target.value)}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-on-surface">Type</span>
          <Tabs
            items={EVENT_TYPE_OPTIONS}
            value={form.type}
            onChange={setField('type')}
            ariaLabel="Event type"
            className="flex-wrap"
          />
        </div>

        <div className="mt-space-xs flex items-center justify-between gap-space-sm">
          {event ? (
            <Button
              variant="ghost"
              className="text-error"
              onClick={() => {
                deleteEvent(event.id);
                onClose();
              }}
            >
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
            <Button type="submit">{event ? 'Save event' : 'Add event'}</Button>
          </div>
        </div>
      </form>
    </Sheet>
  );
}
