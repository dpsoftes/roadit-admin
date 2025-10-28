import { Injectable, inject } from '@angular/core';
import {  ApiService } from '@services/api.service';
import { EndPoints } from '@services/EndPoints';

import { ClientGroupSummary, ClientSummary, GroupsQueryParams, ClientsQueryParams } from '@dtos/clients/clients.dto';
import { ClientsGroupEntity } from '@entities/clients.entities';

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



}