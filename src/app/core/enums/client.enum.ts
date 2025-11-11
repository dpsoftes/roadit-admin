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

export enum TransportPrincipalType {
    SIMPLE_MOVEMENT = 'SIMPLE_MOVEMENT',
    PICKUP_TO_FINAL_CUSTOMER = 'PICKUP_TO_FINAL_CUSTOMER',
    DELIVERY_TO_FINAL_CUSTOMER = 'DELIVERY_TO_FINAL_CUSTOMER',
    PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER = 'PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER',
    WITH_STOPOVER = 'WITH_STOPOVER'
}

export const transportPrincipalTypeDescriptions: Record<TransportPrincipalType, string> = {
    [TransportPrincipalType.SIMPLE_MOVEMENT]: 'clients.create-client.simple-movement',
    [TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER]: 'clients.create-client.pickup-to-final-customer',
    [TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER]: 'clients.create-client.delivery-to-final-customer',
    [TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER]: 'clients.create-client.pickup-and-delivery-to-final-customer',
    [TransportPrincipalType.WITH_STOPOVER]: 'clients.create-client.with-stopover'
};