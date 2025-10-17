import { LegPointType } from '../enums/transport.enum';
import { BaseEntity } from './base.dto';
import { TransportAddressDto } from './transport.dto';

export class LegPointDto extends BaseEntity {
    legpoint_type: LegPointType;
    transport_address: TransportAddressDto;
    date_from: string | null;
    date_to: string | null;

    constructor(data: any = {}) {
        super(data);
        this.legpoint_type = data.legpoint_type;
        this.transport_address = data.transport_address ? TransportAddressDto.fromJson(data.transport_address) : new TransportAddressDto();
        this.date_from = data.date_from;
        this.date_to = data.date_to;
    }

    static fromJson(json: any): LegPointDto {
        return new LegPointDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            legpoint_type: this.legpoint_type,
            transport_address: this.transport_address.toJson(),
            date_from: this.date_from,
            date_to: this.date_to
        };
    }

    copyWith(updates: Partial<LegPointDto>): LegPointDto {
        return new LegPointDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateLegPointDto {
    legpoint_type: LegPointType;
    transport_address: Omit<TransportAddressDto, 'id' | 'created_date' | 'modified_date' | 'state'>;
    date_from?: string | null;
    date_to?: string | null;

    constructor(data: any = {}) {
        this.legpoint_type = data.legpoint_type;
        this.transport_address = data.transport_address;
        this.date_from = data.date_from;
        this.date_to = data.date_to;
    }

    static fromJson(json: any): CreateLegPointDto {
        return new CreateLegPointDto(json);
    }

    toJson(): any {
        return {
            legpoint_type: this.legpoint_type,
            transport_address: this.transport_address,
            date_from: this.date_from,
            date_to: this.date_to
        };
    }

    copyWith(updates: Partial<CreateLegPointDto>): CreateLegPointDto {
        return new CreateLegPointDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class LegDto extends BaseEntity {
    origin: LegPointDto;
    destination: LegPointDto;

    constructor(data: any = {}) {
        super(data);
        this.origin = data.origin ? LegPointDto.fromJson(data.origin) : new LegPointDto();
        this.destination = data.destination ? LegPointDto.fromJson(data.destination) : new LegPointDto();
    }

    static fromJson(json: any): LegDto {
        return new LegDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            origin: this.origin.toJson(),
            destination: this.destination.toJson()
        };
    }

    copyWith(updates: Partial<LegDto>): LegDto {
        return new LegDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateLegDto {
    origin: CreateLegPointDto;
    destination: CreateLegPointDto;

    constructor(data: any = {}) {
        this.origin = data.origin ? CreateLegPointDto.fromJson(data.origin) : new CreateLegPointDto();
        this.destination = data.destination ? CreateLegPointDto.fromJson(data.destination) : new CreateLegPointDto();
    }

    static fromJson(json: any): CreateLegDto {
        return new CreateLegDto(json);
    }

    toJson(): any {
        return {
            origin: this.origin.toJson(),
            destination: this.destination.toJson()
        };
    }

    copyWith(updates: Partial<CreateLegDto>): CreateLegDto {
        return new CreateLegDto({
            ...this.toJson(),
            ...updates
        });
    }
}


