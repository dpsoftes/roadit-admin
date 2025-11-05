import { Component, Input, ViewChild, ViewContainerRef, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas personalizadas
 * Responsabilidad única: Renderizar contenido personalizado mediante TemplateRef o función render
 */
@Component({
  selector: 'dp-custom-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-cell">
      @if (hasTemplate()) {
        <ng-container #customContainer></ng-container>
      } @else if (hasRenderFunction()) {
        <div [innerHTML]="renderCustom()"></div>
      } @else {
        {{ value }}
      }
    </div>
  `,
  styles: [`
    .custom-cell {
      padding: 0 8px;
      width: 100%;
    }
  `]
})
export class CustomCellComponent implements OnInit {
  @Input() value: any;
  @Input() column!: TableColumn;
  @Input() rowData: any;
  @Input() customTemplate?: TemplateRef<any>;

  @ViewChild('customContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnInit(): void {
    if (this.hasTemplate() && this.container) {
      this.container.createEmbeddedView(this.customTemplate!, {
        $implicit: this.value,
        row: this.rowData,
        column: this.column
      });
    }
  }

  hasTemplate(): boolean {
    return !!this.customTemplate;
  }

  hasRenderFunction(): boolean {
    return !!this.column?.render && typeof this.column.render === 'function';
  }

  renderCustom(): string {
    if (!this.hasRenderFunction()) return '';
    return this.column.render!(this.column, this.rowData);
  }
}
