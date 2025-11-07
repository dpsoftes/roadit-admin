/**
 * Barrel principal de DpDatagrid
 * 
 * Exporta únicamente los componentes y tipos necesarios para el uso público del datagrid.
 * Los componentes internos (cells, filters atómicos, etc.) NO se exportan.
 * 
 * USO:
 * import { DpDatagridComponent, DpDatagridColumnComponent, ... } from './dp-datagrid';
 */

// Componente principal
export { DpDatagridComponent } from './dp-datagrid.component';

// Componentes públicos que el host puede usar
export { DpDatagridColumnComponent } from './columns';
export { DpDatagridColumnsComponent } from './columns';
export { DpDatagridFilterComponent } from './filters';
export { DpDatagridFilterContainerComponent } from './filters';
export { DpDatagridActionComponent } from './actions';
export { DpDatagridActionsComponent } from './actions';

// Store y modelos de persistencia
export { DatagridStateStore, DEFAULT_PERSISTENCE_CONFIG, createInitialDatagridState } from './store';
export type { DatagridState, DatagridPersistenceConfig } from './store';

// Interfaces y tipos públicos
export type {
  TableColumn,
  FilterConfig,
  FilterOption,
  ActionConfig,
  ActionButton,
  TableAction,
  DataGridConfig,
  ChipConfig,
  ImageConfig,
  ChipValue,
  ChipData,
  ChipArrayData,
  ColumnRenderEvent,
  ColumnClickEvent,
  ColumnSortEvent,
  PageChangeEvent,
  FilterChangeEvent,
  LoadDataEvent,
  ActionClickEvent
} from './dp-datagrid.interfaces';

// NOTA: Los siguientes componentes son INTERNOS y NO se exportan:
// - DpDatagridRowComponent (uso interno)
// - DpDatagridCellComponent (uso interno)
// - DpDatagridHeaderComponent (uso interno)
// - DpDatagridHeaderColumnComponent (uso interno)
// - Componentes atómicos de cells/* (uso interno)
// - Componentes atómicos de filters/* (uso interno)
// - Services (uso interno)
