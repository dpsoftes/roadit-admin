import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de imagen
 * Responsabilidad única: Renderizar imagen con dimensiones configurables
 */
@Component({
  selector: 'dp-image-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-cell">
      <img 
        [src]="value" 
        [alt]="altText"
        [style.width]="imageWidth"
        [style.height]="imageHeight"
        [style.object-fit]="'cover'"
        class="cell-image" />
    </div>
  `,
  styles: [`
    .image-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
    }
    .cell-image {
      border-radius: 4px;
    }
  `]
})
export class ImageCellComponent {
  @Input() value: any;
  @Input() column!: TableColumn;

  get imageWidth(): string {
    return this.column.imageConfig?.width || '40px';
  }

  get imageHeight(): string {
    return this.column.imageConfig?.height || '40px';
  }

  get altText(): string {
    return this.column.imageConfig?.alt || this.column.key || '';
  }
}
