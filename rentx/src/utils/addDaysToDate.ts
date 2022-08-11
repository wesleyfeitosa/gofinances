import { addDays } from 'date-fns';

export function addDaysToDate(date: Date): Date {
  return addDays(date, 1);
}
