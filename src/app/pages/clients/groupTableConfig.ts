import { TableConfig, ExportConfig } from "@components/dynamic-table/dynamic-table.interfaces";

export const groupsTableConfig: TableConfig = {
    columns: [
      {
        key: 'name',
        label: 'clients.list.group_name',
        type: 'text',
        width: 25
      },
      {
        key: 'country',
        label: 'clients.list.country-name',
        type: 'text',
        width: 25
      },
      {
        key: 'assigned_admins',
        label: 'clients.list.users_assigned',
        type: 'chip-array',
        width: 25,
        chipConfig: {
          type: 'custom',
          customClass: 'users-assigned-chip'
        }
      },
      {
        key: 'actions',
        label: 'clients.list.actions',
        type: 'actions',
        width: 25,
        actionConfig: {
          actions: [
            {
              icon: 'material-symbols-outlined/edit_square',
              label: 'Editar',
              color: 'warn',
              action: 'edit'
            },
            {
              icon: 'material-symbols-outlined/visibility',
              label: 'Ver',
              color: 'primary',
              action: 'view'
            },
            {
              icon: 'material-symbols-outlined/delete',
              label: 'Eliminar',
              color: 'error',
              action: 'delete'
            },
            {
              label: 'clients.list.create-client',
              color: 'accent',
              action: 'activate'
            }
          ]
        }
      }
    ],
    data: [],
    exportable: true,
    selectable: false,
    pagination: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    searchable: true,
    searchPlaceholder: 'clients.list.searchPlaceholder',
    filterable: true,
    filters: [
      {
        key: 'country',
        label: 'clients.list.country_filter',
        type: 'select',
        width: 40,
        options: [
          { value: 'ES', label: 'clients.list.country.ES' },
          { value: 'FR', label: 'clients.list.country.FR' },
          { value: 'PT', label: 'clients.list.country.PT' },
          { value: 'IT', label: 'clients.list.country.IT' },
          { value: 'DE', label: 'clients.list.country.DE' },
          { value: 'UK', label: 'clients.list.country.UK' },
          { value: 'NL', label: 'clients.list.country.NL' },
          { value: 'BE', label: 'clients.list.country.BE' },
          { value: 'CH', label: 'clients.list.country.CH' },
          { value: 'AT', label: 'clients.list.country.AT' },
        ]
      },
      {
        key: 'assigned_admins',
        label: 'clients.list.users_assigned_filter',
        type: 'text',
        width: 30,
        options: [
        ]
      }
    ],
    exportConfig: {
      columns: ['name', 'country', 'assigned_admins'],
      headers: ['Nombre del Grupo', 'País', 'Usuarios Asignados'],
      filename: `grupos_clientes_${new Date().toISOString().split('T')[0]}.csv`
    },
    actions: {
      create: { label: 'clients.list.create-client', route: '/clients/create' }
    }
  };