import { signal } from '@angular/core';
import {
    TransportAddress,
    TransportAddressOpeningHour,
    TransportAddressListResponse
} from '@dtos/transports/transport-address.dto';
import { AddressType, TransportPrincipalType } from '@enums/transport.enum';
import { Helpers } from '@utils/helpers';

/**
 * EntitySignal para TransportAddressOpeningHour
 */
export class TransportAddressOpeningHourEntity {
    close_time = signal<string>("");
    id = signal<number>(0);
    open_time = signal<string>("");
    weekday = signal<number>(0);

    static fromDto(dto: TransportAddressOpeningHour): TransportAddressOpeningHourEntity {
        const entity = new TransportAddressOpeningHourEntity();
        entity.close_time.set(dto.close_time ?? "");
        entity.id.set(dto.id ?? 0);
        entity.open_time.set(dto.open_time ?? "");
        entity.weekday.set(dto.weekday ?? 0);
        return entity;
    }

    toDto(): TransportAddressOpeningHour {
        const dto = new TransportAddressOpeningHour();
        dto.close_time = this.close_time();
        dto.id = this.id();
        dto.open_time = this.open_time();
        dto.weekday = this.weekday();
        return dto;
    }

    copyFromDto(dto: Partial<TransportAddressOpeningHour>): void {
        if (!Helpers.isEmpty(dto.close_time)) this.close_time.set(dto.close_time!);
        if (dto.id != undefined) this.id.set(dto.id);
        if (!Helpers.isEmpty(dto.open_time)) this.open_time.set(dto.open_time!);
        if (dto.weekday != undefined) this.weekday.set(dto.weekday);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new TransportAddressOpeningHourEntity();
        const patch: Partial<T> = {};
        if (this.close_time() !== defaults.close_time()) (patch as any).close_time = this.close_time();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.open_time() !== defaults.open_time()) (patch as any).open_time = this.open_time();
        if (this.weekday() !== defaults.weekday()) (patch as any).weekday = this.weekday();
        return patch;
    }
}

/**
 * EntitySignal para TransportAddress
 */
export class TransportAddressEntity {
    address_type = signal<AddressType>(AddressType.PRIVATE);
    city = signal<string | undefined>(undefined);
    client_name = signal<string>("");
    contact_email = signal<string | null | undefined>(undefined);
    contact_name = signal<string | undefined>(undefined);
    contact_phone = signal<string | undefined>(undefined);
    country = signal<string | undefined>(undefined);
    created_date = signal<Date | null>(null);
    description = signal<string | undefined>(undefined);
    id = signal<number>(0);
    latitude = signal<number>(0);
    longitude = signal<number>(0);
    modified_date = signal<Date | null>(null);
    opening_hours = signal<TransportAddressOpeningHourEntity[]>([]);
    opening_hours_summary = signal<string>("");
    postal_code = signal<string | undefined>(undefined);
    province = signal<string | undefined>(undefined);
    subentity = signal<string>("");
    subentity_name = signal<string>("");
    title = signal<string>("");
    transport_principal_type = signal<TransportPrincipalType | undefined>(undefined);

    static fromDto(dto: TransportAddress): TransportAddressEntity {
        const entity = new TransportAddressEntity();
        entity.address_type.set(dto.address_type ?? AddressType.PRIVATE);
        entity.city.set(dto.city);
        entity.client_name.set(dto.client_name ?? "");
        entity.contact_email.set(dto.contact_email);
        entity.contact_name.set(dto.contact_name);
        entity.contact_phone.set(dto.contact_phone);
        entity.country.set(dto.country);
        entity.created_date.set(dto.created_date ?? null);
        entity.description.set(dto.description);
        entity.id.set(dto.id ?? 0);
        entity.latitude.set(dto.latitude ?? 0);
        entity.longitude.set(dto.longitude ?? 0);
        entity.modified_date.set(dto.modified_date ?? null);
        entity.opening_hours.set((dto.opening_hours || []).map(oh => TransportAddressOpeningHourEntity.fromDto(oh)));
        entity.opening_hours_summary.set(dto.opening_hours_summary ?? "");
        entity.postal_code.set(dto.postal_code);
        entity.province.set(dto.province);
        entity.subentity.set(dto.subentity ?? "");
        entity.subentity_name.set(dto.subentity_name ?? "");
        entity.title.set(dto.title ?? "");
        entity.transport_principal_type.set(dto.transport_principal_type);
        return entity;
    }

    toDto(): TransportAddress {
        const dto = new TransportAddress();
        dto.address_type = this.address_type();
        dto.city = this.city();
        dto.client_name = this.client_name();
        dto.contact_email = this.contact_email();
        dto.contact_name = this.contact_name();
        dto.contact_phone = this.contact_phone();
        dto.country = this.country();
        dto.created_date = this.created_date();
        dto.description = this.description();
        dto.id = this.id();
        dto.latitude = this.latitude();
        dto.longitude = this.longitude();
        dto.modified_date = this.modified_date();
        dto.opening_hours = this.opening_hours().map(oh => oh.toDto());
        dto.opening_hours_summary = this.opening_hours_summary();
        dto.postal_code = this.postal_code();
        dto.province = this.province();
        dto.subentity = this.subentity();
        dto.subentity_name = this.subentity_name();
        dto.title = this.title();
        dto.transport_principal_type = this.transport_principal_type();
        return dto;
    }

    copyFromDto(dto: Partial<TransportAddress>): void {
        if (dto.address_type != undefined) this.address_type.set(dto.address_type);
        if (!Helpers.isEmpty(dto.city)) this.city.set(dto.city);
        if (!Helpers.isEmpty(dto.client_name)) this.client_name.set(dto.client_name!);
        if (dto.contact_email != undefined) this.contact_email.set(dto.contact_email);
        if (!Helpers.isEmpty(dto.contact_name)) this.contact_name.set(dto.contact_name);
        if (!Helpers.isEmpty(dto.contact_phone)) this.contact_phone.set(dto.contact_phone);
        if (!Helpers.isEmpty(dto.country)) this.country.set(dto.country);
        if (dto.created_date != undefined) this.created_date.set(dto.created_date);
        if (!Helpers.isEmpty(dto.description)) this.description.set(dto.description);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.latitude != undefined) this.latitude.set(dto.latitude);
        if (dto.longitude != undefined) this.longitude.set(dto.longitude);
        if (dto.modified_date != undefined) this.modified_date.set(dto.modified_date);
        if (dto.opening_hours != undefined) this.opening_hours.set(dto.opening_hours.map(oh => TransportAddressOpeningHourEntity.fromDto(oh)));
        if (!Helpers.isEmpty(dto.opening_hours_summary)) this.opening_hours_summary.set(dto.opening_hours_summary!);
        if (!Helpers.isEmpty(dto.postal_code)) this.postal_code.set(dto.postal_code);
        if (!Helpers.isEmpty(dto.province)) this.province.set(dto.province);
        if (!Helpers.isEmpty(dto.subentity)) this.subentity.set(dto.subentity!);
        if (!Helpers.isEmpty(dto.subentity_name)) this.subentity_name.set(dto.subentity_name!);
        if (!Helpers.isEmpty(dto.title)) this.title.set(dto.title!);
        if (dto.transport_principal_type != undefined) this.transport_principal_type.set(dto.transport_principal_type);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new TransportAddressEntity();
        const patch: Partial<T> = {};
        if (this.address_type() !== defaults.address_type()) (patch as any).address_type = this.address_type();
        if (this.city() !== defaults.city()) (patch as any).city = this.city();
        if (this.client_name() !== defaults.client_name()) (patch as any).client_name = this.client_name();
        if (this.contact_email() !== defaults.contact_email()) (patch as any).contact_email = this.contact_email();
        if (this.contact_name() !== defaults.contact_name()) (patch as any).contact_name = this.contact_name();
        if (this.contact_phone() !== defaults.contact_phone()) (patch as any).contact_phone = this.contact_phone();
        if (this.country() !== defaults.country()) (patch as any).country = this.country();
        if (this.created_date() !== defaults.created_date()) (patch as any).created_date = this.created_date();
        if (this.description() !== defaults.description()) (patch as any).description = this.description();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.latitude() !== defaults.latitude()) (patch as any).latitude = this.latitude();
        if (this.longitude() !== defaults.longitude()) (patch as any).longitude = this.longitude();
        if (this.modified_date() !== defaults.modified_date()) (patch as any).modified_date = this.modified_date();
        if (JSON.stringify(this.opening_hours()) !== JSON.stringify(defaults.opening_hours())) (patch as any).opening_hours = this.opening_hours().map(oh => oh.toDto());
        if (this.opening_hours_summary() !== defaults.opening_hours_summary()) (patch as any).opening_hours_summary = this.opening_hours_summary();
        if (this.postal_code() !== defaults.postal_code()) (patch as any).postal_code = this.postal_code();
        if (this.province() !== defaults.province()) (patch as any).province = this.province();
        if (this.subentity() !== defaults.subentity()) (patch as any).subentity = this.subentity();
        if (this.subentity_name() !== defaults.subentity_name()) (patch as any).subentity_name = this.subentity_name();
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        if (this.transport_principal_type() !== defaults.transport_principal_type()) (patch as any).transport_principal_type = this.transport_principal_type();
        return patch;
    }
}

