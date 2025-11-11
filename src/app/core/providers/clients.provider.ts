import { Injectable, inject } from '@angular/core';
import {  ApiRequestOptions, ApiService } from '@services/api.service';
import { EndPoints } from '@services/EndPoints';

import { ClientGroupSummary, ClientSummary, GroupsQueryParams, ClientsQueryParams, ClientDto } from '@dtos/clients/clients.dto';
import { ClientsGroupEntity } from '@entities/clients.entities';
import { DocumentsClientsDto } from '@dtos/clients/documents.dto';
import { BillingAccountItemDto, ClientBillingAccountDto } from '@dtos/clients/billingsAccounts.dto';
import { PriceRulesClientDto } from '@dtos/clients/priceRules.dtos';
import { ClientCertification } from '@dtos/clients/clientsCertifications.dto';
import { Helpers } from '@utils/helpers';
import { ErrorBase } from '@dtos/errors.dtos';
import { TransportPrincipalType } from '@enums/client.enum';

@Injectable({ providedIn: 'root' })
export class ClientsProvider {

    private readonly api = inject(ApiService);


    async getGroups(options : GroupsQueryParams): Promise<ClientGroupSummary[] | null> {
        try {
            options.page = options.page || 1;
            options.page_size = options.page_size || 10;
            return (await this.api.get<any>({ url: EndPoints.getClientGroups, queryParams: options }))["results"];
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }
    async saveGroup(body: any, id?: number ): Promise<any | null> {
        try {
            let result = null;
            if(id){
                result = await this.api.patch<any>({ url: EndPoints.updateClientGroup.replace("{clientGroupId}", id.toString()), body: body });
            } else {
                result = await this.api.post<any>({ url: EndPoints.createClientGroup, body: body });
            }
            return result;
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }
    
    async getGroupById(groupId : number | string): Promise<ClientsGroupEntity | null> {
        try {
            var result = await this.api.get<any>({ url: EndPoints.getClientGroup.replace("{clientGroupId}", groupId.toString()) });
            if(result.id){
                return  ClientsGroupEntity.fromDto({
                    id: result.id,
                    name: result.name,
                    country: result.country,
                    assigned_admins: result.assigned_admins ? result.assigned_admins.map((admin: any) => admin.id) : []
                });
            }
            return null;
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }

    async getClients(options : ClientsQueryParams): Promise<ClientSummary[] | null> {
        try {
            options.page = options.page || 1;
            options.page_size = options.page_size || 10;
            return (await this.api.get<any>({ url: EndPoints.getClients, queryParams: options }))["results"];
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }

    async getClientGralData(id: number | string): Promise<ClientDto | null> {
        try {
            return await this.api.get<ClientDto>({ url: EndPoints.getClient.replace("{clientId}", id.toString()) });
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }

    async updateClientGralData(data: Partial<ClientDto>, file?: File | null | undefined): Promise<ClientDto | null> {
        try {
            const { id, logo, deleted_date, ...dto } = data;
            var options: ApiRequestOptions = { url: EndPoints.updateClient.replace("{clientId}", id!.toString()), formParams: dto };
            if (file) {
                options.fileParams = { 'logo': file };
            }
            return await this.api.patch<ClientDto>(options );
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }
    async createClientGralData(data: Partial<ClientDto>, file?: File | null | undefined): Promise<ClientDto | null> {
        try {
            const { id, ...dto } = data;
            var options: ApiRequestOptions = { url: EndPoints.createClient.replace("{clientId}", id!.toString()), formParams: dto };
            if (file) {
                options.fileParams = { 'logo': file };
            }
            return await this.api.post<ClientDto>(options );
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }
    async getClientFullData(id: number | string): Promise<{documents: DocumentsClientsDto[], billings: BillingAccountItemDto[], priceRules: PriceRulesClientDto, certifications: ClientCertification[]} | null> {
        try {
            var a = await this.api.get<any>({ url: EndPoints.getDocumentTemplates, queryParams: {client: id}  });
            var documents: DocumentsClientsDto[] = (await this.api.get<DocumentsClientsDto[]>({ url: EndPoints.getDocumentTemplates, queryParams: {client: id}  }));
            var billings: BillingAccountItemDto[] = (await this.api.get<BillingAccountItemDto[]>({ url: EndPoints.getClientBillingAccounts, queryParams: {client: id}  }));
            let priceRules: PriceRulesClientDto  = new PriceRulesClientDto();
            try{
                priceRules = (await this.api.get<PriceRulesClientDto>({ url: EndPoints.getPriceRule.replace("{scope}", "client").replace("{clientId}", id.toString())  })) ?? new PriceRulesClientDto();
            }catch{

            }
            priceRules.client = priceRules.id ?? Number(id);
            var certifications: ClientCertification[] = (await this.api.get<any>({ url: EndPoints.getClientCertifications, queryParams: {client: id}  }))["results"] as ClientCertification[];

            return {
                documents,
                billings,
                priceRules,
                certifications
            };

        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }
    async createClientDocument(data: Partial<DocumentsClientsDto>, file?: File | null | undefined): Promise<DocumentsClientsDto | null> {
        try {
            const { id, ...dto } = data;
      
            var options: ApiRequestOptions = { url: EndPoints.createDocumentTemplate, formParams: dto };
            if (file) {
                options.fileParams = { 'file': file };
            }
            return await this.api.post<DocumentsClientsDto>(options );
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }   
    async deleteClientDocument(data: Partial<DocumentsClientsDto>): Promise<boolean> {
        try {
            const { id, ...dto } = data;
      
            var options: ApiRequestOptions = { url: EndPoints.deleteDocumentTemplate.replace("{templateId}", id!.toString())};
            await this.api.delete<DocumentsClientsDto>(options );
            return true;
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return false;
        }
    }
     async updateBilling(data: Partial<ClientBillingAccountDto>, id?: number): Promise<ClientBillingAccountDto | null> {
        try {
      
            var options: ApiRequestOptions = { url: EndPoints.createClientBillingAccount, formParams: data };
            if (id) {
                options.url = EndPoints.updateClientBillingAccount.replace("{billingAccountId}", id.toString());
            }
            return await this.api.post<ClientBillingAccountDto>(options );
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }      
    async updatePriceRules(data: Partial<PriceRulesClientDto>): Promise<PriceRulesClientDto | ErrorBase> {
        try {

            var options: ApiRequestOptions = { url: EndPoints.createPriceRule.replace("{scope}", "client"), body: data };
            let result: PriceRulesClientDto; 
            if (!Helpers.isEmptyOrZero(data.id)) {
                options.url = EndPoints.updatePriceRule.replace("{scope}", "client").replace("{ruleId}", data.id!.toString());
                result = await this.api.patch<PriceRulesClientDto>(options );
            }else{
                result = await this.api.post<PriceRulesClientDto>(options );
            }
            return result;
        } catch (error:any) {
            console.error('Error al obtener admins:', error);
            return new ErrorBase(error, 500);
        }
    }
     async getProtocolsTemplates(type: TransportPrincipalType): Promise<ClientDto | null> {
        try {
            return await this.api.get<ClientDto>({ url: EndPoints.getProtocols, queryParams: { transport_principal_type: type, is_template: true } });
        } catch (error) {
            console.error('Error al obtener admins:', error);
            return null;
        }
    }
         

}