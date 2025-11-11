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

export const userRolesDescriptions: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'userRoles.ADMIN',
  [UserRole.USER]: 'userRoles.USER',
  [UserRole.CLIENT_USER]: 'userRoles.CLIENT_USER',
  [UserRole.DRIVER]: 'userRoles.DRIVER'
};

export enum RoleAdmin {
  KAM = 'KAM',
  SUPERADMIN = 'SUPERADMIN',
  OPERATIONS_MANAGER = 'OPERATIONS_MANAGER',
  SALES_MANAGER = 'SALES_MANAGER'
}

export const roleAdminDescriptions: Record<RoleAdmin, string> = {
  [RoleAdmin.KAM]: 'roleAdmin.KAM',
  [RoleAdmin.SUPERADMIN]: 'roleAdmin.SUPERADMIN',
  [RoleAdmin.OPERATIONS_MANAGER]: 'roleAdmin.OPERATIONS_MANAGER',
  [RoleAdmin.SALES_MANAGER]: 'roleAdmin.SALES_MANAGER'
};

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export const userStatusDescriptions: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'userStatus.ACTIVE',
  [UserStatus.INACTIVE]: 'userStatus.INACTIVE',
  [UserStatus.PENDING]: 'userStatus.PENDING',
  [UserStatus.SUSPENDED]: 'userStatus.SUSPENDED'
};

export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ON_BREAK = 'ON_BREAK'
}

export const driverStatusDescriptions: Record<DriverStatus, string> = {
  [DriverStatus.AVAILABLE]: 'driverStatus.AVAILABLE',
  [DriverStatus.BUSY]: 'driverStatus.BUSY',
  [DriverStatus.OFFLINE]: 'driverStatus.OFFLINE',
  [DriverStatus.ON_BREAK]: 'driverStatus.ON_BREAK'
};

