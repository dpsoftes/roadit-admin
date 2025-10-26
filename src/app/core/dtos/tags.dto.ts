export class Tag {
    id: number = 0;
    name: string = "";
    type: TagType = TagType.Client;
    [property: string]: any;
}

/**
 * Tipo de etiqueta
 *
 * Type0c7Enum, * `CLIENT` - Cliente
 * * `DRIVER` - Conductor
 * * `TRANSPORT` - Transporte
 * * `INCIDENCE` - Incidencia
 */
export enum TagType {
    Client = "CLIENT",
    Driver = "DRIVER",
    Incidence = "INCIDENCE",
    Transport = "TRANSPORT",
}