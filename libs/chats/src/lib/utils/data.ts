import { Message } from '@tt/data-access';
import {DateTime} from 'luxon';

export function groupMessagesByTimeZone(messages: Message[]) {
  const groups = new Map<string, Message[]>();

  const today = DateTime.now().startOf('day');
  const yesterday = today.minus({ days: 1 });

  messages.forEach((message) => {
    const messageDate = DateTime.fromISO(message.createdAt, { zone: 'UTC' })
      .setZone(DateTime.local().zone)
      .startOf('day');

    let dateLabel: string;

    if (messageDate.equals(today)) {
      dateLabel = 'Сегодня';
    } else if (messageDate.equals(yesterday)) {
      dateLabel = 'Вчера';
    } else {
      dateLabel = messageDate.toFormat('MM.dd.yyyy');
    }

    if (!groups.has(dateLabel)) {
      groups.set(dateLabel, []);
    }

    groups.get(dateLabel)?.push(message);
  });

  return Array.from(groups.entries());
}
