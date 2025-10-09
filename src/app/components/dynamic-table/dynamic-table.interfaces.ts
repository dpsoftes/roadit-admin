export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'image' | 'chip' | 'actions' | 'checkbox';
  sortable?: boolean;
  width?: string;
  chipConfig?: ChipConfig;
  actionConfig?: ActionConfig;
  imageConfig?: ImageConfig;
}

export interface ChipConfig {
  type: 'role' | 'status' | 'department' | 'custom';
  customClass?: string;
  translateKey?: string;
}

export interface ActionConfig {
  actions: ActionButton[];
}

export interface ActionButton {
  icon: string;
  label: string;
  color?: 'primary' | 'accent' | 'warn' | 'error';
  action: string;
  condition?: (row: any) => boolean;
}

export interface ImageConfig {
  width?: string;
  height?: string;
  alt?: string;
  fallback?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  data: any[];
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  filters?: FilterConfig[];
  exportable?: boolean;
  actions?: TableActions;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date';
  options?: FilterOption[];
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
