export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL_PATTERN.test(value.trim());

/** 8+ characters with at least one letter and one digit. */
export function passwordIssue(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Use at least 8 characters.';
  if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
    return 'Include at least one letter and one number.';
  }
  return '';
}
