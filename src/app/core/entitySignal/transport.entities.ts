import { signal } from '@angular/core';
import { TransportHistoryListItemDto, TransportHistoryListParamsDto } from '@dtos/transports/transport.dto';

export class TransportHistoryListItemEntity {
    id = signal<number>(0);
    reference_number = signal<string>("");
    reservation_number = signal<string>("");
    client_name = signal<string>("");
    transport_type = signal<string | null>(null);
    transport_status = signal<string>("");
    transport_principal_type = signal<string>("");
    price = signal<string>("0.00");
    origin_address = signal<string>("");
    destination_address = signal<string>("");
    kilometers = signal<string>("0.00");
    duration_hours = signal<number>(0);
    tags = signal<number[]>([]);
    driver_name = signal<string | null>(null);
    admin_name = signal<string>("");

    static fromDto(dto: TransportHistoryListItemDto): TransportHistoryListItemEntity {
        const entity = new TransportHistoryListItemEntity();
        entity.id.set(dto.id);
        entity.reference_number.set(dto.reference_number);
        entity.reservation_number.set(dto.reservation_number);
        entity.client_name.set(dto.client_name);
        entity.transport_type.set(dto.transport_type);
        entity.transport_status.set(dto.transport_status);
        entity.transport_principal_type.set(dto.transport_principal_type);
        entity.price.set(dto.price);
        entity.origin_address.set(dto.origin_address);
        entity.destination_address.set(dto.destination_address);
        entity.kilometers.set(dto.kilometers);
        entity.duration_hours.set(dto.duration_hours);
        entity.tags.set(dto.tags);
        entity.driver_name.set(dto.driver_name);
        entity.admin_name.set(dto.admin_name);
        return entity;
    }

    toDto(): TransportHistoryListItemDto {
        return new TransportHistoryListItemDto({
            id: this.id(),
            reference_number: this.reference_number(),
            reservation_number: this.reservation_number(),
            client_name: this.client_name(),
            transport_type: this.transport_type(),
            transport_status: this.transport_status(),
            transport_principal_type: this.transport_principal_type(),
            price: this.price(),
            origin_address: this.origin_address(),
            destination_address: this.destination_address(),
            kilometers: this.kilometers(),
            duration_hours: this.duration_hours(),
            tags: this.tags(),
            driver_name: this.driver_name(),
            admin_name: this.admin_name()
        });
    }

    copyFromDto(dto: Partial<TransportHistoryListItemDto>): void {
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.reference_number != undefined) this.reference_number.set(dto.reference_number);
        if (dto.reservation_number != undefined) this.reservation_number.set(dto.reservation_number);
        if (dto.client_name != undefined) this.client_name.set(dto.client_name);
        if (dto.transport_type != undefined) this.transport_type.set(dto.transport_type);
        if (dto.transport_status != undefined) this.transport_status.set(dto.transport_status);
        if (dto.transport_principal_type != undefined) this.transport_principal_type.set(dto.transport_principal_type);
        if (dto.price != undefined) this.price.set(dto.price);
        if (dto.origin_address != undefined) this.origin_address.set(dto.origin_address);
        if (dto.destination_address != undefined) this.destination_address.set(dto.destination_address);
        if (dto.kilometers != undefined) this.kilometers.set(dto.kilometers);
        if (dto.duration_hours != undefined) this.duration_hours.set(dto.duration_hours);
        if (dto.tags != undefined) this.tags.set(dto.tags);
        if (dto.driver_name != undefined) this.driver_name.set(dto.driver_name);
        if (dto.admin_name != undefined) this.admin_name.set(dto.admin_name);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new TransportHistoryListItemEntity();
        const patch: Partial<T> = {};
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.reference_number() !== defaults.reference_number()) (patch as any).reference_number = this.reference_number();
        if (this.reservation_number() !== defaults.reservation_number()) (patch as any).reservation_number = this.reservation_number();
        if (this.client_name() !== defaults.client_name()) (patch as any).client_name = this.client_name();
        if (this.transport_type() !== defaults.transport_type()) (patch as any).transport_type = this.transport_type();
        if (this.transport_status() !== defaults.transport_status()) (patch as any).transport_status = this.transport_status();
        if (this.transport_principal_type() !== defaults.transport_principal_type()) (patch as any).transport_principal_type = this.transport_principal_type();
        if (this.price() !== defaults.price()) (patch as any).price = this.price();
        if (this.origin_address() !== defaults.origin_address()) (patch as any).origin_address = this.origin_address();
        if (this.destination_address() !== defaults.destination_address()) (patch as any).destination_address = this.destination_address();
        if (this.kilometers() !== defaults.kilometers()) (patch as any).kilometers = this.kilometers();
        if (this.duration_hours() !== defaults.duration_hours()) (patch as any).duration_hours = this.duration_hours();
        if (JSON.stringify(this.tags()) !== JSON.stringify(defaults.tags())) (patch as any).tags = this.tags();
        if (this.driver_name() !== defaults.driver_name()) (patch as any).driver_name = this.driver_name();
        if (this.admin_name() !== defaults.admin_name()) (patch as any).admin_name = this.admin_name();
        return patch;
    }
}

export class TransportHistoryListParamsEntity {
    page = signal<number | undefined>(undefined);
    page_size = signal<number | undefined>(undefined);

    static fromDto(dto: TransportHistoryListParamsDto): TransportHistoryListParamsEntity {
        const entity = new TransportHistoryListParamsEntity();
        entity.page.set(dto.page);
        entity.page_size.set(dto.page_size);
        return entity;
    }

    toDto(): TransportHistoryListParamsDto {
        return {
            page: this.page(),
            page_size: this.page_size()
        };
    }

    copyFromDto(dto: Partial<TransportHistoryListParamsDto>): void {
        if (dto.page != undefined) this.page.set(dto.page);
        if (dto.page_size != undefined) this.page_size.set(dto.page_size);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new TransportHistoryListParamsEntity();
        const patch: Partial<T> = {};
        if (this.page() !== defaults.page()) (patch as any).page = this.page();
        if (this.page_size() !== defaults.page_size()) (patch as any).page_size = this.page_size();
        return patch;
    }
}
