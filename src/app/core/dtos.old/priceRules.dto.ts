import { BaseEntity } from './base.dto';

export class PriceRuleSetDto extends BaseEntity {
    client: number | null;
    transport: number | null;
    ferry_fixed_cost: number;
    express_surcharge_percentage: number;
    stage_discount_percentage: number;
    charging_requires_ticket: boolean;
    charging_price_per_100km: number;

    constructor(data: any = {}) {
        super(data);
        this.client = data.client;
        this.transport = data.transport;
        this.ferry_fixed_cost = data.ferry_fixed_cost || 0;
        this.express_surcharge_percentage = data.express_surcharge_percentage || 0;
        this.stage_discount_percentage = data.stage_discount_percentage || 0;
        this.charging_requires_ticket = data.charging_requires_ticket || false;
        this.charging_price_per_100km = data.charging_price_per_100km || 0;
    }

    static fromJson(json: any): PriceRuleSetDto {
        return new PriceRuleSetDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            client: this.client,
            transport: this.transport,
            ferry_fixed_cost: this.ferry_fixed_cost,
            express_surcharge_percentage: this.express_surcharge_percentage,
            stage_discount_percentage: this.stage_discount_percentage,
            charging_requires_ticket: this.charging_requires_ticket,
            charging_price_per_100km: this.charging_price_per_100km
        };
    }

    copyWith(updates: Partial<PriceRuleSetDto>): PriceRuleSetDto {
        return new PriceRuleSetDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreatePriceRuleSetDto {
    client?: number | null;
    transport?: number | null;
    ferry_fixed_cost: number;
    express_surcharge_percentage: number;
    stage_discount_percentage: number;
    charging_requires_ticket: boolean;
    charging_price_per_100km: number;

    constructor(data: any = {}) {
        this.client = data.client;
        this.transport = data.transport;
        this.ferry_fixed_cost = data.ferry_fixed_cost || 0;
        this.express_surcharge_percentage = data.express_surcharge_percentage || 0;
        this.stage_discount_percentage = data.stage_discount_percentage || 0;
        this.charging_requires_ticket = data.charging_requires_ticket || false;
        this.charging_price_per_100km = data.charging_price_per_100km || 0;
    }

    static fromJson(json: any): CreatePriceRuleSetDto {
        return new CreatePriceRuleSetDto(json);
    }

    toJson(): any {
        return {
            client: this.client,
            transport: this.transport,
            ferry_fixed_cost: this.ferry_fixed_cost,
            express_surcharge_percentage: this.express_surcharge_percentage,
            stage_discount_percentage: this.stage_discount_percentage,
            charging_requires_ticket: this.charging_requires_ticket,
            charging_price_per_100km: this.charging_price_per_100km
        };
    }

    copyWith(updates: Partial<CreatePriceRuleSetDto>): CreatePriceRuleSetDto {
        return new CreatePriceRuleSetDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class DistanceBracketRuleDto extends BaseEntity {
    min_distance: number;
    max_distance: number | null;
    price_per_km: number;
    price_rule_set: number;

    constructor(data: any = {}) {
        super(data);
        this.min_distance = data.min_distance || 0;
        this.max_distance = data.max_distance;
        this.price_per_km = data.price_per_km || 0;
        this.price_rule_set = data.price_rule_set || 0;
    }

    static fromJson(json: any): DistanceBracketRuleDto {
        return new DistanceBracketRuleDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            min_distance: this.min_distance,
            max_distance: this.max_distance,
            price_per_km: this.price_per_km,
            price_rule_set: this.price_rule_set
        };
    }

    copyWith(updates: Partial<DistanceBracketRuleDto>): DistanceBracketRuleDto {
        return new DistanceBracketRuleDto({
            ...this.toJson(),
            ...updates
        });
    }
}


