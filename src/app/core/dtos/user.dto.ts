/**
 * User DTO - Basado exactamente en CustomUserSerializer
 * Campos: username, email, name, last_name, role
 */

export class User {
    id: number;
    username: string;
    email: string;
    name: string;
    last_name: string;
    role: string;
    image: string | null;

    constructor(data: any = {}) {
        this.id = data.id;
        this.username = data.username || '';
        this.email = data.email || '';
        this.name = data.name || '';
        this.last_name = data.last_name || '';
        this.role = data.role || '';
        this.image = data.image ?? null;
    }

    static fromJson(json: any): User {
        return new User(json);
    }

    toJson(): any {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            name: this.name,
            last_name: this.last_name,
            role: this.role,
            image: this.image
        };
    }

    get fullName(): string {
        return `${this.name} ${this.last_name}`.trim();
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
export class UserFullDto  {
    /** Aceptó política de privacidad */
    accepted_privacy_policy?: boolean;
    /** Aceptó términos y condiciones */
    accepted_terms_and_conditions?: boolean;
    /** Fecha de nacimiento */
    born_date?: Date | null;
    /** Fecha de Creación */
    created_datetime: Date | null = null;
    /** Deshabilitado */
    disabled?: boolean;
    /** Correo electrónico */
    email: string;
    /** Grupos, Los grupos a los que pertenece este usuario. */
    groups?: number[];
    /** ID */
    id: number;
    /** Imagen de perfil */
    image?: null | string;
    /** Activo */
    is_active?: boolean;
    /** Es staff */
    is_staff?: boolean;
    /** Estado de superusuario */
    is_superuser?: boolean;
    /** Último inicio de sesión */
    last_login?: Date | null;
    /** Apellido */
    last_name?: null | string;
    /** Nombre */
    name?: null | string;
    /** Contraseña */
    password: string;
    /** Teléfono */
    phone?: null | string;
    /** Permisos de usuario */
    user_permissions?: number[];
    /** Nombre de Usuario */
    username: string;
    [property: string]: any;

    constructor(data: any = {}) {
        this.accepted_privacy_policy = data.accepted_privacy_policy;
        this.accepted_terms_and_conditions = data.accepted_terms_and_conditions;
        this.born_date = data.born_date ? new Date(data.born_date) : null;
        this.created_datetime = data.created_datetime ? new Date(data.created_datetime) : null;
        this.disabled = data.disabled;
        this.email = data.email || '';
        this.groups = data.groups;
        this.id = data.id;
        this.image = data.image;
        this.is_active = data.is_active;
        this.is_staff = data.is_staff;
        this.is_superuser = data.is_superuser;
        this.last_login = data.last_login ? new Date(data.last_login) : null;
        this.last_name = data.last_name;
        this.name = data.name;
        this.password = data.password || '';
        this.phone = data.phone;
        this.user_permissions = data.user_permissions;
        this.username = data.username || '';
        // Copia cualquier otra propiedad adicional
        Object.keys(data).forEach(key => {
            if (!(key in this)) {
                this[key] = data[key];
            }
        });
    }

    static fromJson(json: any): UserFullDto {
        return new UserFullDto(json);
    }

    toJson(): any {
        return {
            accepted_privacy_policy: this.accepted_privacy_policy,
            accepted_terms_and_conditions: this.accepted_terms_and_conditions,
            born_date: this.born_date ? this.born_date.toISOString() : null,
            created_datetime: this.created_datetime ? this.created_datetime.toISOString() : null,
            disabled: this.disabled,
            email: this.email,
            groups: this.groups,
            id: this.id,
            image: this.image,
            is_active: this.is_active,
            is_staff: this.is_staff,
            is_superuser: this.is_superuser,
            last_login: this.last_login ? this.last_login.toISOString() : null,
            last_name: this.last_name,
            name: this.name,
            password: this.password,
            phone: this.phone,
            user_permissions: this.user_permissions,
            username: this.username,
        };
    }
}
