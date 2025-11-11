import { Component, input, output } from '@angular/core';
import { TableColumn, ColumnRenderEvent, ColumnClickEvent, ColumnSortEvent } from '../../dp-datagrid.interfaces';

@Component({
  selector: 'dp-datagrid-column',
  standalone: true,
  template: '',
})
export class DpDatagridColumnComponent {
  key = input.required<string>();
  label = input.required<string>();
  type = input<TableColumn['type']>('text');
  sortable = input<boolean>(false);
  align = input<'left' | 'center' | 'right'>('left');
  width = input<string | number>();
  minWidth = input<string | number>();
  maxWidth = input<string | number>();
  flex = input<string | number>();
  headerBackground = input<string>();
  headerColor = input<string>();
  headerFontSize = input<string>();
  headerFontWeight = input<string>();
  headerFontFamily = input<string>();
  chipConfig = input<TableColumn['chipConfig']>();
  actionConfig = input<TableColumn['actionConfig']>();
  imageConfig = input<TableColumn['imageConfig']>();
  render = input<TableColumn['render']>();
  translate = input<boolean>(false);

  // Outputs - Eventos de columna
  onRender = output<ColumnRenderEvent>();
  onClick = output<ColumnClickEvent>();
  onSort = output<ColumnSortEvent>();

  getColumnConfig(): TableColumn {
    return {
      key: this.key(),
      label: this.label(),
      type: this.type(),
      sortable: this.sortable(),
      align: this.align(),
      width: this.width(),
      minWidth: this.minWidth(),
      maxWidth: this.maxWidth(),
      flex: this.flex(),
      headerBackground: this.headerBackground(),
      headerColor: this.headerColor(),
      headerFontSize: this.headerFontSize(),
      headerFontWeight: this.headerFontWeight(),
      headerFontFamily: this.headerFontFamily(),
      chipConfig: this.chipConfig(),
      actionConfig: this.actionConfig(),
      imageConfig: this.imageConfig(),
      translate: this.translate(),
      render: this.render(),
    };
  }
}
