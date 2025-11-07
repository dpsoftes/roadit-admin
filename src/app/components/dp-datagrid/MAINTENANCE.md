# DP-DATAGRID - Guía de Mantenimiento y Arquitectura# DP-DATAGRID - Guía de Mantenimiento y Arquitectura



## 📋 Índice## 📋 Índice

1. [Visión General de la Arquitectura](#visión-general-de-la-arquitectura)1. [Visión General de la Arquitectura](#visión-general-de-la-arquitectura)

2. [Gestión de Estado](#gestión-de-estado)2. [Gestión de Estado](#gestión-de-estado)

3. [Estructura de Componentes](#estructura-de-componentes)3. [Estructura de Componentes](#estructura-de-componentes)

4. [Componentes Principales](#componentes-principales)4. [Componentes Principales](#componentes-principales)

5. [Servicios Auxiliares](#servicios-auxiliares)5. [Servicios Auxiliares](#servicios-auxiliares)

6. [Sistema de Tipos](#sistema-de-tipos)6. [Sistema de Tipos](#sistema-de-tipos)

7. [Consideraciones de Rendimiento](#consideraciones-de-rendimiento)7. [Consideraciones de Rendimiento](#consideraciones-de-rendimiento)

8. [Puntos de Extensión](#puntos-de-extensión)8. [Puntos de Extensión](#puntos-de-extensión)



------



## Visión General de la Arquitectura## Visión General de la Arquitectura



### Stack Tecnológico### Stack Tecnológico

- **Angular**: 18+- **Angular**: 18+

- **Gestión de Estado**: @ngrx/signals (signalStore, patchState, computed signals)- **Gestión de Estado**: @ngrx/signals (signalStore, patchState, computed signals)

- **Framework UI**: Angular Material 18+- **Framework UI**: Angular Material 18+

- **Persistencia**: SessionStorage API- **Persistencia**: SessionStorage API

- **TypeScript**: Modo estricto con isolatedModules- **TypeScript**: Modo estricto con isolatedModules



### Patrones de Diseño### Patrones de Diseño

1. **Componentes Standalone**: Todos los componentes usan la API standalone de Angular1. **Componentes Standalone**: Todos los componentes usan la API standalone de Angular

2. **Reactividad Basada en Signals**: Gestión de estado usando Angular signals2. **Reactividad Basada en Signals**: Gestión de estado usando Angular signals

3. **Barrel Exports**: Estructura de módulos organizada con archivos index.ts3. **Barrel Exports**: Estructura de módulos organizada con archivos index.ts

4. **Composición de Componentes**: Relaciones padre-hijo con proyección de contenido4. **Composición de Componentes**: Relaciones padre-hijo con proyección de contenido

5. **Servicios de Utilidad**: Lógica compartida en servicios inyectables5. **Servicios de Utilidad**: Lógica compartida en servicios inyectables



------



## Gestión de Estado## State Management



### DatagridStore (`store/datagrid.store.ts`)### DatagridStore (`datagrid.store.ts`)



**Propósito**: Gestión centralizada del estado de toda la datagrid usando @ngrx/signals.**Purpose**: Centralized state management for the entire datagrid using @ngrx/signals.



**Ubicación**: `src/app/dp-datagrid/store/datagrid.store.ts`**Location**: `src/app/dp-datagrid/store/datagrid.store.ts`



**Schema del Estado**:**State Schema**:

```typescript```typescript

interface DatagridState {interface DatagridState {

  // Datos principales  // Core data

  data: any[];           // Dataset original  data: any[];           // Original dataset

  filteredData: any[];   // Datos después de aplicar filtros  filteredData: any[];   // Data after filters applied

    

  // Estado de UI  // UI state

  selectedRows: Set<any>;  selectedRows: Set<any>;

  expandedRows: Set<any>;  expandedRows: Set<any>;

    

  // Paginación  // Pagination

  currentPage: number;  currentPage: number;

  pageSize: number;  pageSize: number;

    

  // Filtros  // Filters

  filters: Map<string, FilterValue>;  filters: Map<string, FilterValue>;

    

  // Ordenamiento  // Sorting

  sortColumn: string | null;  sortColumn: string | null;

  sortDirection: 'asc' | 'desc' | '';  sortDirection: 'asc' | 'desc' | '';

    

  // Estado de columnas  // Column state

  columnVisibility: Map<string, boolean>;  columnVisibility: Map<string, boolean>;

  columnOrder: string[];  columnOrder: string[];

  columnWidths: Map<string, number>;  columnWidths: Map<string, number>;

    

  // Persistencia  // Persistence

  stateId: string | null;  stateId: string | null;

  persistenceEnabled: boolean;  persistenceEnabled: boolean;

}}

``````



**Métodos Principales**:**Key Methods**:

- `setData(data: any[])`: Inicializar/actualizar el dataset- `setData(data: any[])`: Initialize/update dataset

- `applyFilters()`: Recalcular filteredData según filtros activos- `applyFilters()`: Recalculate filteredData based on current filters

- `setFilter(columnId, value)`: Actualizar filtro para columna específica- `setFilter(columnId, value)`: Update filter for specific column

- `clearFilter(columnId)`: Eliminar filtro de una columna- `clearFilter(columnId)`: Remove filter from column

- `clearAllFilters()`: Resetear todos los filtros- `clearAllFilters()`: Reset all filters

- `toggleRowSelection(row)`: Agregar/quitar fila de la selección- `toggleRowSelection(row)`: Add/remove row from selection

- `toggleRowExpansion(row)`: Expandir/colapsar detalle de fila- `toggleRowExpansion(row)`: Expand/collapse row detail

- `setSort(column, direction)`: Actualizar configuración de ordenamiento- `setSort(column, direction)`: Update sort configuration

- `toggleColumnVisibility(columnId)`: Mostrar/ocultar columna- `toggleColumnVisibility(columnId)`: Show/hide column

- `setColumnWidth(columnId, width)`: Actualizar ancho de columna- `setColumnWidth(columnId, width)`: Update column width

- `saveState()`: Persistir estado en sessionStorage- `saveState()`: Persist state to sessionStorage

- `loadState(stateId)`: Restaurar estado desde sessionStorage- `loadState(stateId)`: Restore state from sessionStorage

- `clearState()`: Eliminar estado persistido- `clearState()`: Remove persisted state



**Signals Computados**:**Computed Signals**:

- `totalRecords`: Conteo total desde filteredData- `totalRecords`: Total count from filteredData

- `totalPages`: Calculado según pageSize- `totalPages`: Calculated based on pageSize

- `paginatedData`: Slice de la página actual- `paginatedData`: Current page slice

- `hasSelection`: Boolean si hay filas seleccionadas- `hasSelection`: Boolean if any rows selected

- `selectionCount`: Número de filas seleccionadas- `selectionCount`: Number of selected rows

- `visibleColumns`: Array de IDs de columnas no ocultas- `visibleColumns`: Array of non-hidden column IDs

- `isFiltered`: Boolean si hay filtros activos- `isFiltered`: Boolean if any filters active



**Lógica Interna**:**Internal Logic**:

```typescript```typescript

// Aplicación de filtros// Filter application

const applyFilters = () => {const applyFilters = () => {

  let result = state.data();  let result = state.data();

  const filters = state.filters();  const filters = state.filters();

    

  filters.forEach((value, columnId) => {  filters.forEach((value, columnId) => {

    if (!value) return;    if (!value) return;

        

    result = result.filter(row => {    result = result.filter(row => {

      const cellValue = row[columnId];      const cellValue = row[columnId];

            

      // Filtrado específico por tipo      // Type-specific filtering

      if (typeof value === 'string') {      if (typeof value === 'string') {

        return String(cellValue).toLowerCase().includes(value.toLowerCase());        return String(cellValue).toLowerCase().includes(value.toLowerCase());

      } else if (Array.isArray(value)) {      } else if (Array.isArray(value)) {

        return value.includes(cellValue);        return value.includes(cellValue);

      } else if (typeof value === 'boolean') {      } else if (typeof value === 'boolean') {

        return cellValue === value;        return cellValue === value;

      }      }

      return true;      return true;

    });    });

  });  });

    

  patchState(store, { filteredData: result });  patchState(store, { filteredData: result });

};};



// Lógica de ordenamiento// Sorting logic

const applySorting = () => {const applySorting = () => {

  const { filteredData, sortColumn, sortDirection } = state;  const { filteredData, sortColumn, sortDirection } = state;

    

  if (!sortColumn || !sortDirection) return filteredData;  if (!sortColumn || !sortDirection) return filteredData;

    

  return [...filteredData].sort((a, b) => {  return [...filteredData].sort((a, b) => {

    const aVal = a[sortColumn];    const aVal = a[sortColumn];

    const bVal = b[sortColumn];    const bVal = b[sortColumn];

        

    const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;    const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;

    return sortDirection === 'asc' ? comparison : -comparison;    return sortDirection === 'asc' ? comparison : -comparison;

  });  });

};};

``````



------



## Estructura de Componentes## Component Structure



### Jerarquía### Hierarchy

``````

dp-datagrid (raíz)dp-datagrid (root)

├── dp-datagrid-header├── dp-datagrid-header

│   └── dp-datagrid-header-column (múltiple)│   └── dp-datagrid-header-column (multiple)

├── dp-datagrid-filter-container├── dp-datagrid-filter-container

│   └── dp-datagrid-filter (múltiple, tipo dinámico)│   └── dp-datagrid-filter (multiple, dynamic type)

├── dp-datagrid-columns├── dp-datagrid-columns

│   └── dp-datagrid-column (proyección de contenido)│   └── dp-datagrid-column (content projected)

├── dp-datagrid-row (múltiple)├── dp-datagrid-row (multiple)

│   └── dp-datagrid-cell (múltiple, tipo dinámico)│   └── dp-datagrid-cell (multiple, dynamic type)

└── dp-datagrid-actions└── dp-datagrid-actions

    └── dp-datagrid-action (múltiple)    └── dp-datagrid-action (multiple)

``````



------



## Componentes Principales## Core Components



### 1. DpDatagridComponent (Raíz)### 1. DpDatagridComponent (Root)



**Archivo**: `dp-datagrid.component.ts`**File**: `dp-datagrid.component.ts`



**Responsabilidades**:**Responsibilities**:

- Inicializar y proveer el store de datagrid- Initialize and provide datagrid store

- Gestionar el ciclo de vida del componente- Manage component lifecycle

- Coordinar componentes hijos- Coordinate child components

- Manejar persistencia de estado- Handle state persistence

- Exponer API pública- Expose public API



**Propiedades Clave**:**Key Properties**:

```typescript```typescript

// Inputs// Inputs

@Input() data: any[] = [];                    // Dataset@Input() data: any[] = [];                    // Dataset

@Input() mode: DatagridMode = 'basic';       // Modo UI@Input() mode: DatagridMode = 'basic';       // UI mode

@Input() pageSize: number = 10;              // Paginación@Input() pageSize: number = 10;              // Pagination

@Input() stateId: string | null = null;      // Clave de persistencia@Input() stateId: string | null = null;      // Persistence key

@Input() enablePersistence: boolean = false; // Auto-guardado@Input() enablePersistence: boolean = false; // Auto-save



// Outputs// Outputs

@Output() rowClick = new EventEmitter<any>();@Output() rowClick = new EventEmitter<any>();

@Output() rowDoubleClick = new EventEmitter<any>();@Output() rowDoubleClick = new EventEmitter<any>();

@Output() selectionChange = new EventEmitter<any[]>();@Output() selectionChange = new EventEmitter<any[]>();

@Output() sortChange = new EventEmitter<SortConfig>();@Output() sortChange = new EventEmitter<SortConfig>();

@Output() filterChange = new EventEmitter<FilterConfig>();@Output() filterChange = new EventEmitter<FilterConfig>();

``````



**Hooks de Ciclo de Vida**:**Lifecycle Hooks**:

```typescript```typescript

ngOnInit() {ngOnInit() {

  // 1. Cargar estado persistido si está habilitado  // 1. Load persisted state if enabled

  if (this.enablePersistence && this.stateId) {  if (this.enablePersistence && this.stateId) {

    this.store.loadState(this.stateId);    this.store.loadState(this.stateId);

  }  }

    

  // 2. Inicializar datos  // 2. Initialize data

  this.store.setData(this.data);  this.store.setData(this.data);

    

  // 3. Aplicar filtros/ordenamiento cargados  // 3. Apply loaded filters/sort

  this.store.applyFilters();  this.store.applyFilters();

}}



ngOnChanges(changes: SimpleChanges) {ngOnChanges(changes: SimpleChanges) {

  // Reaccionar a cambios de datos  // React to data changes

  if (changes['data']) {  if (changes['data']) {

    this.store.setData(this.data);    this.store.setData(this.data);

  }  }

}}



ngOnDestroy() {ngOnDestroy() {

  // Guardar estado antes de la destrucción  // Save state before destruction

  if (this.enablePersistence) {  if (this.enablePersistence) {

    this.store.saveState();    this.store.saveState();

  }  }

}}

``````



**Proyección de Contenido**:**Content Projection**:

```html```html

<ng-content select="dp-datagrid-columns"></ng-content><ng-content select="dp-datagrid-columns"></ng-content>

<ng-content select="dp-datagrid-actions"></ng-content><ng-content select="dp-datagrid-actions"></ng-content>

``````



**API Pública**:**Public API**:

```typescript```typescript

// Métodos programáticos expuestos para control externo// Programmatic methods exposed for external control

clearFilters(): void;clearFilters(): void;

resetSort(): void;resetSort(): void;

exportData(format: 'csv' | 'json'): void;exportData(format: 'csv' | 'json'): void;

refreshData(): void;refreshData(): void;

getSelectedRows(): any[];getSelectedRows(): any[];

selectAll(): void;selectAll(): void;

deselectAll(): void;deselectAll(): void;

``````



------



### 2. DpDatagridHeaderComponent### 2. DpDatagridHeaderComponent



**Archivo**: `headers/dp-datagrid-header/dp-datagrid-header.component.ts`**File**: `headers/dp-datagrid-header/dp-datagrid-header.component.ts`



**Propósito**: Renderizar encabezados de columnas con capacidades de ordenamiento y redimensionamiento.**Purpose**: Render column headers with sorting and resizing capabilities.



**Características Principales**:**Key Features**:

- Indicadores de ordenamiento (↑↓)- Sort indicators (↑↓)

- Redimensionamiento de columnas (asa de arrastre)- Column resizing (drag handle)

- Click para ordenar- Click to sort

- Posicionamiento sticky- Sticky positioning



**Estructura de Template**:**Template Structure**:

```html```html

<div class="dp-datagrid-header"><div class="dp-datagrid-header">

  @for (column of columns(); track column.id) {  @for (column of columns(); track column.id) {

    <dp-datagrid-header-column    <dp-datagrid-header-column

      [column]="column"      [column]="column"

      [sortColumn]="store.sortColumn()"      [sortColumn]="store.sortColumn()"

      [sortDirection]="store.sortDirection()"      [sortDirection]="store.sortDirection()"

      (sortChange)="handleSort($event)"      (sortChange)="handleSort($event)"

      (widthChange)="handleResize($event)"      (widthChange)="handleResize($event)"

    />    />

  }  }

</div></div>

``````



**CSS**:**CSS**:

```scss```scss

.dp-datagrid-header {.dp-datagrid-header {

  display: flex;  display: flex;

  position: sticky;  position: sticky;

  top: 0;  top: 0;

  z-index: 10;  z-index: 10;

  background: var(--header-bg);  background: var(--header-bg);

  border-bottom: 2px solid var(--border-color);  border-bottom: 2px solid var(--border-color);

}}

``````



------



### 3. DpDatagridHeaderColumnComponent### 3. DpDatagridHeaderColumnComponent



**Archivo**: `headers/dp-datagrid-header-column/dp-datagrid-header-column.component.ts`**File**: `headers/dp-datagrid-header-column/dp-datagrid-header-column.component.ts`



**Propósito**: Celda de encabezado individual con funcionalidad de ordenamiento y redimensionamiento.**Purpose**: Individual header cell with sort and resize functionality.



**Lógica Interna**:**Internal Logic**:

```typescript```typescript

@Component({@Component({

  selector: 'dp-datagrid-header-column',  selector: 'dp-datagrid-header-column',

  template: `  template: `

    <div class="header-cell"    <div class="header-cell"

         [style.width.px]="width"         [style.width.px]="width"

         (click)="toggleSort()">         (click)="toggleSort()">

            

      <span class="column-label">{{ column.label }}</span>      <span class="column-label">{{ column.label }}</span>

            

      @if (column.sortable) {      @if (column.sortable) {

        <mat-icon class="sort-icon">        <mat-icon class="sort-icon">

          {{ getSortIcon() }}          {{ getSortIcon() }}

        </mat-icon>        </mat-icon>

      }      }

            

      <div class="resize-handle"      <div class="resize-handle"

           (mousedown)="startResize($event)"></div>           (mousedown)="startResize($event)"></div>

    </div>    </div>

  `  `

})})

export class DpDatagridHeaderColumnComponent {export class DpDatagridHeaderColumnComponent {

  private resizing = false;  private resizing = false;

  private startX = 0;  private startX = 0;

  private startWidth = 0;  private startWidth = 0;

    

  startResize(event: MouseEvent): void {  startResize(event: MouseEvent): void {

    event.preventDefault();    event.preventDefault();

    this.resizing = true;    this.resizing = true;

    this.startX = event.clientX;    this.startX = event.clientX;

    this.startWidth = this.width;    this.startWidth = this.width;

        

    // Listeners globales de mouse    // Global mouse listeners

    document.addEventListener('mousemove', this.onMouseMove);    document.addEventListener('mousemove', this.onMouseMove);

    document.addEventListener('mouseup', this.onMouseUp);    document.addEventListener('mouseup', this.onMouseUp);

  }  }

    

  private onMouseMove = (event: MouseEvent): void => {  private onMouseMove = (event: MouseEvent): void => {

    if (!this.resizing) return;    if (!this.resizing) return;

        

    const diff = event.clientX - this.startX;    const diff = event.clientX - this.startX;

    const newWidth = Math.max(50, this.startWidth + diff);    const newWidth = Math.max(50, this.startWidth + diff);

        

    this.widthChange.emit({ columnId: this.column.id, width: newWidth });    this.widthChange.emit({ columnId: this.column.id, width: newWidth });

  };  };

    

  private onMouseUp = (): void => {  private onMouseUp = (): void => {

    this.resizing = false;    this.resizing = false;

    document.removeEventListener('mousemove', this.onMouseMove);    document.removeEventListener('mousemove', this.onMouseMove);

    document.removeEventListener('mouseup', this.onMouseUp);    document.removeEventListener('mouseup', this.onMouseUp);

  };  };

    

  toggleSort(): void {  toggleSort(): void {

    if (!this.column.sortable) return;    if (!this.column.sortable) return;

        

    let direction: 'asc' | 'desc' | '' = 'asc';    let direction: 'asc' | 'desc' | '' = 'asc';

        

    if (this.sortColumn === this.column.id) {    if (this.sortColumn === this.column.id) {

      direction = this.sortDirection === 'asc' ? 'desc' : '';      direction = this.sortDirection === 'asc' ? 'desc' : '';

    }    }

        

    this.sortChange.emit({ column: this.column.id, direction });    this.sortChange.emit({ column: this.column.id, direction });

  }  }

}}

``````



------



### 4. DpDatagridFilterContainerComponent### 4. DpDatagridFilterContainerComponent



**Archivo**: `filters/dp-datagrid-filter-container/dp-datagrid-filter-container.component.ts`**File**: `filters/dp-datagrid-filter-container/dp-datagrid-filter-container.component.ts`



**Propósito**: Contenedor que renderiza componentes de filtro apropiados según la configuración de columna.**Purpose**: Container that renders appropriate filter components based on column configuration.



**Carga Dinámica de Componentes**:**Dynamic Component Loading**:

```typescript```typescript

export class DpDatagridFilterContainerComponent {export class DpDatagridFilterContainerComponent {

  store = inject(DatagridStore);  store = inject(DatagridStore);

    

  getFilterComponent(column: ColumnConfig): Type<any> {  getFilterComponent(column: ColumnConfig): Type<any> {

    switch (column.filterType) {    switch (column.filterType) {

      case 'text':      case 'text':

        return TextFilterComponent;        return TextFilterComponent;

      case 'select':      case 'select':

        return SelectFilterComponent;        return SelectFilterComponent;

      case 'chip-select':      case 'chip-select':

        return ChipSelectFilterComponent;        return ChipSelectFilterComponent;

      case 'date':      case 'date':

        return DateFilterComponent;        return DateFilterComponent;

      case 'number':      case 'number':

        return NumberFilterComponent;        return NumberFilterComponent;

      default:      default:

        return TextFilterComponent;        return TextFilterComponent;

    }    }

  }  }

}}

``````



**Template**:**Template**:

```html```html

<div class="filter-container"><div class="filter-container">

  @for (column of visibleColumns(); track column.id) {  @for (column of visibleColumns(); track column.id) {

    @if (column.filterable) {    @if (column.filterable) {

      <dp-datagrid-filter      <dp-datagrid-filter

        [column]="column"        [column]="column"

        [value]="store.filters().get(column.id)"        [value]="store.filters().get(column.id)"

        (filterChange)="handleFilterChange($event)"        (filterChange)="handleFilterChange($event)"

      />      />

    }    }

  }  }

</div></div>

``````



------



### 5. Componentes de Filtro### 5. Filter Components



#### TextFilterComponent#### TextFilterComponent

**Archivo**: `filters/types/text-filter/text-filter.component.ts`**File**: `filters/types/text-filter/text-filter.component.ts`



```typescript```typescript

export class TextFilterComponent {export class TextFilterComponent {

  @Input() column!: ColumnConfig;  @Input() column!: ColumnConfig;

  @Input() value: string = '';  @Input() value: string = '';

  @Output() filterChange = new EventEmitter<string>();  @Output() filterChange = new EventEmitter<string>();

    

  private debounceTimer: any;  private debounceTimer: any;

    

  onInput(event: Event): void {  onInput(event: Event): void {

    const value = (event.target as HTMLInputElement).value;    const value = (event.target as HTMLInputElement).value;

        

    clearTimeout(this.debounceTimer);    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {    this.debounceTimer = setTimeout(() => {

      this.filterChange.emit(value);      this.filterChange.emit(value);

    }, 300); // 300ms de debounce    }, 300); // 300ms debounce

  }  }

}}

``````



#### SelectFilterComponent#### SelectFilterComponent

**Archivo**: `filters/types/select-filter/select-filter.component.ts`**File**: `filters/types/select-filter/select-filter.component.ts`



```typescript```typescript

export class SelectFilterComponent {export class SelectFilterComponent {

  @Input() column!: ColumnConfig;  @Input() column!: ColumnConfig;

  @Input() value: any = null;  @Input() value: any = null;

  @Output() filterChange = new EventEmitter<any>();  @Output() filterChange = new EventEmitter<any>();

    

  options = computed(() => {  options = computed(() => {

    // Auto-generar opciones desde datos de columna si no se proveen    // Auto-generate options from column data if not provided

    if (this.column.filterOptions) {    if (this.column.filterOptions) {

      return this.column.filterOptions;      return this.column.filterOptions;

    }    }

        

    // Extraer valores únicos desde los datos    // Extract unique values from data

    const store = inject(DatagridStore);    const store = inject(DatagridStore);

    const uniqueValues = new Set(    const uniqueValues = new Set(

      store.data().map(row => row[this.column.id])      store.data().map(row => row[this.column.id])

    );    );

        

    return Array.from(uniqueValues).map(value => ({    return Array.from(uniqueValues).map(value => ({

      value,      value,

      label: String(value)      label: String(value)

    }));    }));

  });  });

}}

``````



#### ChipSelectFilterComponent#### ChipSelectFilterComponent

**Archivo**: `filters/types/chip-select-filter/chip-select-filter.component.ts`**File**: `filters/types/chip-select-filter/chip-select-filter.component.ts`



**Características**:**Features**:

- Dropdown multi-selección- Multi-select dropdown

- Visualización de chips para items seleccionados- Chip display for selected items

- Contenedor auto-expandible- Auto-expanding container

- Chips con código de color- Color-coded chips



```typescript```typescript

export class ChipSelectFilterComponent {export class ChipSelectFilterComponent {

  @Input() column!: ColumnConfig;  @Input() column!: ColumnConfig;

  @Input() value: any[] = [];  @Input() value: any[] = [];

  @Output() filterChange = new EventEmitter<any[]>();  @Output() filterChange = new EventEmitter<any[]>();

    

  selectedValues = signal<ChipValue[]>([]);  selectedValues = signal<ChipValue[]>([]);

  isOpen = signal(false);  isOpen = signal(false);

    

  toggleDropdown(): void {  toggleDropdown(): void {

    this.isOpen.update(v => !v);    this.isOpen.update(v => !v);

  }  }

    

  toggleOption(option: ChipValue): void {  toggleOption(option: ChipValue): void {

    const current = this.selectedValues();    const current = this.selectedValues();

    const index = current.findIndex(v => v.value === option.value);    const index = current.findIndex(v => v.value === option.value);

        

    if (index >= 0) {    if (index >= 0) {

      // Eliminar      // Remove

      this.selectedValues.set([      this.selectedValues.set([

        ...current.slice(0, index),        ...current.slice(0, index),

        ...current.slice(index + 1)        ...current.slice(index + 1)

      ]);      ]);

    } else {    } else {

      // Agregar      // Add

      this.selectedValues.set([...current, option]);      this.selectedValues.set([...current, option]);

    }    }

        

    this.filterChange.emit(this.selectedValues().map(v => v.value));    this.filterChange.emit(this.selectedValues().map(v => v.value));

  }  }

    

  removeChip(chip: ChipValue): void {  removeChip(chip: ChipValue): void {

    const current = this.selectedValues();    const current = this.selectedValues();

    this.selectedValues.set(    this.selectedValues.set(

      current.filter(v => v.value !== chip.value)      current.filter(v => v.value !== chip.value)

    );    );

    this.filterChange.emit(this.selectedValues().map(v => v.value));    this.filterChange.emit(this.selectedValues().map(v => v.value));

  }  }

}}

``````



**CSS Clave**:**Key CSS**:

```scss```scss

.chip-select-container {.chip-select-container {

  min-height: 40px;      // Cambiado de height: 40px  min-height: 40px;      // Changed from height: 40px

  padding: 8px;          // Padding vertical para expansión  padding: 8px;          // Vertical padding for expansion

  display: flex;  display: flex;

  flex-wrap: wrap;       // Permitir que chips se envuelvan  flex-wrap: wrap;       // Allow chips to wrap

  gap: 4px;  gap: 4px;

  border: 1px solid #ccc;  border: 1px solid #ccc;

  position: relative;  position: relative;

    

  .dropdown-arrow {  .dropdown-arrow {

    position: absolute;    position: absolute;

    right: 8px;    right: 8px;

    top: 12px;           // Posición fija    top: 12px;           // Fixed position

    pointer-events: none;    pointer-events: none;

  }  }

}}

``````



------



### 6. DpDatagridRowComponent### 6. DpDatagridRowComponent



**Archivo**: `rows/dp-datagrid-row/dp-datagrid-row.component.ts`**File**: `rows/dp-datagrid-row/dp-datagrid-row.component.ts`



**Propósito**: Renderizar filas de datos individuales con componentes de celda.**Purpose**: Render individual data rows with cell components.



**Características**:**Features**:

- Selección de fila (checkbox)- Row selection (checkbox)

- Expansión de fila (vista detallada)- Row expansion (detail view)

- Eventos de click/doble-click- Click/double-click events

- Estados de hover- Hover states



```typescript```typescript

export class DpDatagridRowComponent {export class DpDatagridRowComponent {

  @Input() row!: any;  @Input() row!: any;

  @Input() columns!: ColumnConfig[];  @Input() columns!: ColumnConfig[];

  @Input() index!: number;  @Input() index!: number;

  @Input() selectable = false;  @Input() selectable = false;

  @Input() expandable = false;  @Input() expandable = false;

    

  @Output() rowClick = new EventEmitter<any>();  @Output() rowClick = new EventEmitter<any>();

  @Output() rowDoubleClick = new EventEmitter<any>();  @Output() rowDoubleClick = new EventEmitter<any>();

    

  store = inject(DatagridStore);  store = inject(DatagridStore);

    

  isSelected = computed(() =>   isSelected = computed(() => 

    this.store.selectedRows().has(this.row)    this.store.selectedRows().has(this.row)

  );  );

    

  isExpanded = computed(() =>   isExpanded = computed(() => 

    this.store.expandedRows().has(this.row)    this.store.expandedRows().has(this.row)

  );  );

    

  toggleSelection(): void {  toggleSelection(): void {

    this.store.toggleRowSelection(this.row);    this.store.toggleRowSelection(this.row);

  }  }

    

  toggleExpansion(): void {  toggleExpansion(): void {

    this.store.toggleRowExpansion(this.row);    this.store.toggleRowExpansion(this.row);

  }  }

}}

``````



**Template**:**Template**:

```html```html

<div class="dp-row" <div class="dp-row" 

     [class.selected]="isSelected()"     [class.selected]="isSelected()"

     [class.expanded]="isExpanded()"     [class.expanded]="isExpanded()"

     (click)="handleClick()"     (click)="handleClick()"

     (dblclick)="handleDoubleClick()">     (dblclick)="handleDoubleClick()">

    

  @if (selectable) {  @if (selectable) {

    <div class="selection-cell">    <div class="selection-cell">

      <mat-checkbox       <mat-checkbox 

        [checked]="isSelected()"        [checked]="isSelected()"

        (change)="toggleSelection()"        (change)="toggleSelection()"

        (click)="$event.stopPropagation()"        (click)="$event.stopPropagation()"

      />      />

    </div>    </div>

  }  }

    

  @for (column of columns; track column.id) {  @for (column of columns; track column.id) {

    <dp-datagrid-cell    <dp-datagrid-cell

      [row]="row"      [row]="row"

      [column]="column"      [column]="column"

      [value]="row[column.id]"      [value]="row[column.id]"

    />    />

  }  }

    

  @if (expandable) {  @if (expandable) {

    <div class="expansion-cell">    <div class="expansion-cell">

      <button mat-icon-button (click)="toggleExpansion(); $event.stopPropagation()">      <button mat-icon-button (click)="toggleExpansion(); $event.stopPropagation()">

        <mat-icon>{{ isExpanded() ? 'expand_less' : 'expand_more' }}</mat-icon>        <mat-icon>{{ isExpanded() ? 'expand_less' : 'expand_more' }}</mat-icon>

      </button>      </button>

    </div>    </div>

  }  }

</div></div>



@if (isExpanded()) {@if (isExpanded()) {

  <div class="row-detail">  <div class="row-detail">

    <ng-content></ng-content>    <ng-content></ng-content>

  </div>  </div>

}}

``````



------



### 7. DpDatagridCellComponent### 7. DpDatagridCellComponent



**Archivo**: `rows/dp-datagrid-cell/dp-datagrid-cell.component.ts`**File**: `rows/dp-datagrid-cell/dp-datagrid-cell.component.ts`



**Propósito**: Renderizador dinámico de celdas basado en el tipo de celda.**Purpose**: Dynamic cell renderer based on cell type.



**Tipos Soportados**:**Supported Types**:

- `TEXT`: Texto plano- `TEXT`: Plain text display

- `IMAGE`: Imagen con lazy loading- `IMAGE`: Image with lazy loading

- `CHIP`: Chip único con color- `CHIP`: Single chip with color

- `CHIP-ARRAY`: Múltiples chips- `CHIP-ARRAY`: Multiple chips

- `CHECKBOX`: Checkbox booleano- `CHECKBOX`: Boolean checkbox

- `CUSTOM`: Template personalizado- `CUSTOM`: Custom template



**Renderizado Dinámico**:**Dynamic Rendering**:

```typescript```typescript

export class DpDatagridCellComponent {export class DpDatagridCellComponent {

  @Input() row!: any;  @Input() row!: any;

  @Input() column!: ColumnConfig;  @Input() column!: ColumnConfig;

  @Input() value: any;  @Input() value: any;

    

  getCellTemplate(): TemplateRef<any> | null {  getCellTemplate(): TemplateRef<any> | null {

    switch (this.column.cellType) {    switch (this.column.cellType) {

      case 'TEXT':      case 'TEXT':

        return this.textTemplate;        return this.textTemplate;

      case 'IMAGE':      case 'IMAGE':

        return this.imageTemplate;        return this.imageTemplate;

      case 'CHIP':      case 'CHIP':

        return this.chipTemplate;        return this.chipTemplate;

      case 'CHIP-ARRAY':      case 'CHIP-ARRAY':

        return this.chipArrayTemplate;        return this.chipArrayTemplate;

      case 'CHECKBOX':      case 'CHECKBOX':

        return this.checkboxTemplate;        return this.checkboxTemplate;

      default:      default:

        return this.column.customTemplate || this.textTemplate;        return this.column.customTemplate || this.textTemplate;

    }    }

  }  }

}}

``````



**Template**:**Template**:

```html```html

<div class="dp-cell" [style.width.px]="column.width"><div class="dp-cell" [style.width.px]="column.width">

    

  <!-- TEXT -->  <!-- TEXT -->

  <ng-template #textTemplate>  <ng-template #textTemplate>

    <span>{{ formatValue(value) }}</span>    <span>{{ formatValue(value) }}</span>

  </ng-template>  </ng-template>

    

  <!-- IMAGE -->  <!-- IMAGE -->

  <ng-template #imageTemplate>  <ng-template #imageTemplate>

    <img [src]="value"     <img [src]="value" 

         [alt]="column.label"         [alt]="column.label"

         loading="lazy"         loading="lazy"

         class="cell-image">         class="cell-image">

  </ng-template>  </ng-template>

    

  <!-- CHIP -->  <!-- CHIP -->

  <ng-template #chipTemplate>  <ng-template #chipTemplate>

    <mat-chip [style.background-color]="getChipColor(value)">    <mat-chip [style.background-color]="value.color">

      {{ getChipLabel(value) }}      {{ chipUtils.getChipDisplayValue(value) }}

    </mat-chip>    </mat-chip>

  </ng-template>  </ng-template>

    

  <!-- CHIP-ARRAY -->  <!-- CHIP-ARRAY -->

  <ng-template #chipArrayTemplate>  <ng-template #chipArrayTemplate>

    <mat-chip-set>    <mat-chip-set>

      @for (chip of value; track chip.value) {      @for (chip of value; track chip.value) {

        <mat-chip [style.background-color]="getChipColor(chip)">        <mat-chip [style.background-color]="chip.color">

          {{ getChipLabel(chip) }}          {{ chipUtils.getChipDisplayValue(chip) }}

        </mat-chip>        </mat-chip>

      }      }

    </mat-chip-set>    </mat-chip-set>

  </ng-template>  </ng-template>

    

  <!-- CHECKBOX -->  <!-- CHECKBOX -->

  <ng-template #checkboxTemplate>  <ng-template #checkboxTemplate>

    <mat-checkbox [checked]="value" disabled />    <mat-checkbox [checked]="value" disabled />

  </ng-template>  </ng-template>

    

  <!-- Renderizar template seleccionado -->  <!-- Render selected template -->

  <ng-container *ngTemplateOutlet="getCellTemplate()"></ng-container>  <ng-container *ngTemplateOutlet="getCellTemplate()"></ng-container>

</div></div>

``````



**Métodos de Utilidad para Chips**:---

```typescript

getChipLabel(chip: ChipValue | any): string {### 8. DpDatagridColumnsComponent

  if (typeof chip === 'object' && chip?.label) {

    return chip.label;**File**: `columns/dp-datagrid-columns/dp-datagrid-columns.component.ts`

  }

  return String(chip.value || chip);**Purpose**: Container for column definitions (content projection).

}

```typescript

getChipColor(chip: ChipValue | any): string {export class DpDatagridColumnsComponent implements AfterContentInit {

  if (typeof chip === 'object' && chip?.color) {  @ContentChildren(DpDatagridColumnComponent) 

    return chip.color;  columnComponents!: QueryList<DpDatagridColumnComponent>;

  }  

  return '#e0e0e0'; // Gris por defecto  columns = signal<ColumnConfig[]>([]);

}  

```  ngAfterContentInit(): void {

    // Convert projected column components to config array

---    this.columns.set(

      this.columnComponents.map(col => col.getConfig())

### 8. DpDatagridColumnsComponent    );

    

**Archivo**: `columns/dp-datagrid-columns/dp-datagrid-columns.component.ts`    // Register with store

    const store = inject(DatagridStore);

**Propósito**: Contenedor para definiciones de columnas (proyección de contenido).    store.registerColumns(this.columns());

  }

```typescript}

export class DpDatagridColumnsComponent implements AfterContentInit {```

  @ContentChildren(DpDatagridColumnComponent) 

  columnComponents!: QueryList<DpDatagridColumnComponent>;---

  

  columns = signal<ColumnConfig[]>([]);### 9. DpDatagridColumnComponent

  

  ngAfterContentInit(): void {**File**: `columns/dp-datagrid-column/dp-datagrid-column.component.ts`

    // Convertir componentes de columna proyectados a array de config

    this.columns.set(**Purpose**: Define individual column configuration.

      this.columnComponents.map(col => col.getConfig())

    );```typescript

    export class DpDatagridColumnComponent {

    // Registrar con el store  @Input() id!: string;

    const store = inject(DatagridStore);  @Input() label!: string;

    store.registerColumns(this.columns());  @Input() width: number = 150;

  }  @Input() cellType: CellType = 'TEXT';

}  @Input() sortable: boolean = true;

```  @Input() filterable: boolean = true;

  @Input() filterType: FilterType = 'text';

---  @Input() filterOptions?: FilterOption[];

  @Input() visible: boolean = true;

### 9. DpDatagridColumnComponent  @Input() resizable: boolean = true;

  @Input() customTemplate?: TemplateRef<any>;

**Archivo**: `columns/dp-datagrid-column/dp-datagrid-column.component.ts`  

  getConfig(): ColumnConfig {

**Propósito**: Definir configuración de columna individual.    return {

      id: this.id,

```typescript      label: this.label,

export class DpDatagridColumnComponent {      width: this.width,

  @Input() id!: string;      cellType: this.cellType,

  @Input() label!: string;      sortable: this.sortable,

  @Input() width: number = 150;      filterable: this.filterable,

  @Input() cellType: CellType = 'TEXT';      filterType: this.filterType,

  @Input() sortable: boolean = true;      filterOptions: this.filterOptions,

  @Input() filterable: boolean = true;      visible: this.visible,

  @Input() filterType: FilterType = 'text';      resizable: this.resizable,

  @Input() filterOptions?: FilterOption[];      customTemplate: this.customTemplate

  @Input() visible: boolean = true;    };

  @Input() resizable: boolean = true;  }

  @Input() customTemplate?: TemplateRef<any>;}

  ```

  getConfig(): ColumnConfig {

    return {---

      id: this.id,

      label: this.label,### 10. DpDatagridActionsComponent

      width: this.width,

      cellType: this.cellType,**File**: `actions/dp-datagrid-actions/dp-datagrid-actions.component.ts`

      sortable: this.sortable,

      filterable: this.filterable,**Purpose**: Container for action buttons.

      filterType: this.filterType,

      filterOptions: this.filterOptions,```typescript

      visible: this.visible,export class DpDatagridActionsComponent implements AfterContentInit {

      resizable: this.resizable,  @ContentChildren(DpDatagridActionComponent)

      customTemplate: this.customTemplate  actionComponents!: QueryList<DpDatagridActionComponent>;

    };  

  }  actions = signal<ActionConfig[]>([]);

}  

```  ngAfterContentInit(): void {

    this.actions.set(

---      this.actionComponents.map(action => action.getConfig())

    );

### 10. DpDatagridActionsComponent  }

}

**Archivo**: `actions/dp-datagrid-actions/dp-datagrid-actions.component.ts````



**Propósito**: Contenedor para botones de acción.**Template**:

```html

```typescript<div class="actions-container">

export class DpDatagridActionsComponent implements AfterContentInit {  @for (action of actions(); track action.id) {

  @ContentChildren(DpDatagridActionComponent)    <button mat-raised-button

  actionComponents!: QueryList<DpDatagridActionComponent>;            [color]="action.color"

              [disabled]="action.disabled"

  actions = signal<ActionConfig[]>([]);            (click)="action.handler()">

        @if (action.icon) {

  ngAfterContentInit(): void {        <mat-icon>{{ action.icon }}</mat-icon>

    this.actions.set(      }

      this.actionComponents.map(action => action.getConfig())      {{ action.label }}

    );    </button>

  }  }

}</div>

``````



**Template**:---

```html

<div class="actions-container">### 11. DpDatagridActionComponent

  @for (action of actions(); track action.id) {

    <button mat-raised-button**File**: `actions/dp-datagrid-action/dp-datagrid-action.component.ts`

            [color]="action.color"

            [disabled]="action.disabled"**Purpose**: Define individual action.

            (click)="action.handler()">

      @if (action.icon) {```typescript

        <mat-icon>{{ action.icon }}</mat-icon>export class DpDatagridActionComponent {

      }  @Input() id!: string;

      {{ action.label }}  @Input() label!: string;

    </button>  @Input() icon?: string;

  }  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

</div>  @Input() disabled: boolean = false;

```  @Output() actionClick = new EventEmitter<void>();

  

---  getConfig(): ActionConfig {

    return {

### 11. DpDatagridActionComponent      id: this.id,

      label: this.label,

**Archivo**: `actions/dp-datagrid-action/dp-datagrid-action.component.ts`      icon: this.icon,

      color: this.color,

**Propósito**: Definir acción individual.      disabled: this.disabled,

      handler: () => this.actionClick.emit()

```typescript    };

export class DpDatagridActionComponent {  }

  @Input() id!: string;}

  @Input() label!: string;```

  @Input() icon?: string;

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';---

  @Input() disabled: boolean = false;

  @Output() actionClick = new EventEmitter<void>();## Utility Services

  

  getConfig(): ActionConfig {### ChipUtilsService

    return {

      id: this.id,**File**: `services/chip-utils/chip-utils.service.ts`

      label: this.label,

      icon: this.icon,**Purpose**: Centralized chip value handling and display logic.

      color: this.color,

      disabled: this.disabled,```typescript

      handler: () => this.actionClick.emit()@Injectable({ providedIn: 'root' })

    };export class ChipUtilsService {

  }  

}  /**

```   * Get display value for chip

   * Handles both ChipValue objects and primitive values

---   */

  getChipDisplayValue(chip: ChipValue | string | number): string {

## Servicios Auxiliares    if (typeof chip === 'object' && chip !== null) {

      // ChipValue object: { value: any, label: string, color?: string }

### 1. DatagridFilterService      return chip.label || String(chip.value);

    }

**Archivo**: `services/datagrid-filter.service.ts`    // Primitive value

    return String(chip);

**Propósito**: Servicio de filtrado de datos con responsabilidad única.  }

  

**Características**:  /**

- Búsqueda de texto global   * Get chip color

- Filtros específicos por columna   * Returns color from ChipValue or default

- Soporte para múltiples tipos de datos   */

  getChipColor(chip: ChipValue | any): string {

```typescript    if (typeof chip === 'object' && chip?.color) {

@Injectable({ providedIn: 'root' })      return chip.color;

export class DatagridFilterService {    }

      return '#e0e0e0'; // Default gray

  /**  }

   * Aplica filtros a los datos  

   */  /**

  applyFilters<T>(data: T[], searchTerm: string, filters: { [key: string]: any }): T[] {   * Normalize chip value to ChipValue object

    let filtered = [...data];   */

  normalizeChip(value: any): ChipValue {

    // Aplicar búsqueda de texto    if (typeof value === 'object' && value?.value !== undefined) {

    if (searchTerm && searchTerm.trim().length > 0) {      return value as ChipValue;

      const term = searchTerm.toLowerCase().trim();    }

      filtered = filtered.filter(item => {    

        return Object.values(item as any).some(value => {    return {

          if (value === null || value === undefined) return false;      value: value,

          return String(value).toLowerCase().includes(term);      label: String(value),

        });      color: '#e0e0e0'

      });    };

    }  }

  

    // Aplicar filtros específicos  /**

    Object.entries(filters).forEach(([key, value]) => {   * Create ChipValue from components

      if (value === null || value === undefined || value === '') {   */

        return; // Saltar filtros vacíos  createChip(value: any, label: string, color?: string): ChipValue {

      }    return {

      value,

      filtered = filtered.filter(item => {      label,

        const itemValue = (item as any)[key];      color: color || '#e0e0e0'

    };

        // Manejar valores array (chip-array, chip-select)  }

        if (Array.isArray(value)) {}

          if (value.length === 0) return true;```

          

          // Si el valor del item también es array, verificar intersección**Why Separate value and label?**

          if (Array.isArray(itemValue)) {1. **Internationalization**: value stays constant, label can be translated

            return value.some(v => itemValue.includes(v));2. **Backend Integration**: value is ID/code, label is display text

          }3. **Clean Filtering**: Filter by value, display label

          4. **Data Consistency**: Unique values, multiple labels

          // De lo contrario, verificar si el valor del item está en el array de filtro

          return value.includes(itemValue);---

        }

## Type System

        // Manejar valores string (text filter)

        if (typeof value === 'string') {### Core Interfaces

          return String(itemValue).toLowerCase().includes(value.toLowerCase());

        }**File**: `dp-datagrid.interfaces.ts`



        // Manejar valores booleanos```typescript

        if (typeof value === 'boolean') {/**

          return itemValue === value; * Main column configuration

        } */

export interface ColumnConfig {

        // Comparación exacta para otros tipos  id: string;                      // Unique identifier, maps to data property

        return itemValue === value;  label: string;                   // Display name in header

      });  width?: number;                  // Column width in pixels (default: 150)

    });  cellType?: CellType;            // Type of cell renderer

  sortable?: boolean;             // Enable sorting (default: true)

    return filtered;  filterable?: boolean;           // Enable filtering (default: true)

  }  filterType?: FilterType;        // Type of filter component

}  filterOptions?: FilterOption[]; // Options for select/chip-select filters

```  visible?: boolean;              // Column visibility (default: true)

  resizable?: boolean;            // Allow resizing (default: true)

---  customTemplate?: TemplateRef<any>; // Custom cell template

}

### 2. DatagridSortService

/**

**Archivo**: `services/datagrid-sort.service.ts` * Cell types for rendering

 */

**Propósito**: Servicio de ordenamiento con soporte para múltiples tipos de datos.export type CellType = 

  | 'TEXT'        // Plain text

```typescript  | 'IMAGE'       // Image with src URL

@Injectable({ providedIn: 'root' })  | 'CHIP'        // Single chip with color

export class DatagridSortService {  | 'CHIP-ARRAY'  // Array of chips

    | 'CHECKBOX'    // Boolean checkbox

  /**  | 'CUSTOM';     // Custom template

   * Ordena los datos según la columna y dirección especificadas

   *//**

  sort<T>(data: T[], column: string | null, direction: 'asc' | 'desc' | null): T[] { * Filter types

    if (!column || !direction) { */

      return data;export type FilterType =

    }  | 'text'         // Text input with debounce

  | 'select'       // Single select dropdown

    const sorted = [...data].sort((a, b) => {  | 'chip-select'  // Multi-select with chips

      const aValue = (a as any)[column];  | 'date'         // Date picker

      const bValue = (b as any)[column];  | 'number';      // Number input with min/max



      // Manejar valores null/undefined/**

      if (aValue === null || aValue === undefined) return 1; * Filter option for select/chip-select

      if (bValue === null || bValue === undefined) return -1; */

export interface FilterOption {

      // Manejar números  value: any;      // Filter value (what gets stored)

      if (typeof aValue === 'number' && typeof bValue === 'number') {  label: string;   // Display text

        return direction === 'asc' ? aValue - bValue : bValue - aValue;}

      }

/**

      // Manejar fechas * Chip value structure

      const aDate = new Date(aValue); * IMPORTANT: Separates logic (value) from presentation (label)

      const bDate = new Date(bValue); */

      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {export interface ChipValue {

        return direction === 'asc'   value: any;      // Internal value for filtering/logic

          ? aDate.getTime() - bDate.getTime()   label: string;   // Display text for user

          : bDate.getTime() - aDate.getTime();  color?: string;  // Hex color code (e.g., '#ff5722')

      }}



      // Manejar strings (case-insensitive)/**

      const aString = String(aValue).toLowerCase(); * Sort configuration

      const bString = String(bValue).toLowerCase(); */

      export interface SortConfig {

      const comparison = aString.localeCompare(bString);  column: string;

      return direction === 'asc' ? comparison : -comparison;  direction: 'asc' | 'desc' | '';

    });}



    return sorted;/**

  } * Filter configuration

} */

```export interface FilterConfig {

  columnId: string;

---  value: FilterValue;

}

### 3. DatagridPaginationService

export type FilterValue = string | number | boolean | any[] | null;

**Archivo**: `services/datagrid-pagination.service.ts`

/**

**Propósito**: Gestión de estado y lógica de paginación. * Datagrid modes

 */

```typescriptexport type DatagridMode =

@Injectable({ providedIn: 'root' })  | 'basic'      // Simple table

export class DatagridPaginationService {  | 'advanced'   // With filters, actions

    | 'compact';   // Dense layout

  /**

   * Aplica paginación a los datos/**

   */ * Action configuration

  paginate<T>(data: T[], page: number, size: number): T[] { */

    const start = page * size;export interface ActionConfig {

    const end = start + size;  id: string;

    return data.slice(start, end);  label: string;

  }  icon?: string;

  color?: 'primary' | 'accent' | 'warn';

  /**  disabled?: boolean;

   * Calcula el índice de inicio para la página actual  handler: () => void;

   */}

  getStartIndex(page: number, size: number): number {

    return page * size;/**

  } * Persisted state structure

 */

  /**export interface PersistedState {

   * Calcula el índice de fin para la página actual  filters: { [columnId: string]: FilterValue };

   */  sort: SortConfig;

  getEndIndex(page: number, size: number, totalItems: number): number {  columnVisibility: { [columnId: string]: boolean };

    return Math.min((page + 1) * size, totalItems);  columnOrder: string[];

  }  columnWidths: { [columnId: string]: number };

  pageSize: number;

  /**  currentPage: number;

   * Calcula el número total de páginas}

   */```

  getTotalPages(totalItems: number, size: number): number {

    return Math.ceil(totalItems / size);---

  }

}## Performance Considerations

```

### 1. Change Detection Strategy

---All components use `OnPush` change detection:

```typescript

### 4. DatagridSelectionService@Component({

  changeDetection: ChangeDetectionStrategy.OnPush

**Archivo**: `services/datagrid-selection.service.ts`})

```

**Propósito**: Gestión de selección múltiple de items usando CDK SelectionModel.

### 2. Virtual Scrolling (Future Enhancement)

```typescriptFor large datasets (>1000 rows), implement CDK Virtual Scrolling:

@Injectable({ providedIn: 'root' })```typescript

export class DatagridSelectionService<T = any> {import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

  private selection = new SelectionModel<T>(true, []);

  // Template

  /**<cdk-virtual-scroll-viewport itemSize="48">

   * Selecciona un item  @for (row of data; track row.id) {

   */    <dp-datagrid-row [row]="row" />

  select(item: T): void {  }

    this.selection.select(item);</cdk-virtual-scroll-viewport>

  }```



  /**### 3. Filter Debouncing

   * Deselecciona un itemText filters use 300ms debounce to prevent excessive re-renders:

   */```typescript

  deselect(item: T): void {private debounceTimer: any;

    this.selection.deselect(item);

  }onInput(value: string): void {

  clearTimeout(this.debounceTimer);

  /**  this.debounceTimer = setTimeout(() => {

   * Alterna la selección de un item    this.applyFilter(value);

   */  }, 300);

  toggle(item: T): void {}

    this.selection.toggle(item);```

  }

### 4. Computed Signals for Derived State

  /**Use `computed()` instead of manual recalculation:

   * Verifica si un item está seleccionado```typescript

   */// Good ✅

  isSelected(item: T): boolean {const filteredData = computed(() => {

    return this.selection.isSelected(item);  return applyFilters(store.data(), store.filters());

  }});



  /**// Bad ❌

   * Selecciona todos los items de una páginalet filteredData = [];

   */watch(() => store.filters(), () => {

  selectAll(items: T[]): void {  filteredData = applyFilters(store.data(), store.filters());

    items.forEach(item => this.selection.select(item));});

  }```



  /**### 5. TrackBy Functions

   * Deselecciona todos los itemsAlways use trackBy in @for loops:

   */```html

  deselectAll(): void {@for (row of data; track row.id) {

    this.selection.clear();  <dp-datagrid-row [row]="row" />

  }}

```

  /**

   * Obtiene todos los items seleccionados### 6. Lazy Loading Images

   */Images use native lazy loading:

  getSelected(): T[] {```html

    return this.selection.selected;<img [src]="imageUrl" loading="lazy" />

  }```



  /**---

   * Verifica si todos los items de una página están seleccionados

   */## Extension Points

  isAllSelected(items: T[]): boolean {

    return items.every(item => this.selection.isSelected(item));### 1. Custom Cell Templates

  }

}```typescript

```// Component

@ViewChild('customTemplate') customTemplate!: TemplateRef<any>;

---

// Template

## Sistema de Tipos<dp-datagrid-columns>

  <dp-datagrid-column

### Interfaces Principales    id="status"

    label="Status"

**Archivo**: `dp-datagrid.interfaces.ts`    cellType="CUSTOM"

    [customTemplate]="customTemplate"

```typescript  />

/**</dp-datagrid-columns>

 * Configuración principal de columna

 */<ng-template #customTemplate let-row let-value="value">

export interface ColumnConfig {  <div class="custom-status" [class]="getStatusClass(value)">

  id: string;                      // Identificador único, mapea a propiedad de datos    {{ value }}

  label: string;                   // Nombre de visualización en encabezado  </div>

  width?: number;                  // Ancho de columna en píxeles (default: 150)</ng-template>

  cellType?: CellType;            // Tipo de renderizador de celda```

  sortable?: boolean;             // Habilitar ordenamiento (default: true)

  filterable?: boolean;           // Habilitar filtrado (default: true)### 2. Custom Filter Types

  filterType?: FilterType;        // Tipo de componente de filtro

  filterOptions?: FilterOption[]; // Opciones para filtros select/chip-selectCreate new filter component:

  visible?: boolean;              // Visibilidad de columna (default: true)```typescript

  resizable?: boolean;            // Permitir redimensionamiento (default: true)@Component({

  customTemplate?: TemplateRef<any>; // Template de celda personalizado  selector: 'range-filter',

}  template: `

    <mat-slider

/**      [min]="min"

 * Tipos de celda para renderizado      [max]="max"

 */      (input)="onRangeChange($event)"

export type CellType =     />

  | 'TEXT'        // Texto plano  `

  | 'IMAGE'       // Imagen con URL src})

  | 'CHIP'        // Chip único con colorexport class RangeFilterComponent implements FilterComponent {

  | 'CHIP-ARRAY'  // Array de chips  @Input() column!: ColumnConfig;

  | 'CHECKBOX'    // Checkbox booleano  @Input() value: [number, number] = [0, 100];

  | 'CUSTOM';     // Template personalizado  @Output() filterChange = new EventEmitter<[number, number]>();

  

/**  onRangeChange(event: any): void {

 * Tipos de filtro    this.filterChange.emit([event.value.start, event.value.end]);

 */  }

export type FilterType =}

  | 'text'         // Input de texto con debounce```

  | 'select'       // Dropdown de selección única

  | 'chip-select'  // Multi-selección con chipsRegister in filter container:

  | 'date'         // Selector de fecha```typescript

  | 'number';      // Input numérico con min/maxgetFilterComponent(column: ColumnConfig): Type<any> {

  switch (column.filterType) {

/**    case 'range':

 * Opción de filtro para select/chip-select      return RangeFilterComponent;

 */    // ... existing types

export interface FilterOption {  }

  value: any;      // Valor del filtro (lo que se almacena)}

  label: string;   // Texto de visualización```

}

### 3. Custom Actions

/**

 * Estructura de valor de chip```html

 * IMPORTANTE: Separa lógica (value) de presentación (label)<dp-datagrid-actions>

 */  <dp-datagrid-action

export interface ChipValue {    id="export"

  value: any;      // Valor interno para filtrado/lógica    label="Export"

  label: string;   // Texto de visualización para el usuario    icon="download"

  color?: string;  // Código de color hex (ej: '#ff5722')    color="primary"

}    (actionClick)="handleExport()"

  />

/**  

 * Configuración de ordenamiento  <dp-datagrid-action

 */    id="delete"

export interface SortConfig {    label="Delete Selected"

  column: string;    icon="delete"

  direction: 'asc' | 'desc' | '';    color="warn"

}    [disabled]="!hasSelection()"

    (actionClick)="handleDelete()"

/**  />

 * Configuración de filtro</dp-datagrid-actions>

 */```

export interface FilterConfig {

  columnId: string;### 4. Row Detail Expansion

  value: FilterValue;

}```html

<dp-datagrid [data]="data" [expandable]="true">

export type FilterValue = string | number | boolean | any[] | null;  <dp-datagrid-columns>

    <!-- columns -->

/**  </dp-datagrid-columns>

 * Modos de datagrid  

 */  <!-- Row detail template -->

export type DatagridMode =  <ng-template dpRowDetail let-row>

  | 'basic'      // Tabla simple    <div class="row-detail-content">

  | 'advanced'   // Con filtros, acciones      <h3>Details for {{ row.name }}</h3>

  | 'compact';   // Layout denso      <p>{{ row.description }}</p>

    </div>

/**  </ng-template>

 * Configuración de acción</dp-datagrid>

 */```

export interface ActionConfig {

  id: string;### 5. Custom Cell Types

  label: string;

  icon?: string;Add new cell type:

  color?: 'primary' | 'accent' | 'warn';```typescript

  disabled?: boolean;// 1. Extend CellType

  handler: () => void;export type CellType = 'TEXT' | 'IMAGE' | 'CHIP' | 'RATING'; // New type

}

// 2. Add template in cell component

/**<ng-template #ratingTemplate>

 * Estructura de estado persistido  <mat-icon *ngFor="let star of [1,2,3,4,5]">

 */    {{ star <= value ? 'star' : 'star_border' }}

export interface PersistedState {  </mat-icon>

  filters: { [columnId: string]: FilterValue };</ng-template>

  sort: SortConfig;

  columnVisibility: { [columnId: string]: boolean };// 3. Add to switch

  columnOrder: string[];getCellTemplate(): TemplateRef<any> {

  columnWidths: { [columnId: string]: number };  switch (this.column.cellType) {

  pageSize: number;    case 'RATING':

  currentPage: number;      return this.ratingTemplate;

}    // ... other types

```  }

}

---```



## Consideraciones de Rendimiento---



### 1. Estrategia de Detección de Cambios## State Persistence

Todos los componentes usan detección de cambios `OnPush`:

```typescript### SessionStorage Schema

@Component({

  changeDetection: ChangeDetectionStrategy.OnPush**Key**: `dp-datagrid-${stateId}`

})

```**Value**:

```json

### 2. Virtual Scrolling (Mejora Futura){

Para datasets grandes (>1000 filas), implementar CDK Virtual Scrolling:  "filters": {

```typescript    "category": ["Electronics", "Books"],

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';    "price": "100"

  },

// Template  "sort": {

<cdk-virtual-scroll-viewport itemSize="48">    "column": "name",

  @for (row of data; track row.id) {    "direction": "asc"

    <dp-datagrid-row [row]="row" />  },

  }  "columnVisibility": {

</cdk-virtual-scroll-viewport>    "id": true,

```    "name": true,

    "hidden": false

### 3. Debouncing de Filtros  },

Filtros de texto usan debounce de 300ms para prevenir re-renderizados excesivos:  "columnOrder": ["id", "name", "category", "price"],

```typescript  "columnWidths": {

private debounceTimer: any;    "name": 250,

    "category": 180

onInput(value: string): void {  },

  clearTimeout(this.debounceTimer);  "pageSize": 25,

  this.debounceTimer = setTimeout(() => {  "currentPage": 2

    this.applyFilter(value);}

  }, 300);```

}

```### Save/Load Logic



### 4. Signals Computados para Estado Derivado```typescript

Usar `computed()` en lugar de recálculo manual:// Save

```typescriptsaveState(): void {

// Bien ✅  if (!this.stateId()) return;

const filteredData = computed(() => {  

  return applyFilters(store.data(), store.filters());  const state: PersistedState = {

});    filters: Object.fromEntries(this.filters()),

    sort: {

// Mal ❌      column: this.sortColumn(),

let filteredData = [];      direction: this.sortDirection()

watch(() => store.filters(), () => {    },

  filteredData = applyFilters(store.data(), store.filters());    columnVisibility: Object.fromEntries(this.columnVisibility()),

});    columnOrder: this.columnOrder(),

```    columnWidths: Object.fromEntries(this.columnWidths()),

    pageSize: this.pageSize(),

### 5. Funciones TrackBy    currentPage: this.currentPage()

Siempre usar trackBy en bucles @for:  };

```html  

@for (row of data; track row.id) {  sessionStorage.setItem(

  <dp-datagrid-row [row]="row" />    `dp-datagrid-${this.stateId()}`,

}    JSON.stringify(state)

```  );

}

### 6. Lazy Loading de Imágenes

Las imágenes usan lazy loading nativo:// Load

```htmlloadState(stateId: string): void {

<img [src]="imageUrl" loading="lazy" />  const saved = sessionStorage.getItem(`dp-datagrid-${stateId}`);

```  if (!saved) return;

  

---  try {

    const state: PersistedState = JSON.parse(saved);

## Puntos de Extensión    

    patchState(this, {

### 1. Templates de Celda Personalizados      filters: new Map(Object.entries(state.filters)),

      sortColumn: state.sort.column,

```typescript      sortDirection: state.sort.direction,

// Componente      columnVisibility: new Map(Object.entries(state.columnVisibility)),

@ViewChild('customTemplate') customTemplate!: TemplateRef<any>;      columnOrder: state.columnOrder,

      columnWidths: new Map(Object.entries(state.columnWidths)),

// Template      pageSize: state.pageSize,

<dp-datagrid-columns>      currentPage: state.currentPage

  <dp-datagrid-column    });

    id="status"  } catch (error) {

    label="Estado"    console.error('Failed to load datagrid state:', error);

    cellType="CUSTOM"  }

    [customTemplate]="customTemplate"}

  />```

</dp-datagrid-columns>

---

<ng-template #customTemplate let-row let-value="value">

  <div class="custom-status" [class]="getStatusClass(value)">## Testing Considerations

    {{ value }}

  </div>### Unit Testing

</ng-template>

``````typescript

describe('DatagridStore', () => {

### 2. Tipos de Filtro Personalizados  let store: InstanceType<typeof DatagridStore>;

  

Crear nuevo componente de filtro:  beforeEach(() => {

```typescript    TestBed.configureTestingModule({

@Component({      providers: [DatagridStore]

  selector: 'range-filter',    });

  template: `    store = TestBed.inject(DatagridStore);

    <mat-slider  });

      [min]="min"  

      [max]="max"  it('should filter data correctly', () => {

      (input)="onRangeChange($event)"    store.setData([

    />      { id: 1, name: 'Alice' },

  `      { id: 2, name: 'Bob' }

})    ]);

export class RangeFilterComponent implements FilterComponent {    

  @Input() column!: ColumnConfig;    store.setFilter('name', 'Alice');

  @Input() value: [number, number] = [0, 100];    

  @Output() filterChange = new EventEmitter<[number, number]>();    expect(store.filteredData()).toEqual([{ id: 1, name: 'Alice' }]);

    });

  onRangeChange(event: any): void {  

    this.filterChange.emit([event.value.start, event.value.end]);  it('should sort data correctly', () => {

  }    store.setData([

}      { id: 2, name: 'Bob' },

```      { id: 1, name: 'Alice' }

    ]);

Registrar en contenedor de filtros:    

```typescript    store.setSort('name', 'asc');

getFilterComponent(column: ColumnConfig): Type<any> {    

  switch (column.filterType) {    const sorted = store.paginatedData();

    case 'range':    expect(sorted[0].name).toBe('Alice');

      return RangeFilterComponent;  });

    // ... tipos existentes});

  }```

}

```### Component Testing



### 3. Acciones Personalizadas```typescript

describe('DpDatagridComponent', () => {

```html  it('should render rows', () => {

<dp-datagrid-actions>    const fixture = TestBed.createComponent(DpDatagridComponent);

  <dp-datagrid-action    fixture.componentInstance.data = [

    id="export"      { id: 1, name: 'Test' }

    label="Exportar"    ];

    icon="download"    fixture.detectChanges();

    color="primary"    

    (actionClick)="handleExport()"    const rows = fixture.nativeElement.querySelectorAll('.dp-row');

  />    expect(rows.length).toBe(1);

    });

  <dp-datagrid-action});

    id="delete"```

    label="Eliminar Seleccionados"

    icon="delete"---

    color="warn"

    [disabled]="!hasSelection()"## Migration Guide

    (actionClick)="handleDelete()"

  />### From v1.x to v2.x

</dp-datagrid-actions>

```**Breaking Changes**:

1. ChipValue structure changed from `{ value, color }` to `{ value, label, color }`

### 4. Expansión de Detalle de Fila2. FilterType 'multi-select' renamed to 'chip-select'

3. Store API changed from methods to signals

```html

<dp-datagrid [data]="data" [expandable]="true">**Migration Steps**:

  <dp-datagrid-columns>

    <!-- columnas -->```typescript

  </dp-datagrid-columns>// Old (v1.x)

  const chip = { value: 'Premium', color: '#9c27b0' };

  <!-- Template de detalle de fila -->

  <ng-template dpRowDetail let-row>// New (v2.x)

    <div class="row-detail-content">const chip = { 

      <h3>Detalles de {{ row.name }}</h3>  value: 'premium-001',  // Backend ID

      <p>{{ row.description }}</p>  label: 'Premium',      // Display text

    </div>  color: '#9c27b0' 

  </ng-template>};

</dp-datagrid>

```// Old filter type

<dp-datagrid-column filterType="multi-select" />

### 5. Tipos de Celda Personalizados

// New filter type

Agregar nuevo tipo de celda:<dp-datagrid-column filterType="chip-select" />

```typescript

// 1. Extender CellType// Old store usage

export type CellType = 'TEXT' | 'IMAGE' | 'CHIP' | 'RATING'; // Nuevo tipostore.getFilteredData();



// 2. Agregar template en componente de celda// New store usage

<ng-template #ratingTemplate>store.filteredData();  // Signal

  <mat-icon *ngFor="let star of [1,2,3,4,5]">```

    {{ star <= value ? 'star' : 'star_border' }}

  </mat-icon>---

</ng-template>

## Troubleshooting

// 3. Agregar al switch

getCellTemplate(): TemplateRef<any> {### Common Issues

  switch (this.column.cellType) {

    case 'RATING':**1. Filters not working**

      return this.ratingTemplate;- Check column `filterable: true`

    // ... otros tipos- Verify `filterType` matches data type

  }- Ensure filter value is correct type (string, array, etc.)

}

```**2. Sorting not working**

- Verify column `sortable: true`

---- Check data has the column property

- Ensure column ID matches data property

## Persistencia de Estado

**3. State not persisting**

### Schema de SessionStorage- Enable `enablePersistence: true`

- Provide unique `stateId`

**Clave**: `dp-datagrid-${stateId}`- Check browser sessionStorage is enabled



**Valor**:**4. Chips not displaying correctly**

```json- Verify ChipValue structure: `{ value, label, color }`

{- Check chip-utils.service is injected

  "filters": {- Ensure color is valid hex code

    "category": ["Electrónica", "Libros"],

    "price": "100"**5. Performance issues**

  },- Implement pagination for large datasets

  "sort": {- Use virtual scrolling for >1000 rows

    "column": "name",- Check filter debounce is working

    "direction": "asc"- Verify OnPush change detection

  },

  "columnVisibility": {---

    "id": true,

    "name": true,## Future Enhancements

    "hidden": false

  },### Planned Features

  "columnOrder": ["id", "name", "category", "price"],1. **Virtual Scrolling**: CDK integration for large datasets

  "columnWidths": {2. **Column Reordering**: Drag-and-drop column order

    "name": 250,3. **Export Functionality**: CSV, Excel, PDF export

    "category": 1804. **Advanced Filters**: Date ranges, number ranges, regex

  },5. **Grouping**: Group rows by column values

  "pageSize": 25,6. **Aggregations**: Sum, average, count in footer

  "currentPage": 27. **Inline Editing**: Edit cells directly in grid

}8. **Keyboard Navigation**: Arrow keys, shortcuts

```9. **Context Menu**: Right-click row actions

10. **Column Pinning**: Freeze left/right columns

### Lógica de Guardar/Cargar

### API Stability

```typescript- **Stable**: ColumnConfig, CellType, FilterType, ChipValue

// Guardar- **Experimental**: Custom templates, advanced filters

saveState(): void {- **Deprecated**: None

  if (!this.stateId()) return;

  ---

  const state: PersistedState = {

    filters: Object.fromEntries(this.filters()),## Contributing Guidelines

    sort: {

      column: this.sortColumn(),### Code Style

      direction: this.sortDirection()- Follow Angular style guide

    },- Use signals for state

    columnVisibility: Object.fromEntries(this.columnVisibility()),- OnPush change detection

    columnOrder: this.columnOrder(),- Standalone components

    columnWidths: Object.fromEntries(this.columnWidths()),- Descriptive variable names

    pageSize: this.pageSize(),

    currentPage: this.currentPage()### File Organization

  };```

  feature/

  sessionStorage.setItem(├── index.ts                    # Barrel export

    `dp-datagrid-${this.stateId()}`,├── feature.component.ts        # Component

    JSON.stringify(state)├── feature.component.html      # Template

  );├── feature.component.scss      # Styles

}├── feature.component.spec.ts   # Tests

└── feature.interfaces.ts       # Types

// Cargar```

loadState(stateId: string): void {

  const saved = sessionStorage.getItem(`dp-datagrid-${stateId}`);### Commit Messages

  if (!saved) return;```

  feat: add virtual scrolling support

  try {fix: resolve chip color not displaying

    const state: PersistedState = JSON.parse(saved);docs: update maintenance guide

    refactor: extract filter logic to service

    patchState(this, {test: add unit tests for store

      filters: new Map(Object.entries(state.filters)),```

      sortColumn: state.sort.column,

      sortDirection: state.sort.direction,---

      columnVisibility: new Map(Object.entries(state.columnVisibility)),

      columnOrder: state.columnOrder,## Version History

      columnWidths: new Map(Object.entries(state.columnWidths)),

      pageSize: state.pageSize,### v2.0.0 (Current)

      currentPage: state.currentPage- Separated chip value/label

    });- Added chip-select filter

  } catch (error) {- Improved state persistence

    console.error('Error al cargar estado de datagrid:', error);- Enhanced TypeScript types

  }

}### v1.0.0

```- Initial release

- Basic datagrid functionality

---- Filtering, sorting, pagination

- Column configuration

## Consideraciones de Testing- Action buttons



### Testing Unitario---



```typescript## License & Support

describe('DatagridStore', () => {

  let store: InstanceType<typeof DatagridStore>;**License**: MIT

  

  beforeEach(() => {**Support**: For issues and questions, refer to the main MANUAL.md or create an issue in the repository.

    TestBed.configureTestingModule({

      providers: [DatagridStore]**Last Updated**: November 2, 2025

    });
    store = TestBed.inject(DatagridStore);
  });
  
  it('debe filtrar datos correctamente', () => {
    store.setData([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]);
    
    store.setFilter('name', 'Alice');
    
    expect(store.filteredData()).toEqual([{ id: 1, name: 'Alice' }]);
  });
  
  it('debe ordenar datos correctamente', () => {
    store.setData([
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' }
    ]);
    
    store.setSort('name', 'asc');
    
    const sorted = store.paginatedData();
    expect(sorted[0].name).toBe('Alice');
  });
});
```

### Testing de Componentes

```typescript
describe('DpDatagridComponent', () => {
  it('debe renderizar filas', () => {
    const fixture = TestBed.createComponent(DpDatagridComponent);
    fixture.componentInstance.data = [
      { id: 1, name: 'Test' }
    ];
    fixture.detectChanges();
    
    const rows = fixture.nativeElement.querySelectorAll('.dp-row');
    expect(rows.length).toBe(1);
  });
});
```

---

## Guía de Migración

### De v1.x a v2.x

**Cambios Breaking**:
1. Estructura ChipValue cambió de `{ value, color }` a `{ value, label, color }`
2. FilterType 'multi-select' renombrado a 'chip-select'
3. API del Store cambió de métodos a signals

**Pasos de Migración**:

```typescript
// Antiguo (v1.x)
const chip = { value: 'Premium', color: '#9c27b0' };

// Nuevo (v2.x)
const chip = { 
  value: 'premium-001',  // ID de backend
  label: 'Premium',      // Texto de visualización
  color: '#9c27b0' 
};

// Tipo de filtro antiguo
<dp-datagrid-column filterType="multi-select" />

// Tipo de filtro nuevo
<dp-datagrid-column filterType="chip-select" />

// Uso del store antiguo
store.getFilteredData();

// Uso del store nuevo
store.filteredData();  // Signal
```

---

## Solución de Problemas

### Problemas Comunes

**1. Filtros no funcionan**
- Verificar que la columna tenga `filterable: true`
- Verificar que `filterType` coincida con el tipo de datos
- Asegurar que el valor del filtro sea del tipo correcto (string, array, etc.)

**2. Ordenamiento no funciona**
- Verificar que la columna tenga `sortable: true`
- Verificar que los datos tengan la propiedad de columna
- Asegurar que el ID de columna coincida con la propiedad de datos

**3. Estado no persiste**
- Habilitar `enablePersistence: true`
- Proveer `stateId` único
- Verificar que sessionStorage del navegador esté habilitado

**4. Chips no se visualizan correctamente**
- Verificar estructura ChipValue: `{ value, label, color }`
- Verificar métodos getChipLabel() y getChipColor()
- Asegurar que el color sea código hex válido

**5. Problemas de rendimiento**
- Implementar paginación para datasets grandes
- Usar virtual scrolling para >1000 filas
- Verificar que el debounce de filtros funcione
- Verificar detección de cambios OnPush

---

## Mejoras Futuras

### Características Planificadas
1. **Virtual Scrolling**: Integración CDK para datasets grandes
2. **Reordenamiento de Columnas**: Drag-and-drop para orden de columnas
3. **Funcionalidad de Exportación**: Exportación a CSV, Excel, PDF
4. **Filtros Avanzados**: Rangos de fechas, rangos numéricos, regex
5. **Agrupamiento**: Agrupar filas por valores de columna
6. **Agregaciones**: Suma, promedio, conteo en pie de página
7. **Edición en Línea**: Editar celdas directamente en la grid
8. **Navegación por Teclado**: Teclas de flecha, shortcuts
9. **Menú Contextual**: Acciones con clic derecho en fila
10. **Fijación de Columnas**: Congelar columnas izquierda/derecha

### Estabilidad de API
- **Estable**: ColumnConfig, CellType, FilterType, ChipValue
- **Experimental**: Templates personalizados, filtros avanzados
- **Deprecado**: Ninguno

---

## Guía de Contribución

### Estilo de Código
- Seguir guía de estilo de Angular
- Usar signals para estado
- Detección de cambios OnPush
- Componentes standalone
- Nombres de variables descriptivos

### Organización de Archivos
```
feature/
├── index.ts                    # Barrel export
├── feature.component.ts        # Componente
├── feature.component.html      # Template
├── feature.component.scss      # Estilos
├── feature.component.spec.ts   # Tests
└── feature.interfaces.ts       # Tipos
```

### Mensajes de Commit
```
feat: agregar soporte para virtual scrolling
fix: resolver color de chip no se muestra
docs: actualizar guía de mantenimiento
refactor: extraer lógica de filtro a servicio
test: agregar tests unitarios para store
```

---

## Historial de Versiones

### v2.0.0 (Actual)
- Separación de value/label en chips
- Agregado filtro chip-select
- Mejorada persistencia de estado
- Tipos TypeScript mejorados

### v1.0.0
- Release inicial
- Funcionalidad básica de datagrid
- Filtrado, ordenamiento, paginación
- Configuración de columnas
- Botones de acción

---

## Licencia y Soporte

**Licencia**: MIT

**Soporte**: Para problemas y preguntas, referirse al MANUAL.md principal o crear un issue en el repositorio.

**Última Actualización**: 2 de Noviembre, 2025
