import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { inject } from "@angular/core";
import { TransportHistoryListItemDto, TransportHistoryListParamsDto } from "@dtos/transports/transport.dto";
import { TransportsRetrieveResponse } from "@dtos/transports/transports.dto.old";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Helpers } from "@utils/helpers";
import { TransportProvider } from "../providers/transport.provider";

export class TransportsState {
    history: TransportHistoryListItemDto[] = [];
    historyParams: TransportHistoryListParamsDto = {};
    historyTotalRecords: number = 0;
    currentTransport: TransportsRetrieveResponse | null = null;
    currentTransportId: number | null = null;
    currentTransportLoading: boolean = false;
    currentTransportError: string | null = null;
}


export const TransportStore = signalStore(
  { 
    providedIn: 'root',
    
    // Configuración para Redux DevTools
    ...(typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && {
      devtools: {
        name: 'RoadIt Transport Store',
        trace: true,
        traceLimit: 25
      }
    })
  },
  withDevtools('TransportStore'),
  // Estado inicial usando directamente GlobalStateData
  withState(new TransportsState()),
  withComputed( (store) => ({

  })),
  // Método globales 
  withMethods((store) => {
    
      return {

        updateState: (updates: Partial<TransportsState>) => {
          patchState(store, {...updates} );
          saveTransportStoreToStorage(store);
        }, 
        initializeFromStorage: () => {
          var loadedStore = loadTransportStoreFromStorage();
          if(loadedStore){
            patchState(store, loadedStore);
          }

        },
        clearCurrentTransport: () => {
          patchState(store, {
            currentTransport: null,
            currentTransportId: null,
            currentTransportLoading: false,
            currentTransportError: null
          });
        },
      }
    }),


   withMethods((store) => {
         const provivder = inject(TransportProvider);
         return {
            loadHistory : async () =>  {
                const result =  await provivder.loadHistory(store.historyParams());
                if(!result){
                    store.updateState({ history: [] });
                    return;
                }
                store.updateState({ history: result.list, historyTotalRecords: result.totalRecords });
            },
            loadTransport: async (transportId: number | string) => {
                try {
                    store.updateState({ currentTransportLoading: true, currentTransportError: null });
                    const result = await provivder.getTransport(transportId);
                    if(!result){
                        store.updateState({
                            currentTransport: null,
                            currentTransportId: null,
                            currentTransportLoading: false,
                            currentTransportError: 'TRANSPORT_NOT_FOUND'
                        });
                        return;
                    }

                    const numericId = Number(transportId);
                    store.updateState({
                        currentTransport: result,
                        currentTransportId: Number.isNaN(numericId) ? null : numericId,
                        currentTransportLoading: false,
                        currentTransportError: null
                    });
                } catch (error) {
                    console.error('Error al cargar transporte', error);
                    store.updateState({
                        currentTransport: null,
                        currentTransportId: null,
                        currentTransportLoading: false,
                        currentTransportError: 'TRANSPORT_LOAD_ERROR'
                    });
                }
            }
        }
   }),
);





function saveTransportStoreToStorage(store: any, key = 'roadit_transport_store') {
  const result: Record<string, unknown> = {};
  const transientKeys: Array<keyof TransportsState> = [
    'currentTransport',
    'currentTransportId',
    'currentTransportLoading',
    'currentTransportError'
  ];
  for (const prop of Object.keys(new TransportsState())) {
    if (transientKeys.includes(prop as keyof TransportsState)) {
      continue;
    }
    result[prop] = store[prop]();
  }
  Helpers.setStorage(key, result);
}

// Restaura solo las claves de GlobalStateData, asumiendo que todas son signals
function loadTransportStoreFromStorage( key = 'roadit_transport_store'): TransportsState | null {
  
  return Helpers.getStorage<TransportsState>(key);
}