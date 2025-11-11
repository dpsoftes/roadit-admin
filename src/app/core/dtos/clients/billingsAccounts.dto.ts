export class BaseEntity {
    // Asumo que esta clase maneja 'id', 'state', 'created_date', 'modified_date', 'deleted_date'.
    id?: number;
    state?: boolean;
    created_date?: Date | null;
    modified_date?: Date | null;
    deleted_date?: Date | null;

    constructor(data: any = {}) {
        this.id = data.id;
        this.state = data.state;
        this.created_date = data.created_date;
        this.modified_date = data.modified_date;
        this.deleted_date = data.deleted_date;
    }

    toJson(): any {
        return {
            id: this.id,
            state: this.state,
            created_date: this.created_date,
            modified_date: this.modified_date,
            deleted_date: this.deleted_date
        };
    }
    // NOTA: BaseEntity no estaba definida, se incluye una versión simple para contexto.
}

export class BaseBillingAccountDto extends BaseEntity {
    // PROPIEDADES CORREGIDAS A minúsculas (iban, iva, irpf, bic) para coincidir con el JSON
    iban: string;
    iva: string;
    irpf: string;
    bic: string;
    is_favourite: boolean;

    constructor(data: any = {}) {
        super(data);
        this.iban = data.iban || ''; // Usando data.iban (minúsculas)
        this.iva = data.iva || '';   // Usando data.iva
        this.irpf = data.irpf || ''; // Usando data.irpf
        this.bic = data.bic || '';   // Usando data.bic
        this.is_favourite = data.is_favourite || false;
    }

    static fromJson(json: any): BaseBillingAccountDto {
        return new BaseBillingAccountDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            iban: this.iban,
            iva: this.iva,
            irpf: this.irpf,
            bic: this.bic,
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
    document: string;
    document_type: string;
    address: string;
    address_complement: string;
    postal_code: string;
    country: string;
    city: string;
    email_send_invoice: string;
    phone: string;
    expire_period_days: number | null;
    client: number;
    eurotransport_identifier: string;
    revel_identifier: string;

    constructor(data: any = {}) {
        super(data);
        this.business_name = data.business_name || '';
        this.entity_number = data.entity_number || '';
        this.document = data.document || '';
        this.document_type = data.document_type || '';
        this.address = data.address || '';
        this.address_complement = data.address_complement || '';
        this.postal_code = data.postal_code || '';
        this.country = data.country || '';
        this.city = data.city || '';
        this.email_send_invoice = data.email_send_invoice || '';
        this.phone = data.phone || '';
        this.expire_period_days = data.expire_period_days;
        this.client = data.client || 0;
        this.eurotransport_identifier = data.eurotransport_identifier || '';
        this.revel_identifier = data.revel_identifier || '';
    }

    static override fromJson(json: any): ClientBillingAccountDto {
        return new ClientBillingAccountDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            business_name: this.business_name,
            entity_number: this.entity_number,
            document: this.document,
            document_type: this.document_type,
            address: this.address,
            address_complement: this.address_complement,
            postal_code: this.postal_code,
            country: this.country,
            city: this.city,
            email_send_invoice: this.email_send_invoice,
            phone: this.phone,
            expire_period_days: this.expire_period_days,
            client: this.client,
            eurotransport_identifier: this.eurotransport_identifier,
            revel_identifier: this.revel_identifier
        };
    }

    override copyWith(updates: Partial<ClientBillingAccountDto>): ClientBillingAccountDto {
        return new ClientBillingAccountDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class BillingAccountItemDto {
    id: number;
    entity_number: string;
    business_name: string;
    document: string;
    city: string;
    email_send_invoice: string;
    irpf: string;
    expire_period_days: number;
    client: number;

    constructor(data: any = {}) {
        this.id = data.id ?? 0;
        this.entity_number = data.entity_number ?? '';
        this.business_name = data.business_name ?? '';
        this.document = data.document ?? '';
        this.city = data.city ?? '';
        this.email_send_invoice = data.email_send_invoice ?? '';
        this.irpf = data.irpf ?? '';
        this.expire_period_days = data.expire_period_days ?? -2147483648;
        this.client = data.client ?? 0;
    }

    static fromJson(json: any): BillingAccountItemDto {
        return new BillingAccountItemDto(json);
    }

    toJson(): any {
        return {
            id: this.id,
            entity_number: this.entity_number,
            business_name: this.business_name,
            document: this.document,
            city: this.city,
            email_send_invoice: this.email_send_invoice,
            irpf: this.irpf,
            expire_period_days: this.expire_period_days,
            client: this.client
        };
    }

    copyWith(updates: Partial<BillingAccountItemDto>): BillingAccountItemDto {
        return new BillingAccountItemDto({
            ...this.toJson(),
            ...updates
        });
    }
}