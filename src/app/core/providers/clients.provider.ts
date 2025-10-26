import { Injectable, inject } from '@angular/core';
import {  ApiService } from '@services/api.service';
import { EndPoints } from '@services/EndPoints';

import { ClientGroupSummary, ClientSummary, GroupsQueryParams, ClientsQueryParams } from '@dtos/clients.dto';

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