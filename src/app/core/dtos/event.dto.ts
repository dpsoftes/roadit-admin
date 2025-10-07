import { DriverEventType, IncidenceEventType, TransportEventType } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class TransportEventDto extends BaseEntity {
    event_type: TransportEventType;
    description: string;
    metadata: Record<string, any>;
    transport: number;
    user: string; // UUID

    constructor(data: any = {}) {
        super(data);
        this.event_type = data.event_type;
        this.description = data.description || '';
        this.metadata = data.metadata || {};
        this.transport = data.transport || 0;
        this.user = data.user || '';
    }

    static fromJson(json: any): TransportEventDto {
        return new TransportEventDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            event_type: this.event_type,
            description: this.description,
            metadata: this.metadata,
            transport: this.transport,
            user: this.user
        };
    }

    copyWith(updates: Partial<TransportEventDto>): TransportEventDto {
        return new TransportEventDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class DriverEventDto extends BaseEntity {
    event_type: DriverEventType;
    description: string;
    metadata: Record<string, any>;
    driver: string; // UUID
    user: string; // UUID

    constructor(data: any = {}) {
        super(data);
        this.event_type = data.event_type;
        this.description = data.description || '';
        this.metadata = data.metadata || {};
        this.driver = data.driver || '';
        this.user = data.user || '';
    }

    static fromJson(json: any): DriverEventDto {
        return new DriverEventDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            event_type: this.event_type,
            description: this.description,
            metadata: this.metadata,
            driver: this.driver,
            user: this.user
        };
    }

    copyWith(updates: Partial<DriverEventDto>): DriverEventDto {
        return new DriverEventDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class IncidenceEventDto extends BaseEntity {
    event_type: IncidenceEventType;
    description: string;
    metadata: Record<string, any>;
    incidence: number;
    user: string; // UUID

    constructor(data: any = {}) {
        super(data);
        this.event_type = data.event_type;
        this.description = data.description || '';
        this.metadata = data.metadata || {};
        this.incidence = data.incidence || 0;
        this.user = data.user || '';
    }

    static fromJson(json: any): IncidenceEventDto {
        return new IncidenceEventDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            event_type: this.event_type,
            description: this.description,
            metadata: this.metadata,
            incidence: this.incidence,
            user: this.user
        };
    }

    copyWith(updates: Partial<IncidenceEventDto>): IncidenceEventDto {
        return new IncidenceEventDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateEventDto {
    event_type: TransportEventType | DriverEventType | IncidenceEventType;
    description: string;
    metadata?: Record<string, any>;
    transport?: number;
    driver?: string;
    incidence?: number;
    user: string;

    constructor(data: any = {}) {
        this.event_type = data.event_type;
        this.description = data.description || '';
        this.metadata = data.metadata;
        this.transport = data.transport;
        this.driver = data.driver;
        this.incidence = data.incidence;
        this.user = data.user || '';
    }

    static fromJson(json: any): CreateEventDto {
        return new CreateEventDto(json);
    }

    toJson(): any {
        return {
            event_type: this.event_type,
            description: this.description,
            metadata: this.metadata,
            transport: this.transport,
            driver: this.driver,
            incidence: this.incidence,
            user: this.user
        };
    }

    copyWith(updates: Partial<CreateEventDto>): CreateEventDto {
        return new CreateEventDto({
            ...this.toJson(),
            ...updates
        });
    }
}


