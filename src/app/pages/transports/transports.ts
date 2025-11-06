import { Component, signal, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import {
  DpDatagridComponent,
  DpDatagridColumnsComponent,
  DpDatagridColumnComponent,
  DpDatagridFilterComponent,
  DpDatagridFilterContainerComponent,
  DpDatagridActionsComponent,
  DpDatagridActionComponent,
  LoadDataEvent,
  PageChangeEvent,
  FilterChangeEvent
} from '@components/dp-datagrid';
import { TransportPrincipalType, TransportStatus } from '../../core/enums/transport.enum';
import { TransportsRetrieveResponse } from '../../core/dtos/transports/transports.dto';
import { transportsMockData } from './transports.mockdata';

type TransportData = TransportsRetrieveResponse;

interface FormattedTransportData {
  id: number;
  reference_number?: string | null;
  client_id?: number;
  client_name?: string;
  client_info: string;
  transport_principal_type: TransportPrincipalType;
  transport_status?: TransportStatus;
  init_date: string;
  end_date?: string;
  max_price: string;
  min_price: string;
  appointment_management: string;
  tags: string[];
  kilometers: string;
  reservation_number?: string | null;
  driver_name?: string | null;
  driver_id?: number | null;
  departure_address?: string;
  departure_province?: string;
  arrival_address?: string;
  arrival_province?: string;
  is_express?: boolean;
  invoiced?: boolean;
  is_blocked?: boolean;
}

@Component({
  selector: 'app-transports',
  imports: [
    TranslatePipe,
    TabsComponent,
    RouterModule,
    DpDatagridComponent,
    DpDatagridColumnsComponent,
    DpDatagridColumnComponent,
    DpDatagridFilterComponent,
    DpDatagridFilterContainerComponent,
    DpDatagridActionsComponent,
    DpDatagridActionComponent,
  ],
  templateUrl: './transports.html',
  styleUrl: './transports.scss'
})
export class Transports implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab = signal<string>('assignment');
  transports = signal<FormattedTransportData[]>([]);
  loading = signal<boolean>(false);

  TransportPrincipalType = TransportPrincipalType;

  departureProvinces = signal<Array<{ value: string; label: string }>>([]);
  arrivalProvinces = signal<Array<{ value: string; label: string }>>([]);

  actionsConfig = {
    actions: [
      {
        icon: 'lock',
        label: 'Bloquear',
        color: 'warn' as const,
        action: 'lock',
        onClick: (row: any) => this.onActionClick('lock', row)
      },
      {
        icon: 'more_vert',
        label: 'Más opciones',
        color: 'primary' as const,
        action: 'menu',
        onClick: (row: any) => this.onActionClick('menu', row)
      }
    ]
  };

  private mockData: TransportData[] = transportsMockData;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['tab'] === 'create') {
        this.activeTab.set('create');
      } else if(params['tab'] === 'assignment') {
        this.activeTab.set('assignment');
      } else if(params['tab'] === 'history') {
        this.activeTab.set('history');
      }
    });
    this.loadInitialData();
    this.updateProvinceOptions();
  }

  private loadInitialData() {
    const formattedData = this.formatTransportsData(this.mockData);
    this.transports.set(formattedData);
  }

  private formatTransportsData(data: TransportData[]): FormattedTransportData[] {
    return data.map(transport => {
      const firstLeg = transport.legs && transport.legs.length > 0 ? transport.legs[0] : null;
      const lastLeg = transport.legs && transport.legs.length > 0 ? transport.legs[transport.legs.length - 1] : null;
      
      return {
        id: transport.id,
        reference_number: transport.reference_number,
        client_id: transport.client_id,
        client_name: transport.client_name,
        client_info: transport.client_name || `Cliente ${transport.client_id || 'N/A'}`,
        transport_principal_type: transport.transport_principal_type,
        transport_status: transport.transport_status,
        init_date: firstLeg?.expected_departure_from ? this.formatDateTime(firstLeg.expected_departure_from) : 'N/A',
        end_date: lastLeg?.expected_arrival_to ? this.formatDateTime(lastLeg.expected_arrival_to) : undefined,
        max_price: 'N/A',
        min_price: 'N/A',
        appointment_management: transport.appointment_management ? 'Sí' : 'No',
        tags: this.formatTags(transport.tags),
        kilometers: transport.kilometers ? `${transport.kilometers} km` : 'N/A',
        reservation_number: transport.reservation_number,
        driver_name: transport.driver_name || undefined,
        driver_id: transport.driver_id || undefined,
        departure_address: firstLeg?.origin_address?.description,
        departure_province: firstLeg?.origin_address?.province,
        arrival_address: lastLeg?.destination_address?.description,
        arrival_province: lastLeg?.destination_address?.province,
        is_express: transport.is_express,
        invoiced: transport.invoiced,
        is_blocked: transport.is_blocked
      };
    });
  }

  private updateProvinceOptions() {
    const departureSet = new Set<string>();
    const arrivalSet = new Set<string>();

    this.mockData.forEach(transport => {
      if (transport.legs && transport.legs.length > 0) {
        const firstLeg = transport.legs[0];
        const lastLeg = transport.legs[transport.legs.length - 1];
        
        if (firstLeg.origin_address?.province) {
          departureSet.add(firstLeg.origin_address.province);
        }
        if (lastLeg.destination_address?.province) {
          arrivalSet.add(lastLeg.destination_address.province);
        }
      }
    });

    this.departureProvinces.set(
      Array.from(departureSet)
        .sort()
        .map(province => ({ value: province, label: province }))
    );

    this.arrivalProvinces.set(
      Array.from(arrivalSet)
        .sort()
        .map(province => ({ value: province, label: province }))
    );
  }

  onTabChange(tab: string) {
    if(tab === 'create') {
      this.router.navigate([`/transports/${tab}`]);
    } else {
      this.activeTab.set(tab);
    }
  }

  async onFilterChange(event: FilterChangeEvent) {
    this.loading.set(true);
    
    try {
      let filteredData = [...this.mockData];
      
      const customFilterKeys = ['transport_number', 'departure_province', 'arrival_province', 'tags'];
      const hasCustomFilters = customFilterKeys.some(key => {
        const value = event.filters[key];
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== null && value !== undefined && value !== '';
      });
      
      if (hasCustomFilters) {
        Object.keys(event.filters).forEach(key => {
          const value = event.filters[key];
          
          if (value === null || value === undefined || value === '') {
            return;
          }
          
          switch (key) {
            case 'transport_number':
              const transportId = parseInt(String(value), 10);
              if (!isNaN(transportId)) {
                filteredData = filteredData.filter(t => t.id === transportId);
              }
              break;
            case 'departure_province':
              filteredData = filteredData.filter(t => {
                if (t.legs && t.legs.length > 0) {
                  return t.legs[0].origin_address?.province === value;
                }
                return false;
              });
              break;
            case 'arrival_province':
              filteredData = filteredData.filter(t => {
                if (t.legs && t.legs.length > 0) {
                  const lastLeg = t.legs[t.legs.length - 1];
                  return lastLeg.destination_address?.province === value;
                }
                return false;
              });
              break;
            case 'tags':
              if (Array.isArray(value) && value.length > 0) {
                const tagMap: Record<string, number> = {
                  'urgent': 1,
                  'fragile': 2,
                  'heavy': 3,
                  'oversized': 4,
                  'hazardous': 5,
                  'temperature': 6,
                  'express': 7,
                  'standard': 8
                };
                const tagNumbers = value.map(tag => tagMap[tag] || tag).filter(id => typeof id === 'number');
                if (tagNumbers.length > 0) {
                  filteredData = filteredData.filter(t => 
                    t.tags.some(tagId => tagNumbers.includes(tagId))
                  );
                }
              }
              break;
          }
        });
        
        const formattedData = this.formatTransportsData(filteredData);
        this.transports.set(formattedData);
        
        this.updateProvinceOptionsFromData(filteredData);
      } else {
        const formattedData = this.formatTransportsData(this.mockData);
        this.transports.set(formattedData);
        this.updateProvinceOptionsFromData(this.mockData);
      }
      
    } catch (error) {
      console.error('Error filtering transports:', error);
    } finally {
      this.loading.set(false);
    }
  }

  private updateProvinceOptionsFromData(data: TransportData[]) {
    const departureSet = new Set<string>();
    const arrivalSet = new Set<string>();

    data.forEach(transport => {
      if (transport.legs && transport.legs.length > 0) {
        const firstLeg = transport.legs[0];
        const lastLeg = transport.legs[transport.legs.length - 1];
        
        if (firstLeg.origin_address?.province) {
          departureSet.add(firstLeg.origin_address.province);
        }
        if (lastLeg.destination_address?.province) {
          arrivalSet.add(lastLeg.destination_address.province);
        }
      }
    });

    this.departureProvinces.set(
      Array.from(departureSet)
        .sort()
        .map(province => ({ value: province, label: province }))
    );

    this.arrivalProvinces.set(
      Array.from(arrivalSet)
        .sort()
        .map(province => ({ value: province, label: province }))
    );
  }


  onActionClick(action: string, row: any) {
    console.log('Action clicked:', action, row);
    if (action === 'lock') {
    } else if (action === 'menu') {
    }
  }

  onCreateClick(event: any) {
    this.router.navigate(['/transports/create']);
  }

  private formatDateTime(date: Date | null | undefined): string {
    if (!date) return 'N/A';
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      8: 'standard',
      9: 'tag_9',
      10: 'tag_10',
      11: 'tag_11',
      13: 'tag_13'
    };
    
    return tags.map(tagId => tagMap[tagId] || `tag_${tagId}`);
  }
}
