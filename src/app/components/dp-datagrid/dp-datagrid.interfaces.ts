import { Signal, WritableSignal } from '@angular/core';

export interface ChipValue {
  value: any;           // Valor intrínseco (puede ser string, number, etc.)
  label: string;        // Lo que se muestra visualmente
  color?: string;       // Color del chip (opcional)
}

export type ChipData = string | ChipValue;
export type ChipArrayData = string[] | ChipValue[];

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'image' | 'chip' | 'chip-array' | 'actions' | 'checkbox' | 'custom';
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  flex?: string | number;
  headerBackground?: string;
  headerColor?: string;
  headerFontSize?: string;
  headerFontWeight?: string;
  headerFontFamily?: string;
  chipConfig?: ChipConfig;
  actionConfig?: ActionConfig;
  imageConfig?: ImageConfig;
  render?: (column: TableColumn, row: any) => string;
}

export interface ChipConfig {
  type: 'role' | 'status' | 'department' | 'custom' | 'tags';
  customClass?: string;
  translateKey?: string;
}


export interface ActionConfig {
  actions: ActionButton[];
}

export interface ActionButton {
  icon?: string;
  label: string;
  color?: 'primary' | 'accent' | 'warn' | 'error';
  action: string;
  condition?: (row: any) => boolean;
  onClick?: (row: any) => void;
}

export interface ImageConfig {
  width?: string;
  height?: string;
  alt?: string;
  fallback?: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date' | 'date-range' | 'chips' | 'chip-array' | 'chip-select' | 'checkbox';
  options?: FilterOption[];
  multiple?: boolean;
  width?: number;
  emptyOption?: string;
  onFilter?: (value: any, data: any[]) => any[];
}

export interface FilterOption {
  value: string;
  label: string;
  icon?: string;
}

export interface TableAction {
  key: string;
  text: string;
  icon?: string;
  render?: (key: string) => string;
  action?: (key: string) => void;
  isVisible?: Signal<boolean>;
  isEnabled?: Signal<boolean>;
}

export interface DataGridConfig {
  data: WritableSignal<any[]>;
  columns: TableColumn[];
  filters?: FilterConfig[];
  actions?: TableAction[];
  selectable?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

// Eventos del componente principal dp-datagrid
export interface PageChangeEvent {
  page: number;
  pageSize: number;
  searchTerm: string;
  filters: { [key: string]: any };
}

export interface FilterChangeEvent {
  searchTerm: string;
  filters: { [key: string]: any };
}

export interface LoadDataEvent {
  trigger: 'search' | 'filter' | 'sort' | 'page';
  changedKey?: string;
  searchTerm: string;
  filters: { [key: string]: any };
  page: number;
  pageSize: number;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc' | null;
}

// Eventos del componente dp-datagrid-column
export interface ColumnRenderEvent {
  column: TableColumn;
  row: any;
}

export interface ColumnClickEvent {
  column: TableColumn;
  row: any;
}

export interface ColumnSortEvent {
  column: TableColumn;
  direction: 'asc' | 'desc';
  page: number;
  pageSize: number;
  searchTerm: string;
  filters: { [key: string]: any };
}

// Evento del componente dp-datagrid-action
export interface ActionClickEvent {
  key: string;
  data?: any;
}
