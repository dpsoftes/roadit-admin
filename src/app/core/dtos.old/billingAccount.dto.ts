import { BaseEntity } from './base.dto';

export class BaseBillingAccountDto extends BaseEntity {
    IBAN: string;
    IVA: string;
    IRPF: string;
    BIC: string;
    is_favourite: boolean;

    constructor(data: any = {}) {
        super(data);
        this.IBAN = data.IBAN || '';
        this.IVA = data.IVA || '';
        this.IRPF = data.IRPF || '';
        this.BIC = data.BIC || '';
        this.is_favourite = data.is_favourite || false;
    }

    static fromJson(json: any): BaseBillingAccountDto {
        return new BaseBillingAccountDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            IBAN: this.IBAN,
            IVA: this.IVA,
            IRPF: this.IRPF,
            BIC: this.BIC,
            is_favourite: this.is_favourite
        };
    }

    copyWith(updates: Partial<BaseBillingAccountDto>): BaseBillingAccountDto {
        return new BaseBillingAccountDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ClientBillingAccountDto extends BaseBillingAccountDto {
    business_name: string;
    entity_number: string;
    cif_dni: string;
    address: string;
    address_complement: string;
    postal_code: string;
    country: string;
    city: string;
    email_send_invoice: string;
    phone: string;
    expire_period_days: number | null;
    client: number;

    constructor(data: any = {}) {
        super(data);
        this.business_name = data.business_name || '';
        this.entity_number = data.entity_number || '';
        this.cif_dni = data.cif_dni || '';
        this.address = data.address || '';
        this.address_complement = data.address_complement || '';
        this.postal_code = data.postal_code || '';
        this.country = data.country || '';
        this.city = data.city || '';
        this.email_send_invoice = data.email_send_invoice || '';
        this.phone = data.phone || '';
        this.expire_period_days = data.expire_period_days;
        this.client = data.client || 0;
    }

    static override fromJson(json: any): ClientBillingAccountDto {
        return new ClientBillingAccountDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            business_name: this.business_name,
            entity_number: this.entity_number,
            cif_dni: this.cif_dni,
            address: this.address,
            address_complement: this.address_complement,
            postal_code: this.postal_code,
            country: this.country,
            city: this.city,
            email_send_invoice: this.email_send_invoice,
            phone: this.phone,
            expire_period_days: this.expire_period_days,
            client: this.client
        };
    }

    override copyWith(updates: Partial<ClientBillingAccountDto>): ClientBillingAccountDto {
        return new ClientBillingAccountDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class DriverBillingAccountDto extends BaseBillingAccountDto {
    driver: string; // UUID

    constructor(data: any = {}) {
        super(data);
        this.driver = data.driver || '';
    }

    static override fromJson(json: any): DriverBillingAccountDto {
        return new DriverBillingAccountDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            driver: this.driver
        };
    }

    override copyWith(updates: Partial<DriverBillingAccountDto>): DriverBillingAccountDto {
        return new DriverBillingAccountDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateClientBillingAccountDto {
    IBAN: string;
    IVA?: string;
    IRPF?: string;
    BIC?: string;
    is_favourite?: boolean;
    business_name: string;
    entity_number?: string;
    cif_dni: string;
    address: string;
    address_complement?: string;
    postal_code: string;
    country: string;
    city: string;
    email_send_invoice: string;
    phone: string;
    expire_period_days?: number | null;
    client: number;

    constructor(data: any = {}) {
        this.IBAN = data.IBAN || '';
        this.IVA = data.IVA;
        this.IRPF = data.IRPF;
        this.BIC = data.BIC;
        this.is_favourite = data.is_favourite;
        this.business_name = data.business_name || '';
        this.entity_number = data.entity_number;
        this.cif_dni = data.cif_dni || '';
        this.address = data.address || '';
        this.address_complement = data.address_complement;
        this.postal_code = data.postal_code || '';
        this.country = data.country || '';
        this.city = data.city || '';
        this.email_send_invoice = data.email_send_invoice || '';
        this.phone = data.phone || '';
        this.expire_period_days = data.expire_period_days;
        this.client = data.client || 0;
    }

    static fromJson(json: any): CreateClientBillingAccountDto {
        return new CreateClientBillingAccountDto(json);
    }

    toJson(): any {
        return {
            IBAN: this.IBAN,
            IVA: this.IVA,
            IRPF: this.IRPF,
            BIC: this.BIC,
            is_favourite: this.is_favourite,
            business_name: this.business_name,
            entity_number: this.entity_number,
            cif_dni: this.cif_dni,
            address: this.address,
            address_complement: this.address_complement,
            postal_code: this.postal_code,
            country: this.country,
            city: this.city,
            email_send_invoice: this.email_send_invoice,
            phone: this.phone,
            expire_period_days: this.expire_period_days,
            client: this.client
        };
    }

    copyWith(updates: Partial<CreateClientBillingAccountDto>): CreateClientBillingAccountDto {
        return new CreateClientBillingAccountDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateDriverBillingAccountDto {
    IBAN: string;
    IVA?: string;
    IRPF?: string;
    BIC?: string;
    is_favourite?: boolean;
    driver: string; // UUID

    constructor(data: any = {}) {
        this.IBAN = data.IBAN || '';
        this.IVA = data.IVA;
        this.IRPF = data.IRPF;
        this.BIC = data.BIC;
        this.is_favourite = data.is_favourite;
        this.driver = data.driver || '';
    }

    static fromJson(json: any): CreateDriverBillingAccountDto {
        return new CreateDriverBillingAccountDto(json);
    }

    toJson(): any {
        return {
            IBAN: this.IBAN,
            IVA: this.IVA,
            IRPF: this.IRPF,
            BIC: this.BIC,
            is_favourite: this.is_favourite,
            driver: this.driver
        };
    }

    copyWith(updates: Partial<CreateDriverBillingAccountDto>): CreateDriverBillingAccountDto {
        return new CreateDriverBillingAccountDto({
            ...this.toJson(),
            ...updates
        });
    }
}


