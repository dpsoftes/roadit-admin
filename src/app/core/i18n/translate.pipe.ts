import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private i18nService = inject(I18nService);

  transform(key: any, params?: Record<string, any>): string {
    return this.i18nService.translate(key, params);
  }
}