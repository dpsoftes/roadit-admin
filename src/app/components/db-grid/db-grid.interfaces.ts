/**
 * Interfaces y tipos para el componente DBGrid
 */

export type GridFormat = 'DATE' | 'DATETIME' | 'N0' | 'N1' | 'N2' | 'N.0' | 'N.1' | 'N.2' | 'STRING' | 'CHECK';
export type GridAlign = 'LEFT' | 'RIGHT' | 'CENTER';

export interface GridColumn {
  field: string;
  width: string;
  header: string;
  format: GridFormat;
  align: GridAlign;
}

export interface GridRowSelectEvent {
  item: any;
  index: number;
}

export interface GridPageChangeEvent {
  page: number;
  previousPage: number;
}

export interface GridHeaderClickEvent {
  columnIndex: number;
  field: string;
  column: GridColumn;
}

export interface GridCellClickEvent {
  item: any;
  value: any;
  field: string;
  column: GridColumn;
  rowIndex: number;
  columnIndex: number;
}

export interface GridRenderEvent {
  item: any;
  value: any;
  field: string;
  rowIndex: number;
  columnIndex: number;
}

export type GridRenderFunction = (event: GridRenderEvent) => string | null;

export interface GridPaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  startRow: number;
  endRow: number;
  hasNext: boolean;
  hasPrevious: boolean;
}