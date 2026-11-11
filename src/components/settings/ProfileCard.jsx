import { useRef, useState } from 'react';
import avatarFallback from '../../assets/avatar.jpg';
import { useApp } from '../../store/AppProvider.jsx';
import Icon from '../ui/Icon.jsx';
import { cn } from '../../utils/cn.js';

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

/** Downscales the chosen photo so the data URL fits comfortably in localStorage. */
function toAvatarDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read failed'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('decode failed'));
      image.onload = () => {
        const size = 256;
        const scale = Math.min(1, size / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ProfileCard({ user, onEditProfile, className }) {
  const { updateUser, showToast } = useApp();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handlePhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Choose an image file for your photo', 'error');
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      showToast('Profile photos must be smaller than 8 MB', 'error');
      return;
    }

    setUploading(true);
    try {
      updateUser({ avatar: await toAvatarDataUrl(file) });
      showToast('Profile photo updated', 'photo_camera');
    } catch (error) {
      showToast('Could not read that image. Try another photo.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-ambient',
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-tertiary/10 blur-2xl" />

      <div className="relative mb-space-md">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          aria-label="Change profile photo"
          title="Change profile photo"
          className="group relative block h-20 w-20 rounded-full disabled:cursor-wait"
        >
          <img
            src={user.avatar || avatarFallback}
            alt={`${user.name} profile`}
            className="h-full w-full rounded-full object-cover shadow-md"
          />
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0 flex items-center justify-center rounded-full bg-inverse-surface/45 text-on-primary transition-opacity duration-200',
              uploading
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
            )}
          >
            <Icon name="photo_camera" size={22} />
          </span>
          <span
            className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-tertiary p-1 text-on-tertiary shadow"
            title="Pro member"
          >
            <Icon name="workspace_premium" size={14} filled />
          </span>
          <span className="absolute -bottom-1 -left-1 flex items-center justify-center rounded-full bg-primary p-1 text-on-primary shadow">
            <Icon name="photo_camera" size={12} />
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handlePhoto}
        />
      </div>

      <h2 className="text-center text-body-lg font-medium text-on-surface">{user.name}</h2>
      <p className="mb-space-sm text-center font-body-sm text-on-surface-variant">{user.email}</p>

      <button
        type="button"
        onClick={onEditProfile}
        className="inline-flex items-center gap-space-xs rounded-full bg-primary-fixed px-space-md py-1 font-label-md text-on-primary-fixed shadow-sm transition-colors hover:bg-primary hover:text-on-primary"
      >
        <Icon name="edit" size={16} />
        Edit Profile
      </button>
    </div>
  );
}
