import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppProvider.jsx';
import BrandPanel from '../components/auth/BrandPanel.jsx';
import AuthTabs from '../components/auth/AuthTabs.jsx';
import SocialButtons from '../components/auth/SocialButtons.jsx';
import { Field, TextInput } from '../components/ui/Field.jsx';
import Icon from '../components/ui/Icon.jsx';
import logo from '../assets/notesflow-icon.png';
import { isValidEmail, passwordIssue } from '../utils/validation.js';

const EMPTY_FORM = { name: '', email: '', password: '' };

export default function AuthPage() {
  const { signIn, signUp, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const redirectTo = (() => {
    const from = location.state?.from;
    const path = typeof from === 'string' ? from : from?.pathname;
    return !path || path.startsWith('/login') ? '/' : path;
  })();

  const setField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setErrors({});
    setReveal(false);
  };

  const validate = () => {
    const nextErrors = {};
    if (mode === 'signup') {
      if (!form.name.trim()) nextErrors.name = 'Enter your full name.';
      else if (form.name.trim().length < 2) nextErrors.name = 'That name looks too short.';
    }
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!isValidEmail(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.password) nextErrors.password = 'Password is required.';
    else {
      const issue = passwordIssue(form.password);
      if (issue) nextErrors.password = issue;
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      const result =
        mode === 'login'
          ? signIn({ email: form.email, password: form.password, remember })
          : signUp({ name: form.name, email: form.email, password: form.password, remember });

      setLoading(false);

      if (!result.ok) {
        setErrors({ [result.field]: result.message });
        return;
      }

      if (mode === 'login') {
        showToast('Welcome back to NotesFlow', 'waving_hand');
      }
      navigate(redirectTo, { replace: true });
    }, 520);
  };

  const isSignup = mode === 'signup';

  return (
    <div className="min-h-dvh bg-surface text-on-surface lg:grid lg:grid-cols-2">
      <BrandPanel />

      <main className="flex min-h-dvh flex-col px-space-md pb-space-lg pt-safe lg:justify-center lg:px-space-xl">
        <div className="mx-auto flex w-full max-w-[440px] flex-col">
          <div className="flex items-center gap-space-sm py-space-md lg:hidden">
            <img src={logo} alt="NotesFlow" className="h-8 w-8 rounded-lg object-contain" />
            <span className="text-body-lg font-medium tracking-tight text-on-surface">
              Notes<span className="text-primary-ink">Flow</span>
            </span>
          </div>

          <div className="relative flex flex-col items-center overflow-hidden px-space-md pb-space-md pt-space-md text-center">
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary-fixed/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-tertiary-fixed/20 blur-2xl" />
            <div className="mb-space-sm flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-container shadow-lg shadow-primary/20 transition-transform hover:rotate-6">
              <Icon name="bolt" size={32} filled className="text-on-primary-container" />
            </div>
            <h1 className="mb-1 text-body-lg font-semibold tracking-tight text-on-surface">
              {isSignup ? 'Join NotesFlow today' : 'Welcome back!'}
            </h1>
            <p className="max-w-[280px] font-body-md text-on-surface-variant">
              Streamline your workflow with intelligence &amp; elegance.
            </p>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-ambient">
            <AuthTabs mode={mode} onChange={switchMode} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
              {isSignup ? (
                <Field label="Full Name" htmlFor="auth-name" error={errors.name}>
                  <TextInput
                    id="auth-name"
                    icon="badge"
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    error={errors.name}
                  />
                </Field>
              ) : null}

              <Field label="Email Address" htmlFor="auth-email" error={errors.email}>
                <TextInput
                  id="auth-email"
                  type="email"
                  icon="mail"
                  value={form.email}
                  onChange={setField('email')}
                  placeholder="alex@company.com"
                  autoComplete="email"
                  error={errors.email}
                />
              </Field>

              <Field label="Password" htmlFor="auth-password" error={errors.password}>
                <TextInput
                  id="auth-password"
                  type={reveal ? 'text' : 'password'}
                  icon="lock"
                  value={form.password}
                  onChange={setField('password')}
                  placeholder="••••••••"
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  error={errors.password}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setReveal((value) => !value)}
                      aria-label={reveal ? 'Hide password' : 'Show password'}
                      className="text-outline transition-colors hover:text-on-surface"
                    >
                      <Icon name={reveal ? 'visibility' : 'visibility_off'} size={20} />
                    </button>
                  }
                />
              </Field>

              <div className="flex items-center justify-between py-space-xs">
                <label className="flex cursor-pointer select-none items-center gap-space-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded accent-primary"
                  />
                  <span className="text-body-sm text-on-surface-variant">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    showToast('Password reset link sent to your inbox', 'forward_to_inbox')
                  }
                  className="text-body-sm font-medium text-primary-ink hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-space-xs flex h-12 w-full items-center justify-center gap-space-sm rounded-lg bg-primary font-label-md text-on-primary shadow-md shadow-primary/25 transition-all hover:bg-surface-tint active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/40 border-t-on-primary"
                    />
                    <span>{isSignup ? 'Creating account…' : 'Signing in…'}</span>
                  </>
                ) : (
                  <>
                    <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                    <Icon name="arrow_forward" size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-space-sm flex items-center py-space-md">
              <div className="h-px flex-grow bg-surface-container-high" />
              <span className="mx-4 flex-shrink font-label-sm uppercase tracking-wider text-outline">
                Or continue with
              </span>
              <div className="h-px flex-grow bg-surface-container-high" />
            </div>

            <SocialButtons
              onSelect={(provider) =>
                showToast(`${provider} sign-in is not connected in this demo`, 'info')
              }
            />
          </div>

          <div className="px-space-md pt-space-md text-center">
            <p className="text-body-sm text-on-surface-variant">
              Protected by enterprise-grade security &amp; encryption.
              <br />
              Need help?{' '}
              <a
                href="mailto:support@notesflow.io?subject=NotesFlow%20support"
                className="font-medium text-primary-ink hover:underline"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
