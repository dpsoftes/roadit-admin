import { DirectionType } from "@enums/additional.enum";
import { TransportPrincipalType } from "@enums/transport.enum";

export interface DocumentsClientsDto {
    /**
     * Momento de aplicación
     */
    application_time?: DirectionType;
    /**
     * Cliente
     */
    client: number;
    /**
     * Documento
     */
    file?: null | string;
    id: number;
    /**
     * Enlace
     */
    link?: string;
    /**
     * Título
     */
    title?: string;
    /**
     * Tipo de transporte
     */
    transport_principal_type: TransportPrincipalType;
    [property: string]: any;
}
