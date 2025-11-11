import { PricingType } from "@enums/additional.enum";

export class PriceRulesClientDto {
    charging_requires_ticket?: boolean = false; // Recarga requiere ticket
    client?: number | null = null; // Cliente
    client_charging_price?: number = 0; // Precio carga eléctrica cliente por km
    client_fuel_price?: number = 0; // Precio combustible cliente por km
    distance_brackets: DistanceBracketRule[] = []; // Reglas de distancia // CAMPO OBLIGATORIO
    driver_charging_price?: number = 0; // Precio carga eléctrica conductor por km
    driver_fuel_price?: number = 0; // Precio combustible conductor por km
    express_surcharge_percentage?: number = 0; // Recargo exprés (%), Porcentaje 0–100
    ferry_fixed_cost?: number = 0; // Coste fijo ferry
    id?: number; // Identificador
    is_fuel_included?: boolean = false; // Incluir combustible
    stage_discount_percentage?: number = 0; // Descuento por etapa (%), Porcentaje 0–100
    transport?: number | null = null; // Transporte
    [property: string]: any;
}

export class DistanceBracketRule {
    big_vehicle_price?: number | null = null; // Precio vehículo grande
    id?: number; // Identificador
    max_km: number = 0; // Km máximos // CAMPO OBLIGATORIO
    min_km?: number = 0; // Km mínimos
    pricing_type?: PricingType = PricingType.FIXED; // Tipo de tarificación
    small_vehicle_price?: number | null = null; // Precio vehículo chico
    standard_price: number = 0; // Precio // CAMPO OBLIGATORIO
    [property: string]: any;
}

