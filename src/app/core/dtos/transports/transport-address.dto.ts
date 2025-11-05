import { TransportPrincipalType } from '@enums/transport.enum';
import { AddressType } from '@enums/transport.enum';

/**
 * PaginatedTransportAddressList
 */
export interface TransportAddressListResponse {
    count: number;
    next?: null | string;
    previous?: null | string;
    results: TransportAddress[];
    [property: string]: any;
}

/**
 * TransportAddressOpeningHour
 */
export class TransportAddressOpeningHour {
    close_time: string = "";
    id: number = 0;
    open_time: string = "";

    /**
     * Día de la semana
     */
    weekday: number = 0;

    [property: string]: any;
}

/**
 * TransportAddress
 */
export class TransportAddress {
    /**
     * Tipo de dirección
     */
    address_type: AddressType = AddressType.PRIVATE;

    /**
     * Ciudad
     */
    city?: string;

    client_name: string = "";

    /**
     * Email de contacto
     */
    contact_email?: null | string;

    /**
     * Nombre de contacto
     */
    contact_name?: string;

    /**
     * Teléfono de contacto
     */
    contact_phone?: string;

    /**
     * País
     */
    country?: string;

    /**
     * Fecha de Creación
     */
    created_date: Date | null = null;

    /**
     * Descripción
     */
    description?: string;

    id: number = 0;

    /**
     * Latitud
     */
    latitude: number = 0;

    /**
     * Longitud
     */
    longitude: number = 0;

    /**
     * Fecha de Modificación
     */
    modified_date: Date | null = null;

    opening_hours?: TransportAddressOpeningHour[];

    opening_hours_summary: string = "";

    /**
     * Código postal
     */
    postal_code?: string;

    /**
     * Provincia
     */
    province?: string;

    subentity: string = "";

    subentity_name: string = "";

    /**
     * Título
     */
    title: string = "";

    /**
     * Tipo principal del transporte
     */
    transport_principal_type?: TransportPrincipalType;

    [property: string]: any;
}

