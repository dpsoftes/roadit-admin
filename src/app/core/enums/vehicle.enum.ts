/**
 * Enums de vehículo
 * Enumeraciones relacionadas con vehículos
 */

export enum VehicleSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE'
}

export const vehicleSizeDescriptions: Record<VehicleSize, string> = {
    [VehicleSize.SMALL]: 'vehicleSize.SMALL',
    [VehicleSize.MEDIUM]: 'vehicleSize.MEDIUM',
    [VehicleSize.LARGE]: 'vehicleSize.LARGE'
};

export enum FuelType {
    GASOLINE = 'GASOLINE',
    DIESEL = 'DIESEL',
    ELECTRIC = 'ELECTRIC',
    HYBRID = 'HYBRID',
    PLUG_IN_HYBRID = 'PLUG_IN_HYBRID',
    LPG = 'LPG',
    CNG = 'CNG'
}

export const fuelTypeDescriptions: Record<FuelType, string> = {
    [FuelType.GASOLINE]: 'fuelType.GASOLINE',
    [FuelType.DIESEL]: 'fuelType.DIESEL',
    [FuelType.ELECTRIC]: 'fuelType.ELECTRIC',
    [FuelType.HYBRID]: 'fuelType.HYBRID',
    [FuelType.PLUG_IN_HYBRID]: 'fuelType.PLUG_IN_HYBRID',
    [FuelType.LPG]: 'fuelType.LPG',
    [FuelType.CNG]: 'fuelType.CNG'
};