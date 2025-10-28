
import { BillingType, ClientOrigin, ClientType } from "@enums/client.enum";
import { AdminSummaryDto } from "../admins.dto";
import { Tag } from "../tags.dto";

export interface ClientsQueryParams {
    cif?: string;
    client_group?: number;
    created_date?: Date;
    department?: string;
    eurotransport_identifier?: string;
    id?: number;
    name?: string;
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    page_size?: number;
    parent?: number;
    revel_identifier?: string;
    /**
     * Múltiples valores separados por comas.
     */
    tags?: string[];
}

export interface GroupsQueryParams {
    assigned_admins?: string;
    country?: string;
    name?: string;
    /**
     * A page number within the paginated result set.
     */
    page?: number;
    /**
     * Number of results to return per page.
     */
    page_size?: number;
    [property: string]: any;
}

/**
 * ClientGroupSummary
 */
export interface ClientGroupSummary {
    assigned_admins: AdminSummaryDto[];
    country: string;
    id: number;
    name: string;
    [property: string]: any;
}


/**
 * ClientSummary
 */
export interface ClientSummary {
    cif: string;
    client_group_name: string;
    created_date: Date | null;
    department?: string;
    id: number;
    logo?: null | string;
    name: string;
    parent_name: string;
    tags: Tag[];
    [property: string]: any;
}


/**
 * CreateClientRequest
 */
export class ClientDto {
    /**
     * Identificador único
     */
    id?: number;
  
    at_risk?: boolean;
    /**
     * Tipo de facturación
     */
    billing_type?: BillingType;
    cif: string = "";
    /**
     * Grupo cliente
     */
    client_group: number = 0;   
    /**
     * Origen del cliente
     */
    client_origin: ClientOrigin = ClientOrigin.UNDEFINED;
    /**
     * Tipo de cliente
     */
    client_type: ClientType = ClientType.COMPANY;
    contact_person_email?: string;
    /**
     * Nombre de la persona de contacto
     */
    contact_person_name?: string;
    /**
     * Teléfono de la persona de contacto
     */
    contact_person_phone?: string;
    /**
     * Fecha de Eliminación
     */
    deleted_date?: Date | null;
    /**
     * Departamento
     */
    department?: string;
    /**
     * Identificador Eurotransport
     */
    eurotransport_identifier?: null | string;

    /**
     * Página de contacto 1
     */
    html_contact_page1?: string;
    /**
     * Página de contacto 2
     */
    html_contact_page2?: string;
    /**
     * Página de información
     */
    html_info_page?: string;
    /**
     * Minutos de retraso en la invitación
     */
    invite_delay_minutes?: number | null;
    is_subentity?: boolean;
    logo?: null | string;
    managers?: number[];
    /**
     * Nombre
     */
    name: string = "";
    own_insurance?: boolean;
    /**
     * Cliente padre, Dejar vacío solo para clientes principales. Subclientes deben tener padre.
     */
    parent?: number | null;
    /**
     * Minutos de recordatorio
     */
    reminder_interval_minutes?: number | null;
    /**
     * Identificador Revel
     */
    revel_identifier?: null | string;
    /**
     * Enviar encuesta
     */
    send_survey?: boolean;
    /**
     * Estado
     */
    state?: boolean;
    tags?: number[];
    [property: string]: any;

    static fromResponse(response: any): ClientDto {
        const instance = new ClientDto();
        const { tags, ...newObject } = response || {};
        Object.assign(instance, newObject);
        if (Array.isArray(tags)) {
            if (tags.length > 0 && typeof tags[0] === 'object' && tags[0] !== null) {
                instance.tags = tags.map((t: any) => t.id);
            } else {
                instance.tags = tags;
            }
        }
        return instance;
    }
}

/**
 * CreateClientGroupRequest
 */
export class ClientsGroupCreateRequest {
    /**
     * Identificador único (opcional)
     */
    id?: number;
    assigned_admins: number[] = [];
    /**
     * País
     */
    country: string ="";
    /**
     * Nombre
     */
    name: string = ""; 
    [property: string]: any;
}