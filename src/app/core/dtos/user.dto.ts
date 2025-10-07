/**
 * User DTO - Basado exactamente en CustomUserSerializer
 * Campos: username, email, name, last_name, role
 */

export class User {
    username: string;
    email: string;
    name?: string;
    last_name?: string;
    role?: string;

    constructor(data: any = {}) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.name = data.name;
        this.last_name = data.last_name;
        this.role = data.role;
    }

    static fromJson(json: any): User {
        return new User(json);
    }

    toJson(): any {
        return {
            username: this.username,
            email: this.email,
            name: this.name,
            last_name: this.last_name,
            role: this.role
        };
    }

    get fullName(): string {
        const parts = [this.name, this.last_name].filter(Boolean);
        return parts.join(' ');
    }
}

/**
 * CreateUserSerializer - Para crear usuarios
 * Campos: username, email, name, last_name, password, image
 */
export class CreateUserDto {
    username: string;
    email: string;
    name?: string;
    last_name?: string;
    password: string;
    image?: string;

    constructor(data: any = {}) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.name = data.name;
        this.last_name = data.last_name;
        this.password = data.password || '';
        this.image = data.image;
    }

    toJson(): any {
        return {
            username: this.username,
            email: this.email,
            name: this.name,
            last_name: this.last_name,
            password: this.password,
            image: this.image
        };
    }
}

/**
 * UpdateUserSerializer - Para actualizar usuarios
 * Campos: username, email, name, last_name
 */
export class UpdateUserDto {
    username: string;
    email: string;
    name?: string;
    last_name?: string;

    constructor(data: any = {}) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.name = data.name;
        this.last_name = data.last_name;
    }

    toJson(): any {
        return {
            username: this.username,
            email: this.email,
            name: this.name,
            last_name: this.last_name
        };
    }
}

/**
 * UserSerializer completo - Todos los campos (__all__)
 */
export class UserFullDto extends User {
    id?: number;
    phone?: string;
    image?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    last_login?: string;
    date_joined?: string;
    groups?: number[];
    user_permissions?: number[];

    constructor(data: any = {}) {
        super(data);
        this.id = data.id;
        this.phone = data.phone;
        this.image = data.image;
        this.is_active = data.is_active;
        this.is_staff = data.is_staff;
        this.is_superuser = data.is_superuser;
        this.last_login = data.last_login;
        this.date_joined = data.date_joined;
        this.groups = data.groups;
        this.user_permissions = data.user_permissions;
    }

    static override fromJson(json: any): UserFullDto {
        return new UserFullDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            id: this.id,
            phone: this.phone,
            image: this.image,
            is_active: this.is_active,
            is_staff: this.is_staff,
            is_superuser: this.is_superuser,
            last_login: this.last_login,
            date_joined: this.date_joined,
            groups: this.groups,
            user_permissions: this.user_permissions
        };
    }
}
