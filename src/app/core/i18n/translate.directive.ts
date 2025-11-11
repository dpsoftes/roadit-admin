import { Directive, ElementRef, Input, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { I18nService } from './i18n.service';

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private i18nService = inject(I18nService);

  @Input('appTranslate') translationKey!: string;
  @Input() translateParams?: Record<string, string | number>;

  ngOnInit(): void {
    this.updateTranslation();

    // Escuchar cambios en el idioma usando effect
    effect(() => {
      this.i18nService.currentLanguage(); // Trigger reactivity
      this.updateTranslation();
    });
  }

  private updateTranslation(): void {
    if (this.translationKey) {
      const translation = this.i18nService.translate(this.translationKey, this.translateParams);
      this.el.nativeElement.textContent = translation;
    }
  }

  ngOnDestroy(): void {
    // No cleanup needed with signals
  }
}