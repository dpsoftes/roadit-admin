import { Component, input, TemplateRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../dp-datagrid.interfaces';
import {
  TextCellComponent,
  ChipCellComponent,
  ChipArrayCellComponent,
  ImageCellComponent,
  ActionsCellComponent,
  CheckboxCellComponent,
  CustomCellComponent
} from './cells';

/**
 * Componente orquestador de celdas
 * Responsabilidad única: Delegar renderizado al componente atómico apropiado según tipo
 * Reducción: 440 líneas → ~80 líneas (82% reducción)
 */
@Component({
  selector: 'dp-datagrid-cell',
  standalone: true,
  imports: [
    CommonModule,
    TextCellComponent,
    ChipCellComponent,
    ChipArrayCellComponent,
    ImageCellComponent,
    ActionsCellComponent,
    CheckboxCellComponent,
    CustomCellComponent
  ],
  host: {
    'style': 'display: contents'
  },
  template: `
    <div 
      class="dp-datagrid-cell"
      [class.clickable]="hasClickHandler()"
      [style.text-align]="column().align || 'left'"
      [style.justify-content]="getJustifyContent()"
      (click)="handleCellClick()">
      
      <!-- Text Cell -->
      @if (column().type === 'text') {
        <dp-text-cell 
          [value]="getCellValue()"
          [column]="column()" />
      }

      <!-- Image Cell -->
      @if (column().type === 'image') {
        <dp-image-cell 
          [value]="getCellValue()"
          [column]="column()" />
      }

      <!-- Chip Cell -->
      @if (column().type === 'chip') {
        <dp-chip-cell 
          [value]="getCellValue()"
          [column]="column()" />
      }

      <!-- Chip Array Cell -->
      @if (column().type === 'chip-array') {
        <dp-chip-array-cell 
          [value]="getCellValue()"
          [column]="column()" />
      }

      <!-- Actions Cell -->
      @if (column().type === 'actions') {
        <dp-actions-cell 
          [value]="getCellValue()"
          [column]="column()"
          [rowData]="rowData()"
          (actionClick)="handleActionClick($event)" />
      }

      <!-- Checkbox Cell -->
      @if (column().type === 'checkbox') {
        <dp-checkbox-cell 
          [value]="getCellValue()"
          [column]="column()"
          [rowData]="rowData()"
          (checkboxChange)="handleCheckboxChange($event)" />
      }

      <!-- Custom Cell -->
      @if (column().type === 'custom') {
        <dp-custom-cell 
          [value]="getCellValue()"
          [column]="column()"
          [rowData]="rowData()"
          [customTemplate]="customTemplate()" />
      }
    </div>
  `,
  styles: [`
    .dp-datagrid-cell {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      min-height: 52px;
      box-sizing: border-box;
      overflow: hidden;
      min-width: 0;
      font-size: 13px;
    }

    .clickable {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .clickable:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class DpDatagridCellComponent implements OnInit {
  column = input.required<TableColumn>();
  rowData = input.required<any>();
  customTemplate = input<TemplateRef<any>>();
  onCellClick = input<(columnKey: string, row: any) => void>();
  onCellRender = input<(columnKey: string, row: any) => void>();

  ngOnInit() {
    // Emitir evento render cuando el componente se inicializa
    const renderHandler = this.onCellRender();
    if (renderHandler) {
      renderHandler(this.column().key, this.rowData());
    }
  }

  /**
   * Obtiene el valor de la celda
   * Si la columna tiene función render Y NO ES custom, la ejecuta; sino retorna el valor del campo
   * Para columnas custom, el componente custom-cell se encarga de ejecutar render
   */
  getCellValue(): any {
    const row = this.rowData();
    const column = this.column();
    
    // Para columnas custom, NO ejecutar render aquí, dejar que custom-cell lo maneje
    if (column.type === 'custom') {
      return row[column.key];
    }
    
    // Para otros tipos, si hay función render, ejecutarla
    if (column.render && typeof column.render === 'function') {
      return column.render(column, row);
    }
    
    return row[column.key];
  }

  /**
   * Determina si hay un handler de click configurado
   */
  hasClickHandler(): boolean {
    return !!this.onCellClick();
  }

  /**
   * Maneja el click en la celda
   */
  handleCellClick(): void {
    const clickHandler = this.onCellClick();
    if (clickHandler) {
      clickHandler(this.column().key, this.rowData());
    }
  }

  /**
   * Maneja el click en una acción
   */
  handleActionClick(event: { action: any; rowData: any; event: MouseEvent }): void {
    // Las acciones ya tienen su propio handler onClick en el ActionButton
    // Este método se mantiene para compatibilidad futura si se necesita propagación
  }

  /**
   * Maneja el cambio en un checkbox
   */
  handleCheckboxChange(event: { checked: boolean; rowData: any }): void {
    // Este método se mantiene para compatibilidad futura si se necesita propagación
    const clickHandler = this.onCellClick();
    if (clickHandler) {
      clickHandler(this.column().key, event.rowData);
    }
  }

  /**
   * Calcula justify-content según alineación
   */
  getJustifyContent(): string {
    const align = this.column().align;
    if (align === 'center') return 'center';
    if (align === 'right') return 'flex-end';
    return 'flex-start';
  }
}
