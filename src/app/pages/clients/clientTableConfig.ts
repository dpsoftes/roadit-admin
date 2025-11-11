import { signal } from "@angular/core";
import { TableConfig, ExportConfig } from "@components/dynamic-table/dynamic-table.interfaces";

export const createClientTableConfig = (listArray: any[]): TableConfig => ({
    columns: [
      {
        key: 'logo',
        label: 'clients.list.logo',
        type: 'image',
        width: 8,
        imageConfig: {
          width: '40px',
          height: '40px',
          alt: 'Logo del cliente',
          fallback: 'assets/images/sample_user_icon.png'
        }
      },
      {
        key: 'name',
        label: 'clients.list.name',
        type: 'text',
        width: 12
      },
      {
        key: 'cif',
        label: 'clients.list.cif',
        type: 'text',
        width: 12
      },
      {
        key: 'created_date',
        label: 'clients.list.registration_date',
        type: 'text',
        width: 12
      },
      {
        key: 'department',
        label: 'clients.list.department-name',
        type: 'chip',
        width: 12,
        chipConfig: {
          type: 'department'
        }
      },
      {
        key: 'tags',
        label: 'clients.list.tags',
        type: 'chip-array',
        width: 10,
        chipConfig: {
          type: 'tags'
        }
      },
      {
        key: 'parent_name',
        label: 'clients.list.main_client',
        type: 'text',
        width: 13
      },
      {
        key: 'actions',
        label: 'clients.list.actions',
        type: 'actions',
        width: 10,
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
        key: 'client_group',
        label: 'clients.list.group_filter',
        type: 'select',
        width: 12,
        options: [
          { value: 'Grupo Empresarial Madrid', label: 'Grupo Empresarial Madrid' },
          { value: 'Corporación Barcelona', label: 'Corporación Barcelona' },
          { value: 'Grupo Internacional París', label: 'Grupo Internacional París' },
          { value: 'Empresa Lisboa', label: 'Empresa Lisboa' },
          { value: 'Corporación Roma', label: 'Corporación Roma' }
        ]
      },
      {
        key: 'cif',
        label: 'clients.list.cif_filter',
        type: 'text',
        width: 10
      },
      {
        key: 'created_date',
        label: 'clients.list.registration_date_filter',
        type: 'date',
        width: 12
      },
      {
        key: 'department',
        label: 'clients.list.department_filter',
        type: 'select',
        width: 15,
        options: [
          { value: 'IT', label: 'clients.list.department.IT' },
          { value: 'HR', label: 'clients.list.department.HR' },
          { value: 'Finance', label: 'clients.list.department.Finance' },
          { value: 'Operations', label: 'clients.list.department.Operations' },
          { value: 'Sales', label: 'clients.list.department.Sales' }
        ]
      },
      {
        key: 'tags',
        label: 'clients.list.tags_filter',
        type: 'chips',
        multiple: true,
        width: 20,
        options: [
          { value: 'nuevo', label: 'Nuevo' },
          { value: 'en_riesgo', label: 'En Riesgo' },
          { value: 'seguro_propio', label: 'Seguro Propio' }
        ]
      },
      {
        key: 'contact_person_name',
        label: 'clients.list.main_client_filter',
        type: 'select',
        width: 10,
        options: listArray.map((item: any) => ({ value: item.contact_person_name || '', label: item.contact_person_name || '' }))
        
      },
      {
        key: 'name',
        label: 'clients.list.subentity_filter',
        type: 'select',
        width: 14,
        options: listArray.map((item: any) => ({ value: item.name, label: item.name }))
      }
    ],
    exportConfig: {
      columns: ['name', 'cif', 'created_date', 'department', 'tags', 'parent_name'],
      headers: ['Nombre', 'CIF', 'Fecha Alta', 'Departamento', 'Tags', 'Cliente Principal'],
      filename: `lista_clientes_${new Date().toISOString().split('T')[0]}.csv`
    },
    actions: {
      create: { label: 'clients.list.create-client', route: '/clients/create-client' }
    }
  });