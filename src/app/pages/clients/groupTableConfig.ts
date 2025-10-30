import { signal } from "@angular/core";
import { TableConfig, ExportConfig } from "@components/dynamic-table/dynamic-table.interfaces";
import { ISO_COUNTRIES, ISO_COUNTRIES_SELECT } from "@dtos/country-langs.dto";

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

          ]
        }
      }
    ],
    data: signal([]),
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
        options: ISO_COUNTRIES_SELECT, 
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
      create: { label: 'clients.list.create-group', route: '/clients/create-group' }
    }
  };