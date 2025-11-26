import { Pipe, PipeTransform } from '@angular/core';
import {calcDiffTime} from '../../utils/date';
// import {convertToValidDateStr} from '../../utils/date';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null, ...args: unknown[]): unknown {
    if (!value) return null;
    // console.log(value);
    // convertToValidDateStr(value);
    const date = new Date(value);
    // console.log(date);
    calcDiffTime(date);
    return value;
  }
}
