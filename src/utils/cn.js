/** Joins conditional class names without pulling in a dependency. */
export function cn(...values) {
  return values.filter(Boolean).join(' ');
}

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
