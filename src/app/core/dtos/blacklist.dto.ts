import { TransportPrincipalType } from '../enums/transport.enum';
import { BaseEntity } from './base.dto';

export class BlackListDto extends BaseEntity {
    client: number;
    client_name: string;
    types: TransportPrincipalType[];
    drivers: string[]; // UUIDs

    constructor(data: any = {}) {
        super(data);
        this.client = data.client || 0;
        this.client_name = data.client_name || '';
        this.types = data.types || [];
        this.drivers = data.drivers || [];
    }

    static fromJson(json: any): BlackListDto {
        return new BlackListDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            client: this.client,
            client_name: this.client_name,
            types: this.types,
            drivers: this.drivers
        };
    }

    copyWith(updates: Partial<BlackListDto>): BlackListDto {
        return new BlackListDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateBlackListDto {
    client: number;
    types?: TransportPrincipalType[];
    drivers?: string[]; // UUIDs

    constructor(data: any = {}) {
        this.client = data.client || 0;
        this.types = data.types;
        this.drivers = data.drivers;
    }

    static fromJson(json: any): CreateBlackListDto {
        return new CreateBlackListDto(json);
    }

    toJson(): any {
        return {
            client: this.client,
            types: this.types,
            drivers: this.drivers
        };
    }

    copyWith(updates: Partial<CreateBlackListDto>): CreateBlackListDto {
        return new CreateBlackListDto({
            ...this.toJson(),
            ...updates
        });
    }
}


