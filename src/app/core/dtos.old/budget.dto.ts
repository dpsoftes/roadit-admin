import { BaseEntity } from './base.dto';

export class BudgetDto extends BaseEntity {
    total_price: number;
    departure_datetime: string;
    arrival_datetime: string;
    base_price: number;
    fuel_price: number;
    transport_cost_outbound: number;
    transport_cost_return: number;
    optional_expenses_price: number;
    accommodation_cost: number;
    toll_expense: number;
    per_diem_cost: number;
    accepted: boolean;
    invalidation_reason: string;
    driver: string; // UUID
    transport: number;
    driver_id: string;
    transport_id: number;
    driver_name: string;
    driver_rating: number;
    margin_eur: number | null;
    margin_pct: number | null;
    driver_exceed_1500_euros: boolean;
    driver_has_another_transport: boolean;

    constructor(data: any = {}) {
        super(data);
        this.total_price = data.total_price || 0;
        this.departure_datetime = data.departure_datetime || '';
        this.arrival_datetime = data.arrival_datetime || '';
        this.base_price = data.base_price || 0;
        this.fuel_price = data.fuel_price || 0;
        this.transport_cost_outbound = data.transport_cost_outbound || 0;
        this.transport_cost_return = data.transport_cost_return || 0;
        this.optional_expenses_price = data.optional_expenses_price || 0;
        this.accommodation_cost = data.accommodation_cost || 0;
        this.toll_expense = data.toll_expense || 0;
        this.per_diem_cost = data.per_diem_cost || 0;
        this.accepted = data.accepted || false;
        this.invalidation_reason = data.invalidation_reason || '';
        this.driver = data.driver || '';
        this.transport = data.transport || 0;
        this.driver_id = data.driver_id || '';
        this.transport_id = data.transport_id || 0;
        this.driver_name = data.driver_name || '';
        this.driver_rating = data.driver_rating || 0;
        this.margin_eur = data.margin_eur;
        this.margin_pct = data.margin_pct;
        this.driver_exceed_1500_euros = data.driver_exceed_1500_euros || false;
        this.driver_has_another_transport = data.driver_has_another_transport || false;
    }

    static fromJson(json: any): BudgetDto {
        return new BudgetDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            total_price: this.total_price,
            departure_datetime: this.departure_datetime,
            arrival_datetime: this.arrival_datetime,
            base_price: this.base_price,
            fuel_price: this.fuel_price,
            transport_cost_outbound: this.transport_cost_outbound,
            transport_cost_return: this.transport_cost_return,
            optional_expenses_price: this.optional_expenses_price,
            accommodation_cost: this.accommodation_cost,
            toll_expense: this.toll_expense,
            per_diem_cost: this.per_diem_cost,
            accepted: this.accepted,
            invalidation_reason: this.invalidation_reason,
            driver: this.driver,
            transport: this.transport,
            driver_id: this.driver_id,
            transport_id: this.transport_id,
            driver_name: this.driver_name,
            driver_rating: this.driver_rating,
            margin_eur: this.margin_eur,
            margin_pct: this.margin_pct,
            driver_exceed_1500_euros: this.driver_exceed_1500_euros,
            driver_has_another_transport: this.driver_has_another_transport
        };
    }

    copyWith(updates: Partial<BudgetDto>): BudgetDto {
        return new BudgetDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateUpdateBudgetDto {
    total_price: number;
    departure_datetime: string;
    arrival_datetime: string;
    base_price: number;
    fuel_price: number;
    transport_cost_outbound: number;
    transport_cost_return: number;
    optional_expenses_price: number;
    accommodation_cost: number;
    toll_expense: number;
    per_diem_cost: number;
    accepted: boolean;
    invalidation_reason: string;
    driver?: string; // UUID
    transport: number;
    automatically_assign_driver?: boolean;

    constructor(data: any = {}) {
        this.total_price = data.total_price || 0;
        this.departure_datetime = data.departure_datetime || '';
        this.arrival_datetime = data.arrival_datetime || '';
        this.base_price = data.base_price || 0;
        this.fuel_price = data.fuel_price || 0;
        this.transport_cost_outbound = data.transport_cost_outbound || 0;
        this.transport_cost_return = data.transport_cost_return || 0;
        this.optional_expenses_price = data.optional_expenses_price || 0;
        this.accommodation_cost = data.accommodation_cost || 0;
        this.toll_expense = data.toll_expense || 0;
        this.per_diem_cost = data.per_diem_cost || 0;
        this.accepted = data.accepted || false;
        this.invalidation_reason = data.invalidation_reason || '';
        this.driver = data.driver;
        this.transport = data.transport || 0;
        this.automatically_assign_driver = data.automatically_assign_driver;
    }

    static fromJson(json: any): CreateUpdateBudgetDto {
        return new CreateUpdateBudgetDto(json);
    }

    toJson(): any {
        return {
            total_price: this.total_price,
            departure_datetime: this.departure_datetime,
            arrival_datetime: this.arrival_datetime,
            base_price: this.base_price,
            fuel_price: this.fuel_price,
            transport_cost_outbound: this.transport_cost_outbound,
            transport_cost_return: this.transport_cost_return,
            optional_expenses_price: this.optional_expenses_price,
            accommodation_cost: this.accommodation_cost,
            toll_expense: this.toll_expense,
            per_diem_cost: this.per_diem_cost,
            accepted: this.accepted,
            invalidation_reason: this.invalidation_reason,
            driver: this.driver,
            transport: this.transport,
            automatically_assign_driver: this.automatically_assign_driver
        };
    }

    copyWith(updates: Partial<CreateUpdateBudgetDto>): CreateUpdateBudgetDto {
        return new CreateUpdateBudgetDto({
            ...this.toJson(),
            ...updates
        });
    }
}


