import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { inject } from "@angular/core";
import { DriverDto } from "@dtos/driver.dto";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Helpers } from "@utils/helpers";
import { DriversProvider } from "../providers/drivers.provider";

export class DriverState {
  drivers: DriverDto[] = [];
  curDriver: DriverDto | null = null;
}

export const DriverStore = signalStore(
  {
    providedIn: 'root',

    // Configuración para Redux DevTools
    ...(typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && {
      devtools: {
        name: 'RoadIt Driver Store',
        trace: true,
        traceLimit: 25
      }
    })
  },
  withDevtools('DriverStore'),
  // Estado inicial usando directamente DriverState
  withState(new DriverState()),
  withComputed((store) => ({
    isNew: () => {
      return !store.curDriver() || !store.curDriver()!.id || store.curDriver()!.id! === 0;
    }
  })),
  // Métodos globales
  withMethods((store) => {
    return {
      updateState: (updates: Partial<DriverState>) => {
        patchState(store, { ...updates });
        saveDriverStoreToStorage(store);
      },
      initializeFromStorage: () => {
        var loadedStore = loadDriverStoreFromStorage();
        if (loadedStore) {
          patchState(store, loadedStore);
        }
      },
    }
  }),
  withMethods((store) => {
    var provider = inject(DriversProvider);
    return {
      /**
       * METODO ACTUALIZADO PARA TRABAJAR CON EL NUEVO PROVIDER
       * AHORA ACEPTA queryParams OPCIONAL EN LUGAR DE page Y page_size
       * @param queryParams - OBJETO CON PARAMETROS DE CONSULTA (page, page_size, search, filters, etc)
       */
      getDrivers: async (queryParams: Record<string, any> = {}) => {
        try {
          //ESTABLECER VALORES POR DEFECTO SI NO SE PROPORCIONAN
          const params = {
            page: 1,
            page_size: 99999,
            ...queryParams
          };

          //LLAMAR AL PROVIDER CON EL NUEVO FORMATO
          const response = await provider.getDrivers(params);

          if (response && response.results) {
            //EXTRAER SOLO EL ARRAY DE DRIVERS DE LA RESPUESTA PAGINADA
            store.updateState({ drivers: response.results });
          } else {
            store.updateState({ drivers: [] });
          }
        } catch (error) {
          console.error('Error al obtener conductores:', error);
          store.updateState({ drivers: [] });
        }
      }
    }
  })
);

function saveDriverStoreToStorage(store: any, key = 'roadit_driver_store') {
  const result: Record<string, unknown> = {};
  for (const prop of Object.keys(new DriverState())) {
    result[prop] = store[prop]();
  }
  Helpers.setStorage(key, result);
}

// Restaura solo las claves de DriverState, asumiendo que todas son signals
function loadDriverStoreFromStorage(key = 'roadit_driver_store'): DriverState | null {
  return Helpers.getStorage<DriverState>(key);
}
