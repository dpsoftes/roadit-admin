import { Component, signal, inject, effect, computed, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import {
  DpDatagridComponent,
  DpDatagridColumnsComponent,
  DpDatagridColumnComponent,
  DpDatagridFilterComponent,
  DpDatagridFilterContainerComponent,
  LoadDataEvent,
  TableColumn
} from '@components/dp-datagrid';
import { TransportPrincipalType, transportPrincipalTypeDescriptions, TransportStatus, transportStatusDescriptions } from '../../../../core/enums/transport.enum';
import { TransportStore } from '@store/transports.state';
import { TransportHistoryListParamsDto } from '@dtos/transports/transport.dto';
import { GlobalStore } from '@store/global.state';
import { I18nService } from '@i18n/i18n.service';
import { ModalService } from '@services/modal.service';
import { TransportOptionsModalComponent, TransportOption } from './transport-options-modal.component';

@Component({
  selector: 'app-transports-history',
  imports: [
    TranslatePipe,
    DpDatagridComponent,
    DpDatagridColumnsComponent,
    DpDatagridColumnComponent,
    DpDatagridFilterComponent,
    DpDatagridFilterContainerComponent,
  ],
  templateUrl: './transports-history.component.html',
  styleUrl: './transports-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransportsHistoryComponent {
  private store = inject(TransportStore);
  private global = inject(GlobalStore);
  private i18n = inject(I18nService);
  private modalService = inject(ModalService);

  historyList = signal<any[]>(this.store.history().map(item => item));
  transportsTotalRecords = signal<number>(this.store.historyTotalRecords());

  TransportPrincipalType = TransportPrincipalType;
  TransportStatus = TransportStatus;

  transportPrincipalTypeOptions = computed(() => {
    return [
      { value: TransportPrincipalType.SIMPLE_MOVEMENT, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.SIMPLE_MOVEMENT]) },
      { value: TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER]) },
      { value: TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER]) },
      { value: TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER]) },
      { value: TransportPrincipalType.WITH_STOPOVER, label: this.i18n.translate(transportPrincipalTypeDescriptions[TransportPrincipalType.WITH_STOPOVER]) }
    ];
  });

  transportStatusOptions = computed(() => {
    return [
      { value: TransportStatus.PENDING, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.PENDING]) },
      { value: TransportStatus.PLANIFIED, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.PLANIFIED]) },
      { value: TransportStatus.IN_COURSE, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.IN_COURSE]) },
      { value: TransportStatus.FINISHED, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.FINISHED]) },
      { value: TransportStatus.CANCELLED, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.CANCELLED]) },
      { value: TransportStatus.DELETED, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.DELETED]) },
      { value: TransportStatus.EXPIRED, label: this.i18n.translate(transportStatusDescriptions[TransportStatus.EXPIRED]) }
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
        onClick: (row: any) => this.onActionClick('calendar', row)
      },
      {
        icon: 'back_hand',
        label: 'Menu',
        color: 'primary' as const,
        action: 'edit',
        onClick: (row: any) => this.onActionClick('hand', row)
      },
      {
        icon: 'visibility',
        label: 'Timeline',
        color: 'warn' as const,
        action: 'delete',
        onClick: (row: any) => this.onActionClick('visibility', row)
      },
      {
        icon: 'menu',
        label: 'Más opciones',
        color: 'warn' as const,
        action: 'delete',
        onClick: (row: any) => this.onActionClick('menu', row)
      }
    ]
  };

  constructor() {
    effect(() => {
      this.historyList.set(this.store.history().map(item => {
        var { tags, transport_status, ...resto } = item;
        var tagsNew: string[] = [];
        for (const t of tags) {
          tagsNew.push(this.global.tags().find(x => x.id === t)?.name[this.i18n.currentLanguage()] || '');
        }

        var statusNew: Array<{ value: string; label: string }> = [];
        if (transport_status && typeof transport_status === 'string' && transport_status.trim() !== '') {
          const translationKey = transportStatusDescriptions[transport_status as TransportStatus];
          const translated = translationKey ? this.i18n.translate(translationKey) : transport_status;
          statusNew = [{ value: transport_status, label: translated }];
        }

        return { ...resto, tags: tagsNew, status: statusNew };
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
      client_name: filters['client_name'] && String(filters['client_name']).trim() !== '' ? String(filters['client_name']).trim() : undefined,
      driver_name: filters['driver_name'] && String(filters['driver_name']).trim() !== '' ? String(filters['driver_name']).trim() : undefined,
      admin_name: filters['admin_name'] && String(filters['admin_name']).trim() !== '' ? String(filters['admin_name']).trim() : undefined,
      duration_hours: filters['duration_hours'] && String(filters['duration_hours']).trim() !== '' ? String(filters['duration_hours']).trim() : undefined,
      transport_principal_type: filters['transport_principal_type'] || undefined,
    };

    if (filters['status']) {
      if (Array.isArray(filters['status']) && filters['status'].length > 0) {
        newParams.transport_status = String(filters['status'][0]);
      } else if (typeof filters['status'] === 'string') {
        newParams.transport_status = filters['status'];
      } else {
        newParams.transport_status = undefined;
      }
    } else {
      newParams.transport_status = undefined;
    }

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
    if (action === 'lock') {
    } else if (action === 'menu') {
    } else if (action === 'hand') {
      this.openTransportOptionsModal(row);
    } else if (action === 'visibility') {
      this.openVisibilityOptionsModal(row);
    }
  }

  openTransportOptionsModal(transport: any) {
    const options: TransportOption[] = [
      { id: 'summary', label: 'transports.history.options.summary', hasChevron: true },
      { id: 'modify', label: 'transports.history.options.modify', hasChevron: true },
      { id: 'modify_plate', label: 'transports.history.options.modify_plate', hasChevron: true },
      { id: 'modify_price', label: 'transports.history.options.modify_price', hasChevron: false },
      { id: 'add_return', label: 'transports.history.options.add_return', hasChevron: true },
      { id: 'manage_reservation', label: 'transports.history.options.manage_reservation', hasChevron: true },
      { id: 'unassigned_drivers', label: 'transports.history.options.unassigned_drivers', hasChevron: true },
      { id: 'regularizations', label: 'transports.history.options.regularizations', hasChevron: true },
      { id: 'add_quality_incident', label: 'transports.history.options.add_quality_incident', hasChevron: true },
      { id: 'duplicate', label: 'transports.history.options.duplicate', hasChevron: false },
      { id: 'cancel', label: 'transports.history.options.cancel', hasChevron: false },
      { id: 'delete', label: 'transports.history.options.delete', icon: 'delete', iconColor: 'warn', hasChevron: false }
    ];
    
    try {
      const dialogRef = this.modalService.open({
        component: TransportOptionsModalComponent,
        componentInputs: {
          transport: transport,
          options: options
        },
        width: '450px',
        showActions: false,
        hideTitle: true
      });

      dialogRef.afterClosed().subscribe((result: { optionId: string; transport: any } | undefined) => {
        if (result) {
          this.handleTransportOption(result.optionId, result.transport);
        }
      });
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  openVisibilityOptionsModal(transport: any) {
    const options: TransportOption[] = [
      { id: 'timeline', label: 'transports.history.options.timeline', hasChevron: true },
      { id: 'budget_history', label: 'transports.history.options.budget_history', hasChevron: true }
    ];
    
    try {
      const dialogRef = this.modalService.open({
        component: TransportOptionsModalComponent,
        componentInputs: {
          transport: transport,
          options: options
        },
        width: '450px',
        showActions: false,
        hideTitle: true
      });

      dialogRef.afterClosed().subscribe((result: { optionId: string; transport: any } | undefined) => {
        if (result) {
          this.handleVisibilityOption(result.optionId, result.transport);
        }
      });
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  handleTransportOption(optionId: string, transport: any) {
    switch (optionId) {
      case 'summary':
        break;
      case 'modify':
        break;
      case 'modify_plate':
        break;
      case 'modify_price':
        break;
      case 'add_return':
        break;
      case 'manage_reservation':
        break;
      case 'unassigned_drivers':
        break;
      case 'regularizations':
        break;
      case 'add_quality_incident':
        break;
      case 'duplicate':
        break;
      case 'cancel':
        break;
      case 'delete':
        break;
    }
  }

  handleVisibilityOption(optionId: string, transport: any) {
    switch (optionId) {
      case 'timeline':
        break;
      case 'budget_history':
        break;
    }
  }

  renderDuration = (column: TableColumn, row: any): string => {
    const kilometers = row.kilometers || '0';
    const durationHours = row.duration_hours || 0;

    const kmValue = parseFloat(kilometers);
    const kmFormatted = kmValue >= 1000
      ? kmValue.toLocaleString('es-ES', { maximumFractionDigits: 0, useGrouping: true })
      : kmValue.toLocaleString('es-ES', { maximumFractionDigits: 1, minimumFractionDigits: 0 });

    const hoursFormatted = durationHours.toLocaleString('es-ES', {
      maximumFractionDigits: 1,
      minimumFractionDigits: durationHours % 1 === 0 ? 0 : 1
    });

    const hoursLabel = this.i18n.translate('transports.history.hours');

    return `
      <div style="display: flex; flex-direction: column; color: #424242; font-size: 13px; line-height: 1.5;">
        <div>${kmFormatted} km</div>
        <div>${hoursFormatted} ${hoursLabel}</div>
      </div>
    `;
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

