/**
 * Enums comunes
 * Enumeraciones generales utilizadas en toda la aplicación
 */

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export enum TagType {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  TRANSPORT = 'TRANSPORT',
  INCIDENCE = 'INCIDENCE'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum ActionType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}
