import { 
  signalStore, 
  withState, 
  withMethods, 
  withHooks,
  withComputed,
  patchState 
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { DatagridState, createInitialDatagridState } from './datagrid-state.models';

interface DatagridStoreState {
  instances: Record<string, DatagridState>;
}

const STORAGE_KEY = 'ngrx-datagrid-states';

export const DatagridStateStore = signalStore(
  { providedIn: 'root' },
  
  withState<DatagridStoreState>({
    instances: {}
  }),
  
  withComputed(({ instances }) => ({
    // Computed: Obtener IDs de todas las instancias
    instanceIds: computed(() => Object.keys(instances())),
    
    // Computed: Contar instancias activas
    instanceCount: computed(() => Object.keys(instances()).length)
  })),
  
  withMethods((store) => ({
    /**
     * Inicializa una nueva instancia de datagrid
     */
    initializeInstance(
      id: string, 
      config?: Partial<DatagridState>,
      useStorage = true
    ): DatagridState {
      // Intentar restaurar desde storage
      if (useStorage) {
        const restored = this._restoreFromStorage(id);
        if (restored) {
          console.log(`✅ Restored datagrid state for "${id}"`, restored);
          patchState(store, {
            instances: { ...store.instances(), [id]: restored }
          });
          return restored;
        }
      }
      
      // Crear nueva instancia
      const newState: DatagridState = {
        ...createInitialDatagridState(id),
        ...config
      };
      
      console.log(`🆕 Initialized new datagrid "${id}"`, newState);
      
      patchState(store, {
        instances: { ...store.instances(), [id]: newState }
      });
      
      if (useStorage) {
        this._saveToStorage(id, newState);
      }
      
      return newState;
    },
    
    /**
     * Actualiza el estado de una instancia
     */
    updateInstance(id: string, updates: Partial<Omit<DatagridState, 'id'>>) {
      const current = store.instances()[id];
      
      if (!current) {
        console.warn(`⚠️ Datagrid instance "${id}" not found. Initializing...`);
        this.initializeInstance(id, updates);
        return;
      }
      
      const updated: DatagridState = {
        ...current,
        ...updates,
        id, // Asegurar que el ID no cambie
        lastUpdated: Date.now()
      };
      
      patchState(store, {
        instances: { ...store.instances(), [id]: updated }
      });
      
      this._saveToStorage(id, updated);
    },
    
    /**
     * Obtiene el estado de una instancia
     */
    getInstance(id: string): DatagridState | undefined {
      return store.instances()[id];
    },
    
    /**
     * Resetea una instancia manteniendo solo pageSize
     */
    resetInstance(id: string, keepPageSize = true) {
      const current = store.instances()[id];
      if (!current) return;
      
      const reset: DatagridState = {
        ...createInitialDatagridState(id),
        currentPageSize: keepPageSize ? current.currentPageSize : 10
      };
      
      console.log(`🔄 Reset datagrid "${id}"`);
      
      patchState(store, {
        instances: { ...store.instances(), [id]: reset }
      });
      
      this._saveToStorage(id, reset);
    },
    
    /**
     * Destruye una instancia
     */
    destroyInstance(id: string) {
      const { [id]: removed, ...rest } = store.instances();
      
      console.log(`🗑️ Destroyed datagrid "${id}"`);
      
      patchState(store, { instances: rest });
      this._removeFromStorage(id);
    },
    
    /**
     * Actualiza solo la búsqueda
     */
    setSearch(id: string, searchTerm: string) {
      this.updateInstance(id, { 
        searchTerm,
        currentPage: 0 // Reset a primera página al buscar
      });
    },
    
    /**
     * Actualiza solo la página
     */
    setPage(id: string, page: number) {
      this.updateInstance(id, { currentPage: page });
    },
    
    /**
     * Actualiza solo el ordenamiento
     */
    setSort(id: string, column: string | null, direction: 'asc' | 'desc' | null) {
      this.updateInstance(id, { sortColumn: column, sortDirection: direction });
    },
    
    /**
     * Aplica un filtro y resetea a página 0
     */
    setFilter(id: string, filterKey: string, value: any) {
      const current = store.instances()[id];
      if (!current) return;
      
      const newFilters = { ...current.activeFilters };
      
      if (value === null || value === undefined || value === '') {
        delete newFilters[filterKey];
      } else {
        newFilters[filterKey] = value;
      }
      
      this.updateInstance(id, { 
        activeFilters: newFilters,
        currentPage: 0
      });
    },
    
    /**
     * Limpia todos los filtros
     */
    clearAllFilters(id: string) {
      this.updateInstance(id, { 
        activeFilters: {},
        currentPage: 0
      });
    },
    
    /**
     * Toggle visibilidad de filtros
     */
    toggleFilters(id: string) {
      const current = store.instances()[id];
      if (!current) return;
      
      this.updateInstance(id, { showFilters: !current.showFilters });
    },
    
    // ==================== PRIVATE METHODS ====================
    
    /**
     * Guarda en storage (sessionStorage por defecto)
     */
    _saveToStorage(id: string, state: DatagridState) {
      try {
        const allStates = this._getAllFromStorage();
        allStates[id] = state;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(allStates));
      } catch (error) {
        console.error('❌ Error saving to storage:', error);
      }
    },
    
    /**
     * Restaura desde storage
     */
    _restoreFromStorage(id: string): DatagridState | null {
      try {
        const allStates = this._getAllFromStorage();
        return allStates[id] || null;
      } catch (error) {
        console.error('❌ Error restoring from storage:', error);
        return null;
      }
    },
    
    /**
     * Obtiene todos los estados del storage
     */
    _getAllFromStorage(): Record<string, DatagridState> {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    },
    
    /**
     * Elimina del storage
     */
    _removeFromStorage(id: string) {
      try {
        const allStates = this._getAllFromStorage();
        delete allStates[id];
        
        if (Object.keys(allStates).length === 0) {
          sessionStorage.removeItem(STORAGE_KEY);
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(allStates));
        }
      } catch (error) {
        console.error('❌ Error removing from storage:', error);
      }
    }
  })),
  
  withHooks({
    onInit(store) {
      console.log('🚀 DatagridStateStore initialized');
    },
    
    onDestroy() {
      console.log('💀 DatagridStateStore destroyed');
    }
  })
);
