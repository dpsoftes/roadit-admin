import { WritableSignal } from "@angular/core";

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'image' | 'chip' | 'chip-array' | 'actions' | 'checkbox';
  sortable?: boolean;
  align?: 'left' | 'center' | 'right'; // ALINEACIÓN DEL CONTENIDO
  // Sistema de porcentajes para control preciso del ancho
  width?: string | number; // Porcentaje (ej: '25%', 25) o valor fijo (ej: '200px', 200)
  minWidth?: string | number;
  maxWidth?: string | number;
  flex?: string | number; // Para distribución proporcional del espacio restante
  chipConfig?: ChipConfig;
  actionConfig?: ActionConfig;
  imageConfig?: ImageConfig;
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

export interface ExportConfig {
  columns: string[];
  headers: string[];
  filename: string;
}

export interface TableConfig {
  columns: TableColumn[];
  data: WritableSignal<any[]>;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  filters?: FilterConfig[];
  exportable?: boolean;
  exportConfig?: ExportConfig;
  actions?: TableActions;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date' | 'chips' | 'checkbox';
  options?: FilterOption[];
  multiple?: boolean; // Para filtros que permiten selección múltiple
  width?: number; // Ancho del filtro en porcentaje (ej: 25 = 25%)
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface TableActions {
  create?: {
    label: string;
    route?: string;
    action?: () => void;
  };
  bulk?: {
    enabled: boolean;
    actions: ActionButton[];
  };
}

export interface TableEvent {
  type: 'select' | 'action' | 'filter' | 'search' | 'page' | 'export';
  data?: any;
  action?: string;
  filters?: any;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}
