import { useState } from 'react';
import { useApp } from '../../store/AppProvider.jsx';
import Sheet from '../ui/Sheet.jsx';
import Button from '../ui/Button.jsx';
import Switch from '../ui/Switch.jsx';
import { Field, TextInput } from '../ui/Field.jsx';
import { isValidEmail, passwordIssue } from '../../utils/validation.js';

export function ProfileDialog({ open, onClose }) {
  const { user, updateUser } = useApp();
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Enter your full name.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!isValidEmail(form.email)) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    updateUser({ name: form.name.trim(), email: form.email.trim().toLowerCase() });
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} icon="manage_accounts" title="Personal information" size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
        <Field label="Full name" htmlFor="profile-name" error={errors.name}>
          <TextInput
            id="profile-name"
            data-autofocus
            value={form.name}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, name: event.target.value }));
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
          />
        </Field>
        <Field label="Email address" htmlFor="profile-email" error={errors.email}>
          <TextInput
            id="profile-email"
            type="email"
            icon="mail"
            value={form.email}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, email: event.target.value }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
          />
        </Field>
        <div className="mt-space-xs flex justify-end gap-space-sm">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Sheet>
  );
}

export function PasswordDialog({ open, onClose }) {
  const { showToast } = useApp();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.current) nextErrors.current = 'Enter your current password.';
    const issue = passwordIssue(form.next);
    if (issue) nextErrors.next = issue;
    if (form.confirm !== form.next) nextErrors.confirm = 'Passwords do not match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    showToast('Password updated successfully', 'lock_reset');
    onClose();
  };

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      icon="lock_reset"
      title="Change password"
      subtitle="Use at least 8 characters with a letter and a number"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
        <Field label="Current password" htmlFor="pw-current" error={errors.current}>
          <TextInput
            id="pw-current"
            type="password"
            icon="lock"
            data-autofocus
            value={form.current}
            onChange={update('current')}
            error={errors.current}
          />
        </Field>
        <Field label="New password" htmlFor="pw-new" error={errors.next}>
          <TextInput
            id="pw-new"
            type="password"
            icon="password"
            value={form.next}
            onChange={update('next')}
            error={errors.next}
          />
        </Field>
        <Field label="Confirm new password" htmlFor="pw-confirm" error={errors.confirm}>
          <TextInput
            id="pw-confirm"
            type="password"
            icon="password"
            value={form.confirm}
            onChange={update('confirm')}
            error={errors.confirm}
          />
        </Field>
        <div className="mt-space-xs flex justify-end gap-space-sm">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Update password</Button>
        </div>
      </form>
    </Sheet>
  );
}

export function TwoFactorDialog({ open, onClose }) {
  const { prefs, updatePrefs, showToast } = useApp();

  const toggle = (value) => {
    updatePrefs({ twoFactor: value });
    showToast(
      value ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
      value ? 'verified_user' : 'gpp_maybe',
    );
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      icon="security"
      title="Two-factor authentication"
      subtitle="Extra security for your NotesFlow account"
      size="sm"
    >
      <div className="flex items-center justify-between gap-space-md rounded-xl bg-surface-container-low p-space-md">
        <div className="flex flex-col">
          <span className="font-body-md font-medium text-on-surface">Authenticator app</span>
          <span className="text-body-sm text-on-surface-variant">
            {prefs.twoFactor ? 'Enabled — codes are required at sign in' : 'Disabled'}
          </span>
        </div>
        <Switch checked={prefs.twoFactor} onChange={toggle} label="Authenticator app" />
      </div>
      <p className="text-label-sm text-on-surface-variant">
        Recovery codes are generated once two-factor is enabled. This demo stores the preference
        locally only.
      </p>
      <div className="flex justify-end">
        <Button onClick={onClose}>Done</Button>
      </div>
    </Sheet>
  );
}
