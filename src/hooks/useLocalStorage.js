import { useEffect, useState } from 'react';

/** State that survives reloads. Seeded once, then written on every change. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch (error) {
      // malformed entry — fall back to the seed value below
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // storage can be unavailable (private mode / quota) — keep working in memory
    }
  }, [key, value]);

  return [value, setValue];
}
