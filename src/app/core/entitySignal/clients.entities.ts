import { PriceRulesClientDto, DistanceBracketRule } from '@dtos/clients/priceRules.dtos';
import { PricingType } from '@enums/additional.enum';

import { BaseBillingAccountDto, ClientBillingAccountDto } from '@dtos/clients/billingsAccounts.dto';

import { DocumentsClientsDto } from '@dtos/clients/documents.dto';
import { DirectionType, ProtocolType } from '@enums/additional.enum';
import { TransportPrincipalType } from '@enums/client.enum';

import { signal } from '@angular/core';
import { ClientsGroupCreateRequest } from '@dtos/clients/clients.dto';
import { ClientDto } from '@dtos/clients/clients.dto';
import { BillingType, ClientOrigin, ClientType } from '@enums/client.enum';
import { ProtocolDto, ProtocolOptionDto } from '@dtos/clients/protocols.dto';
import { 
    CertificationsDto, 
    CertificationExam, 
    ExamQuestion, 
    ExamOption 
} from '@dtos/certifications.dto';
import { ClientCertification } from '@dtos/clients/clientsCertifications.dto';
import { ExamQuestionType } from '@enums/additional.enum';
import { ClientAdditionalServiceDto } from '@dtos/clients/clientAdditional-services.dto';
import { TransportStatus } from '@enums/transport.enum';
import { BaseEntity } from './base.entity';


export class ClientsGralEntity extends BaseEntity<ClientDto> {
    /** Identificador único */
    id = signal<number>(0);
    at_risk = signal<boolean>(false);
    /** Tipo de facturación */
    billing_type = signal<BillingType>(BillingType.AUTOMATIC); // Usa el valor por defecto más común o el que corresponda
    cif = signal<string>("");
    /** Grupo cliente */
    client_group = signal<number>(0);
    /** Origen del cliente */
    client_origin = signal<ClientOrigin>(ClientOrigin.UNDEFINED);
    /** Tipo de cliente */
    client_type = signal<ClientType>(ClientType.COMPANY);
    contact_person_email = signal<string>("");
    /** Nombre de la persona de contacto */
    contact_person_name = signal<string>("");
    /** Teléfono de la persona de contacto */
    contact_person_phone = signal<string>("");
    /** Fecha de Eliminación */
    deleted_date = signal<Date>(new Date(0));
    /** Departamento */
    department = signal<string>("");
    /** Identificador Eurotransport */
    eurotransport_identifier = signal<string>("");
    /** Página de contacto 1 */
    html_contact_page1 = signal<string>("");
    /** Página de contacto 2 */
    html_contact_page2 = signal<string>("");
    /** Página de información */
    html_info_page = signal<string>("");
    /** Minutos de retraso en la invitación */
    invite_delay_minutes = signal<number>(0);
    is_subentity = signal<boolean>(false);
    logo = signal<string>("");
    managers = signal<number[]>([]);
    /** Nombre */
    name = signal<string>("");
    own_insurance = signal<boolean>(false);
    /** Cliente padre, Dejar vacío solo para clientes principales. Subclientes deben tener padre. */
    parent = signal<number>(0);
    /** Minutos de recordatorio */
    reminder_interval_minutes = signal<number>(0);
    /** Identificador Revel */
    revel_identifier = signal<string>("");
    /** Enviar encuesta */
    send_survey = signal<boolean>(false);
    /** Estado */
    state = signal<boolean>(false);
    tags = signal<number[]>([]);

    static fromDto(dto: ClientDto): ClientsGralEntity {
        const entity = new ClientsGralEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    protected createDefaultInstance(): this {
        return new ClientsGralEntity() as this;
    }
}


export class ClientsGroupEntity extends BaseEntity<ClientsGroupCreateRequest & { id?: number }> {
    /**
     * Identificador único (opcional)
     */
    id = signal<number | undefined>(undefined);
    assigned_admins = signal<number[]>([]);
    /**
     * País
     */
    country = signal<string>("");
    /**
     * Nombre
     */
    name = signal<string>("");

    static fromDto(dto: ClientsGroupCreateRequest & { id?: number }): ClientsGroupEntity {
        const entity = new ClientsGroupEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    protected createDefaultInstance(): this {
        return new ClientsGroupEntity() as this;
    }
}


export class DocumentTemplateTransportEntity extends BaseEntity<DocumentsClientsDto> {
    application_time = signal<DirectionType | undefined>(undefined);
    client = signal<number | undefined>(undefined);
    file = signal<string | null | undefined>(undefined);
    id = signal<number | undefined>(undefined);
    link = signal<string | undefined>(undefined);
    title = signal<string | undefined>(undefined);
    transport_principal_type = signal<TransportPrincipalType | undefined>(undefined);

    static fromDto(dto: Partial<DocumentsClientsDto>): DocumentTemplateTransportEntity {
        const entity = new DocumentTemplateTransportEntity();
        entity.copyFromDto(dto);
        return entity;
    }

    protected createDefaultInstance(): this {
        return new DocumentTemplateTransportEntity() as this;
    }
}



export class BaseBillingAccountEntity extends BaseEntity<BaseBillingAccountDto> {
    id = signal<number | undefined>(undefined);
    state = signal<boolean | undefined>(undefined);
    created_date = signal<Date | null | undefined>(undefined);
    modified_date = signal<Date | null | undefined>(undefined);
    deleted_date = signal<Date | null | undefined>(undefined);
    iban = signal<string>("");
    iva = signal<string>("");
    irpf = signal<string>("");
    bic = signal<string>("");
    is_favourite = signal<boolean>(false);

    static fromDto(dto: BaseBillingAccountDto): BaseBillingAccountEntity {
        const entity = new BaseBillingAccountEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    override toDto(): BaseBillingAccountDto {
        return new BaseBillingAccountDto(super.toDto());
    }

    protected createDefaultInstance(): this {
        return new BaseBillingAccountEntity() as this;
    }
}

export class ClientBillingAccountEntity extends BaseEntity<ClientBillingAccountDto> {
    // Propiedades de base
    id = signal<number | undefined>(undefined);
    state = signal<boolean | undefined>(undefined);
    created_date = signal<Date | null | undefined>(undefined);
    modified_date = signal<Date | null | undefined>(undefined);
    deleted_date = signal<Date | null | undefined>(undefined);
    iban = signal<string>("");
    iva = signal<string>("");
    irpf = signal<string>("");
    bic = signal<string>("");
    is_favourite = signal<boolean>(false);
    
    // Propiedades específicas de cliente
    business_name = signal<string>("");
    entity_number = signal<string>("");
    document = signal<string>("");
    document_type = signal<string>("");
    address = signal<string>("");
    address_complement = signal<string>("");
    postal_code = signal<string>("");
    country = signal<string>("");
    city = signal<string>("");
    email_send_invoice = signal<string>("");
    phone = signal<string>("");
    expire_period_days = signal<number | null | undefined>(undefined);
    client = signal<number>(0);
    eurotransport_identifier = signal<string>("");
    revel_identifier = signal<string>("");

    static fromDto(dto: ClientBillingAccountDto): ClientBillingAccountEntity {
        const entity = new ClientBillingAccountEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    override toDto(): ClientBillingAccountDto {
        return new ClientBillingAccountDto(super.toDto());
    }

    /**
     * Devuelve un DTO solo con los campos requeridos para POST, según el JSON de ejemplo proporcionado.
     */
    toPost(): Partial<ClientBillingAccountDto> {
        return {
            email_send_invoice: this.email_send_invoice(),
            state: this.state(),
            deleted_date: this.deleted_date(),
            iban: this.iban(),
            iva: this.iva(),
            irpf: this.irpf(),
            bic: this.bic(),
            is_favourite: this.is_favourite(),
            business_name: this.business_name(),
            entity_number: this.entity_number(),
            document: this.document(),
            document_type: this.document_type(),
            address: this.address(),
            address_complement: this.address_complement(),
            postal_code: this.postal_code(),
            country: this.country(),
            city: this.city(),
            phone: this.phone(),
            expire_period_days: this.expire_period_days(),
            eurotransport_identifier: this.eurotransport_identifier(),
            revel_identifier: this.revel_identifier(),
            client: this.client(),
        };
    }

    protected createDefaultInstance(): this {
        return new ClientBillingAccountEntity() as this;
    }
}

export class DistanceBracketRuleEntity extends BaseEntity<DistanceBracketRule> {
    big_vehicle_price = signal<number | null | undefined>(undefined);
    id = signal<number | undefined>(undefined);
    max_km = signal<number>(0);
    min_km = signal<number | undefined>(undefined);
    pricing_type = signal<PricingType | undefined>(undefined);
    small_vehicle_price = signal<number | null | undefined>(undefined);
    standard_price = signal<number>(0);

    static fromDto(dto: DistanceBracketRule): DistanceBracketRuleEntity {
        const entity = new DistanceBracketRuleEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    protected createDefaultInstance(): this {
        return new DistanceBracketRuleEntity() as this;
    }
}

export class PriceRulesEntity extends BaseEntity<PriceRulesClientDto> {
    charging_requires_ticket = signal<boolean | undefined>(undefined);
    client = signal<number | null | undefined>(undefined);
    client_charging_price = signal<number | undefined>(undefined);
    client_fuel_price = signal<number | undefined>(undefined);
    distance_brackets = signal<DistanceBracketRuleEntity[]>([]);
    driver_charging_price = signal<number | undefined>(undefined);
    driver_fuel_price = signal<number | undefined>(undefined);
    express_surcharge_percentage = signal<number | undefined>(undefined);
    ferry_fixed_cost = signal<number | undefined>(undefined);
    id = signal<number | undefined>(undefined);
    is_fuel_included = signal<boolean | undefined>(undefined);
    stage_discount_percentage = signal<number | undefined>(undefined);
    transport = signal<number | null | undefined>(undefined);

    static fromDto(dto: PriceRulesClientDto): PriceRulesEntity {
        const entity = new PriceRulesEntity();
        entity.populateFromDto(dto);
        entity.distance_brackets.set((dto.distance_brackets || []).map(d => DistanceBracketRuleEntity.fromDto(d)));
        return entity;
    }

    override toDto(): PriceRulesClientDto {
        const dto = super.toDto();
        dto.distance_brackets = this.distance_brackets().map(d => d.toDto());
        return dto;
    }

    override copyFromDto(dto: Partial<PriceRulesClientDto>): void {
        super.copyFromDto(dto);
        if (dto.distance_brackets !== undefined) this.distance_brackets.set(dto.distance_brackets.map(d => DistanceBracketRuleEntity.fromDto(d)));
    }

    protected createDefaultInstance(): this {
        return new PriceRulesEntity() as this;
    }
}

export class ProtocolOptionEntity extends BaseEntity<ProtocolOptionDto> {
    id = signal<number | undefined>(undefined);
    title = signal<string | undefined>(undefined);

    static fromDto(dto: ProtocolOptionDto): ProtocolOptionEntity {
        const entity = new ProtocolOptionEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    protected createDefaultInstance(): this {
        return new ProtocolOptionEntity() as this;
    }
}

export class ProtocolEntity extends BaseEntity<ProtocolDto> {
    id = signal<number | undefined>(undefined);
    title = signal<string | undefined>(undefined);
    protocol_type = signal<ProtocolType | undefined>(undefined);
    direction_type = signal<DirectionType | undefined>(undefined);
    transport_principal_types = signal<TransportPrincipalType[]>([]);
    client = signal<number | null | undefined>(undefined);
    transport = signal<number | null | undefined>(undefined);
    is_template = signal<boolean | undefined>(undefined);
    options = signal<ProtocolOptionEntity[]>([]);

    static fromDto(dto: ProtocolDto): ProtocolEntity {
        const entity = new ProtocolEntity();
        entity.populateFromDto(dto);
        entity.options.set((dto.options || []).map(opt => ProtocolOptionEntity.fromDto(opt)));
        return entity;
    }

    override toDto(): ProtocolDto {
        const dto = super.toDto();
        dto.options = this.options().map(opt => opt.toDto());
        return dto;
    }

    override copyFromDto(dto: Partial<ProtocolDto>): void {
        super.copyFromDto(dto);
        if (dto.options !== undefined) this.options.set(dto.options.map(opt => ProtocolOptionEntity.fromDto(opt)));
    }

    protected createDefaultInstance(): this {
        return new ProtocolEntity() as this;
    }
}

export class ExamOptionEntity extends BaseEntity<ExamOption> {
    id = signal<number>(0);
    title = signal<string>("");
    is_correct = signal<boolean>(false);

    static fromDto(dto: ExamOption): ExamOptionEntity {
        const entity = new ExamOptionEntity();
        entity.populateFromDto(dto);
        return entity;
    }

    protected createDefaultInstance(): this {
        return new ExamOptionEntity() as this;
    }
}

export class ExamQuestionEntity extends BaseEntity<ExamQuestion> {
    id = signal<number>(0);
    title = signal<string>("");
    type = signal<ExamQuestionType>(ExamQuestionType.SINGLE);
    required = signal<boolean>(true);
    order = signal<number>(0);
    requires_manual_review = signal<boolean>(false);
    options = signal<ExamOptionEntity[]>([]);

    static fromDto(dto: ExamQuestion): ExamQuestionEntity {
        const entity = new ExamQuestionEntity();
        entity.populateFromDto(dto);
        entity.options.set((dto.options || []).map(opt => ExamOptionEntity.fromDto(opt)));
        return entity;
    }

    override toDto(): ExamQuestion {
        const dto = super.toDto();
        dto.options = this.options().map(opt => opt.toDto());
        return dto;
    }

    override copyFromDto(dto: Partial<ExamQuestion>): void {
        super.copyFromDto(dto);
        if (dto.options !== undefined) this.options.set(dto.options.map(opt => ExamOptionEntity.fromDto(opt)));
    }

    protected createDefaultInstance(): this {
        return new ExamQuestionEntity() as this;
    }
}

export class CertificationExamEntity extends BaseEntity<CertificationExam> {
    id = signal<number>(0);
    title = signal<string>("");
    max_tries_per_week = signal<number>(0);
    questions = signal<ExamQuestionEntity[]>([]);

    static fromDto(dto: CertificationExam): CertificationExamEntity {
        const entity = new CertificationExamEntity();
        entity.populateFromDto(dto);
        entity.questions.set((dto.questions || []).map(q => ExamQuestionEntity.fromDto(q)));
        return entity;
    }

    override toDto(): CertificationExam {
        const dto = super.toDto();
        dto.questions = this.questions().map(q => q.toDto());
        return dto;
    }

    override copyFromDto(dto: Partial<CertificationExam>): void {
        super.copyFromDto(dto);
        if (dto.questions !== undefined) this.questions.set(dto.questions.map(q => ExamQuestionEntity.fromDto(q)));
    }

    protected createDefaultInstance(): this {
        return new CertificationExamEntity() as this;
    }
}

export class CertificationEntity extends BaseEntity<CertificationsDto> {
    id = signal<number>(0);
    title = signal<string>("");
    description = signal<string>("");
    default_max_tries = signal<number>(0);
    allow_new_drivers = signal<boolean>(false);
    exam = signal<CertificationExamEntity>(new CertificationExamEntity());

    static fromDto(dto: CertificationsDto): CertificationEntity {
        const entity = new CertificationEntity();
        entity.populateFromDto(dto);
        entity.exam.set(CertificationExamEntity.fromDto(dto.exam));
        return entity;
    }

    override toDto(): CertificationsDto {
        const dto = super.toDto();
        dto.exam = this.exam().toDto();
        return dto;
    }

    override copyFromDto(dto: Partial<CertificationsDto>): void {
        super.copyFromDto(dto);
        if (dto.exam !== undefined) this.exam.set(CertificationExamEntity.fromDto(dto.exam));
    }

    protected createDefaultInstance(): this {
        return new CertificationEntity() as this;
    }
}

export class ClientCertificationEntity extends BaseEntity<ClientCertification> {
    id = signal<number>(0);
    title = signal<string>("");
    description = signal<string>("");
    allow_new_drivers = signal<boolean>(false);
    exam = signal<CertificationExamEntity>(new CertificationExamEntity());
    client = signal<number>(0);
    max_tries_per_week = signal<number>(0);

    static fromDto(dto: ClientCertification): ClientCertificationEntity {
        const entity = new ClientCertificationEntity();
        entity.populateFromDto(dto);
        entity.exam.set(CertificationExamEntity.fromDto(dto.exam));
        return entity;
    }

    override toDto(): ClientCertification {
        const dto = new ClientCertification();
        Object.assign(dto, super.toDto());
        dto.exam = this.exam().toDto();
        return dto;
    }

    override copyFromDto(dto: Partial<ClientCertification>): void {
        super.copyFromDto(dto);
        if (dto.exam !== undefined) this.exam.set(CertificationExamEntity.fromDto(dto.exam));
    }

    protected createDefaultInstance(): this {
        return new ClientCertificationEntity() as this;
    }
}

export class ClientAdditionalServiceEntity extends BaseEntity<ClientAdditionalServiceDto> {
    id = signal<number>(0);
    client = signal<ClientsGralEntity | null>(null);
    certification = signal<ClientCertificationEntity | null>(null);
    state = signal<boolean>(true);
    default_selected = signal<boolean>(false);
    name = signal<string>("");
    description = signal<string>("");
    is_appointment_management = signal<boolean>(false);
    client_price = signal<string>("0.00");
    driver_payment = signal<string>("0.00");
    visible_by_driver = signal<boolean>(true);
    transport_status = signal<TransportStatus>(TransportStatus.PENDING);
    applyment_moment = signal<string>("ALL");
    requires_certification = signal<boolean>(false);
    requires_image = signal<boolean>(false);
    requires_location = signal<boolean>(false);
    is_common = signal<boolean>(false);
    charging_time = signal<number>(0);
    legs = signal<number[]>([]);

    static fromDto(dto: ClientAdditionalServiceDto): ClientAdditionalServiceEntity {
        const entity = new ClientAdditionalServiceEntity();
        entity.populateFromDto(dto);
        
        // Conversiones especiales para objetos anidados
        if (dto.client) {
            entity.client.set(ClientsGralEntity.fromDto(dto.client));
        }
        if (dto.certification) {
            entity.certification.set(ClientCertificationEntity.fromDto(dto.certification));
        }
        
        return entity;
    }

    override toDto(): ClientAdditionalServiceDto {
        const dto = super.toDto();
        
        // Conversiones especiales para objetos anidados
        if (this.client()) {
            dto.client = this.client()!.toDto();
        }
        if (this.certification()) {
            dto.certification = this.certification()!.toDto();
        }
        
        return dto;
    }

    protected createDefaultInstance(): this {
        return new ClientAdditionalServiceEntity() as this;
    }
}
