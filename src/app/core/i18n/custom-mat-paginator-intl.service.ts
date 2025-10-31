import { Injectable, inject, effect } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { I18nService } from './i18n.service';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  private i18nService = inject(I18nService);

  constructor() {
    super();

    //INICIALIZAR CON EL IDIOMA ACTUAL
    this.updateTranslations();

    //EFECTO REACTIVO: ACTUALIZAR CUANDO CAMBIE EL IDIOMA
    effect(() => {
      const currentLang = this.i18nService.currentLanguage();
      this.updateTranslations();
      //NOTIFICAR AL PAGINADOR QUE LAS TRADUCCIONES HAN CAMBIADO
      this.changes.next();
    });
  }

  private updateTranslations(): void {
    const lang = this.i18nService.currentLanguage();

    //USAR EL SISTEMA DE TRADUCCIÓN EXISTENTE
    this.itemsPerPageLabel = this.i18nService.translate('paginator.itemsPerPageLabel');
    this.nextPageLabel = this.i18nService.translate('paginator.nextPageLabel');
    this.previousPageLabel = this.i18nService.translate('paginator.previousPageLabel');
    this.firstPageLabel = this.i18nService.translate('paginator.firstPageLabel');
    this.lastPageLabel = this.i18nService.translate('paginator.lastPageLabel');
  }

  //MÉTODO PARA PERSONALIZAR EL TEXTO DEL RANGO
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return this.i18nService.translate('paginator.rangeLabel.empty', { length: length.toString() });
    }

    const startIndex = page * pageSize;
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return this.i18nService.translate('paginator.rangeLabel.range', {
      start: (startIndex + 1).toString(),
      end: endIndex.toString(),
      length: length.toString()
    });
  };
}
