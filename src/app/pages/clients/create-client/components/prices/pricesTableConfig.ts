import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';

export const pricesTableConfig: TableConfig = {
  columns: [
    { key: 'kmFrom', label: 'clients.create-client.km-from', type: 'text', width: '12%' },
    { key: 'kmTo', label: 'clients.create-client.km-to', type: 'text', width: '12%' },
    { key: 'priceType', label: 'clients.create-client.price-type', type: 'text', width: '16%' },
    { key: 'clientPrice', label: 'clients.create-client.standard-price-eur', type: 'text', width: '20%' },
    { key: 'priceVuLt12', label: 'clients.create-client.price-vu-lt-12', type: 'text', width: '20%' },
    { key: 'priceVuGt12', label: 'clients.create-client.price-vu-gt-12', type: 'text', width: '20%' },
    { key: 'actions', label: 'clients.list.actions', type: 'actions', width: '10%' }
  ],
  data: [],
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