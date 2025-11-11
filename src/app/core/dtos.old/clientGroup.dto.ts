import { AdminMiniDto } from './admin.dto';
import { BaseEntity } from './base.dto';
import { ClientMiniDto } from './client.dto';

export class ClientGroupDto extends BaseEntity {
    name: string;
    country: string;
    assigned_admins: AdminMiniDto[];
    clients: ClientMiniDto[];

    constructor(data: any = {}) {
        super(data);
        this.name = data.name || '';
        this.country = data.country || '';
        this.assigned_admins = (data.assigned_admins || []).map((admin: any) => AdminMiniDto.fromJson(admin));
        this.clients = (data.clients || []).map((client: any) => ClientMiniDto.fromJson(client));
    }

    static fromJson(json: any): ClientGroupDto {
        return new ClientGroupDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            name: this.name,
            country: this.country,
            assigned_admins: this.assigned_admins.map(admin => admin.toJson()),
            clients: this.clients.map(client => client.toJson())
        };
    }

    copyWith(updates: Partial<ClientGroupDto>): ClientGroupDto {
        return new ClientGroupDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateClientGroupDto {
    name: string;
    country: string;
    assigned_admins: string[]; // Admin UUIDs

    constructor(data: any = {}) {
        this.name = data.name || '';
        this.country = data.country || '';
        this.assigned_admins = data.assigned_admins || [];
    }

    static fromJson(json: any): CreateClientGroupDto {
        return new CreateClientGroupDto(json);
    }

    toJson(): any {
        return {
            name: this.name,
            country: this.country,
            assigned_admins: this.assigned_admins
        };
    }

    copyWith(updates: Partial<CreateClientGroupDto>): CreateClientGroupDto {
        return new CreateClientGroupDto({
            ...this.toJson(),
            ...updates
        });
    }
}


