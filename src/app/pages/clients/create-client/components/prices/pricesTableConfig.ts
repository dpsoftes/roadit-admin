import { signal } from '@angular/core';
import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';

export const pricesTableConfig: TableConfig = {
  columns: [
    { key: 'min_km', label: 'clients.create-client.km-from', type: 'text', width: '12%' },
    { key: 'max_km', label: 'clients.create-client.km-to', type: 'text', width: '12%' },
    { key: 'pricing_type', label: 'clients.create-client.price-type', type: 'text', width: '16%' },
    { key: 'standard_price', label: 'clients.create-client.standard-price-eur', type: 'text', width: '20%' },
    { key: 'small_vehicule_price', label: 'clients.create-client.price-vu-lt-12', type: 'text', width: '20%' },
    { key: 'big_vehicule_price', label: 'clients.create-client.price-vu-gt-12', type: 'text', width: '20%' },
    { key: 'actions', label: 'clients.list.actions', type: 'actions', width: '10%',actionConfig: {
          actions: [
            {
              icon: 'material-symbols-outlined/edit_square',
              label: 'Editar',
              color: 'warn',
              action: 'edit'
            },
            {
              icon: 'material-symbols-outlined/delete',
              label: 'Eliminar',
              color: 'error',
              action: 'delete'
            },
          ]
        } }
  ],
  data: signal([]),
  exportable: false,
  exportConfig: {
    columns: ['kmFrom','kmTo','priceType','clientPrice','priceVuLt12','priceVuGt12','actions'],
    headers: [
      'clients.create-client.km-from',
      'clients.create-client.km-to',
      'clients.create-client.price-type',
      'clients.create-client.standard-price-eur',
      'clients.create-client.price-vu-lt-12',
      'clients.create-client.price-vu-gt-12',
      'clients.list.actions'
    ],
    filename: 'clients-prices'
  },
  selectable: false,
  pagination: true,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50],
  searchable: false,
  filterable: false
};