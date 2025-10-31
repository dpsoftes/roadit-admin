import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { inject, signal } from "@angular/core";
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
        name: 'RoadIt Global Store',
        trace: true,
        traceLimit: 25
      }
    })
  },
  withDevtools('DriverStore'),
  // Estado inicial usando directamente GlobalStateData
  withState(new DriverState()),
  withComputed( (store) => ({
    isNew: () => {
        return !store.curDriver() || !store.curDriver()!.id  || store.curDriver()!.id! === 0 ;
    }
  })),
  // Método globales 
  withMethods((store) => {
      return {
        updateState: (updates: Partial<DriverState>) => {
          patchState(store, {...updates} );
          saveDriverStoreToStorage(store);
        }, 
        initializeFromStorage: () => {
          var loadedStore = loadDriverStoreFromStorage();
          if(loadedStore){
            patchState(store, loadedStore);
          }
          
        },
        
      }
    }),
    withMethods((store) => {
        var provider = inject(DriversProvider);
        return  {
        getDrivers: async (page: number = 1, page_size: number = 99999 )  => {
            try{
                var drivers = await provider.getGroups(page, page_size);
            if(drivers){
                store.updateState({ drivers: drivers });
            }
            }catch(error){
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

// Restaura solo las claves de GlobalStateData, asumiendo que todas son signals
function loadDriverStoreFromStorage( key = 'roadit_driver_store'): DriverState | null {
  
  return Helpers.getStorage<DriverState>(key);
}
