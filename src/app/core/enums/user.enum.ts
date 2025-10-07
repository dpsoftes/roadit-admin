/**
 * Enums de usuario
 * Enumeraciones relacionadas con usuarios y roles
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CLIENT_USER = 'CLIENT_USER',
  DRIVER = 'DRIVER'
}

export enum Role {
  KAM = 'KAM',
  SUPERADMIN = 'SUPERADMIN',
  OPERATIONS_MANAGER = 'OPERATIONS_MANAGER',
  SALES_MANAGER = 'SALES_MANAGER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ON_BREAK = 'ON_BREAK'
}