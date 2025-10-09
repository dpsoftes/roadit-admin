/**
 * Auth DTOs - Basados exactamente en apps.user.views.Login
 */

import { User } from './user.dto';

/**
 * LoginRequestDto - Input para login
 */
export class LoginRequestDto {
    email: string;
    password: string;

    constructor(data: any = {}) {
        this.email = data.email || '';
        this.password = data.password || '';
    }

    toJson(): any {
        return {
            email: this.email,
            password: this.password
        };
    }
}

/**
 * LoginResponseDto - Respuesta exacta del endpoint login
 * Estructura: { token, refresh-token, user, message }
 */
export class LoginResponseDto {
    token: string;
    'refresh-token': string;
    user: User;
    message: string;

    constructor(data: any = {}) {
        this.token = data.token || '';
        this['refresh-token'] = data['refresh-token'] || '';
        this.user = data.user ? User.fromJson(data.user) : new User();
        this.message = data.message || '';
    }

    static fromJson(json: any): LoginResponseDto {
        return new LoginResponseDto(json);
    }

    toJson(): any {
        return {
            token: this.token,
            'refresh-token': this['refresh-token'],
            user: this.user.toJson(),
            message: this.message
        };
    }

    // Helpers para compatibilidad
    get access(): string {
        return this.token;
    }

    get refresh(): string {
        return this['refresh-token'];
    }
}

/**
 * RefreshTokenRequestDto - Para refresh token
 */
export class RefreshTokenRequestDto {
    refresh: string;

    constructor(data: any = {}) {
        this.refresh = data.refresh || '';
    }

    toJson(): any {
        return {
            refresh: this.refresh
        };
    }
}

/**
 * RefreshTokenResponseDto - Respuesta del refresh token
 */
export class RefreshTokenResponseDto {
    access: string;

    constructor(data: any = {}) {
        this.access = data.access || '';
    }

    static fromJson(json: any): RefreshTokenResponseDto {
        return new RefreshTokenResponseDto(json);
    }

    toJson(): any {
        return {
            access: this.access
        };
    }
}

/**
 * PasswordResetRequestSerializer
 */
export class PasswordResetRequestDto {
    email: string;

    constructor(data: any = {}) {
        this.email = data.email || '';
    }

    toJson(): any {
        return {
            email: this.email
        };
    }
}

/**
 * PasswordSerializer - Para cambio de contraseña
 */
export class PasswordChangeDto {
    password: string;
    password2: string;

    constructor(data: any = {}) {
        this.password = data.password || '';
        this.password2 = data.password2 || '';
    }

    toJson(): any {
        return {
            password: this.password,
            password2: this.password2
        };
    }
}