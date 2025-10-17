import { TagDto } from './tag.dto';

export class DriverDto {
    id: string; // UUID
    username: string;
    email: string;
    phone: string;
    name: string;
    last_name: string;
    image: string | null;
    is_active: boolean;
    dni: string;
    cif: string;
    validated: boolean;
    rating: number;
    city: string;
    province: string;
    postal_code: string;
    billing_blocked: boolean;
    transport_blocked: boolean;
    allows_access_location: boolean;
    tags: TagDto[];
    created_date: string;
    modified_date: string;
    state: boolean;

    constructor(data: any = {}) {
        this.id = data.id || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.name = data.name || '';
        this.last_name = data.last_name || '';
        this.image = data.image;
        this.is_active = data.is_active || false;
        this.dni = data.dni || '';
        this.cif = data.cif || '';
        this.validated = data.validated || false;
        this.rating = data.rating || 0;
        this.city = data.city || '';
        this.province = data.province || '';
        this.postal_code = data.postal_code || '';
        this.billing_blocked = data.billing_blocked || false;
        this.transport_blocked = data.transport_blocked || false;
        this.allows_access_location = data.allows_access_location || false;
        this.tags = (data.tags || []).map((tag: any) => TagDto.fromJson(tag));
        this.created_date = data.created_date || '';
        this.modified_date = data.modified_date || '';
        this.state = data.state || false;
    }

    static fromJson(json: any): DriverDto {
        return new DriverDto(json);
    }

    toJson(): any {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            phone: this.phone,
            name: this.name,
            last_name: this.last_name,
            image: this.image,
            is_active: this.is_active,
            dni: this.dni,
            cif: this.cif,
            validated: this.validated,
            rating: this.rating,
            city: this.city,
            province: this.province,
            postal_code: this.postal_code,
            billing_blocked: this.billing_blocked,
            transport_blocked: this.transport_blocked,
            allows_access_location: this.allows_access_location,
            tags: this.tags.map(tag => tag.toJson()),
            created_date: this.created_date,
            modified_date: this.modified_date,
            state: this.state
        };
    }

    copyWith(updates: Partial<DriverDto>): DriverDto {
        return new DriverDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateDriverDto {
    username?: string;
    email?: string;
    phone?: string;
    name: string;
    last_name: string;
    image?: File | null;
    is_active?: boolean;
    dni?: string;
    cif?: string;
    validated?: boolean;
    rating?: number;
    city?: string;
    province?: string;
    postal_code?: string;
    billing_blocked?: boolean;
    transport_blocked?: boolean;
    allows_access_location?: boolean;
    tag_ids?: number[];

    constructor(data: any = {}) {
        this.username = data.username;
        this.email = data.email;
        this.phone = data.phone;
        this.name = data.name || '';
        this.last_name = data.last_name || '';
        this.image = data.image;
        this.is_active = data.is_active;
        this.dni = data.dni;
        this.cif = data.cif;
        this.validated = data.validated;
        this.rating = data.rating;
        this.city = data.city;
        this.province = data.province;
        this.postal_code = data.postal_code;
        this.billing_blocked = data.billing_blocked;
        this.transport_blocked = data.transport_blocked;
        this.allows_access_location = data.allows_access_location;
        this.tag_ids = data.tag_ids;
    }

    static fromJson(json: any): CreateDriverDto {
        return new CreateDriverDto(json);
    }

    toJson(): any {
        return {
            username: this.username,
            email: this.email,
            phone: this.phone,
            name: this.name,
            last_name: this.last_name,
            image: this.image,
            is_active: this.is_active,
            dni: this.dni,
            cif: this.cif,
            validated: this.validated,
            rating: this.rating,
            city: this.city,
            province: this.province,
            postal_code: this.postal_code,
            billing_blocked: this.billing_blocked,
            transport_blocked: this.transport_blocked,
            allows_access_location: this.allows_access_location,
            tag_ids: this.tag_ids
        };
    }

    copyWith(updates: Partial<CreateDriverDto>): CreateDriverDto {
        return new CreateDriverDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class UpdateDriverDto {
    username?: string;
    email?: string;
    phone?: string;
    name?: string;
    last_name?: string;
    image?: File | null;
    is_active?: boolean;
    dni?: string;
    cif?: string;
    validated?: boolean;
    rating?: number;
    city?: string;
    province?: string;
    postal_code?: string;
    billing_blocked?: boolean;
    transport_blocked?: boolean;
    allows_access_location?: boolean;
    tag_ids?: number[];

    constructor(data: any = {}) {
        this.username = data.username;
        this.email = data.email;
        this.phone = data.phone;
        this.name = data.name;
        this.last_name = data.last_name;
        this.image = data.image;
        this.is_active = data.is_active;
        this.dni = data.dni;
        this.cif = data.cif;
        this.validated = data.validated;
        this.rating = data.rating;
        this.city = data.city;
        this.province = data.province;
        this.postal_code = data.postal_code;
        this.billing_blocked = data.billing_blocked;
        this.transport_blocked = data.transport_blocked;
        this.allows_access_location = data.allows_access_location;
        this.tag_ids = data.tag_ids;
    }

    static fromJson(json: any): UpdateDriverDto {
        return new UpdateDriverDto(json);
    }

    toJson(): any {
        return {
            username: this.username,
            email: this.email,
            phone: this.phone,
            name: this.name,
            last_name: this.last_name,
            image: this.image,
            is_active: this.is_active,
            dni: this.dni,
            cif: this.cif,
            validated: this.validated,
            rating: this.rating,
            city: this.city,
            province: this.province,
            postal_code: this.postal_code,
            billing_blocked: this.billing_blocked,
            transport_blocked: this.transport_blocked,
            allows_access_location: this.allows_access_location,
            tag_ids: this.tag_ids
        };
    }

    copyWith(updates: Partial<UpdateDriverDto>): UpdateDriverDto {
        return new UpdateDriverDto({
            ...this.toJson(),
            ...updates
        });
    }
}