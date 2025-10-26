import { signal, Signal } from '@angular/core';
import { BillingType, ClientOrigin, ClientType } from '@dtos/clients.dto';
import { ClientsGroupCreateRequest } from '@dtos/clients.dto';
import { ClientsCreateRequest } from '@dtos/clients.dto';

export class ClientsGralEntity {
    /**
     * Identificador único
     */
    id = signal<number | undefined>(undefined);
    /**
     * Fecha de creación
     */
    created_date = signal<Date | null | undefined>(undefined);
    at_risk = signal<boolean>(false);
    /**
     * Tipo de facturación
     */
    billing_type = signal<BillingType>(BillingType.Manual);
    cif = signal<string>("");
    /**
     * Grupo cliente
     */
    client_group = signal<number>(0);
    /**
     * Origen del cliente
     */
    client_origin = signal<ClientOrigin>(ClientOrigin.Undefined);
    /**
     * Tipo de cliente
     */
    client_type = signal<ClientType>(ClientType.Company);
    contact_person_email = signal<string>("");
    /**
     * Nombre de la persona de contacto
     */
    contact_person_name = signal<string>("");
    /**
     * Teléfono de la persona de contacto
     */
    contact_person_phone = signal<string>("");
    /**
     * Fecha de Eliminación
     */
    deleted_date = signal<Date>(new Date(0));
    /**
     * Departamento
     */
    department = signal<string>("");
    /**
     * Identificador Eurotransport
     */
    eurotransport_identifier = signal<string>("");
    /**
     * Tiene seguro
     */
    has_insurance = signal<boolean>(false);
    /**
     * Página de contacto 1
     */
    html_contact_page1 = signal<string>("");
    /**
     * Página de contacto 2
     */
    html_contact_page2 = signal<string>("");
    /**
     * Página de información
     */
    html_info_page = signal<string>("");
    /**
     * Minutos de retraso en la invitación
     */
    invite_delay_minutes = signal<number>(0);
    is_subentity = signal<boolean>(false);
    logo = signal<string>("");
    managers = signal<number[]>([]);
    /**
     * Nombre
     */
    name = signal<string>("");
    own_insurance = signal<boolean>(false);
    /**
     * Cliente padre, Dejar vacío solo para clientes principales. Subclientes deben tener padre.
     */
    parent = signal<number>(0);
    /**
     * Minutos de recordatorio
     */
    reminder_interval_minutes = signal<number>(0);
    /**
     * Identificador Revel
     */
    revel_identifier = signal<string>("");
    /**
     * Enviar encuesta
     */
    send_survey = signal<boolean>(false);
    /**
     * Estado
     */
    state = signal<boolean>(false);
    tags = signal<number[]>([]);

    static fromDto(dto: ClientsCreateRequest): ClientsGralEntity {

        const entity = new ClientsGralEntity();
        entity.id.set(dto.id);
        entity.created_date.set(dto.created_date);
        entity.at_risk.set(dto.at_risk ?? false);
        entity.billing_type.set(dto.billing_type ?? BillingType.Manual);
        entity.cif.set(dto.cif ?? "");
        entity.client_group.set(dto.client_group ?? 0);
        entity.client_origin.set(dto.client_origin ?? ClientOrigin.Undefined);
        entity.client_type.set(dto.client_type ?? ClientType.Company);
        entity.contact_person_email.set(dto.contact_person_email ?? "");
        entity.contact_person_name.set(dto.contact_person_name ?? "");
        entity.contact_person_phone.set(dto.contact_person_phone ?? "");
        entity.deleted_date.set(dto.deleted_date ?? new Date(0));
        entity.department.set(dto.department ?? "");
        entity.eurotransport_identifier.set(dto.eurotransport_identifier ?? "");
        entity.has_insurance.set(dto.has_insurance ?? false);
        entity.html_contact_page1.set(dto.html_contact_page1 ?? "");
        entity.html_contact_page2.set(dto.html_contact_page2 ?? "");
        entity.html_info_page.set(dto.html_info_page ?? "");
        entity.invite_delay_minutes.set(dto.invite_delay_minutes ?? 0);
        entity.is_subentity.set(dto.is_subentity ?? false);
        entity.logo.set(dto.logo ?? "");
        entity.managers.set(dto.managers ?? []);
        entity.name.set(dto.name ?? "");
        entity.own_insurance.set(dto.own_insurance ?? false);
        entity.parent.set(dto.parent ?? 0);
        entity.reminder_interval_minutes.set(dto.reminder_interval_minutes ?? 0);
        entity.revel_identifier.set(dto.revel_identifier ?? "");
        entity.send_survey.set(dto.send_survey ?? false);
        entity.state.set(dto.state ?? false);
        entity.tags.set(dto.tags ?? []);
        return entity;
    }

    toDto(): ClientsCreateRequest {
            
        return {
            id: this.id(),
            created_date: this.created_date(),
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
            has_insurance: this.has_insurance(),
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

    copyFromDto(dto: ClientsCreateRequest): void {
    this.id.set(dto.id);
    this.created_date.set(dto.created_date);
        this.at_risk.set(dto.at_risk ?? false);
        this.billing_type.set(dto.billing_type ?? BillingType.Manual);
        this.cif.set(dto.cif ?? "");
        this.client_group.set(dto.client_group ?? 0);
        this.client_origin.set(dto.client_origin ?? ClientOrigin.Undefined);
        this.client_type.set(dto.client_type ?? ClientType.Company);
        this.contact_person_email.set(dto.contact_person_email ?? "");
        this.contact_person_name.set(dto.contact_person_name ?? "");
        this.contact_person_phone.set(dto.contact_person_phone ?? "");
        this.deleted_date.set(dto.deleted_date ?? new Date(0));
        this.department.set(dto.department ?? "");
        this.eurotransport_identifier.set(dto.eurotransport_identifier ?? "");
        this.has_insurance.set(dto.has_insurance ?? false);
        this.html_contact_page1.set(dto.html_contact_page1 ?? "");
        this.html_contact_page2.set(dto.html_contact_page2 ?? "");
        this.html_info_page.set(dto.html_info_page ?? "");
        this.invite_delay_minutes.set(dto.invite_delay_minutes ?? 0);
        this.is_subentity.set(dto.is_subentity ?? false);
        this.logo.set(dto.logo ?? "");
        this.managers.set(dto.managers ?? []);
        this.name.set(dto.name ?? "");
        this.own_insurance.set(dto.own_insurance ?? false);
        this.parent.set(dto.parent ?? 0);
        this.reminder_interval_minutes.set(dto.reminder_interval_minutes ?? 0);
        this.revel_identifier.set(dto.revel_identifier ?? "");
        this.send_survey.set(dto.send_survey ?? false);
        this.state.set(dto.state ?? false);
        this.tags.set(dto.tags ?? []);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new ClientsGralEntity();
        const patch: Partial<T> = {};
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if ((this.created_date() ?? null) !== (defaults.created_date() ?? null)) (patch as any).created_date = this.created_date();
        if (this.at_risk() !== defaults.at_risk()) (patch as any).at_risk = this.at_risk();
        if (this.billing_type() !== defaults.billing_type()) (patch as any).billing_type = this.billing_type();
        if (this.cif() !== defaults.cif()) (patch as any).cif = this.cif();
        if (this.client_group() !== defaults.client_group()) (patch as any).client_group = this.client_group();
        if (this.client_origin() !== defaults.client_origin()) (patch as any).client_origin = this.client_origin();
        if (this.client_type() !== defaults.client_type()) (patch as any).client_type = this.client_type();
        if (this.contact_person_email() !== defaults.contact_person_email()) (patch as any).contact_person_email = this.contact_person_email();
        if (this.contact_person_name() !== defaults.contact_person_name()) (patch as any).contact_person_name = this.contact_person_name();
        if (this.contact_person_phone() !== defaults.contact_person_phone()) (patch as any).contact_person_phone = this.contact_person_phone();
        if (this.deleted_date().getTime() !== defaults.deleted_date().getTime()) (patch as any).deleted_date = this.deleted_date();
        if (this.department() !== defaults.department()) (patch as any).department = this.department();
        if (this.eurotransport_identifier() !== defaults.eurotransport_identifier()) (patch as any).eurotransport_identifier = this.eurotransport_identifier();
        if (this.has_insurance() !== defaults.has_insurance()) (patch as any).has_insurance = this.has_insurance();
        if (this.html_contact_page1() !== defaults.html_contact_page1()) (patch as any).html_contact_page1 = this.html_contact_page1();
        if (this.html_contact_page2() !== defaults.html_contact_page2()) (patch as any).html_contact_page2 = this.html_contact_page2();
        if (this.html_info_page() !== defaults.html_info_page()) (patch as any).html_info_page = this.html_info_page();
        if (this.invite_delay_minutes() !== defaults.invite_delay_minutes()) (patch as any).invite_delay_minutes = this.invite_delay_minutes();
        if (this.is_subentity() !== defaults.is_subentity()) (patch as any).is_subentity = this.is_subentity();
        if (this.logo() !== defaults.logo()) (patch as any).logo = this.logo();
        if (JSON.stringify(this.managers()) !== JSON.stringify(defaults.managers())) (patch as any).managers = this.managers();
        if (this.name() !== defaults.name()) (patch as any).name = this.name();
        if (this.own_insurance() !== defaults.own_insurance()) (patch as any).own_insurance = this.own_insurance();
        if (this.parent() !== defaults.parent()) (patch as any).parent = this.parent();
        if (this.reminder_interval_minutes() !== defaults.reminder_interval_minutes()) (patch as any).reminder_interval_minutes = this.reminder_interval_minutes();
        if (this.revel_identifier() !== defaults.revel_identifier()) (patch as any).revel_identifier = this.revel_identifier();
        if (this.send_survey() !== defaults.send_survey()) (patch as any).send_survey = this.send_survey();
        if (this.state() !== defaults.state()) (patch as any).state = this.state();
        if (JSON.stringify(this.tags()) !== JSON.stringify(defaults.tags())) (patch as any).tags = this.tags();
        return patch;
    }
}



export class ClientsGroupEntity {
    assigned_admins = signal<number[]>([]);
    /**
     * País
     */
    country = signal<string>("");
    /**
     * Nombre
     */
    name = signal<string>("");

    static fromDto(dto: ClientsGroupCreateRequest): ClientsGroupEntity {
        const entity = new ClientsGroupEntity();
        entity.assigned_admins.set(dto.assigned_admins ?? []);
        entity.country.set(dto.country ?? "");
        entity.name.set(dto.name ?? "");
        return entity;
    }

    toDto(): ClientsGroupCreateRequest {
        return {
            assigned_admins: this.assigned_admins(),
            country: this.country(),
            name: this.name(),
        };
    }

    copyFromDto(dto: ClientsGroupCreateRequest): void {
        this.assigned_admins.set(dto.assigned_admins ?? []);
        this.country.set(dto.country ?? "");
        this.name.set(dto.name ?? "");
    }

    toPatch<T>(): Partial<T> {
        const defaults = new ClientsGroupEntity();
        const patch: Partial<T> = {};
        if (JSON.stringify(this.assigned_admins()) !== JSON.stringify(defaults.assigned_admins())) (patch as any).assigned_admins = this.assigned_admins();
        if (this.country() !== defaults.country()) (patch as any).country = this.country();
        if (this.name() !== defaults.name()) (patch as any).name = this.name();
        return patch;
    }
}