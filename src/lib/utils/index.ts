import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  // Add noon time to avoid timezone shifts when dealing with date-only strings
  const dateWithTime = date.includes('T') ? date : date + 'T12:00:00';
  return new Date(dateWithTime).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isOverdue(deadline: string): boolean {
  // Add noon time to avoid timezone shifts and compare dates properly
  const deadlineWithTime = deadline.includes('T') ? deadline : deadline + 'T12:00:00';
  const deadlineDate = new Date(deadlineWithTime);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
  return deadlineDate < today;
}

export function generateId(): number {
  return Date.now() + Math.random();
} 