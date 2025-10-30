import { Pipe, PipeTransform } from '@angular/core';
import { Helpers } from '@utils/helpers';

@Pipe({
  name: 'toUrl',
  standalone: true
})
export class ToUrl implements PipeTransform {
  transform(value: string): string {
    return Helpers.toUrl(value);
  }
}