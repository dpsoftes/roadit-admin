import { updateState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { inject } from "@angular/core";
import { CertificationsDto } from "@dtos/certifications.dto";
import { BillingAccountItemDto, ClientBillingAccountDto } from "@dtos/clients/billingsAccounts.dto";
import { ClientCertification } from "@dtos/clients/clientsCertifications.dto";
import { DocumentsClientsDto } from "@dtos/clients/documents.dto";
import { PriceRulesClientDto } from "@dtos/clients/priceRules.dtos";
import { ProtocolDto } from "@dtos/clients/protocols.dto";
import { ErrorBase } from "@dtos/errors.dtos";
import { ClientDto } from "@dtos/index";
import { ClientBillingAccountEntity, DocumentTemplateTransportEntity } from "@entities/clients.entities";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ClientsProvider } from "@providers";
import { Helpers } from "@utils/helpers";
import { environment } from "src/environments/environment";

export class ClientsState {
    client: ClientDto = new ClientDto();
    documents: DocumentsClientsDto[] = [];
    protocols: ProtocolDto[] = [];
    priceRules: PriceRulesClientDto = new PriceRulesClientDto();
    billingsAccounts: BillingAccountItemDto[] = [];
    currentBillingAccount: ClientBillingAccountDto = new ClientBillingAccountDto();
    certifications: ClientCertification[] = [];
    certificationsTemplates: CertificationsDto[] = [];
    curImage: File | null = null;
    currentDocument: DocumentsClientsDto = {} as DocumentsClientsDto;
    currentProtocol: ProtocolDto = new ProtocolDto();
    currentCertification: ClientCertification = new ClientCertification();
    errors: string[] = [];
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
  withComputed( (store) => ({
    logoSrc: () => {
      var curImage:any = store.curImage();
      if(store.curImage() instanceof File ){
        return URL.createObjectURL(store.curImage()!);
      }
       if(store.client().logo && store.client().logo!.length > 0){
        let logo = store.client().logo!;
        if(!logo?.startsWith("http") && !logo?.startsWith("blob:")){
          return  environment.apiUrl + logo;
        }
        return logo;
       }
        return null;
    }
  })),
  // Método globales 
  withMethods((store) => {
    
      return {

        updateState: (updates: Partial<ClientsState>) => {
          patchState(store, {...updates} );
          saveClientStoreToStorage(store);
        }, 
        initializeFromStorage: () => {
          var loadedStore = loadClientStoreFromStorage();
          if(loadedStore){
            patchState(store, loadedStore);
          }
        },
        destroy: () => {
         patchState(store, new ClientsState()); 
        }
      }
    }),
    withMethods((store) => ({
      validGralData: (gral: Partial<ClientDto>) : string[] => {
        const errors: string[] = [];
        store.updateState({errors });
        if(Helpers.isEmpty(gral.name) )                             errors.push('errors.client.name-required');
        if(gral.client_group == null || gral.client_group == 0 )    errors.push('errors.client.group-required');
        if(Helpers.isEmpty(gral.client_type) )                      errors.push('errors.client.client-type-required');
        if(gral.is_subentity && (Helpers.isEmpty(gral.parent) )  )  errors.push('errors.client.principal-client-required');
        if(Helpers.isEmpty(gral.contact_person_email))              errors.push('errors.client.contact-email-invalid');
        if(Helpers.isEmpty(gral.contact_person_name))               errors.push('errors.client.contact-name-required');
        store.updateState({errors, client: {...store.client(), ...gral}  });
        return errors;
      },

      validateBilling: () : string[] =>{
        const errors: string[] = [];
        store.updateState({errors });
        
        const b = store.currentBillingAccount();
        if(Helpers.isEmpty(b.email_send_invoice) )          errors.push('errors.billing.email_send_invoice');
        if(Helpers.isEmpty(b.iva) )                         errors.push('errors.billing.iva');
        if(Helpers.isEmpty(b.business_name) )               errors.push('errors.billing.business_name');
        if(Helpers.isEmpty(b.address) )                     errors.push('errors.billing.address');
        if(Helpers.isEmpty(b.postal_code) )                 errors.push('errors.billing.postal_code');
        if(Helpers.isEmpty(b.country) )                     errors.push('errors.billing.country');
        if(Helpers.isEmpty(b.city) )                        errors.push('errors.billing.city');
        if(Helpers.isEmpty(b.phone) )                       errors.push('errors.billing.phone');
        if(Helpers.isEmpty(b.postal_code) )                 errors.push('errors.billing.postal_code');

        store.updateState({errors });


        return errors;
      }

    })),

    // Metodos que acceden a providers
    withMethods((store) => {
      const prov = inject(ClientsProvider);
      return {
        clearStore: () =>{
          store.updateState(new ClientsState());
        },

        loadById: async  (clientId: number) => {
          try{
            const clientData = await prov.getClientGralData(clientId);
            if(!clientData){
              return;
            }
            store.updateState({client: clientData });
            if(clientData.id && clientData.id > 0){
              // Cargar datos adicionales
              const fullData = await prov.getClientFullData(clientData.id);
              if(fullData){
                store.updateState({ 
                  documents: fullData.documents, 
                  billingsAccounts: fullData.billings, 
                  priceRules: fullData.priceRules, 
                  certifications: fullData.certifications, 
                  certificationsTemplates: fullData.certificationsTemplates,
                  protocols: fullData.protocols,
                  curImage:  null,
                  currentDocument: {} as  DocumentsClientsDto,
                  currentProtocol: new ProtocolDto(),
                  currentCertification: new ClientCertification(),
                  errors: [],
                });
              }
            }
          }catch(error){
            console.error('Error al cargar cliente por ID:', error);
            return ;
          }
        },
        
        saveGralData: async (client?: Partial<ClientDto>) => {
          try{
            if(!client){
              if(store.validGralData(store.client()).length > 0){
                throw new Error('Datos generales del cliente no son válidos.');
              }
            }
            let savedClient: Partial<ClientDto> | null= client ?? store.client();
            if(savedClient.id && savedClient.id > 0){
              savedClient = await prov.updateClientGralData(savedClient, store.curImage());
            }else{
              savedClient = await prov.createClientGralData(savedClient);
            }
            store.updateState({ client: savedClient as ClientDto, curImage: null });
            console.log('savedClient', savedClient);
          }catch(error){
            console.error('Error al guardar datos generales del cliente:', error);
            throw error;
          }

        },
        saveDocument: async (document: Partial<DocumentsClientsDto>, fileUpload: File | null = null) => {
          try{
            document.client = store.client().id;
            if(Helpers.isEmpty(document.link)) document.link = "";
            if(Helpers.isEmpty(document.title)) document.title ?? fileUpload?.name;
            const {file, ...docData} = document;
            var doc = await prov.createClientDocument(docData, fileUpload);
            if(doc){
              store.updateState({ documents: [...store.documents()!, doc! ], currentDocument: {} as DocumentsClientsDto });
              return doc;
            }
            return null;
          }catch(error){
            console.error('Error al guardar documento del cliente:', error);
            throw error;
          }
        },
        deleteDocument: async (document: Partial<DocumentsClientsDto>) => {
          try{
            var id = document.id;
            var doc = await prov.deleteClientDocument(document);
            if(doc){
              store.updateState({ documents: store.documents().filter(d => d.id!=id)});
              return true;
            }
            return false;
          }catch(error){
            console.error('Error al guardar documento del cliente:', error);
            return false;
          }
        },
        saveBilling: async () => {
          try{
            
            const errors = store.validateBilling();

            if(errors.length > 0){
              return;
            }

            let {id, ...billing} = store.currentBillingAccount();
            let isNew = false;
            if(Helpers.isEmptyOrZero(id)){
              isNew = true;
            }
            billing.client = store.client().id!;
            delete(billing.deleted_date);
            billing.state = true;
            let result;
            if(id){
              const b =ClientBillingAccountEntity.fromDto(store.currentBillingAccount());
              billing = b.toPatch() as any; 
            }
             result = await prov.updateBilling(billing, id);
            if(result){
              var newState: Partial<ClientsState> = { currentBillingAccount: result, errors: [] };
              if(isNew){
                newState = { ...newState, billingsAccounts: [...store.billingsAccounts(), BillingAccountItemDto.fromJson(result)] };
              }
              store.updateState(newState);
              return result;
            }
            return null;
          }catch(error){
            console.error('Error al guardar documento del cliente:', error);
            throw error;
          }
        },
        updatePrices: async (price: PriceRulesClientDto) => {
          try {
            if(Helpers.isEmptyOrZero(price.client))  price.client = store.client().id!;
            const result = await prov.updatePriceRules(price);
            if(result && !(result instanceof ErrorBase)) {
              store.updateState({ priceRules: result });
              return result;
            }

            return result;
          } catch (error) {
            return error;
          }
        },
        setCurrentProtocol: (protocol?: ProtocolDto) => {
          if(!protocol){
            store.updateState({ currentProtocol: new ProtocolDto() });
            return;
          }
          if(protocol.is_template){
            var {id, ...rest} = protocol;
            store.updateState({ currentProtocol: rest });
            return;
          }else{
            store.updateState({ currentProtocol: protocol });
          }
        },
        saveCurrentProtocol: async (protocol: ProtocolDto) => {
          try {
            
              // Crear nuevo
              let protocolToSave = { ...protocol, client: store.client().id! };
              protocolToSave.is_template = false; 
              protocolToSave.options = protocolToSave.options?.map(opt => {
                delete(opt.id);
                return opt;
              });
              const result = await prov.updateProtocol(protocolToSave);
              if(result && !(result instanceof ErrorBase)) {
                // Actualizar lista
                let updatedProtocols = store.protocols().filter(p => p.id !== result.id);
                updatedProtocols.push(result);
                store.updateState({ protocols: updatedProtocols, currentProtocol: new ProtocolDto() });
                
              }
              return result;

          } catch (error) {
            return error;
          }           
        },
        saveCertification: async (certification: ClientCertification) => {
          try {
            const result = await prov.updateCertification(certification);
            if(result && !(result instanceof ErrorBase)) {
                // Actualizar lista
                let updatedCertifications = store.certifications().filter(p => p.id !== result.id);
                updatedCertifications.push(result);
                store.updateState({ certifications: updatedCertifications, currentCertification: new ClientCertification() });
            }
            return result;
          } catch (error) {
            return error;             
          }
      }
    }
    })
  );
  


function saveClientStoreToStorage(store: any, key = 'roadit_client_store') {
  const result: Record<string, unknown> = {};
  for (const prop of Object.keys(new ClientsState())) {
    result[prop] = store[prop]();
  }
  Helpers.setStorage(key, result);
}

// Restaura solo las claves de GlobalStateData, asumiendo que todas son signals
function loadClientStoreFromStorage( key = 'roadit_client_store'): ClientsState | null {
  
  return Helpers.getStorage<ClientsState>(key);
}