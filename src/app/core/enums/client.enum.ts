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

export const clientTypeDescriptions: Record<ClientType, string> = {
    [ClientType.DEALERSHIP]: 'clientType.DEALERSHIP',
    [ClientType.RENTING]: 'clientType.RENTING',
    [ClientType.LEASING]: 'clientType.LEASING',
    [ClientType.CAR_RENTAL]: 'clientType.CAR_RENTAL',
    [ClientType.CAR_TRADING]: 'clientType.CAR_TRADING',
    [ClientType.FLEET]: 'clientType.FLEET',
    [ClientType.COMPANY]: 'clientType.COMPANY'
};

export enum BillingType {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC'
}

export const billingTypeDescriptions: Record<BillingType, string> = {
    [BillingType.MANUAL]: 'billingType.MANUAL',
    [BillingType.AUTOMATIC]: 'billingType.AUTOMATIC'
};

export enum ClientOrigin {
    PROSPECTING = 'PROSPECTING',
    REFERRAL = 'REFERRAL',
    MARKETING = 'MARKETING',
    INBOUND_REQUEST = 'INBOUND_REQUEST',
    OTHERS = 'OTHERS',
    UNDEFINED = 'UNDEFINED',
    EVENT = 'EVENT'
}

export const clientOriginDescriptions: Record<ClientOrigin, string> = {
    [ClientOrigin.PROSPECTING]: 'clientOrigin.PROSPECTING',
    [ClientOrigin.REFERRAL]: 'clientOrigin.REFERRAL',
    [ClientOrigin.MARKETING]: 'clientOrigin.MARKETING',
    [ClientOrigin.INBOUND_REQUEST]: 'clientOrigin.INBOUND_REQUEST',
    [ClientOrigin.OTHERS]: 'clientOrigin.OTHERS',
    [ClientOrigin.UNDEFINED]: 'clientOrigin.UNDEFINED',
    [ClientOrigin.EVENT]: 'clientOrigin.EVENT'
};