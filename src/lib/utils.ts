// ============================================================
// Jamin Lelo — Utility Functions
// ============================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a phone number for display.
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[^0-9+]/g, '');
  if (cleaned.startsWith('+91') && cleaned.length === 13) {
    return `+91 ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
}

/**
 * Generate a property code from location code and sequence.
 */
export function generatePropertyCode(locationCode: string, sequence: number): string {
  return `ZS-${locationCode}-${String(sequence).padStart(4, '0')}`;
}

/**
 * Parse a property code to extract location and sequence.
 */
export function parsePropertyCode(code: string): { prefix: string; location: string; sequence: number } | null {
  const match = code.match(/^(ZS)-([A-Z]{2,4})-(\d+)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    location: match[2],
    sequence: parseInt(match[3], 10),
  };
}

/**
 * Truncate text to a given length, adding ellipsis if needed.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '…';
}

/**
 * Format a date for display (Indian format).
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a date with time.
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago").
 */
export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) return formatDate(d);
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Slugify a string for URLs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Validate Indian mobile number.
 */
export function isValidIndianMobile(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned) || /^91[6-9]\d{9}$/.test(cleaned);
}

/**
 * Get initials from a name.
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
