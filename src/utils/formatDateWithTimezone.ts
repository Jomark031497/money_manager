import { format } from 'date-fns-tz';

export function formatDateWithTimezone(date: Date, dateFormat = 'yyyy-MM-dd HH:mm:ss') {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return format(date, dateFormat, { timeZone: userTimezone });
}
