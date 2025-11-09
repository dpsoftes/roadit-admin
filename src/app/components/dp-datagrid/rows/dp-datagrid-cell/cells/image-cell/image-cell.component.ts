import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de imagen
 * Responsabilidad única: Renderizar imagen con dimensiones configurables y fallback
 */
@Component({
  selector: 'dp-image-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-cell">
      <img
        [src]="getImageSrc()"
        [alt]="altText"
        [style.width]="imageWidth"
        [style.height]="imageHeight"
        [style.object-fit]="'cover'"
        (error)="onImageError($event)"
        class="cell-image" />
    </div>
  `,
  styles: [`
    .image-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-width: 0;
    }
    .cell-image {
      border-radius: 4px;
      flex-shrink: 0;
    }
  `]
})
export class ImageCellComponent {
  @Input() value: any;
  @Input() column!: TableColumn;

  private imageError = false;

  get imageWidth(): string {
    return this.column.imageConfig?.width || '40px';
  }

  get imageHeight(): string {
    return this.column.imageConfig?.height || '40px';
  }

  get altText(): string {
    return this.column.imageConfig?.alt || this.column.key || '';
  }

  get fallbackImage(): string {
    return this.column.imageConfig?.fallback || 'assets/images/imageFallback.png';
  }

  getImageSrc(): string {
    //SI HAY ERROR DE CARGA O EL VALOR ES NULL/UNDEFINED/VACÍO, USAR FALLBACK
    if (this.imageError || !this.value) {
      return this.fallbackImage;
    }
    return this.value;
  }

  onImageError(event: Event): void {
    //MARCAR QUE HUBO ERROR Y FORZAR RE-RENDER PARA MOSTRAR FALLBACK
    this.imageError = true;
    (event.target as HTMLImageElement).src = this.fallbackImage;
  }
}
