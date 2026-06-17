import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLevel(points: number): number {
  if (points < 50) return 1;
  if (points < 150) return 2;
  if (points < 300) return 3;
  if (points < 500) return 4;
  if (points < 800) return 5;
  if (points < 1200) return 6;
  if (points < 1700) return 7;
  if (points < 2300) return 8;
  if (points < 3000) return 9;
  return 10;
}

export function pointsForNextLevel(currentPoints: number): number {
  const thresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000];
  const level = calculateLevel(currentPoints);
  if (level >= 10) return 3000;
  return thresholds[level];
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getWeekDates(): { start: string; end: string } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
}
