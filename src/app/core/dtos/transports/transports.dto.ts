import { TransportPrincipalType, TransportStatus, LegPointType } from "@enums/transport.enum";
import { BillingType, ClientOrigin, ClientType } from "@enums/client.enum";
import { FuelType, VehicleSize } from "@enums/vehicle.enum";

/**
 * TransportDetail
 * DTO para la respuesta de recuperación de transporte
 */
export class TransportsRetrieveResponse {
    additional_services: AdditionalService[] = [];
    admin_id: number = 0;
    admin_name: string = "";

    /**
     * Gestión de citas
     */
    appointment_management?: boolean;

    /**
     * Cancelado
     */
    cancelled?: boolean;

    /**
     * Comentario de cancelación
     */
    cancelled_comment?: string;

    /**
     * Razón de cancelación
     */
    cancelled_reason?: null;

    client_id: number = 0;
    client_name: string = "";

    /**
     * Comentario
     */
    comment?: string;

    /**
     * Fecha de Creación
     */
    created_date: Date | null = null;

    driver_id: number = 0;
    driver_name: string = "";

    /**
     * Duración, Duración en horas (decimal)
     */
    duration?: number | null;

    /**
     * Lista de correos electrónicos
     */
    emails?: any;

    /**
     * Número de grupo
     */
    group_number?: number | null;

    /**
     * Tiene ferry
     */
    has_ferry?: boolean;

    id: number = 0;

    /**
     * Facturado
     */
    invoiced?: boolean;

    /**
     * Bloqueado
     */
    is_blocked?: boolean;

    /**
     * Es exprés
     */
    is_express?: boolean;

    /**
     * Kilómetros
     */
    kilometers?: null | string;

    legs: Leg[] = [];

    /**
     * Fecha de Modificación
     */
    modified_date: Date | null = null;

    /**
     * Teléfono
     */
    phone?: string;

    /**
     * Número de referencia
     */
    reference_number?: null | string;

    /**
     * Número de reserva
     */
    reservation_number?: null | string;

    show_timeline: string = "";
    tags: number[] = [];
    timeline: string = "";

    /**
     * Tipo de transporte principal
     */
    transport_principal_type: TransportPrincipalType = TransportPrincipalType.SIMPLE_MOVEMENT;

    /**
     * Estado del transporte
     */
    transport_status?: TransportStatus;

    transport_type: string = "";
    vehicle: Vehicle = new Vehicle();

    [property: string]: any;
}

/**
 * AdditionalService
 */
export class AdditionalService {
    certification: Certification = new Certification();
    client: Client = {} as Client;

    /**
     * Tiempo de cargo (min), Minutos adicionales requeridos para este servicio.
     */
    charging_time?: number;

    /**
     * Precio cliente
     */
    client_price?: string;

    /**
     * Seleccionado por defecto
     */
    default_selected?: boolean;

    /**
     * Descripción
     */
    description?: null | string;

    /**
     * Pago al conductor
     */
    driver_payment?: string;

    id: number = 0;

    /**
     * Es gestión de cita
     */
    is_appointment_management?: boolean;

    /**
     * Es un servicio común
     */
    is_common?: boolean;

    /**
     * Tipo de punto
     */
    leg_point_type?: LegPointType;

    /**
     * Trayectos
     */
    legs?: number[];

    /**
     * Nombre
     */
    name: string = "";

    /**
     * Requiere certificación
     */
    requires_certification?: boolean;

    /**
     * Requiere imagen
     */
    requires_image?: boolean;

    /**
     * Requiere ubicación
     */
    requires_location?: boolean;

    /**
     * Estado
     */
    state?: boolean;

    /**
     * Estado del transporte
     */
    transport_status?: TransportStatus;

    /**
     * Visible por el conductor
     */
    visible_by_driver?: boolean;

    [property: string]: any;
}

/**
 * ClientCertification
 */
export class Certification {
    /**
     * Permitir nuevos conductores
     */
    allow_new_drivers?: boolean;

    /**
     * Cliente
     */
    client: number = 0;

    /**
     * Fecha de Creación
     */
    created_date: Date | null = null;

    /**
     * Descripción
     */
    description?: null | string;

    exam?: Exam;

    id: number = 0;

    /**
     * Máximo de intentos por semana
     */
    max_tries_per_week?: number;

    /**
     * Fecha de Modificación
     */
    modified_date: Date | null = null;

    /**
     * Título
     */
    title: string = "";

    [property: string]: any;
}

/**
 * Exam
 */
export class Exam {
    id: number = 0;

    /**
     * Máximo de intentos por semana
     */
    max_tries_per_week?: number;

    questions?: ExamQuestion[] = [];

    /**
     * Título
     */
    title: string = "";

    [property: string]: any;
}

/**
 * ExamQuestion
 */
export class ExamQuestion {
    id: number = 0;

    options?: ExamOption[] = [];

    /**
     * Orden
     */
    order: number = 0;

    /**
     * Obligatoria
     */
    required?: boolean;

    /**
     * Requiere revisión manual
     */
    requires_manual_review?: boolean;

    /**
     * Título de la pregunta
     */
    title: string = "";

    /**
     * Tipo de pregunta
     */
    type: QuestionType = QuestionType.Single;

    [property: string]: any;
}

/**
 * ExamOption
 */
export class ExamOption {
    id: number = 0;

    /**
     * ¿Es correcta?
     */
    is_correct?: boolean;

    /**
     * Título
     */
    title: string = "";

    [property: string]: any;
}

/**
 * Tipo de pregunta
 *
 * ExamQuestionTypeEnum, * `SINGLE` - Opción única
 * * `MULTIPLE` - Opción múltiple
 */
export enum QuestionType {
    Multiple = "MULTIPLE",
    Single = "SINGLE",
}

/**
 * Client
 * Interfaz para el cliente en el contexto de transporte
 */
export interface Client {
    at_risk: string;

    /**
     * Tipo de facturación
     */
    billing_type?: BillingType;

    cif: string;

    /**
     * Grupo cliente
     */
    client_group: number;

    /**
     * Origen del cliente
     */
    client_origin: ClientOrigin;

    /**
     * Tipo de cliente
     */
    client_type: ClientType;

    /**
     * Email de la persona de contacto
     */
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

    id: number;

    /**
     * Minutos de retraso en la invitación
     */
    invite_delay_minutes?: number | null;

    is_subentity: string;
    logo: string;

    /**
     * Usuarios que gestionan este cliente, Los usuarios asociados podrán gestionarlo.
     */
    managers?: number[];

    /**
     * Nombre
     */
    name: string;

    own_insurance: string;

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
}

/**
 * Leg
 */
export class Leg {
    additional_services: AdditionalService[] = [];
    connection_type: string = "";
    destination_address: string = "";
    documents: LegDocument[] = [];

    /**
     * Duración, Duración en horas (decimal)
     */
    duration?: number | null;

    /**
     * Fecha/hora llegada desde
     */
    expected_arrival_from?: Date | null;

    /**
     * Fecha/hora llegada hasta
     */
    expected_arrival_to?: Date | null;

    /**
     * Fecha/hora salida desde
     */
    expected_departure_from?: Date | null;

    /**
     * Fecha/hora salida hasta
     */
    expected_departure_to?: Date | null;

    /**
     * Incluye ferry
     */
    has_ferry?: boolean;

    id: number = 0;

    /**
     * Kilómetros
     */
    kilometers?: null | string;

    /**
     * Orden
     */
    order?: number;

    origin_address: string = "";
    vehicle: Vehicle = new Vehicle();

    [property: string]: any;
}

/**
 * LegDocument
 */
export class LegDocument {
    comment?: string;

    /**
     * Fecha de Creación
     */
    created_date: Date | null = null;

    document_template_id: number = 0;
    file_sent: string = "";
    file_template: string = "";
    id: number = 0;

    /**
     * Fecha de Modificación
     */
    modified_date: Date | null = null;

    phase: PhaseEnum = PhaseEnum.Departure;
    title: string = "";

    [property: string]: any;
}

/**
 * PhaseEnum, * `DEPARTURE` - Salida
 * * `ARRIVAL` - Llegada
 */
export enum PhaseEnum {
    Arrival = "ARRIVAL",
    Departure = "DEPARTURE",
}

/**
 * Vehicle
 */
export class Vehicle {
    /**
     * Marca
     */
    brand: string = "";

    /**
     * Fecha de Creación
     */
    created_date: Date | null = null;

    /**
     * Tipo de combustible
     */
    fuel_type: FuelType = FuelType.GASOLINE;

    id: number = 0;
    image: string = "";

    /**
     * Fin del seguro
     */
    insurance_date_end?: Date | null;

    /**
     * Inicio del seguro
     */
    insurance_date_start?: Date | null;

    /**
     * Matrícula
     */
    license_plate: string = "";

    /**
     * Modelo
     */
    model: string = "";

    /**
     * Fecha de Modificación
     */
    modified_date: Date | null = null;

    /**
     * Tamaño
     */
    size: VehicleSize = VehicleSize.SMALL;

    [property: string]: any;
}

