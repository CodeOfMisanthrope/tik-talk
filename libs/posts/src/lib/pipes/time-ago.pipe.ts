import { Pipe, PipeTransform } from '@angular/core';
// import { timeAgo } from '../../utils/date';
import {timeAgo} from '@tt/shared';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null, ...args: unknown[]): string | null {
    if (!value) return null;

    const date = new Date(value);
    return timeAgo(date);
  }
}
