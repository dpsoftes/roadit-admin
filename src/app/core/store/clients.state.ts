import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { ClientBillingAccountDto } from "@dtos/clients/billingsAccounts.dto";
import { ClientCertification } from "@dtos/clients/clientsCertifications.dto";
import { DocumentsClientsDto } from "@dtos/clients/documents.dto";
import { PriceRulesClientDto } from "@dtos/clients/priceRules.dtos";
import { ClientDto } from "@dtos/index";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Helpers } from "@utils/helpers";

export class ClientsState {
    client: ClientDto = new ClientDto();
    documents: DocumentsClientsDto[] = [];
    currentDocument: DocumentsClientsDto = {} as DocumentsClientsDto;
    priceRules: PriceRulesClientDto[] = [];
    currentPriceRule: PriceRulesClientDto = {} as PriceRulesClientDto;
    billingsAccounts: ClientBillingAccountDto[] = [];
    currentBillingAccount: ClientBillingAccountDto = new ClientBillingAccountDto();
    certifications: ClientCertification[] = [];
    currentCertification: ClientCertification = new ClientCertification();
}



export const ClientStore = signalStore(
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
  withDevtools('ClientStore'),
  // Estado inicial usando directamente GlobalStateData
  withState(new ClientsState()),

  withMethods((store) => {
     
      return {
       updateState: (updates: Partial<ClientsState>) => {
        var newStore : ClientsState = new ClientsState();
        newStore.client = updates.client || store.client();
        newStore.documents = updates.documents || store.documents();
        newStore.currentDocument = updates.currentDocument || store.currentDocument();
        newStore.priceRules = updates.priceRules || store.priceRules();
        newStore.currentPriceRule = updates.currentPriceRule || store.currentPriceRule();
        newStore.billingsAccounts = updates.billingsAccounts || store.billingsAccounts();
        newStore.currentBillingAccount = updates.currentBillingAccount || store.currentBillingAccount();
        newStore.certifications = updates.certifications || store.certifications();
        newStore.currentCertification         = updates.currentCertification || store.currentCertification();
        patchState(store, newStore);
        saveClientStoreToStorage(newStore);
      }, 
       initializeFromStorage: () => {
            var loadedStore = loadClientStoreFromStorage();
            if(loadedStore){
              patchState(store, loadedStore);
            }
    }}}),
);
  


function saveClientStoreToStorage(store: any, key = 'roadit_client_store') {
  const result: Record<string, unknown> = {};
  for (const prop of Object.keys(new ClientsState())) {
    result[prop] = store[prop];
  }
  Helpers.setStorage(key, result);
}

// Restaura solo las claves de GlobalStateData, asumiendo que todas son signals
function loadClientStoreFromStorage( key = 'roadit_client_store'): ClientsState | null {
  
  return Helpers.getStorage<ClientsState>(key);

}