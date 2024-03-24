import clsx, { ClassValue } from 'clsx';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale/hu';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHu(date: Date, formatString: string) {
  return format(date, formatString, { locale: hu });
}
