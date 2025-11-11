import {
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  inject,
  input,
  output,
  signal,
  computed,
  effect,
  untracked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DpDatagridColumnComponent, DpDatagridColumnsComponent } from './columns';
import { DpDatagridHeaderComponent } from './headers';
import { DpDatagridFilterComponent } from './filters';
import { DpDatagridRowComponent } from './rows';
import { DpDatagridActionComponent } from './actions';

import { TableColumn, FilterConfig, PageChangeEvent, FilterChangeEvent, LoadDataEvent } from './dp-datagrid.interfaces';
import {
  DatagridFilterService,
  DatagridSortService,
  DatagridPaginationService,
  DatagridSelectionService
} from './services';
import {
  DatagridStateStore,
  DEFAULT_PERSISTENCE_CONFIG,
  DatagridPersistenceConfig,
  DatagridState
} from './store';

@Component({
  selector: 'dp-datagrid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
    DpDatagridHeaderComponent,
    DpDatagridRowComponent,
    TranslatePipe,
  ],
  templateUrl: './dp-datagrid.component.html',
  styleUrls: ['./dp-datagrid.component.scss']
})
export class DpDatagridComponent implements AfterContentInit, OnDestroy {
  // ========== PERSISTENCE INPUTS ==========

  /**
   * ID único para esta instancia del datagrid
   * IMPORTANTE: Debe ser único si hay múltiples datagrids en la misma página
   */
  datagridId = input<string>('default-datagrid');

  /**
   * Configuración de persistencia
   */
  persistenceConfig = input<DatagridPersistenceConfig>(DEFAULT_PERSISTENCE_CONFIG);

  // ========== STORE INJECTION ==========

  private readonly store = inject(DatagridStateStore);

  // ========== INPUTS ==========

  data = input.required<any[]>();

  /**
   * Modo de manejo de datos:
   * - true: El grid maneja los datos localmente (filtrado, ordenamiento, paginación)
   * - false: Los datos se manejan desde el servidor (emite eventos onLoadData)
   */
  localData = input<boolean>(true);

  /**
   * Total de registros en el servidor (solo usado cuando localData = false)
   */
  totalRecords = input<number>(0);

  selectable = input<boolean>(false);
  searchable = input<boolean>(true);
  exportable = input<boolean>(false);
  searchPlaceholder = input<string>('Buscar...');
  pagination = input<boolean>(true);
  pageSize = input<number>(10);
  pageSizeOptions = input<number[]>([5, 10, 25, 50, 100]);

  // Pagination labels (traducibles)
  paginationItemsPerPageLabel = input<string>('Resultados por página:');
  paginationRangeLabel = input<(page: number, pageSize: number, length: number) => string>(
    (page: number, pageSize: number, length: number) => {
      const startIndex = page * pageSize + 1;
      const endIndex = Math.min((page + 1) * pageSize, length);
      return `${startIndex}-${endIndex} of ${length}`;
    }
  );

  // Outputs - Solo dos eventos principales
  onPageChange = output<PageChangeEvent>();
  onFilterChange = output<FilterChangeEvent>();

  /**
   * Evento emitido cuando localData = false
   * El componente padre debe cargar los datos desde el servidor
   */
  onLoadData = output<LoadDataEvent>();

  // Content Children
  @ContentChild(DpDatagridColumnsComponent) columnsContainer?: DpDatagridColumnsComponent;
  @ContentChildren(DpDatagridColumnComponent, { descendants: true }) columnComponents!: QueryList<DpDatagridColumnComponent>;
  @ContentChildren(DpDatagridFilterComponent, { descendants: true }) filterComponents!: QueryList<DpDatagridFilterComponent>;
  @ContentChildren(DpDatagridActionComponent, { descendants: true }) actionComponents!: QueryList<DpDatagridActionComponent>;

  // Internal signals
  columns = signal<TableColumn[]>([]);
  filters = signal<FilterConfig[]>([]);
  searchTerm = signal<string>('');
  showFilters = signal<boolean>(false);
  currentPage = signal<number>(0);
  currentPageSize = signal<number>(10);
  sortColumn = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc' | null>(null);
  activeFilters = signal<{ [key: string]: any }>({});

  constructor(
    private filterService: DatagridFilterService,
    private sortService: DatagridSortService,
    private paginationService: DatagridPaginationService,
    private selectionService: DatagridSelectionService<any>
  ) {
    effect(() => {
      this.currentPageSize.set(this.pageSize());
    });

    // 🆕 EFFECT: Sincronizar estado local → store (DESACTIVADO TEMPORALMENTE)
    // TODO: Implementar sincronización manual en los métodos que modifican estado
    // effect(() => {
    //   const config = this.persistenceConfig();
    //   if (!config.enabled) return;
    //
    //   const id = this.datagridId();
    //
    //   const instance = this.store.getInstance(id);
    //   if (!instance) return;
    //
    //   untracked(() => {
    //     this.store.updateInstance(id, {
    //       searchTerm: this.searchTerm(),
    //       currentPage: this.currentPage(),
    //       currentPageSize: this.currentPageSize(),
    //       showFilters: this.showFilters(),
    //       sortColumn: this.sortColumn(),
    //       sortDirection: this.sortDirection(),
    //       activeFilters: this.activeFilters()
    //     });
    //   });
    // }, { allowSignalWrites: true });
  }

  // Computed signal para calcular anchos de columnas usando proporciones flex
  columnWidths = computed(() => {
    const cols = this.columns();
    if (cols.length === 0) return new Map<string, string>();

    // Separar columnas con width definido vs columnas sin width (*)
    const columnsWithWidth: { key: string; width: number }[] = [];
    const columnsWithoutWidth: { key: string }[] = [];

    cols.forEach(col => {
      if (col.width) {
        const width = typeof col.width === 'number' ? col.width : parseFloat(col.width);
        if (!isNaN(width) && width > 0) {
          columnsWithWidth.push({ key: col.key, width });
        } else {
          columnsWithoutWidth.push({ key: col.key });
        }
      } else {
        // Sin width = columna * (flexible)
        columnsWithoutWidth.push({ key: col.key });
      }
    });

    // Crear mapa de proporciones flex
    const widthMap = new Map<string, string>();

    // Asignar proporciones a columnas con width definido
    columnsWithWidth.forEach(col => {
      widthMap.set(col.key, `${col.width}fr`);
    });

    // Asignar 1fr a columnas sin width (*)
    // Todas las columnas flexibles comparten el espacio restante equitativamente
    columnsWithoutWidth.forEach(col => {
      widthMap.set(col.key, '1fr');
    });

    return widthMap;
  });

  // Computed signals
  filteredData = computed(() => {
    // En modo servidor, devolvemos los datos tal cual vienen del servidor
    if (!this.localData()) {
      return this.data();
    }

    // En modo local, aplicamos filtros localmente
    return this.filterService.applyFilters(
      this.data(),
      this.searchTerm(),
      this.activeFilters()
    );
  });

  sortedData = computed(() => {
    // En modo servidor, los datos ya vienen ordenados
    if (!this.localData()) {
      return this.filteredData();
    }

    // En modo local, aplicamos sort localmente
    return this.sortService.sort(
      this.filteredData(),
      this.sortColumn(),
      this.sortDirection()
    );
  });

  paginatedData = computed(() => {
    // Si no hay paginación, devolver todo
    if (!this.pagination()) {
      return this.sortedData();
    }

    // En modo servidor, los datos ya vienen paginados
    if (!this.localData()) {
      return this.sortedData();
    }

    // En modo local, aplicamos paginación localmente
    return this.paginationService.paginate(
      this.sortedData(),
      this.currentPage(),
      this.currentPageSize()
    );
  });

  totalRows = computed(() => {
    // En modo servidor, usar el totalRecords proporcionado
    if (!this.localData()) {
      return this.totalRecords();
    }

    // En modo local, contar los datos filtrados/ordenados
    return this.sortedData().length;
  });

  totalPages = computed(() => {
    if (!this.pagination()) return 1;
    return Math.ceil(this.totalRows() / this.currentPageSize());
  });

  // Handlers para pasar a las celdas (bind para mantener el contexto)
  cellClickHandler = (columnKey: string, row: any) => {
    this.handleColumnClick(columnKey, row);
  };

  cellRenderHandler = (columnKey: string, row: any) => {
    this.handleColumnRender(columnKey, row);
  };

  ngAfterContentInit() {
    // Initialize columns from content children
    if (this.columnComponents) {
      // Obtener propiedades globales del contenedor si existe
      const globalHeaderBackground = this.columnsContainer?.headerBackground();
      const globalHeaderColor = this.columnsContainer?.headerColor();
      const globalHeaderFontSize = this.columnsContainer?.headerFontSize();
      const globalHeaderFontWeight = this.columnsContainer?.headerFontWeight();
      const globalHeaderFontFamily = this.columnsContainer?.headerFontFamily();

      const cols = this.columnComponents.map(col => {
        const config = col.getColumnConfig();

        // Aplicar propiedades globales solo si la columna no tiene sus propias propiedades
        return {
          ...config,
          headerBackground: config.headerBackground ?? globalHeaderBackground,
          headerColor: config.headerColor ?? globalHeaderColor,
          headerFontSize: config.headerFontSize ?? globalHeaderFontSize,
          headerFontWeight: config.headerFontWeight ?? globalHeaderFontWeight,
          headerFontFamily: config.headerFontFamily ?? globalHeaderFontFamily,
        };
      });

      this.columns.set(cols);
    }

    // Initialize filters from content children
    if (this.filterComponents) {
      const filterConfigs = this.filterComponents.map(filter => filter.config());
      this.filters.set(filterConfigs);

      // Subscribe to filter changes
      this.filterComponents.forEach(filter => {
        filter.filterChange.subscribe((event: { key: string; value: any }) => {
          this.handleFilterChange(event);
        });
      });
    }

    // 🆕 NUEVO: Inicializar/Restaurar estado
    this._initializeState();
  }

  ngOnDestroy() {
    const config = this.persistenceConfig();

    // Limpiar store si está configurado
    if (config.clearOnDestroy) {
      this.store.destroyInstance(this.datagridId());
    }
  }

  // ========== MÉTODOS DE PERSISTENCIA ==========

  /**
   * Inicializa o restaura el estado desde el store
   */
  private _initializeState() {
    const config = this.persistenceConfig();
    const id = this.datagridId();

    console.log(`🔧 Initializing state for datagrid "${id}"`, { config });

    if (!config.enabled) {
      console.log(`⏭️ Persistence disabled for datagrid "${id}"`);
      // Si está en modo servidor y no hay persistencia, emitir carga inicial
      if (!this.localData()) {
        setTimeout(() => {
          console.log(`🌐 Emitting initial onLoadData (server mode, no persistence)`);
          this.emitLoadData('page');
        }, 150);
      }
      return;
    }

    // Inicializar instancia en el store
    const state = this.store.initializeInstance(
      id,
      {
        currentPageSize: this.pageSize()
      },
      config.autoRestore
    );

    console.log(`📦 State after initialization:`, state);

    // Restaurar signals locales si autoRestore está activado
    if (config.autoRestore && state) {
      console.log(`🔄 Auto-restoring state...`);
      this._restoreLocalState(state);
    } else if (!this.localData()) {
      // Si está en modo servidor pero no hay estado que restaurar, emitir carga inicial
      setTimeout(() => {
        console.log(`🌐 Emitting initial onLoadData (server mode, no saved state)`);
        this.emitLoadData('page');
      }, 150);
    }
  }

  /**
   * Restaura los signals locales desde el estado del store
   */
  private _restoreLocalState(state: DatagridState) {
    console.log(`🔄 Restoring local state for "${this.datagridId()}"`, state);

    this.searchTerm.set(state.searchTerm);
    this.currentPage.set(state.currentPage);
    this.currentPageSize.set(state.currentPageSize);
    this.showFilters.set(state.showFilters);
    this.sortColumn.set(state.sortColumn);
    this.sortDirection.set(state.sortDirection);
    this.activeFilters.set(state.activeFilters);

    // 🆕 IMPORTANTE: Propagar valores restaurados a los filtros hijos
    this._updateFilterChildrenValues(state.activeFilters);

    // 🆕 Si está en modo servidor, emitir onLoadData para cargar datos con el estado restaurado
    if (!this.localData()) {
      console.log(`🌐 Emitting onLoadData after state restoration (server mode)`);
      // Usar setTimeout para asegurar que todos los signals están actualizados
      setTimeout(() => {
        this.emitLoadData('page');
      }, 150);
    }
  }

  /**
   * Actualiza los valores de los componentes de filtro hijos
   */
  private _updateFilterChildrenValues(filters: Record<string, any>) {
    if (!this.filterComponents) return;

    console.log(`🔄 Updating filter children with values:`, filters);

    // Usar setTimeout para asegurar que los componentes hijos están inicializados y tienen ViewChild listo
    setTimeout(() => {
      this.filterComponents.forEach(filterComponent => {
        const key = filterComponent.key();
        const value = filters[key];

        if (value !== undefined && value !== null) {
          console.log(`  → Setting filter "${key}" to:`, value);
          // Llamar al método público setValue del orquestador
          filterComponent.setValue(value);
        }
      });
    }, 100); // Aumentamos el timeout para asegurar que ViewChild está listo
  }

  /**
   * Resetea el estado del datagrid manteniendo el pageSize
   */
  resetState() {
    const config = this.persistenceConfig();
    const id = this.datagridId();

    if (config.enabled) {
      this.store.resetInstance(id, true);
      const state = this.store.getInstance(id);
      if (state) {
        this._restoreLocalState(state);
      }
    } else {
      // Reset manual si no hay persistencia
      this.searchTerm.set('');
      this.currentPage.set(0);
      this.sortColumn.set(null);
      this.sortDirection.set(null);
      this.activeFilters.set({});
    }
  }

  /**
   * Sincroniza el estado actual con el store (si está habilitado)
   */
  private _syncToStore() {
    const config = this.persistenceConfig();
    if (!config.enabled) return;

    const id = this.datagridId();
    const instance = this.store.getInstance(id);

    if (!instance) {
      console.warn(`⚠️ Cannot sync - instance "${id}" not found in store`);
      return;
    }

    console.log(`💾 Syncing state for "${id}"`, {
      searchTerm: this.searchTerm(),
      currentPage: this.currentPage(),
      currentPageSize: this.currentPageSize()
    });

    this.store.updateInstance(id, {
      searchTerm: this.searchTerm(),
      currentPage: this.currentPage(),
      currentPageSize: this.currentPageSize(),
      showFilters: this.showFilters(),
      sortColumn: this.sortColumn(),
      sortDirection: this.sortDirection(),
      activeFilters: this.activeFilters()
    });
  }

  // Column event handlers - Estos métodos son llamados desde header-column y cell
  handleColumnSort(columnKey: string, direction: 'asc' | 'desc') {
    // Actualizar estado interno
    this.sortColumn.set(columnKey);
    this.sortDirection.set(direction);
    this._syncToStore(); // Sincronizar con store

    // En modo servidor, emitir onLoadData
    if (!this.localData()) {
      this.emitLoadData('sort', columnKey);
    }

    // Encontrar el componente de columna y emitir su evento onSort
    const columnComponent = this.columnComponents.find(col => col.key() === columnKey);
    if (columnComponent) {
      columnComponent.onSort.emit({
        column: columnComponent.getColumnConfig(),
        direction,
        page: this.currentPage(),
        pageSize: this.currentPageSize(),
        searchTerm: this.searchTerm(),
        filters: this.getActiveFilters()
      });
    }
  }

  handleColumnClick(columnKey: string, row: any) {
    const columnComponent = this.columnComponents.find(col => col.key() === columnKey);
    if (columnComponent) {
      columnComponent.onClick.emit({
        column: columnComponent.getColumnConfig(),
        row
      });
    }
  }

  handleColumnRender(columnKey: string, row: any) {
    const columnComponent = this.columnComponents.find(col => col.key() === columnKey);
    if (columnComponent) {
      columnComponent.onRender.emit({
        column: columnComponent.getColumnConfig(),
        row
      });
    }
  }

  // Search functionality
  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(0);
    this._syncToStore(); // Sincronizar con store

    // Solo emitir si hay 3 o más caracteres o está vacío
    if (value.length >= 3 || value.length === 0) {
      // En modo servidor, emitir onLoadData
      if (!this.localData()) {
        this.emitLoadData('search');
      } else {
        // En modo local, emitir onFilterChange
        this.emitFilterChange();
      }
    }
  }

  // Filter functionality
  toggleFilters() {
    this.showFilters.update(value => !value);
    this._syncToStore(); // Sincronizar con store
  }

  /**
   * Limpia todos los filtros activos
   */
  clearAllFilters() {
    console.log('🧹 Clearing all filters');

    // Limpiar activeFilters
    this.activeFilters.set({});

    // Limpiar búsqueda
    this.searchTerm.set('');

    // Reset página a la primera
    this.currentPage.set(0);

    // Sincronizar con store
    this._syncToStore();

    // Limpiar valores de los componentes de filtro hijos
    if (this.filterComponents) {
      this.filterComponents.forEach(filterComponent => {
        filterComponent.setValue(null);
      });
    }

    // Emitir evento según el modo
    if (!this.localData()) {
      this.emitLoadData('filter');
    } else {
      this.emitFilterChange();
    }
  }

  /**
   * Verifica si hay algún filtro activo
   */
  hasActiveFilters(): boolean {
    const filters = this.getActiveFilters();
    return Object.keys(filters).length > 0 || this.searchTerm().length > 0;
  }

  handleFilterChange(event: { key: string; value: any }) {
    this.activeFilters.update(filters => ({
      ...filters,
      [event.key]: event.value
    }));
    this.currentPage.set(0);
    this._syncToStore(); // Sincronizar con store

    // En modo servidor, emitir onLoadData
    if (!this.localData()) {
      this.emitLoadData('filter', event.key);
    } else {
      // En modo local, emitir onFilterChange
      this.emitFilterChange();
    }
  }

  // Sorting functionality
  onSort(event: { column: string; direction: 'asc' | 'desc' }) {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this._syncToStore(); // Sincronizar con store
    // El sort se maneja internamente, el evento se emite desde dp-datagrid-column
  }

  // Selection functionality
  isAllSelected(): boolean {
    return this.selectionService.areAllSelected(this.paginatedData());
  }

  hasSelection(): boolean {
    return this.selectionService.hasSelection();
  }

  masterToggle() {
    this.selectionService.toggleAll(this.paginatedData());
  }

  toggleSelection(row: any) {
    this.selectionService.toggle(row);
  }

  isSelected(row: any): boolean {
    return this.selectionService.isSelected(row);
  }

  // Pagination functionality
  handlePageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
    this.currentPageSize.set(event.pageSize);
    this._syncToStore(); // Sincronizar con store

    // En modo servidor, emitir onLoadData
    if (!this.localData()) {
      this.emitLoadData('page');
    } else {
      // En modo local, emitir onPageChange
      this.emitPageChange();
    }
  }

  onPageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);
    this.currentPageSize.set(newSize);
    this.currentPage.set(0); // Reset to first page
    this._syncToStore(); // Sincronizar con store

    // En modo servidor, emitir onLoadData
    if (!this.localData()) {
      this.emitLoadData('page');
    } else {
      // En modo local, emitir onPageChange
      this.emitPageChange();
    }
  }

  goToFirstPage() {
    this.currentPage.set(0);
    this._syncToStore(); // Sincronizar con store

    // En modo servidor, emitir onLoadData
    if (!this.localData()) {
      this.emitLoadData('page');
    } else {
      // En modo local, emitir onPageChange
      this.emitPageChange();
    }
  }

  goToPreviousPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(page => page - 1);
      this._syncToStore(); // Sincronizar con store

      // En modo servidor, emitir onLoadData
      if (!this.localData()) {
        this.emitLoadData('page');
      } else {
        // En modo local, emitir onPageChange
        this.emitPageChange();
      }
    }
  }

  goToNextPage() {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update(page => page + 1);
      this._syncToStore(); // Sincronizar con store

      // En modo servidor, emitir onLoadData
      if (!this.localData()) {
        this.emitLoadData('page');
      } else {
        // En modo local, emitir onPageChange
        this.emitPageChange();
      }
    }
  }

  goToLastPage() {
    const lastPage = this.totalPages() - 1;
    this.currentPage.set(lastPage);
    this._syncToStore(); // Sincronizar con store

    // En modo servidor, emitir onLoadData
    if (!this.localData()) {
      this.emitLoadData('page');
    } else {
      // En modo local, emitir onPageChange
      this.emitPageChange();
    }
  }

  // Helper methods para emitir eventos
  private emitPageChange() {
    this.onPageChange.emit({
      page: this.currentPage(),
      pageSize: this.currentPageSize(),
      searchTerm: this.searchTerm(),
      filters: this.getActiveFilters()
    });
  }

  private emitFilterChange() {
    this.onFilterChange.emit({
      searchTerm: this.searchTerm(),
      filters: this.getActiveFilters()
    });
  }

  /**
   * Emite evento onLoadData para modo servidor
   */
  private emitLoadData(trigger: 'search' | 'filter' | 'sort' | 'page', changedKey?: string) {
    this.onLoadData.emit({
      trigger,
      changedKey,
      searchTerm: this.searchTerm(),
      filters: this.getActiveFilters(),
      page: this.currentPage(),
      pageSize: this.currentPageSize(),
      sortColumn: this.sortColumn(),
      sortDirection: this.sortDirection()
    });
  }

  private getActiveFilters(): { [key: string]: any } {
    const filters = this.activeFilters();
    const result: { [key: string]: any } = {};

    // Solo incluir filtros que tengan valores válidos
    Object.keys(filters).forEach(key => {
      const value = filters[key];

      // Filtrar null, undefined, cadenas vacías y la cadena literal "null"
      if (value === null || value === undefined || value === '' || value === 'null') {
        return; // Skip este filtro
      }

      // Para arrays, solo incluir si tienen elementos
      if (Array.isArray(value)) {
        if (value.length > 0) {
          result[key] = value;
        }
      } else {
        // Para otros valores, incluirlos
        result[key] = value;
      }
    });

    return result;
  }

  // Obtener contexto completo para eventos de columnas
  getEventContext() {
    return {
      page: this.currentPage(),
      pageSize: this.currentPageSize(),
      searchTerm: this.searchTerm(),
      filters: this.getActiveFilters()
    };
  }

  //TODO: FUNCION PARA EXPORTAR
  onExportClick(): void {
    console.log('Botón exportar csv');
  }
}
