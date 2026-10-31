import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppProvider.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';
import ProfileCard from '../components/settings/ProfileCard.jsx';
import SettingsSection from '../components/settings/SettingsSection.jsx';
import SettingsRow from '../components/settings/SettingsRow.jsx';
import SwitchRow from '../components/settings/SwitchRow.jsx';
import ConnectedAppRow from '../components/settings/ConnectedAppRow.jsx';
import {
  PasswordDialog,
  ProfileDialog,
  TwoFactorDialog,
} from '../components/settings/SettingsDialogs.jsx';
import Icon from '../components/ui/Icon.jsx';
import { cn } from '../utils/cn.js';

function ThemeRow({ dark, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-space-sm p-space-sm">
      <div className="flex min-w-0 flex-col">
        <span className="font-body-md font-medium text-on-surface">Theme Mode</span>
        <span className="font-body-sm text-on-surface-variant">
          Switch between Light and Dark aesthetic
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Theme mode"
        onClick={onToggle}
        className={cn(
          'flex h-8 w-14 shrink-0 items-center rounded-full px-1 transition-colors',
          dark ? 'bg-primary' : 'bg-surface-container-highest',
        )}
      >
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-lowest text-primary-ink shadow transition-transform duration-200',
            dark ? 'translate-x-6' : 'translate-x-0',
          )}
        >
          <Icon name={dark ? 'dark_mode' : 'light_mode'} size={16} filled={dark} />
        </span>
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user, prefs, updatePrefs, setIntegration, signOut, showToast } = useApp();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(null);
  const closeDialog = () => setDialog(null);

  const dark = prefs.theme === 'dark';

  const handleToggleTheme = () => {
    const next = dark ? 'light' : 'dark';
    updatePrefs({ theme: next });
    showToast(next === 'dark' ? 'Dark mode activated' : 'Light mode activated', next === 'dark' ? 'dark_mode' : 'light_mode');
  };

  const handleGoogleIntegration = () => {
    const connected = prefs.integrations?.google === 'connected';
    setIntegration('google', connected ? 'disconnected' : 'connected');
    showToast(
      connected ? 'Google Calendar disconnected' : 'Google Calendar connected',
      connected ? 'link_off' : 'link',
    );
  };

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col gap-space-md pb-space-lg">
      <PageHeader title="Settings" description="Make NotesFlow feel like yours" />

      <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2 lg:gap-space-lg">
        <ProfileCard
          user={user}
          className="lg:col-span-2"
          onEditProfile={() => setDialog('profile')}
        />

        <SettingsSection icon="manage_accounts" tone="primary" title="Account Settings">
          <SettingsRow
            title="Personal Information"
            subtitle="Update your name, bio, and email"
            onClick={() => setDialog('profile')}
          />
        </SettingsSection>

        <SettingsSection icon="palette" tone="tertiary" title="Appearance">
          <ThemeRow dark={dark} onToggle={handleToggleTheme} />
        </SettingsSection>

        <SettingsSection icon="notifications" tone="secondary" title="Notifications">
          <SwitchRow
            title="Push Notifications"
            subtitle="Get notified about task deadlines"
            checked={prefs.pushNotifications}
            onChange={(value) => updatePrefs({ pushNotifications: value })}
          />
          <SwitchRow
            title="Weekly Digest Email"
            subtitle="Summary of completed productivity goals"
            checked={prefs.weeklyDigest}
            onChange={(value) => updatePrefs({ weeklyDigest: value })}
          />
        </SettingsSection>

        <SettingsSection icon="shield" tone="primaryFixed" title="Security & Privacy">
          <SettingsRow
            title="Change Password"
            subtitle="Last updated 3 months ago"
            onClick={() => setDialog('password')}
          />
          <SettingsRow
            title="Two-Factor Authentication"
            subtitle={prefs.twoFactor ? 'Enabled via Authenticator App' : 'Not enabled yet'}
            tone={prefs.twoFactor ? 'success' : 'default'}
            onClick={() => setDialog('twoFactor')}
          />
        </SettingsSection>

        <div className="lg:col-span-2">
          <SettingsSection icon="hub" tone="secondaryFixed" title="Connected Apps">
            <ConnectedAppRow
              app="google"
              connected={prefs.integrations?.google === 'connected'}
              onToggle={handleGoogleIntegration}
            />
          </SettingsSection>
        </div>

        <div className="lg:col-span-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-space-sm rounded-xl bg-error-container py-3 text-body-lg font-semibold text-on-error-container shadow-ambient-sm transition-opacity hover:opacity-90"
          >
            <Icon name="logout" size={20} />
            Log Out
          </button>
        </div>
      </div>

      <ProfileDialog open={dialog === 'profile'} onClose={closeDialog} />
      <PasswordDialog open={dialog === 'password'} onClose={closeDialog} />
      <TwoFactorDialog open={dialog === 'twoFactor'} onClose={closeDialog} />
    </div>
  );
}
