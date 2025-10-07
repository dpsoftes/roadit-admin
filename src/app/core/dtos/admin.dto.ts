import { Role } from '../enums/user.enum';

export class AdminMiniDto {
    id: string; // UUID
    username: string;
    email: string;
    name: string;
    last_name: string;
    roles: Role[];
    departments: string[];
    created_date: string;
    modified_date: string;
    state: boolean;

    constructor(data: any = {}) {
        this.id = data.id || '';
        this.username = data.username || '';
        this.email = data.email || '';
        this.name = data.name || '';
        this.last_name = data.last_name || '';
        this.roles = data.roles || [];
        this.departments = data.departments || [];
        this.created_date = data.created_date || '';
        this.modified_date = data.modified_date || '';
        this.state = data.state || false;
    }

    static fromJson(json: any): AdminMiniDto {
        return new AdminMiniDto(json);
    }

    toJson(): any {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            name: this.name,
            last_name: this.last_name,
            roles: this.roles,
            departments: this.departments,
            created_date: this.created_date,
            modified_date: this.modified_date,
            state: this.state
        };
    }

    copyWith(updates: Partial<AdminMiniDto>): AdminMiniDto {
        return new AdminMiniDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class AdminDto {
    id: string; // UUID
    username: string;
    email: string;
    phone: string;
    name: string;
    last_name: string;
    image: string | null;
    is_active: boolean;
    roles: Role[];
    departments: string[];
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
        this.roles = data.roles || [];
        this.departments = data.departments || [];
        this.created_date = data.created_date || '';
        this.modified_date = data.modified_date || '';
        this.state = data.state || false;
    }

    static fromJson(json: any): AdminDto {
        return new AdminDto(json);
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
            roles: this.roles,
            departments: this.departments,
            created_date: this.created_date,
            modified_date: this.modified_date,
            state: this.state
        };
    }

    copyWith(updates: Partial<AdminDto>): AdminDto {
        return new AdminDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateAdminDto {
    username: string;
    email: string;
    phone?: string;
    name: string;
    last_name: string;
    image?: File | null;
    is_active?: boolean;
    roles?: Role[];
    departments?: string[];
    password: string;
    password_confirmation: string;

    constructor(data: any = {}) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.phone = data.phone;
        this.name = data.name || '';
        this.last_name = data.last_name || '';
        this.image = data.image;
        this.is_active = data.is_active;
        this.roles = data.roles;
        this.departments = data.departments;
        this.password = data.password || '';
        this.password_confirmation = data.password_confirmation || '';
    }

    static fromJson(json: any): CreateAdminDto {
        return new CreateAdminDto(json);
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
            roles: this.roles,
            departments: this.departments,
            password: this.password,
            password_confirmation: this.password_confirmation
        };
    }

    copyWith(updates: Partial<CreateAdminDto>): CreateAdminDto {
        return new CreateAdminDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class UpdateAdminDto {
    username?: string;
    email?: string;
    phone?: string;
    name?: string;
    last_name?: string;
    image?: File | null;
    is_active?: boolean;
    roles?: Role[];
    departments?: string[];
    password?: string;
    password_confirmation?: string;

    constructor(data: any = {}) {
        this.username = data.username;
        this.email = data.email;
        this.phone = data.phone;
        this.name = data.name;
        this.last_name = data.last_name;
        this.image = data.image;
        this.is_active = data.is_active;
        this.roles = data.roles;
        this.departments = data.departments;
        this.password = data.password;
        this.password_confirmation = data.password_confirmation;
    }

    static fromJson(json: any): UpdateAdminDto {
        return new UpdateAdminDto(json);
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
            roles: this.roles,
            departments: this.departments,
            password: this.password,
            password_confirmation: this.password_confirmation
        };
    }

    copyWith(updates: Partial<UpdateAdminDto>): UpdateAdminDto {
        return new UpdateAdminDto({
            ...this.toJson(),
            ...updates
        });
    }
}