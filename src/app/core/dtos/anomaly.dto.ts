import { AnomalyCategory, AnomalyType } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class AnomalyDto extends BaseEntity {
    anomaly_type: AnomalyType;
    category: AnomalyCategory;
    description: string;
    photo: string | null;
    leg_point: number;

    constructor(data: any = {}) {
        super(data);
        this.anomaly_type = data.anomaly_type;
        this.category = data.category;
        this.description = data.description || '';
        this.photo = data.photo;
        this.leg_point = data.leg_point || 0;
    }

    static fromJson(json: any): AnomalyDto {
        return new AnomalyDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            anomaly_type: this.anomaly_type,
            category: this.category,
            description: this.description,
            photo: this.photo,
            leg_point: this.leg_point
        };
    }

    copyWith(updates: Partial<AnomalyDto>): AnomalyDto {
        return new AnomalyDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateAnomalyDto {
    anomaly_type: AnomalyType;
    category: AnomalyCategory;
    description?: string;
    photo?: File | null;
    leg_point: number;

    constructor(data: any = {}) {
        this.anomaly_type = data.anomaly_type;
        this.category = data.category;
        this.description = data.description;
        this.photo = data.photo;
        this.leg_point = data.leg_point || 0;
    }

    static fromJson(json: any): CreateAnomalyDto {
        return new CreateAnomalyDto(json);
    }

    toJson(): any {
        return {
            anomaly_type: this.anomaly_type,
            category: this.category,
            description: this.description,
            photo: this.photo,
            leg_point: this.leg_point
        };
    }

    copyWith(updates: Partial<CreateAnomalyDto>): CreateAnomalyDto {
        return new CreateAnomalyDto({
            ...this.toJson(),
            ...updates
        });
    }
}


