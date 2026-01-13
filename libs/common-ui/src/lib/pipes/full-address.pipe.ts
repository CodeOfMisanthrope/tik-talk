import { Pipe, PipeTransform } from '@angular/core';
import { DadataSuggestions } from '../../../../data-access/src/lib/dadata/interfaces/dadata.interface';

@Pipe({
  name: 'fullAddress',
})
export class FullAddressPipe implements PipeTransform {
  transform(value: DadataSuggestions, ...args: unknown[]): unknown {
    const {city, street, house} = value.data;
    return `${city || ''} ${street || ''} ${house || ''}`.trim();
  }
}
