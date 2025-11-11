import { PriceRulesClientDto, DistanceBracketRule } from '@dtos/clients/priceRules.dtos';
import { PricingType } from '@enums/additional.enum';

import { BaseBillingAccountDto, ClientBillingAccountDto } from '@dtos/clients/billingsAccounts.dto';

import { DocumentsClientsDto } from '@dtos/clients/documents.dto';
import { DirectionType } from '@enums/additional.enum';
import { TransportPrincipalType } from '@enums/transport.enum';

import { signal, Signal } from '@angular/core';
import { ClientsGroupCreateRequest } from '@dtos/clients/clients.dto';
import { ClientDto } from '@dtos/clients/clients.dto';
import { BillingType, ClientOrigin, ClientType } from '@enums/client.enum';
import { Helpers } from '@utils/helpers';


export class ClientsGralEntity {
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
        entity.id.set(dto.id);
        entity.at_risk.set(dto.at_risk);
        entity.billing_type.set(dto.billing_type);
        entity.cif.set(dto.cif ?? "");
        entity.client_group.set(dto.client_group ?? 0);
        entity.client_origin.set(dto.client_origin ?? ClientOrigin.UNDEFINED);
        entity.client_type.set(dto.client_type ?? ClientType.COMPANY);
        entity.contact_person_email.set(dto.contact_person_email);
        entity.contact_person_name.set(dto.contact_person_name);
        entity.contact_person_phone.set(dto.contact_person_phone);
        entity.deleted_date.set(dto.deleted_date);
        entity.department.set(dto.department);
        entity.eurotransport_identifier.set(dto.eurotransport_identifier);
        entity.html_contact_page1.set(dto.html_contact_page1);
        entity.html_contact_page2.set(dto.html_contact_page2);
        entity.html_info_page.set(dto.html_info_page);
        entity.invite_delay_minutes.set(dto.invite_delay_minutes);
        entity.is_subentity.set(dto.is_subentity);
        entity.logo.set(dto.logo);
        entity.managers.set(dto.managers);
        entity.name.set(dto.name ?? "");
        entity.own_insurance.set(dto.own_insurance);
        entity.parent.set(dto.parent);
        entity.reminder_interval_minutes.set(dto.reminder_interval_minutes);
        entity.revel_identifier.set(dto.revel_identifier);
        entity.send_survey.set(dto.send_survey);
        entity.state.set(dto.state);
        entity.tags.set(dto.tags);
        return entity;
    }

    toDto(): ClientDto {
        return {
            id: this.id(),
            at_risk: this.at_risk(),
            billing_type: this.billing_type(),
            cif: this.cif(),
            client_group: this.client_group(),
            client_origin: this.client_origin(),
            client_type: this.client_type(),
            contact_person_email: this.contact_person_email(),
            contact_person_name: this.contact_person_name(),
            contact_person_phone: this.contact_person_phone(),
            deleted_date: this.deleted_date(),
            department: this.department(),
            eurotransport_identifier: this.eurotransport_identifier(),
            html_contact_page1: this.html_contact_page1(),
            html_contact_page2: this.html_contact_page2(),
            html_info_page: this.html_info_page(),
            invite_delay_minutes: this.invite_delay_minutes(),
            is_subentity: this.is_subentity(),
            logo: this.logo(),
            managers: this.managers(),
            name: this.name(),
            own_insurance: this.own_insurance(),
            parent: this.parent(),
            reminder_interval_minutes: this.reminder_interval_minutes(),
            revel_identifier: this.revel_identifier(),
            send_survey: this.send_survey(),
            state: this.state(),
            tags: this.tags(),
        };
    }

    copyFromDto(dto: Partial<ClientDto>): void {
    if (!Helpers.isEmpty(dto.id)) this.id.set(dto.id!);
    if (!Helpers.isEmpty(dto.at_risk)) this.at_risk.set(dto.at_risk!);
    if (!Helpers.isEmpty(dto.billing_type)) this.billing_type.set(dto.billing_type!);
    if (!Helpers.isEmpty(dto.cif)) this.cif.set(dto.cif!);
    if (!Helpers.isEmpty(dto.client_group)) this.client_group.set(dto.client_group!);
    if (!Helpers.isEmpty(dto.client_origin)) this.client_origin.set(dto.client_origin!);
    if (!Helpers.isEmpty(dto.client_type)) this.client_type.set(dto.client_type!);
    if (!Helpers.isEmpty(dto.contact_person_email)) this.contact_person_email.set(dto.contact_person_email!);
    if (!Helpers.isEmpty(dto.contact_person_name)) this.contact_person_name.set(dto.contact_person_name!);
    if (!Helpers.isEmpty(dto.contact_person_phone)) this.contact_person_phone.set(dto.contact_person_phone!);
    if (!Helpers.isEmpty(dto.deleted_date)) this.deleted_date.set(dto.deleted_date!);
    if (!Helpers.isEmpty(dto.department)) this.department.set(dto.department!);
    if (!Helpers.isEmpty(dto.eurotransport_identifier)) this.eurotransport_identifier.set(dto.eurotransport_identifier!);
    if (!Helpers.isEmpty(dto.html_contact_page1)) this.html_contact_page1.set(dto.html_contact_page1!);
    if (!Helpers.isEmpty(dto.html_contact_page2)) this.html_contact_page2.set(dto.html_contact_page2!);
    if (!Helpers.isEmpty(dto.html_info_page)) this.html_info_page.set(dto.html_info_page!);
    if (!Helpers.isEmpty(dto.invite_delay_minutes)) this.invite_delay_minutes.set(dto.invite_delay_minutes!);
    if (!Helpers.isEmpty(dto.is_subentity)) this.is_subentity.set(dto.is_subentity!);
    if (!Helpers.isEmpty(dto.logo)) this.logo.set(dto.logo!);
    if (!Helpers.isEmpty(dto.managers)) this.managers.set(dto.managers!);
    if (!Helpers.isEmpty(dto.name)) this.name.set(dto.name!);
    if (!Helpers.isEmpty(dto.own_insurance)) this.own_insurance.set(dto.own_insurance!);
    if (!Helpers.isEmpty(dto.parent)) this.parent.set(dto.parent!);
    if (!Helpers.isEmpty(dto.reminder_interval_minutes)) this.reminder_interval_minutes.set(dto.reminder_interval_minutes!);
    if (!Helpers.isEmpty(dto.revel_identifier)) this.revel_identifier.set(dto.revel_identifier!);
    if (!Helpers.isEmpty(dto.send_survey)) this.send_survey.set(dto.send_survey!);
    if (!Helpers.isEmpty(dto.state)) this.state.set(dto.state!);
    if (!Helpers.isEmpty(dto.tags)) this.tags.set(dto.tags!);
    }

    toPatch<T>(): Partial<T> {
        const patch: Partial<T> = {};
        if (!Helpers.isEmptyOrZero(this.id())) (patch as any).id = this.id();
        if (!Helpers.isEmptyOrZero(this.at_risk())) (patch as any).at_risk = this.at_risk();
        if (!Helpers.isEmptyOrZero(this.billing_type())) (patch as any).billing_type = this.billing_type();
        if (!Helpers.isEmptyOrZero(this.cif())) (patch as any).cif = this.cif();
        if (!Helpers.isEmptyOrZero(this.client_group())) (patch as any).client_group = this.client_group();
        if (!Helpers.isEmptyOrZero(this.client_origin())) (patch as any).client_origin = this.client_origin();
        if (!Helpers.isEmptyOrZero(this.client_type())) (patch as any).client_type = this.client_type();
        if (!Helpers.isEmptyOrZero(this.contact_person_email())) (patch as any).contact_person_email = this.contact_person_email();
        if (!Helpers.isEmptyOrZero(this.contact_person_name())) (patch as any).contact_person_name = this.contact_person_name();
        if (!Helpers.isEmptyOrZero(this.contact_person_phone())) (patch as any).contact_person_phone = this.contact_person_phone();
        if (!Helpers.isEmptyOrZero(this.deleted_date())) (patch as any).deleted_date = this.deleted_date();
        if (!Helpers.isEmptyOrZero(this.department())) (patch as any).department = this.department();
        if (!Helpers.isEmptyOrZero(this.eurotransport_identifier())) (patch as any).eurotransport_identifier = this.eurotransport_identifier();
        if (!Helpers.isEmptyOrZero(this.html_contact_page1())) (patch as any).html_contact_page1 = this.html_contact_page1();
        if (!Helpers.isEmptyOrZero(this.html_contact_page2())) (patch as any).html_contact_page2 = this.html_contact_page2();
        if (!Helpers.isEmptyOrZero(this.html_info_page())) (patch as any).html_info_page = this.html_info_page();
        if (!Helpers.isEmptyOrZero(this.invite_delay_minutes())) (patch as any).invite_delay_minutes = this.invite_delay_minutes();
        if (!Helpers.isEmptyOrZero(this.is_subentity())) (patch as any).is_subentity = this.is_subentity();
        if (!Helpers.isEmptyOrZero(this.logo())) (patch as any).logo = this.logo();
        if (!Helpers.isEmptyOrZero(this.managers())) (patch as any).managers = this.managers();
        if (!Helpers.isEmptyOrZero(this.name())) (patch as any).name = this.name();
        if (!Helpers.isEmptyOrZero(this.own_insurance())) (patch as any).own_insurance = this.own_insurance();
        if (!Helpers.isEmptyOrZero(this.parent())) (patch as any).parent = this.parent();
        if (!Helpers.isEmptyOrZero(this.reminder_interval_minutes())) (patch as any).reminder_interval_minutes = this.reminder_interval_minutes();
        if (!Helpers.isEmptyOrZero(this.revel_identifier())) (patch as any).revel_identifier = this.revel_identifier();
        if (!Helpers.isEmptyOrZero(this.send_survey())) (patch as any).send_survey = this.send_survey();
        if (!Helpers.isEmptyOrZero(this.state())) (patch as any).state = this.state();
        if (!Helpers.isEmptyOrZero(this.tags())) (patch as any).tags = this.tags();
        return patch;
    }
}


export class ClientsGroupEntity {
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
        entity.id.set(dto.id);
        entity.assigned_admins.set(dto.assigned_admins ?? []);
        entity.country.set(dto.country ?? "");
        entity.name.set(dto.name ?? "");
        return entity;
    }

    toDto(): ClientsGroupCreateRequest & { id?: number } {
        return {
            id: this.id(),
            assigned_admins: this.assigned_admins(),
            country: this.country(),
            name: this.name(),
        };
    }

    copyFromDto(dto: Partial<ClientsGroupCreateRequest> & { id?: number }): void {
        this.id.set(dto.id != null ? dto.id : this.id());
        this.assigned_admins.set(dto.assigned_admins != null ? dto.assigned_admins : this.assigned_admins());
        this.country.set(dto.country != null ? dto.country : this.country());
        this.name.set(dto.name != null ? dto.name : this.name());
    }

    toPatch<T>(): Partial<T> {
        const defaults = new ClientsGroupEntity();
        const patch: Partial<T> = {};
        //if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (JSON.stringify(this.assigned_admins()) !== JSON.stringify(defaults.assigned_admins())) (patch as any).assigned_admins = this.assigned_admins();
        if (this.country() !== defaults.country()) (patch as any).country = this.country();
        if (this.name() !== defaults.name()) (patch as any).name = this.name();
        return patch;
    }
}


export class DocumentTemplateTransportEntity {
    application_time = signal<DirectionType | undefined>(undefined);
    client = signal<number | undefined>(undefined);
    file = signal<string | null | undefined>(undefined);
    id = signal<number | undefined>(undefined);
    link = signal<string | undefined>(undefined);
    title = signal<string | undefined>(undefined);
    transport_principal_type = signal<TransportPrincipalType | undefined>(undefined);

    static fromDto(dto: DocumentsClientsDto): DocumentTemplateTransportEntity {
        const entity = new DocumentTemplateTransportEntity();
        entity.application_time.set(dto.application_time);
        entity.client.set(dto.client);
        entity.file.set(dto.file);
        entity.id.set(dto.id);
        entity.link.set(dto.link);
        entity.title.set(dto.title);
        entity.transport_principal_type.set(dto.transport_principal_type);
        return entity;
    }

    toDto(): DocumentsClientsDto {
        return {
            application_time: this.application_time(),
            client: this.client()!,
            file: this.file(),
            id: this.id()!,
            link: this.link(),
            title: this.title(),
            transport_principal_type: this.transport_principal_type()!,
        };
    }

    copyFromDto(dto: Partial<DocumentsClientsDto>): void {
        if (dto.application_time != undefined) this.application_time.set(dto.application_time);
        if (dto.client != undefined) this.client.set(dto.client);
        if (dto.file != undefined) this.file.set(dto.file);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.link != undefined) this.link.set(dto.link);
        if (dto.title != undefined) this.title.set(dto.title);
        if (dto.transport_principal_type != undefined) this.transport_principal_type.set(dto.transport_principal_type);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new DocumentTemplateTransportEntity();
        const patch: Partial<T> = {};
        if (this.application_time() !== defaults.application_time()) (patch as any).application_time = this.application_time();
        if (this.client() !== defaults.client()) (patch as any).client = this.client();
        if (this.file() !== defaults.file()) (patch as any).file = this.file();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.link() !== defaults.link()) (patch as any).link = this.link();
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        if (this.transport_principal_type() !== defaults.transport_principal_type()) (patch as any).transport_principal_type = this.transport_principal_type();
        return patch;
    }
}



export class BaseBillingAccountEntity {
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
        entity.id.set(dto.id);
        entity.state.set(dto.state);
        entity.created_date.set(dto.created_date);
        entity.modified_date.set(dto.modified_date);
        entity.deleted_date.set(dto.deleted_date);
        entity.iban.set(dto.iban ?? "");
        entity.iva.set(dto.iva ?? "");
        entity.irpf.set(dto.irpf ?? "");
        entity.bic.set(dto.bic ?? "");
        entity.is_favourite.set(dto.is_favourite ?? false);
        return entity;
    }

    toDto(): BaseBillingAccountDto {
        return new BaseBillingAccountDto({
            id: this.id(),
            state: this.state(),
            created_date: this.created_date(),
            modified_date: this.modified_date(),
            deleted_date: this.deleted_date(),
            iban: this.iban(),
            iva: this.iva(),
            irpf: this.irpf(),
            bic: this.bic(),
            is_favourite: this.is_favourite(),
        });
    }

    copyFromDto(dto: Partial<BaseBillingAccountDto>): void {
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.state != undefined) this.state.set(dto.state);
        if (dto.created_date != undefined) this.created_date.set(dto.created_date);
        if (dto.modified_date != undefined) this.modified_date.set(dto.modified_date);
        if (dto.deleted_date != undefined) this.deleted_date.set(dto.deleted_date);
        if (dto.iban != undefined) this.iban.set(dto.iban);
        if (dto.iva != undefined) this.iva.set(dto.iva);
        if (dto.irpf != undefined) this.irpf.set(dto.irpf);
        if (dto.bic != undefined) this.bic.set(dto.bic);
        if (dto.is_favourite != undefined) this.is_favourite.set(dto.is_favourite);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new BaseBillingAccountEntity();
        const patch: Partial<T> = {};
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.state() !== defaults.state()) (patch as any).state = this.state();
        if (this.created_date() !== defaults.created_date()) (patch as any).created_date = this.created_date();
        if (this.modified_date() !== defaults.modified_date()) (patch as any).modified_date = this.modified_date();
        if (this.deleted_date() !== defaults.deleted_date()) (patch as any).deleted_date = this.deleted_date();
        if (this.iban() !== defaults.iban()) (patch as any).iban = this.iban();
        if (this.iva() !== defaults.iva()) (patch as any).iva = this.iva();
        if (this.irpf() !== defaults.irpf()) (patch as any).irpf = this.irpf();
        if (this.bic() !== defaults.bic()) (patch as any).bic = this.bic();
        if (this.is_favourite() !== defaults.is_favourite()) (patch as any).is_favourite = this.is_favourite();
        return patch;
    }
}

export class ClientBillingAccountEntity extends BaseBillingAccountEntity {
   
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

    static override fromDto(dto: ClientBillingAccountDto): ClientBillingAccountEntity {
        const entity = new ClientBillingAccountEntity();
        // Llama a copyFromDto para heredar la lógica base
        entity.copyFromDto(dto);
        if (dto.business_name != undefined) entity.business_name.set(dto.business_name);
        if (dto.entity_number != undefined) entity.entity_number.set(dto.entity_number);
        if (dto.document != undefined) entity.document.set(dto.document);
        if (dto.document_type != undefined) entity.document_type.set(dto.document_type);
        if (dto.address != undefined) entity.address.set(dto.address);
        if (dto.address_complement != undefined) entity.address_complement.set(dto.address_complement);
        if (dto.postal_code != undefined) entity.postal_code.set(dto.postal_code);
        if (dto.country != undefined) entity.country.set(dto.country);
        if (dto.city != undefined) entity.city.set(dto.city);
        if (dto.email_send_invoice != undefined) entity.email_send_invoice.set(dto.email_send_invoice);
        if (dto.phone != undefined) entity.phone.set(dto.phone);
        if (dto.expire_period_days != undefined) entity.expire_period_days.set(dto.expire_period_days);
        if (dto.client != undefined) entity.client.set(dto.client);
        if (dto.eurotransport_identifier != undefined) entity.eurotransport_identifier.set(dto.eurotransport_identifier);
        if (dto.revel_identifier != undefined) entity.revel_identifier.set(dto.revel_identifier);
        return entity;
    }

    override toDto(): ClientBillingAccountDto {
        return new ClientBillingAccountDto({
            ...super.toDto(),
            business_name: this.business_name(),
            entity_number: this.entity_number(),
            document: this.document(),
            document_type: this.document_type(),
            address: this.address(),
            address_complement: this.address_complement(),
            postal_code: this.postal_code(),
            country: this.country(),
            city: this.city(),
            email_send_invoice: this.email_send_invoice(),
            phone: this.phone(),
            expire_period_days: this.expire_period_days(),
            client: this.client(),
            eurotransport_identifier: this.eurotransport_identifier(),
            revel_identifier: this.revel_identifier(),
        });
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
    override copyFromDto(dto: Partial<ClientBillingAccountDto>): void {
        super.copyFromDto(dto);
        if (dto.business_name != undefined) this.business_name.set(dto.business_name);
        if (dto.entity_number != undefined) this.entity_number.set(dto.entity_number);
        if (dto.document != undefined) this.document.set(dto.document);
        if (dto.document_type != undefined) this.document_type.set(dto.document_type);
        if (dto.address != undefined) this.address.set(dto.address);
        if (dto.address_complement != undefined) this.address_complement.set(dto.address_complement);
        if (dto.postal_code != undefined) this.postal_code.set(dto.postal_code);
        if (dto.country != undefined) this.country.set(dto.country);
        if (dto.city != undefined) this.city.set(dto.city);
        if (dto.email_send_invoice != undefined) this.email_send_invoice.set(dto.email_send_invoice);
        if (dto.phone != undefined) this.phone.set(dto.phone);
        if (dto.expire_period_days != undefined) this.expire_period_days.set(dto.expire_period_days);
        if (dto.client != undefined) this.client.set(dto.client);
        if (dto.eurotransport_identifier != undefined) this.eurotransport_identifier.set(dto.eurotransport_identifier);
        if (dto.revel_identifier != undefined) this.revel_identifier.set(dto.revel_identifier);
    }

    override toPatch<T>(): Partial<T> {
        const defaults = new ClientBillingAccountEntity();
        const patch: Partial<T> = { ...super.toPatch<T>() };
        if (this.business_name() !== defaults.business_name()) (patch as any).business_name = this.business_name();
        if (this.entity_number() !== defaults.entity_number()) (patch as any).entity_number = this.entity_number();
        if (this.document() !== defaults.document()) (patch as any).document = this.document();
        if (this.document_type() !== defaults.document_type()) (patch as any).document_type = this.document_type();
        if (this.address() !== defaults.address()) (patch as any).address = this.address();
        if (this.address_complement() !== defaults.address_complement()) (patch as any).address_complement = this.address_complement();
        if (this.postal_code() !== defaults.postal_code()) (patch as any).postal_code = this.postal_code();
        if (this.country() !== defaults.country()) (patch as any).country = this.country();
        if (this.city() !== defaults.city()) (patch as any).city = this.city();
        if (this.email_send_invoice() !== defaults.email_send_invoice()) (patch as any).email_send_invoice = this.email_send_invoice();
        if (this.phone() !== defaults.phone()) (patch as any).phone = this.phone();
        if (this.expire_period_days() !== defaults.expire_period_days()) (patch as any).expire_period_days = this.expire_period_days();
        if (this.client() !== defaults.client()) (patch as any).client = this.client();
        if (this.eurotransport_identifier() !== defaults.eurotransport_identifier()) (patch as any).eurotransport_identifier = this.eurotransport_identifier();
        if (this.revel_identifier() !== defaults.revel_identifier()) (patch as any).revel_identifier = this.revel_identifier();
        return patch;
    }
}

export class DistanceBracketRuleEntity {
    big_vehicle_price = signal<number | null | undefined>(undefined);
    id = signal<number | undefined>(undefined);
    max_km = signal<number>(0);
    min_km = signal<number | undefined>(undefined);
    pricing_type = signal<PricingType | undefined>(undefined);
    small_vehicle_price = signal<number | null | undefined>(undefined);
    standard_price = signal<number>(0);

    static fromDto(dto: DistanceBracketRule): DistanceBracketRuleEntity {
        const entity = new DistanceBracketRuleEntity();
        entity.big_vehicle_price.set(dto.big_vehicle_price);
        entity.id.set(dto.id);
        entity.max_km.set(dto.max_km ?? 0);
        entity.min_km.set(dto.min_km);
        entity.pricing_type.set(dto.pricing_type);
        entity.small_vehicle_price.set(dto.small_vehicle_price);
        entity.standard_price.set(dto.standard_price ?? 0);
        return entity;
    }

    toDto(): DistanceBracketRule {
        return {
            big_vehicle_price: this.big_vehicle_price(),
            id: this.id(),
            max_km: this.max_km(),
            min_km: this.min_km(),
            pricing_type: this.pricing_type(),
            small_vehicle_price: this.small_vehicle_price(),
            standard_price: this.standard_price(),
        };
    }

    copyFromDto(dto: Partial<DistanceBracketRule>): void {
        if (dto.big_vehicle_price != undefined) this.big_vehicle_price.set(dto.big_vehicle_price);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.max_km != undefined) this.max_km.set(dto.max_km);
        if (dto.min_km != undefined) this.min_km.set(dto.min_km);
        if (dto.pricing_type != undefined) this.pricing_type.set(dto.pricing_type);
        if (dto.small_vehicle_price != undefined) this.small_vehicle_price.set(dto.small_vehicle_price);
        if (dto.standard_price != undefined) this.standard_price.set(dto.standard_price);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new DistanceBracketRuleEntity();
        const patch: Partial<T> = {};
        if (this.big_vehicle_price() !== defaults.big_vehicle_price()) (patch as any).big_vehicle_price = this.big_vehicle_price();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.max_km() !== defaults.max_km()) (patch as any).max_km = this.max_km();
        if (this.min_km() !== defaults.min_km()) (patch as any).min_km = this.min_km();
        if (this.pricing_type() !== defaults.pricing_type()) (patch as any).pricing_type = this.pricing_type();
        if (this.small_vehicle_price() !== defaults.small_vehicle_price()) (patch as any).small_vehicle_price = this.small_vehicle_price();
        if (this.standard_price() !== defaults.standard_price()) (patch as any).standard_price = this.standard_price();
        return patch;
    }
}

export class PriceRulesEntity {
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
        entity.charging_requires_ticket.set(dto.charging_requires_ticket);
        entity.client.set(dto.client);
        entity.client_charging_price.set(dto.client_charging_price);
        entity.client_fuel_price.set(dto.client_fuel_price);
        entity.distance_brackets.set((dto.distance_brackets || []).map(d => DistanceBracketRuleEntity.fromDto(d)));
        entity.driver_charging_price.set(dto.driver_charging_price);
        entity.driver_fuel_price.set(dto.driver_fuel_price);
        entity.express_surcharge_percentage.set(dto.express_surcharge_percentage);
        entity.ferry_fixed_cost.set(dto.ferry_fixed_cost);
        entity.id.set(dto.id);
        entity.is_fuel_included.set(dto.is_fuel_included);
        entity.stage_discount_percentage.set(dto.stage_discount_percentage);
        entity.transport.set(dto.transport);
        return entity;
    }

    toDto(): PriceRulesClientDto {
        return {
            charging_requires_ticket: this.charging_requires_ticket(),
            client: this.client(),
            client_charging_price: this.client_charging_price(),
            client_fuel_price: this.client_fuel_price(),
            distance_brackets: this.distance_brackets().map(d => d.toDto()),
            driver_charging_price: this.driver_charging_price(),
            driver_fuel_price: this.driver_fuel_price(),
            express_surcharge_percentage: this.express_surcharge_percentage(),
            ferry_fixed_cost: this.ferry_fixed_cost(),
            id: this.id(),
            is_fuel_included: this.is_fuel_included(),
            stage_discount_percentage: this.stage_discount_percentage(),
            transport: this.transport(),
        };
    }

    copyFromDto(dto: Partial<PriceRulesClientDto>): void {
        if (dto.charging_requires_ticket != undefined) this.charging_requires_ticket.set(dto.charging_requires_ticket);
        if (dto.client != undefined) this.client.set(dto.client);
        if (dto.client_charging_price != undefined) this.client_charging_price.set(dto.client_charging_price);
        if (dto.client_fuel_price != undefined) this.client_fuel_price.set(dto.client_fuel_price);
        if (dto.distance_brackets != undefined) this.distance_brackets.set(dto.distance_brackets.map(d => DistanceBracketRuleEntity.fromDto(d)));
        if (dto.driver_charging_price != undefined) this.driver_charging_price.set(dto.driver_charging_price);
        if (dto.driver_fuel_price != undefined) this.driver_fuel_price.set(dto.driver_fuel_price);
        if (dto.express_surcharge_percentage != undefined) this.express_surcharge_percentage.set(dto.express_surcharge_percentage);
        if (dto.ferry_fixed_cost != undefined) this.ferry_fixed_cost.set(dto.ferry_fixed_cost);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.is_fuel_included != undefined) this.is_fuel_included.set(dto.is_fuel_included);
        if (dto.stage_discount_percentage != undefined) this.stage_discount_percentage.set(dto.stage_discount_percentage);
        if (dto.transport != undefined) this.transport.set(dto.transport);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new PriceRulesEntity();
        const patch: Partial<T> = {};
        if (this.charging_requires_ticket() !== defaults.charging_requires_ticket()) (patch as any).charging_requires_ticket = this.charging_requires_ticket();
        if (this.client() !== defaults.client()) (patch as any).client = this.client();
        if (this.client_charging_price() !== defaults.client_charging_price()) (patch as any).client_charging_price = this.client_charging_price();
        if (this.client_fuel_price() !== defaults.client_fuel_price()) (patch as any).client_fuel_price = this.client_fuel_price();
        if (JSON.stringify(this.distance_brackets()) !== JSON.stringify(defaults.distance_brackets())) (patch as any).distance_brackets = this.distance_brackets().map(d => d.toDto());
        if (this.driver_charging_price() !== defaults.driver_charging_price()) (patch as any).driver_charging_price = this.driver_charging_price();
        if (this.driver_fuel_price() !== defaults.driver_fuel_price()) (patch as any).driver_fuel_price = this.driver_fuel_price();
        if (this.express_surcharge_percentage() !== defaults.express_surcharge_percentage()) (patch as any).express_surcharge_percentage = this.express_surcharge_percentage();
        if (this.ferry_fixed_cost() !== defaults.ferry_fixed_cost()) (patch as any).ferry_fixed_cost = this.ferry_fixed_cost();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.is_fuel_included() !== defaults.is_fuel_included()) (patch as any).is_fuel_included = this.is_fuel_included();
        if (this.stage_discount_percentage() !== defaults.stage_discount_percentage()) (patch as any).stage_discount_percentage = this.stage_discount_percentage();
        if (this.transport() !== defaults.transport()) (patch as any).transport = this.transport();
        return patch;
    }
}