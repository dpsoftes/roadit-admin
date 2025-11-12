export class TransportHistoryListParamsDto{
    page?: number;
    page_size?: number;
    search?: string;
    reference_number?: string;
    transport_number?: string;
    reservation_number?: string;
    created_from?: string;
    departure_province?: string;
    arrival_province?: string;
    driver_email?: string;
    date_range_start?: string;
    date_range_end?: string;
    transport_principal_type?: string;
    tags?: number[];
    client_name?: string;
    transport_status?: string;
    driver_name?: string;
    duration_hours?: string;
    admin_name?: string;
    sort_column?: string;
    sort_direction?: 'asc' | 'desc';
}



export class TransportHistoryListItemDto {
    id: number;
    reference_number: string;
    reservation_number: string;
    client_name: string;
    transport_type: string | null;
    transport_status: string;
    transport_principal_type: string;
    price: string;
    origin_address: string;
    destination_address: string;
    kilometers: string;
    duration_hours: number;
    tags: number[];
    driver_name: string | null;
    admin_name: string;

    constructor(data: any = {}) {
        this.id = data.id || 0;
        this.reference_number = data.reference_number || '';
        this.reservation_number = data.reservation_number || '';
        this.client_name = data.client_name || '';
        this.transport_type = data.transport_type ?? null;
        this.transport_status = data.transport_status || '';
        this.transport_principal_type = data.transport_principal_type || '';
        this.price = data.price || '0.00';
        this.origin_address = data.origin_address || '';
        this.destination_address = data.destination_address || '';
        this.kilometers = data.kilometers || '0.00';
        this.duration_hours = data.duration_hours || 0;
        this.tags = data.tags || [];
        this.driver_name = data.driver_name ?? null;
        this.admin_name = data.admin_name || '';
    }

    static fromJson(json: any): TransportHistoryListItemDto {
        return new TransportHistoryListItemDto(json);
    }

    toJson(): any {
        return {
            id: this.id,
            reference_number: this.reference_number,
            reservation_number: this.reservation_number,
            client_name: this.client_name,
            transport_type: this.transport_type,
            transport_status: this.transport_status,
            transport_principal_type: this.transport_principal_type,
            price: this.price,
            origin_address: this.origin_address,
            destination_address: this.destination_address,
            kilometers: this.kilometers,
            duration_hours: this.duration_hours,
            tags: this.tags,
            driver_name: this.driver_name,
            admin_name: this.admin_name
        };
    }

    copyWith(updates: Partial<TransportHistoryListItemDto>): TransportHistoryListItemDto {
        return new TransportHistoryListItemDto({
            ...this.toJson(),
            ...updates
        });
    }
}
