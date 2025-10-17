export class ChangeVehiclePlateRequestDto {
    resend_plate?: boolean;
    license_plate: string;

    constructor(data: any = {}) {
        this.resend_plate = data.resend_plate;
        this.license_plate = data.license_plate || '';
    }

    static fromJson(json: any): ChangeVehiclePlateRequestDto {
        return new ChangeVehiclePlateRequestDto(json);
    }

    toJson(): any {
        return {
            resend_plate: this.resend_plate,
            license_plate: this.license_plate
        };
    }

    copyWith(updates: Partial<ChangeVehiclePlateRequestDto>): ChangeVehiclePlateRequestDto {
        return new ChangeVehiclePlateRequestDto({
            ...this.toJson(),
            ...updates
        });
    }
}