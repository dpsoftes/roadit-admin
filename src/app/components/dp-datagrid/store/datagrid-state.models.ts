/**
 * Modelos y tipos para el estado del datagrid
 */

export interface DatagridState {
  id: string;
  searchTerm: string;
  currentPage: number;
  currentPageSize: number;
  showFilters: boolean;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc' | null;
  activeFilters: Record<string, any>;
  lastUpdated: number;
}

export interface DatagridPersistenceConfig {
  enabled: boolean;
  autoRestore: boolean;
  strategy: 'session' | 'local' | 'none';
  ttl: number;
  clearOnDestroy: boolean;
}

export const DEFAULT_PERSISTENCE_CONFIG: DatagridPersistenceConfig = {
  enabled: true,
  autoRestore: true,
  strategy: 'session',
  ttl: 0,
  clearOnDestroy: false
};

export function createInitialDatagridState(id: string): DatagridState {
  return {
    id,
    searchTerm: '',
    currentPage: 0,
    currentPageSize: 10,
    showFilters: false,
    sortColumn: null,
    sortDirection: null,
    activeFilters: {},
    lastUpdated: Date.now()
  };
}
