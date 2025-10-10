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

export const statusDescriptions: Record<Status, string> = {
  [Status.ACTIVE]: 'status.ACTIVE',
  [Status.INACTIVE]: 'status.INACTIVE',
  [Status.PENDING]: 'status.PENDING',
  [Status.COMPLETED]: 'status.COMPLETED',
  [Status.CANCELLED]: 'status.CANCELLED'
};

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export const priorityDescriptions: Record<Priority, string> = {
  [Priority.LOW]: 'priority.LOW',
  [Priority.MEDIUM]: 'priority.MEDIUM',
  [Priority.HIGH]: 'priority.HIGH',
  [Priority.URGENT]: 'priority.URGENT'
};

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export const notificationTypeDescriptions: Record<NotificationType, string> = {
  [NotificationType.SUCCESS]: 'notificationType.SUCCESS',
  [NotificationType.ERROR]: 'notificationType.ERROR',
  [NotificationType.WARNING]: 'notificationType.WARNING',
  [NotificationType.INFO]: 'notificationType.INFO'
};

export enum TagType {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  TRANSPORT = 'TRANSPORT',
  INCIDENCE = 'INCIDENCE'
}

export const tagTypeDescriptions: Record<TagType, string> = {
  [TagType.CLIENT]: 'tagType.CLIENT',
  [TagType.DRIVER]: 'tagType.DRIVER',
  [TagType.TRANSPORT]: 'tagType.TRANSPORT',
  [TagType.INCIDENCE]: 'tagType.INCIDENCE'
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export const sortOrderDescriptions: Record<SortOrder, string> = {
  [SortOrder.ASC]: 'sortOrder.ASC',
  [SortOrder.DESC]: 'sortOrder.DESC'
};

export enum ActionType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export const actionTypeDescriptions: Record<ActionType, string> = {
  [ActionType.CREATE]: 'actionType.CREATE',
  [ActionType.READ]: 'actionType.READ',
  [ActionType.UPDATE]: 'actionType.UPDATE',
  [ActionType.DELETE]: 'actionType.DELETE'
};
