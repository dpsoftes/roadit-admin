import { Injectable, signal, computed } from '@angular/core';
import { TransportPrincipalType, TransportStatus } from '../../core/enums/transport.enum';

export interface TransportsListRequest {
  admin_id?: number;
  appointment_management?: boolean;
  arrival_address?: string;
  arrival_country?: string;
  arrival_province?: string;
  cancelled?: boolean;
  client_id?: number;
  created_from?: Date;
  created_to?: Date;
  departure_address?: string;
  departure_country?: string;
  departure_province?: string;
  driver_name?: string;
  driver_id?: number;
  end_date?: Date;
  fuel_included?: boolean;
  init_date?: Date;
  invoiced?: boolean;
  is_blocked?: boolean;
  is_express?: boolean;
  max_kilometers?: number;
  max_price?: number;
  min_kilometers?: number;
  min_price?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  reference_number?: string;
  reservation_number?: string;
  search?: string;
  tags?: number[];
  transport_principal_type?: string;
  transport_status?: string;
  vehicle_id?: number;
  [property: string]: any;
}

export interface TransportResponse {
  id: number;
  reference_number: string;
  client_id?: number;
  client_info?: string;
  transport_principal_type: TransportPrincipalType;
  transport_status: TransportStatus;
  init_date: string;
  end_date?: string;
  max_price?: number;
  min_price?: number;
  appointment_management: boolean;
  tags: number[];
  max_kilometers?: number;
  min_kilometers?: number;
  kilometers?: number;
  reservation_number?: string;
  driver_name?: string;
  driver_id?: number;
  departure_address?: string;
  departure_province?: string;
  departure_country?: string;
  arrival_address?: string;
  arrival_province?: string;
  arrival_country?: string;
  created_from?: string;
  created_to?: string;
  is_express?: boolean;
  fuel_included?: boolean;
  invoiced?: boolean;
  cancelled?: boolean;
  is_blocked?: boolean;
}

export interface TransportsApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: TransportResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class TransportsService {
  // Signals para el estado de los datos
  private _transports = signal<TransportResponse[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);
  private _totalCount = signal<number>(0);
  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(10);
  private _filters = signal<TransportsListRequest>({});
  private _searchTerm = signal<string>('');

  // Signals públicos (readonly)
  public readonly transports = this._transports.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();
  public readonly totalCount = this._totalCount.asReadonly();
  public readonly currentPage = this._currentPage.asReadonly();
  public readonly pageSize = this._pageSize.asReadonly();
  public readonly filters = this._filters.asReadonly();
  public readonly searchTerm = this._searchTerm.asReadonly();

  // Computed signals
  public readonly hasTransports = computed(() => this._transports().length > 0);
  public readonly isEmpty = computed(() => !this.loading() && this._transports().length === 0);
  public readonly hasError = computed(() => this._error() !== null);
  public readonly totalPages = computed(() => Math.ceil(this._totalCount() / this._pageSize()));
  public readonly hasNextPage = computed(() => this._currentPage() < this.totalPages());
  public readonly hasPreviousPage = computed(() => this._currentPage() > 1);

  // Computed para datos procesados para la tabla
  public readonly processedTransports = computed(() => {
    return this._transports().map(transport => ({
      ...transport,
      client_info: this.formatClientInfo(transport),
      init_date: this.formatDateTime(transport.init_date),
      max_price: this.formatPrice(transport.max_price),
      min_price: this.formatPrice(transport.min_price),
      appointment_management: transport.appointment_management ? 'Sí' : 'No',
      kilometers: this.formatKilometers(transport),
      tags: this.formatTags(transport.tags)
    }));
  });

  // Métodos para actualizar el estado
  async loadTransports(request: TransportsListRequest = {}): Promise<void> {
    this._loading.set(true);
    this._error.set(null);
    this._filters.set(request);

    try {
      // Aquí iría la llamada real a la API
      // const response = await this.httpClient.get<TransportsApiResponse>('/api/transports', { params: request });
      
      // Por ahora usar datos mock
      const mockResponse = this.getMockData(request);
      
      this._transports.set(mockResponse.results);
      this._totalCount.set(mockResponse.count);
      this._currentPage.set(request.page || 1);
      this._pageSize.set(request.page_size || 10);
      
    } catch (error) {
      this._error.set('Error al cargar los transportes');
      console.error('Error loading transports:', error);
    } finally {
      this._loading.set(false);
    }
  }

  async searchTransports(searchTerm: string): Promise<void> {
    this._searchTerm.set(searchTerm);
    const currentFilters = this._filters();
    await this.loadTransports({ ...currentFilters, search: searchTerm });
  }

  async applyFilters(filters: Partial<TransportsListRequest>): Promise<void> {
    const currentFilters = this._filters();
    const newFilters = { ...currentFilters, ...filters, page: 1 }; // Reset to first page
    await this.loadTransports(newFilters);
  }

  async changePage(page: number): Promise<void> {
    const currentFilters = this._filters();
    await this.loadTransports({ ...currentFilters, page });
  }

  async changePageSize(size: number): Promise<void> {
    const currentFilters = this._filters();
    await this.loadTransports({ ...currentFilters, page_size: size, page: 1 });
  }

  async refreshTransports(): Promise<void> {
    const currentFilters = this._filters();
    await this.loadTransports(currentFilters);
  }

  // Métodos para formatear datos
  private formatClientInfo(transport: TransportResponse): string {
    return transport.client_info || `Cliente ${transport.client_id || 'N/A'}`;
  }

  private formatDateTime(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private formatPrice(price?: number): string {
    if (!price) return 'N/A';
    return `€${price.toFixed(2)}`;
  }

  private formatKilometers(transport: TransportResponse): string {
    const minKm = transport.min_kilometers;
    const maxKm = transport.max_kilometers;
    
    if (minKm && maxKm) {
      return `${minKm}-${maxKm} km`;
    } else if (maxKm) {
      return `${maxKm} km`;
    } else if (minKm) {
      return `${minKm}+ km`;
    }
    return 'N/A';
  }

  private formatTags(tags: number[]): string[] {
    const tagMap: Record<number, string> = {
      1: 'urgent',
      2: 'fragile',
      3: 'heavy',
      4: 'oversized',
      5: 'hazardous',
      6: 'temperature',
      7: 'express',
      8: 'standard'
    };
    
    return tags.map(tagId => tagMap[tagId] || `tag_${tagId}`);
  }

  // Método para obtener datos mock (temporal)
  private getMockData(request: TransportsListRequest): TransportsApiResponse {
    const mockTransports: TransportResponse[] = [
      {
        id: 1,
        reference_number: 'REF-2024-001',
        client_id: 101,
        client_info: 'Empresa ABC / Sucursal Madrid',
        transport_principal_type: TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER,
        transport_status: TransportStatus.PENDING,
        init_date: '2024-01-15T14:30:00Z',
        max_price: 450.00,
        min_price: 420.00,
        appointment_management: true,
        tags: [1, 2],
        max_kilometers: 25,
        min_kilometers: 20,
        reservation_number: 'BUD-2024-001',
        driver_name: 'Juan Pérez',
        driver_id: 201,
        departure_province: 'madrid',
        arrival_province: 'barcelona',
        is_express: true
      },
      {
        id: 2,
        reference_number: 'REF-2024-002',
        client_id: 102,
        client_info: 'Corporación XYZ / Oficina Barcelona',
        transport_principal_type: TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER,
        transport_status: TransportStatus.PLANIFIED,
        init_date: '2024-01-16T09:15:00Z',
        max_price: 380.00,
        min_price: 350.00,
        appointment_management: false,
        tags: [7, 6],
        max_kilometers: 45,
        min_kilometers: 40,
        reservation_number: 'BUD-2024-002',
        driver_name: 'María García',
        driver_id: 202,
        departure_province: 'barcelona',
        arrival_province: 'valencia',
        fuel_included: true
      }
    ];

    return {
      count: mockTransports.length,
      results: mockTransports
    };
  }

  // Métodos de utilidad
  clearError(): void {
    this._error.set(null);
  }

  resetFilters(): void {
    this._filters.set({});
    this._searchTerm.set('');
    this._currentPage.set(1);
  }
}
