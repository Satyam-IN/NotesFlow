import { useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import { PRIORITIES } from '../../data/constants.js';
import { toISODate } from '../../utils/date.js';
import Sheet from '../ui/Sheet.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import { Field, SelectInput, TextArea, TextInput } from '../ui/Field.jsx';

const EMPTY = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: toISODate(new Date()),
  dueTime: '',
  tags: '',
};

function toForm(task) {
  if (!task) return EMPTY;
  return {
    title: task.title,
    description: task.description ?? '',
    priority: task.priority ?? 'Medium',
    dueDate: task.dueDate ?? '',
    dueTime: task.dueTime ?? '',
    tags: (task.tags ?? []).join(', '),
  };
}

export default function TaskComposer({ task, onClose }) {
  const { addTask, updateTask, deleteTask } = useApp();
  const [form, setForm] = useState(() => toForm(task));
  const [errors, setErrors] = useState({});

  const setField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'A task title is required.';
    else if (form.title.trim().length < 3) next.title = 'Use at least 3 characters.';
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const tags = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 4);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      dueDate: form.dueDate,
      dueTime: form.dueTime,
      tags,
    };

    if (task) updateTask(task.id, payload);
    else addTask(payload);
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <Sheet
      open
      onClose={onClose}
      icon="add_task"
      title={task ? 'Edit task' : 'Create a new task'}
      subtitle={task ? 'Update details or move the due date' : 'Add it to today’s focus'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
        <Field label="Task title" htmlFor="task-title" error={errors.title}>
          <TextInput
            id="task-title"
            data-autofocus
            value={form.title}
            onChange={setField('title')}
            placeholder="e.g. Redesign mobile navigation bar"
            maxLength={90}
            error={errors.title}
          />
        </Field>

        <Field label="Description" htmlFor="task-description">
          <TextArea
            id="task-description"
            value={form.description}
            onChange={setField('description')}
            placeholder="Add context, links, or acceptance criteria"
            rows={3}
          />
        </Field>

        <div className="grid grid-cols-2 gap-space-md">
          <Field label="Priority" htmlFor="task-priority">
            <SelectInput id="task-priority" value={form.priority} onChange={setField('priority')}>
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Due date" htmlFor="task-due">
            <TextInput
              id="task-due"
              type="date"
              value={form.dueDate}
              onChange={setField('dueDate')}
            />
          </Field>
          <Field label="Time (optional)" htmlFor="task-time">
            <TextInput
              id="task-time"
              type="time"
              value={form.dueTime}
              onChange={setField('dueTime')}
            />
          </Field>
          <Field label="Tags" htmlFor="task-tags" hint="Comma separated, up to 4">
            <TextInput
              id="task-tags"
              value={form.tags}
              onChange={setField('tags')}
              placeholder="Design, UI/UX"
            />
          </Field>
        </div>

        <div className="mt-space-xs flex items-center justify-between gap-space-sm">
          {task ? (
            <Button variant="ghost" size="md" onClick={handleDelete} className="text-error">
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
            <Button type="submit">{task ? 'Save changes' : 'Create task'}</Button>
          </div>
        </div>
      </form>
    </Sheet>
  );
}
