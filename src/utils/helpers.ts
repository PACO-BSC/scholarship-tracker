import { Scholarship, Statistics } from '../types';
import { differenceInDays, isPast, parseISO } from 'date-fns';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function calculateStatistics(scholarships: Scholarship[]): Statistics {
  const stats: Statistics = {
    total: scholarships.length,
    submitted: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    totalAmount: 0,
    acceptedAmount: 0,
  };

  scholarships.forEach((scholarship) => {
    stats.totalAmount += scholarship.amount;

    switch (scholarship.status) {
      case 'submitted':
        stats.submitted++;
        break;
      case 'accepted':
        stats.accepted++;
        stats.acceptedAmount += scholarship.amount;
        break;
      case 'rejected':
        stats.rejected++;
        break;
      case 'draft':
      case 'in-progress':
        stats.pending++;
        break;
    }
  });

  return stats;
}

export function getDaysUntilDeadline(deadline: string): number {
  try {
    const deadlineDate = parseISO(deadline);
    return differenceInDays(deadlineDate, new Date());
  } catch {
    return -1;
  }
}

export function isDeadlineSoon(deadline: string, days: number = 7): boolean {
  const daysUntil = getDaysUntilDeadline(deadline);
  return daysUntil >= 0 && daysUntil <= days;
}

export function isDeadlinePassed(deadline: string): boolean {
  try {
    return isPast(parseISO(deadline));
  } catch {
    return false;
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
