import { Component, signal, inject, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@i18n/translate.pipe';
import {
  DpDatagridComponent,
  DpDatagridColumnsComponent,
  DpDatagridColumnComponent,
  DpDatagridFilterComponent,
  DpDatagridFilterContainerComponent,
  DpDatagridActionsComponent,
  DpDatagridActionComponent,
  LoadDataEvent,
  TableColumn
} from '@components/dp-datagrid';
import { TransportPrincipalType, transportPrincipalTypeDescriptions } from '../../../../core/enums/transport.enum';
import { TransportStore } from '@store/transports.state';
import { TransportHistoryListParamsDto } from '@dtos/transports/transport.dto';
import { GlobalStore } from '@store/global.state';
import { I18nService } from '@i18n/i18n.service';

@Component({
  selector: 'app-transports-assignment',
  imports: [
    TranslatePipe,
    RouterModule,
    DpDatagridComponent,
    DpDatagridColumnsComponent,
    DpDatagridColumnComponent,
    DpDatagridFilterComponent,
    DpDatagridFilterContainerComponent,
    DpDatagridActionsComponent,
    DpDatagridActionComponent,
  ],
  templateUrl: './transports-assignment.component.html',
  styleUrl: './transports-assignment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransportsAssignmentComponent {
  private router = inject(Router);
  private store = inject(TransportStore);
  private global = inject(GlobalStore);
  private i18n = inject(I18nService);

  historyList = signal<any[]>(this.store.history().map(item => item));
  transportsTotalRecords = signal<number>(this.store.historyTotalRecords());

  TransportPrincipalType = TransportPrincipalType;

  departureProvinces = signal<Array<{ value: string; label: string }>>([]);
  arrivalProvinces = signal<Array<{ value: string; label: string }>>([]);

  transportPrincipalTypeOptions = computed(() => {
    return [
      { value: TransportPrincipalType.SIMPLE_MOVEMENT, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.SIMPLE_MOVEMENT]) },
      { value: TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER]) },
      { value: TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER]) },
      { value: TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER]) },
      { value: TransportPrincipalType.WITH_STOPOVER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.WITH_STOPOVER]) }
    ];
  });

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
        icon: 'calendar_month',
        label: 'Gestionar cita',
        color: 'primary' as const,
        action: 'menu',
        onClick: (row: any) => this.onActionClick('menu', row)
      },
      {
        icon: 'back_hand',
        label: 'Gestionar conductor',
        color: 'primary' as const,
        action: 'edit',
        onClick: (row: any) => this.onActionClick('edit', row)
      },
      {
        icon: 'eye',
        label: 'Ver detalle',
        color: 'warn' as const,
        action: 'delete',
        onClick: (row: any) => this.onActionClick('delete', row)
      },
      {
        icon: 'menu',
        label: 'Más opciones',
        color: 'warn' as const,
        action: 'delete',
        onClick: (row: any) => this.onActionClick('delete', row)
      }
    ]
  };

  constructor() {
    effect(() => {
      this.historyList.set(this.store.history().map(item => {
        var { tags, ...resto } = item;
        var tagsNew: string[] = [];
        for (const t of tags) {
          tagsNew.push(this.global.tags().find(x => x.id === t)?.name[this.i18n.currentLanguage()] || '');
        }
        return { ...resto, tags: tagsNew };
      }));
      this.transportsTotalRecords.set(this.store.historyTotalRecords());
    });
  }

  loadTransportsFromServer($event: LoadDataEvent) {
    const currentParams = this.store.historyParams();
    const filters = $event.filters || {};

    const newParams: TransportHistoryListParamsDto = {
      ...currentParams,
      page: $event.page + 1,
      page_size: $event.pageSize,
      search: $event.searchTerm && $event.searchTerm.trim() !== '' ? $event.searchTerm.trim() : undefined,
      sort_column: $event.sortColumn || undefined,
      sort_direction: $event.sortDirection || undefined,
      reference_number: filters['reference_number'] && String(filters['reference_number']).trim() !== '' ? String(filters['reference_number']).trim() : undefined,
      transport_number: filters['transport_number'] && String(filters['transport_number']).trim() !== '' ? String(filters['transport_number']).trim() : undefined,
      reservation_number: filters['reservation_number'] && String(filters['reservation_number']).trim() !== '' ? String(filters['reservation_number']).trim() : undefined,
      created_from: filters['created_from'] || undefined,
      departure_province: filters['departure_province'] || undefined,
      arrival_province: filters['arrival_province'] || undefined,
      driver_email: filters['driver_email'] && String(filters['driver_email']).trim() !== '' ? String(filters['driver_email']).trim() : undefined,
      transport_principal_type: filters['transport_principal_type'] || undefined,
    };

    if (filters['date_range']) {
      if (typeof filters['date_range'] === 'object' && filters['date_range'] !== null) {
        const dateRange = filters['date_range'] as { from?: string; to?: string; start?: string; end?: string };
        newParams.date_range_start = dateRange.from || dateRange.start || undefined;
        newParams.date_range_end = dateRange.to || dateRange.end || undefined;
      } else {
        newParams.date_range_start = undefined;
        newParams.date_range_end = undefined;
      }
    } else {
      newParams.date_range_start = undefined;
      newParams.date_range_end = undefined;
    }

    if (filters['tags']) {
      if (Array.isArray(filters['tags']) && filters['tags'].length > 0) {
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
        const tagNumbers = filters['tags']
          .map((tag: any) => typeof tag === 'string' ? tagMap[tag] : tag)
          .filter((id: any) => typeof id === 'number');
        newParams.tags = tagNumbers.length > 0 ? tagNumbers : undefined;
      } else {
        newParams.tags = undefined;
      }
    } else {
      newParams.tags = undefined;
    }

    this.store.updateState({ historyParams: newParams });
    this.store.loadHistory();
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

  renderTransportType = (column: TableColumn, row: any): string => {
    const transportType = row.transport_principal_type;

    if (!transportType) {
      return '';
    }

    const translationKey = transportPrincipalTypeDescriptions[transportType as TransportPrincipalType];

    if (!translationKey) {
      return transportType;
    }

    const translated = this.i18n.translate(translationKey);

    return translated || transportType;
  }
}

