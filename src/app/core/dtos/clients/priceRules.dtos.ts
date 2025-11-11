import { PricingType } from "@enums/additional.enum";

export class PriceRulesClientDto {
    charging_requires_ticket?: boolean; // Recarga requiere ticket
    client?: number | null; // Cliente
    client_charging_price?: number; // Precio carga eléctrica cliente por km
    client_fuel_price?: number; // Precio combustible cliente por km
    created_date?: Date | null; // Fecha de Creación
    distance_brackets: DistanceBracketRule[] = []; // Reglas de distancia // CAMPO OBLIGATORIO
    driver_charging_price?: number; // Precio carga eléctrica conductor por km
    driver_fuel_price?: number; // Precio combustible conductor por km
    express_surcharge_percentage?: number; // Recargo exprés (%), Porcentaje 0–100
    ferry_fixed_cost?: number; // Coste fijo ferry
    id?: number; // Identificador
    is_fuel_included?: boolean; // Incluir combustible
    modified_date?: Date | null; // Fecha de Modificación
    stage_discount_percentage?: number; // Descuento por etapa (%), Porcentaje 0–100
    transport?: number | null; // Transporte
    [property: string]: any;
}

export class DistanceBracketRule {
    big_vehicle_price?: number | null; // Precio vehículo grande
    created_date?: Date | null; // Fecha de Creación
    id?: number; // Identificador
    max_km: number = 0; // Km máximos // CAMPO OBLIGATORIO
    min_km?: number; // Km mínimos
    modified_date?: Date | null; // Fecha de Modificación
    pricing_type?: PricingType; // Tipo de tarificación
    small_vehicle_price?: number | null; // Precio vehículo chico
    standard_price: number = 0; // Precio // CAMPO OBLIGATORIO
    [property: string]: any;
}

