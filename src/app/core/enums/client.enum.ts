/**
 * Enums de cliente
 * Enumeraciones relacionadas con clientes y facturación
 */

export enum ClientType {
    DEALERSHIP = 'DEALERSHIP',
    RENTING = 'RENTING',
    LEASING = 'LEASING',
    CAR_RENTAL = 'CAR_RENTAL',
    CAR_TRADING = 'CAR_TRADING',
    FLEET = 'FLEET',
    COMPANY = 'COMPANY'
}

export enum BillingType {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC'
}

export enum ClientOrigin {
    PROSPECTING = 'PROSPECTING',
    REFERRAL = 'REFERRAL',
    MARKETING = 'MARKETING',
    INBOUND_REQUEST = 'INBOUND_REQUEST',
    OTHERS = 'OTHERS',
    UNDEFINED = 'UNDEFINED',
    EVENT = 'EVENT'
}