/**
 * Enums adicionales
 * Enumeraciones para módulos como reglas de precio, ajustes, incidencias, etc.
 */

// Additional Cost Enums
export enum RequestType {
    TRANSPORT = 'TRANSPORT',
    TOLL = 'TOLL',
    FUEL = 'FUEL',
    MEALS = 'MEALS',
    LODGING = 'LODGING',
    WAITING_TIME = 'WAITING_TIME',
    ELECTRIC_VEHICLE_CHARGING_TIME = 'ELECTRIC_VEHICLE_CHARGING_TIME',
    OTHER = 'OTHER'
}

export const requestTypeDescriptions: Record<RequestType, string> = {
    [RequestType.TRANSPORT]: 'requestType.TRANSPORT',
    [RequestType.TOLL]: 'requestType.TOLL',
    [RequestType.FUEL]: 'requestType.FUEL',
    [RequestType.MEALS]: 'requestType.MEALS',
    [RequestType.LODGING]: 'requestType.LODGING',
    [RequestType.WAITING_TIME]: 'requestType.WAITING_TIME',
    [RequestType.ELECTRIC_VEHICLE_CHARGING_TIME]: 'requestType.ELECTRIC_VEHICLE_CHARGING_TIME',
    [RequestType.OTHER]: 'requestType.OTHER'
};

export enum RequestStatus {
    NEW = 'NEW',
    PENDING_TICKET_UPLOAD = 'PENDING_TICKET_UPLOAD',
    PENDING_VALIDATION = 'PENDING_VALIDATION',
    VALIDATED = 'VALIDATED',
    REQUEST_REJECTED = 'REQUEST_REJECTED',
    TICKET_REJECTED = 'TICKET_REJECTED'
}

export const requestStatusDescriptions: Record<RequestStatus, string> = {
    [RequestStatus.NEW]: 'requestStatus.NEW',
    [RequestStatus.PENDING_TICKET_UPLOAD]: 'requestStatus.PENDING_TICKET_UPLOAD',
    [RequestStatus.PENDING_VALIDATION]: 'requestStatus.PENDING_VALIDATION',
    [RequestStatus.VALIDATED]: 'requestStatus.VALIDATED',
    [RequestStatus.REQUEST_REJECTED]: 'requestStatus.REQUEST_REJECTED',
    [RequestStatus.TICKET_REJECTED]: 'requestStatus.TICKET_REJECTED'
};

export enum PricingType {
    FIXED = 'FIXED',
    PER_KM = 'PER_KM'
}

export const pricingTypeDescriptions: Record<PricingType, string> = {
    [PricingType.FIXED]: 'pricingType.FIXED',
    [PricingType.PER_KM]: 'pricingType.PER_KM'
};

export enum AdjustmentType {
    BONUS = 'BONUS',
    PENALTY = 'PENALTY'
}

export const adjustmentTypeDescriptions: Record<AdjustmentType, string> = {
    [AdjustmentType.BONUS]: 'adjustmentType.BONUS',
    [AdjustmentType.PENALTY]: 'adjustmentType.PENALTY'
};

// Adjustment Reason Types
export enum ReasonType {
    MISSING_DOCUMENT = 'MISSING_DOCUMENT',
    FINE_MANAGEMENT = 'FINE_MANAGEMENT',
    ACCIDENT_MANAGEMENT = 'ACCIDENT_MANAGEMENT',
    ADDITIONAL_SERVICE = 'ADDITIONAL_SERVICE',
    INAPPROPRIATE_BEHAVIOR = 'INAPPROPRIATE_BEHAVIOR',
    UNPROFESSIONAL_DRESS = 'UNPROFESSIONAL_DRESS',
    NOT_RESPECT_PROCESS = 'NOT_RESPECT_PROCESS',
    PUNCTUALITY_LESS_4H = 'PUNCTUALITY_LESS_4H',
    PUNCTUALITY_MORE_4H = 'PUNCTUALITY_MORE_4H',
    PUNCTUALITY_MORE_1D = 'PUNCTUALITY_MORE_1D',
    FALSE_JUSTIFICATIONS = 'FALSE_JUSTIFICATIONS',
    SERVICE_NOT_COMPLETED = 'SERVICE_NOT_COMPLETED',
    SERVICE_NOT_CERTIFIED = 'SERVICE_NOT_CERTIFIED',
    OTHER = 'OTHER'
}

export const reasonTypeDescriptions: Record<ReasonType, string> = {
    [ReasonType.MISSING_DOCUMENT]: 'reasonType.MISSING_DOCUMENT',
    [ReasonType.FINE_MANAGEMENT]: 'reasonType.FINE_MANAGEMENT',
    [ReasonType.ACCIDENT_MANAGEMENT]: 'reasonType.ACCIDENT_MANAGEMENT',
    [ReasonType.ADDITIONAL_SERVICE]: 'reasonType.ADDITIONAL_SERVICE',
    [ReasonType.INAPPROPRIATE_BEHAVIOR]: 'reasonType.INAPPROPRIATE_BEHAVIOR',
    [ReasonType.UNPROFESSIONAL_DRESS]: 'reasonType.UNPROFESSIONAL_DRESS',
    [ReasonType.NOT_RESPECT_PROCESS]: 'reasonType.NOT_RESPECT_PROCESS',
    [ReasonType.PUNCTUALITY_LESS_4H]: 'reasonType.PUNCTUALITY_LESS_4H',
    [ReasonType.PUNCTUALITY_MORE_4H]: 'reasonType.PUNCTUALITY_MORE_4H',
    [ReasonType.PUNCTUALITY_MORE_1D]: 'reasonType.PUNCTUALITY_MORE_1D',
    [ReasonType.FALSE_JUSTIFICATIONS]: 'reasonType.FALSE_JUSTIFICATIONS',
    [ReasonType.SERVICE_NOT_COMPLETED]: 'reasonType.SERVICE_NOT_COMPLETED',
    [ReasonType.SERVICE_NOT_CERTIFIED]: 'reasonType.SERVICE_NOT_CERTIFIED',
    [ReasonType.OTHER]: 'reasonType.OTHER'
};

// Invoice Enums (exacto de Python)
export enum InvoiceStatus {
    PENDING_DRIVER = 'PENDING_DRIVER',
    PENDING_PAYMENT = 'PENDING_PAYMENT',
    PAID = 'PAID'
}

export const invoiceStatusDescriptions: Record<InvoiceStatus, string> = {
    [InvoiceStatus.PENDING_DRIVER]: 'invoiceStatus.PENDING_DRIVER',
    [InvoiceStatus.PENDING_PAYMENT]: 'invoiceStatus.PENDING_PAYMENT',
    [InvoiceStatus.PAID]: 'invoiceStatus.PAID'
};

// Anomaly Enums
export enum AnomalyType {
    SCRATCH = 'SCRATCH',
    DENT = 'DENT',
    BREAK = 'BREAK',
    CHIP = 'CHIP',
    MISSING_ITEM = 'MISSING_ITEM',
    POOR_CONDITION = 'POOR_CONDITION',
    DIRTY = 'DIRTY',
    DESCRIPTION = 'DESCRIPTION'
}

export const anomalyTypeDescriptions: Record<AnomalyType, string> = {
    [AnomalyType.SCRATCH]: 'anomalyType.SCRATCH',
    [AnomalyType.DENT]: 'anomalyType.DENT',
    [AnomalyType.BREAK]: 'anomalyType.BREAK',
    [AnomalyType.CHIP]: 'anomalyType.CHIP',
    [AnomalyType.MISSING_ITEM]: 'anomalyType.MISSING_ITEM',
    [AnomalyType.POOR_CONDITION]: 'anomalyType.POOR_CONDITION',
    [AnomalyType.DIRTY]: 'anomalyType.DIRTY',
    [AnomalyType.DESCRIPTION]: 'anomalyType.DESCRIPTION'
};

export enum AnomalyCategory {
    BODYWORK = 'BODYWORK',
    GLASS = 'GLASS',
    INTERIOR = 'INTERIOR',
    OTHER = 'OTHER'
}

export const anomalyCategoryDescriptions: Record<AnomalyCategory, string> = {
    [AnomalyCategory.BODYWORK]: 'anomalyCategory.BODYWORK',
    [AnomalyCategory.GLASS]: 'anomalyCategory.GLASS',
    [AnomalyCategory.INTERIOR]: 'anomalyCategory.INTERIOR',
    [AnomalyCategory.OTHER]: 'anomalyCategory.OTHER'
};

// Incidence Enums
export enum IncidenceType {
    ALL = 'ALL',
    PUNCTUALITY = 'PUNCTUALITY',
    EXCESS_KILOMETERS = 'EXCESS_KILOMETERS',
    INVENTORY_MISSING = 'INVENTORY_MISSING',
    INVENTORY_INCOMPLETE = 'INVENTORY_INCOMPLETE',
    DRIVER_BEHAVIOR = 'DRIVER_BEHAVIOR',
    DRIVER_APPEARANCE = 'DRIVER_APPEARANCE',
    DRIVER_CONGRATULATIONS = 'DRIVER_CONGRATULATIONS',
    OTHER = 'OTHER',
    DOCUMENT_MISSING = 'DOCUMENT_MISSING',
    DOCUMENT_BLURRED = 'DOCUMENT_BLURRED',
    DOCUMENT_INCOMPLETE = 'DOCUMENT_INCOMPLETE',
    DOCUMENT_INCORRECT = 'DOCUMENT_INCORRECT',
    CLIENT_PROTOCOL_FUEL = 'CLIENT_PROTOCOL_FUEL',
    CLIENT_PROTOCOL_CUSTOMER_CONTACT = 'CLIENT_PROTOCOL_CUSTOMER_CONTACT',
    CLIENT_PROTOCOL_SC_ADDITIONAL_SERVICE = 'CLIENT_PROTOCOL_SC_ADDITIONAL_SERVICE',
    CLIENT_PROTOCOL_SC_WASH = 'CLIENT_PROTOCOL_SC_WASH',
    CLIENT_PROTOCOL_SC_VEHICLE_PRESENTATION = 'CLIENT_PROTOCOL_SC_VEHICLE_PRESENTATION',
    CLIENT_PROTOCOL_OTHER = 'CLIENT_PROTOCOL_OTHER',
    INCIDENCE_OTHER_OR_MULTIPLE = 'INCIDENCE_OTHER_OR_MULTIPLE',
    INCIDENCE_THEFT_SUSPICION = 'INCIDENCE_THEFT_SUSPICION',
    INCIDENCE_BODYWORK_DAMAGE = 'INCIDENCE_BODYWORK_DAMAGE',
    INCIDENCE_GLASS_BREAKAGE = 'INCIDENCE_GLASS_BREAKAGE',
    INCIDENCE_FLAT_TIRE = 'INCIDENCE_FLAT_TIRE',
    INCIDENCE_WRONG_FUEL = 'INCIDENCE_WRONG_FUEL',
    INCIDENCE_INTERIOR_DAMAGE = 'INCIDENCE_INTERIOR_DAMAGE',
    FINE_OVERSPEED = 'FINE_OVERSPEED',
    FINE_TOLL = 'FINE_TOLL',
    FINE_UNPAID_PARKING = 'FINE_UNPAID_PARKING',
    FINE_OTHER = 'FINE_OTHER',
    FINE_TRAFFIC_CODE = 'FINE_TRAFFIC_CODE',
    BILLING_FAKE_RECEIPTS = 'BILLING_FAKE_RECEIPTS',
    INTERNAL_PROTOCOL_EMERGENCY_CONTACT = 'INTERNAL_PROTOCOL_EMERGENCY_CONTACT',
    INTERNAL_PROTOCOL_WARNING_NOTE = 'INTERNAL_PROTOCOL_WARNING_NOTE',
    INTERNAL_PROTOCOL_30_MIN_WAIT = 'INTERNAL_PROTOCOL_30_MIN_WAIT',
    INTERNAL_PROTOCOL_UNREPORTED_CHANGES = 'INTERNAL_PROTOCOL_UNREPORTED_CHANGES',
    INTERNAL_PROTOCOL_MISSION_NOT_COMPLETED = 'INTERNAL_PROTOCOL_MISSION_NOT_COMPLETED',
    INTERNAL_PROTOCOL_OTHER = 'INTERNAL_PROTOCOL_OTHER'
}

export const incidenceTypeDescriptions: Record<IncidenceType, string> = {
    [IncidenceType.ALL]: 'incidenceType.ALL',
    [IncidenceType.PUNCTUALITY]: 'incidenceType.PUNCTUALITY',
    [IncidenceType.EXCESS_KILOMETERS]: 'incidenceType.EXCESS_KILOMETERS',
    [IncidenceType.INVENTORY_MISSING]: 'incidenceType.INVENTORY_MISSING',
    [IncidenceType.INVENTORY_INCOMPLETE]: 'incidenceType.INVENTORY_INCOMPLETE',
    [IncidenceType.DRIVER_BEHAVIOR]: 'incidenceType.DRIVER_BEHAVIOR',
    [IncidenceType.DRIVER_APPEARANCE]: 'incidenceType.DRIVER_APPEARANCE',
    [IncidenceType.DRIVER_CONGRATULATIONS]: 'incidenceType.DRIVER_CONGRATULATIONS',
    [IncidenceType.OTHER]: 'incidenceType.OTHER',
    [IncidenceType.DOCUMENT_MISSING]: 'incidenceType.DOCUMENT_MISSING',
    [IncidenceType.DOCUMENT_BLURRED]: 'incidenceType.DOCUMENT_BLURRED',
    [IncidenceType.DOCUMENT_INCOMPLETE]: 'incidenceType.DOCUMENT_INCOMPLETE',
    [IncidenceType.DOCUMENT_INCORRECT]: 'incidenceType.DOCUMENT_INCORRECT',
    [IncidenceType.CLIENT_PROTOCOL_FUEL]: 'incidenceType.CLIENT_PROTOCOL_FUEL',
    [IncidenceType.CLIENT_PROTOCOL_CUSTOMER_CONTACT]: 'incidenceType.CLIENT_PROTOCOL_CUSTOMER_CONTACT',
    [IncidenceType.CLIENT_PROTOCOL_SC_ADDITIONAL_SERVICE]: 'incidenceType.CLIENT_PROTOCOL_SC_ADDITIONAL_SERVICE',
    [IncidenceType.CLIENT_PROTOCOL_SC_WASH]: 'incidenceType.CLIENT_PROTOCOL_SC_WASH',
    [IncidenceType.CLIENT_PROTOCOL_SC_VEHICLE_PRESENTATION]: 'incidenceType.CLIENT_PROTOCOL_SC_VEHICLE_PRESENTATION',
    [IncidenceType.CLIENT_PROTOCOL_OTHER]: 'incidenceType.CLIENT_PROTOCOL_OTHER',
    [IncidenceType.INCIDENCE_OTHER_OR_MULTIPLE]: 'incidenceType.INCIDENCE_OTHER_OR_MULTIPLE',
    [IncidenceType.INCIDENCE_THEFT_SUSPICION]: 'incidenceType.INCIDENCE_THEFT_SUSPICION',
    [IncidenceType.INCIDENCE_BODYWORK_DAMAGE]: 'incidenceType.INCIDENCE_BODYWORK_DAMAGE',
    [IncidenceType.INCIDENCE_GLASS_BREAKAGE]: 'incidenceType.INCIDENCE_GLASS_BREAKAGE',
    [IncidenceType.INCIDENCE_FLAT_TIRE]: 'incidenceType.INCIDENCE_FLAT_TIRE',
    [IncidenceType.INCIDENCE_WRONG_FUEL]: 'incidenceType.INCIDENCE_WRONG_FUEL',
    [IncidenceType.INCIDENCE_INTERIOR_DAMAGE]: 'incidenceType.INCIDENCE_INTERIOR_DAMAGE',
    [IncidenceType.FINE_OVERSPEED]: 'incidenceType.FINE_OVERSPEED',
    [IncidenceType.FINE_TOLL]: 'incidenceType.FINE_TOLL',
    [IncidenceType.FINE_UNPAID_PARKING]: 'incidenceType.FINE_UNPAID_PARKING',
    [IncidenceType.FINE_OTHER]: 'incidenceType.FINE_OTHER',
    [IncidenceType.FINE_TRAFFIC_CODE]: 'incidenceType.FINE_TRAFFIC_CODE',
    [IncidenceType.BILLING_FAKE_RECEIPTS]: 'incidenceType.BILLING_FAKE_RECEIPTS',
    [IncidenceType.INTERNAL_PROTOCOL_EMERGENCY_CONTACT]: 'incidenceType.INTERNAL_PROTOCOL_EMERGENCY_CONTACT',
    [IncidenceType.INTERNAL_PROTOCOL_WARNING_NOTE]: 'incidenceType.INTERNAL_PROTOCOL_WARNING_NOTE',
    [IncidenceType.INTERNAL_PROTOCOL_30_MIN_WAIT]: 'incidenceType.INTERNAL_PROTOCOL_30_MIN_WAIT',
    [IncidenceType.INTERNAL_PROTOCOL_UNREPORTED_CHANGES]: 'incidenceType.INTERNAL_PROTOCOL_UNREPORTED_CHANGES',
    [IncidenceType.INTERNAL_PROTOCOL_MISSION_NOT_COMPLETED]: 'incidenceType.INTERNAL_PROTOCOL_MISSION_NOT_COMPLETED',
    [IncidenceType.INTERNAL_PROTOCOL_OTHER]: 'incidenceType.INTERNAL_PROTOCOL_OTHER'
};

export enum IncidenceCreator {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT'
}

export const incidenceCreatorDescriptions: Record<IncidenceCreator, string> = {
    [IncidenceCreator.ADMIN]: 'incidenceCreator.ADMIN',
    [IncidenceCreator.CLIENT]: 'incidenceCreator.CLIENT'
};

export enum IncidenceStatus {
    NEW = 'NEW',
    PENDING_DRIVER = 'PENDING_DRIVER',
    PENDING_CLIENT = 'PENDING_CLIENT',
    PENDING_END_CUSTOMER = 'PENDING_END_CUSTOMER',
    PENDING_INTERNAL_COLLABORATOR = 'PENDING_INTERNAL_COLLABORATOR',
    PENDING_WORKSHOP = 'PENDING_WORKSHOP',
    PENDING_INSURANCE = 'PENDING_INSURANCE',
    FINISHED = 'FINISHED'
}

export const incidenceStatusDescriptions: Record<IncidenceStatus, string> = {
    [IncidenceStatus.NEW]: 'incidenceStatus.NEW',
    [IncidenceStatus.PENDING_DRIVER]: 'incidenceStatus.PENDING_DRIVER',
    [IncidenceStatus.PENDING_CLIENT]: 'incidenceStatus.PENDING_CLIENT',
    [IncidenceStatus.PENDING_END_CUSTOMER]: 'incidenceStatus.PENDING_END_CUSTOMER',
    [IncidenceStatus.PENDING_INTERNAL_COLLABORATOR]: 'incidenceStatus.PENDING_INTERNAL_COLLABORATOR',
    [IncidenceStatus.PENDING_WORKSHOP]: 'incidenceStatus.PENDING_WORKSHOP',
    [IncidenceStatus.PENDING_INSURANCE]: 'incidenceStatus.PENDING_INSURANCE',
    [IncidenceStatus.FINISHED]: 'incidenceStatus.FINISHED'
};

export enum Severity {
    NONE = 'NONE',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export const severityDescriptions: Record<Severity, string> = {
    [Severity.NONE]: 'severity.NONE',
    [Severity.LOW]: 'severity.LOW',
    [Severity.MEDIUM]: 'severity.MEDIUM',
    [Severity.HIGH]: 'severity.HIGH'
};

export enum Responsibility {
    DRIVER = 'DRIVER',
    FORCE_MAJEURE = 'FORCE_MAJEURE',
    CLIENT = 'CLIENT',
    END_CLIENT = 'END_CLIENT',
    INTERNAL_PROCESS = 'INTERNAL_PROCESS',
    DUPLICATE = 'DUPLICATE',
    TECHNICAL_ISSUE = 'TECHNICAL_ISSUE',
    NOT_APPLICABLE = 'NOT_APPLICABLE',
    THIRD_PARTY = 'THIRD_PARTY'
}

export const responsibilityDescriptions: Record<Responsibility, string> = {
    [Responsibility.DRIVER]: 'responsibility.DRIVER',
    [Responsibility.FORCE_MAJEURE]: 'responsibility.FORCE_MAJEURE',
    [Responsibility.CLIENT]: 'responsibility.CLIENT',
    [Responsibility.END_CLIENT]: 'responsibility.END_CLIENT',
    [Responsibility.INTERNAL_PROCESS]: 'responsibility.INTERNAL_PROCESS',
    [Responsibility.DUPLICATE]: 'responsibility.DUPLICATE',
    [Responsibility.TECHNICAL_ISSUE]: 'responsibility.TECHNICAL_ISSUE',
    [Responsibility.NOT_APPLICABLE]: 'responsibility.NOT_APPLICABLE',
    [Responsibility.THIRD_PARTY]: 'responsibility.THIRD_PARTY'
};

// Protocol Enums
export enum ProtocolType {
    SINGLE_CHECK = 'SINGLE_CHECK',
    MULTI_CHECK = 'MULTI_CHECK',
    IMAGE = 'IMAGE'
}

export const protocolTypeDescriptions: Record<ProtocolType, string> = {
    [ProtocolType.SINGLE_CHECK]: 'protocolType.SINGLE_CHECK',
    [ProtocolType.MULTI_CHECK]: 'protocolType.MULTI_CHECK',
    [ProtocolType.IMAGE]: 'protocolType.IMAGE'
};

export enum DirectionType {
    ARRIVAL = 'ARRIVAL',
    DEPARTURE = 'DEPARTURE',
    BOTH = 'BOTH'
}

export const directionTypeDescriptions: Record<DirectionType, string> = {
    [DirectionType.ARRIVAL]: 'directionType.ARRIVAL',
    [DirectionType.DEPARTURE]: 'directionType.DEPARTURE',
    [DirectionType.BOTH]: 'directionType.BOTH'
};

// Event Enums
export enum TransportEventType {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
    DRIVER_CHANGED = 'DRIVER_CHANGED',
    CLIENT_CANCELED = 'CLIENT_CANCELED',
    DRIVER_CANCELED = 'DRIVER_CANCELED',
    CLIENT_APPT_SELECTED = 'CLIENT_APPT_SELECTED',
    DRIVER_DATETIME_SET = 'DRIVER_DATETIME_SET',
    PICKUP_DONE = 'PICKUP_DONE',
    DOC_START_UPLOADED = 'DOC_START_UPLOADED',
    DOC_END_UPLOADED = 'DOC_END_UPLOADED',
    EXPENSE_TICKET_UPL = 'EXPENSE_TICKET_UPL',
    DELIVERY_DONE = 'DELIVERY_DONE',
    MISSION_FINISHED = 'MISSION_FINISHED'
}

export const transportEventTypeDescriptions: Record<TransportEventType, string> = {
    [TransportEventType.CREATED]: 'transportEventType.CREATED',
    [TransportEventType.UPDATED]: 'transportEventType.UPDATED',
    [TransportEventType.DRIVER_ASSIGNED]: 'transportEventType.DRIVER_ASSIGNED',
    [TransportEventType.DRIVER_CHANGED]: 'transportEventType.DRIVER_CHANGED',
    [TransportEventType.CLIENT_CANCELED]: 'transportEventType.CLIENT_CANCELED',
    [TransportEventType.DRIVER_CANCELED]: 'transportEventType.DRIVER_CANCELED',
    [TransportEventType.CLIENT_APPT_SELECTED]: 'transportEventType.CLIENT_APPT_SELECTED',
    [TransportEventType.DRIVER_DATETIME_SET]: 'transportEventType.DRIVER_DATETIME_SET',
    [TransportEventType.PICKUP_DONE]: 'transportEventType.PICKUP_DONE',
    [TransportEventType.DOC_START_UPLOADED]: 'transportEventType.DOC_START_UPLOADED',
    [TransportEventType.DOC_END_UPLOADED]: 'transportEventType.DOC_END_UPLOADED',
    [TransportEventType.EXPENSE_TICKET_UPL]: 'transportEventType.EXPENSE_TICKET_UPL',
    [TransportEventType.DELIVERY_DONE]: 'transportEventType.DELIVERY_DONE',
    [TransportEventType.MISSION_FINISHED]: 'transportEventType.MISSION_FINISHED'
};

export enum DriverEventType {
    ONBOARD_REGISTERED = 'ONBOARD_REGISTERED',
    DOC_UPLOADED = 'DOC_UPLOADED',
    DOC_VALIDATED = 'DOC_VALIDATED',
    DOC_REJECTED = 'DOC_REJECTED',
    PROFILE_UPDATED = 'PROFILE_UPDATED',
    QUOTE_SENT = 'QUOTE_SENT',
    QUOTE_REJECTED = 'QUOTE_REJECTED',
    TRANSPORT_ASSIGNED = 'TRANSPORT_ASSIGNED',
    EXTRA_EXPENSE_REQUESTED = 'EXTRA_EXPENSE_REQUESTED',
    EXTRA_EXPENSE_ACCEPTED = 'EXTRA_EXPENSE_ACCEPTED',
    EXTRA_EXPENSE_REJECTED = 'EXTRA_EXPENSE_REJECTED',
    TICKET_UPLOADED = 'TICKET_UPLOADED',
    TICKET_ACCEPTED = 'TICKET_ACCEPTED',
    TICKET_REJECTED = 'TICKET_REJECTED',
    QUALITY_ISSUE_REPORTED = 'QUALITY_ISSUE_REPORTED'
}

export const driverEventTypeDescriptions: Record<DriverEventType, string> = {
    [DriverEventType.ONBOARD_REGISTERED]: 'driverEventType.ONBOARD_REGISTERED',
    [DriverEventType.DOC_UPLOADED]: 'driverEventType.DOC_UPLOADED',
    [DriverEventType.DOC_VALIDATED]: 'driverEventType.DOC_VALIDATED',
    [DriverEventType.DOC_REJECTED]: 'driverEventType.DOC_REJECTED',
    [DriverEventType.PROFILE_UPDATED]: 'driverEventType.PROFILE_UPDATED',
    [DriverEventType.QUOTE_SENT]: 'driverEventType.QUOTE_SENT',
    [DriverEventType.QUOTE_REJECTED]: 'driverEventType.QUOTE_REJECTED',
    [DriverEventType.TRANSPORT_ASSIGNED]: 'driverEventType.TRANSPORT_ASSIGNED',
    [DriverEventType.EXTRA_EXPENSE_REQUESTED]: 'driverEventType.EXTRA_EXPENSE_REQUESTED',
    [DriverEventType.EXTRA_EXPENSE_ACCEPTED]: 'driverEventType.EXTRA_EXPENSE_ACCEPTED',
    [DriverEventType.EXTRA_EXPENSE_REJECTED]: 'driverEventType.EXTRA_EXPENSE_REJECTED',
    [DriverEventType.TICKET_UPLOADED]: 'driverEventType.TICKET_UPLOADED',
    [DriverEventType.TICKET_ACCEPTED]: 'driverEventType.TICKET_ACCEPTED',
    [DriverEventType.TICKET_REJECTED]: 'driverEventType.TICKET_REJECTED',
    [DriverEventType.QUALITY_ISSUE_REPORTED]: 'driverEventType.QUALITY_ISSUE_REPORTED'
};

export enum IncidenceEventType {
    OPENED = 'OPENED',
    COMMENT_ADDED = 'COMMENT_ADDED',
    STATUS_CHANGED = 'STATUS_CHANGED'
}

export const incidenceEventTypeDescriptions: Record<IncidenceEventType, string> = {
    [IncidenceEventType.OPENED]: 'incidenceEventType.OPENED',
    [IncidenceEventType.COMMENT_ADDED]: 'incidenceEventType.COMMENT_ADDED',
    [IncidenceEventType.STATUS_CHANGED]: 'incidenceEventType.STATUS_CHANGED'
};

export enum DocumentType {
    FRONT_DNI = 'front_dni',
    BACK_DNI = 'back_dni',
    FRONT_DRIVING_LICENSE = 'front_driving_license',
    BACK_DRIVING_LICENSE = 'back_driving_license',
    SELF_EMPLOYMENT_REGISTRATION_FEE = 'self_employment_registration_fee',
    BANK_ACCOUNT_CERTIFICATE = 'bank_account_certificate',
    CRIMINAL_RECORD_CERTIFICATE = 'criminal_record_certificate',
    DRIVING_POINTS_CERTIFICATE = 'driving_points_certificate',
    SELF_EMPLOYMENT_PAYMENT_CERTIFICATE = 'self_employment_payment_certificate',
    TAX_CENSUS_REGISTRATION_CERTIFICATE = 'tax_census_registration_certificate',
    FORM_036 = 'form_036',
    RETA_REGISTRATION_RESOLUTION = 'reta_registration_resolution',
    SOCIAL_SECURITY_COMPLIANCE_CERTIFICATE = 'social_security_compliance_certificate',
    TAX_DEBT_CERTIFICATE = 'tax_debt_certificate',
    RESIDENCE_PERMIT_NIE = 'residence_permit_nie',
    WORK_PERMIT_NIE = 'work_permit_nie'
}

export const documentTypeDescriptions: Record<DocumentType, string> = {
    [DocumentType.FRONT_DNI]: 'documentType.front_dni',
    [DocumentType.BACK_DNI]: 'documentType.back_dni',
    [DocumentType.FRONT_DRIVING_LICENSE]: 'documentType.front_driving_license',
    [DocumentType.BACK_DRIVING_LICENSE]: 'documentType.back_driving_license',
    [DocumentType.SELF_EMPLOYMENT_REGISTRATION_FEE]: 'documentType.self_employment_registration_fee',
    [DocumentType.BANK_ACCOUNT_CERTIFICATE]: 'documentType.bank_account_certificate',
    [DocumentType.CRIMINAL_RECORD_CERTIFICATE]: 'documentType.criminal_record_certificate',
    [DocumentType.DRIVING_POINTS_CERTIFICATE]: 'documentType.driving_points_certificate',
    [DocumentType.SELF_EMPLOYMENT_PAYMENT_CERTIFICATE]: 'documentType.self_employment_payment_certificate',
    [DocumentType.TAX_CENSUS_REGISTRATION_CERTIFICATE]: 'documentType.tax_census_registration_certificate',
    [DocumentType.FORM_036]: 'documentType.form_036',
    [DocumentType.RETA_REGISTRATION_RESOLUTION]: 'documentType.reta_registration_resolution',
    [DocumentType.SOCIAL_SECURITY_COMPLIANCE_CERTIFICATE]: 'documentType.social_security_compliance_certificate',
    [DocumentType.TAX_DEBT_CERTIFICATE]: 'documentType.tax_debt_certificate',
    [DocumentType.RESIDENCE_PERMIT_NIE]: 'documentType.residence_permit_nie',
    [DocumentType.WORK_PERMIT_NIE]: 'documentType.work_permit_nie'
};

export enum IncidenceSeverity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}

export const incidenceSeverityDescriptions: Record<IncidenceSeverity, string> = {
    [IncidenceSeverity.LOW]: 'incidenceSeverity.LOW',
    [IncidenceSeverity.MEDIUM]: 'incidenceSeverity.MEDIUM',
    [IncidenceSeverity.HIGH]: 'incidenceSeverity.HIGH',
    [IncidenceSeverity.CRITICAL]: 'incidenceSeverity.CRITICAL'
};


export enum CertificationStatus {
    PASSED = 'passed',
    REVOKED = 'revoked',
    MANUAL = 'manual'
}

export const certificationStatusDescriptions: Record<CertificationStatus, string> = {
    [CertificationStatus.PASSED]: 'certificationStatus.passed',
    [CertificationStatus.REVOKED]: 'certificationStatus.revoked',
    [CertificationStatus.MANUAL]: 'certificationStatus.manual'
};

// Exam Enums
export enum ExamQuestionType {
    SINGLE = 'single',
    MULTIPLE = 'multiple',
    TEXT = 'text',
    BOOLEAN = 'boolean'
}

export const examQuestionTypeDescriptions: Record<ExamQuestionType, string> = {
    [ExamQuestionType.SINGLE]: 'examQuestionType.single',
    [ExamQuestionType.MULTIPLE]: 'examQuestionType.multiple',
    [ExamQuestionType.TEXT]: 'examQuestionType.text',
    [ExamQuestionType.BOOLEAN]: 'examQuestionType.boolean'
};

export enum FileUploadType{
    URL = 'URL',
    FILE = 'FILE'
}

export const fileUploadTypeDescriptions: Record<FileUploadType, string> = {
    [FileUploadType.URL]: 'fileUploadType.URL',
    [FileUploadType.FILE]: 'fileUploadType.FILE'
};