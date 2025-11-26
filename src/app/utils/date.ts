import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

export function timeAgo(date: Date) {
  return getDiffTime(date);
}

export function getDiffTime(date: Date) {
  dayjs.extend(relativeTime);
  dayjs.locale("ru");
  return dayjs().to(date);
}
