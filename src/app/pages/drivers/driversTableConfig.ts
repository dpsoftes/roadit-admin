import { signal } from "@angular/core";
import { TableConfig } from "@components/dynamic-table/dynamic-table.interfaces";

export const createDriversTableConfig = (listArray: any[]): TableConfig => ({
  columns: [
    {
      key: 'image',
      label: 'drivers.list.image',
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
      label: 'drivers.list.name',
      type: 'text',
      width: 10
    },
    {
      key: 'dni',
      label: 'drivers.list.dni',
      type: 'text',
      width: 10
    },
    {
      key: 'cif',
      label: 'drivers.list.cif',
      type: 'text',
      width: 10
    },
    {
      key: 'province',
      label: 'drivers.list.province',
      type: 'text',
      width: 10,
      align: 'center'
    },
    {
      key: 'city',
      label: 'drivers.list.city',
      type: 'text',
      width: 10,
      // align: 'center'
    },
    {
      key: 'email',
      label: 'drivers.list.email',
      type: 'text',
      width: 12,
    },
    {
      key: 'phone',
      label: 'drivers.list.phone',
      type: 'text',
      width: 12
    },
    {
      key: 'created_datetime',
      label: 'drivers.list.created_datetime',
      type: 'text',
      width: 10
    },
    {
      key: 'rating',
      label: 'drivers.list.rating',
      type: 'text',
      width: 12,
      align: 'center'
    },
    {
      key: 'tags',
      label: 'drivers.list.tags',
      type: 'chip',
      width: 8,
      chipConfig: {
        type: 'tags',
        translateKey: 'drivers.list.tags'
      }
    },
    {
      key: 'validated',
      label: 'drivers.list.validated',
      type: 'chip',
      width: 13,
      chipConfig: {
        type: 'status',
        translateKey: 'drivers.list.status'
      }
    },
    {
      key: 'fortnightEarnings',
      label: 'drivers.list.fortnight_earnings',
      type: 'text',
      width: 13
    },
    {
      key: 'is_active',
      label: 'drivers.list.status',
      type: 'chip',
      width: 9,
      chipConfig: {
        type: 'status',
        translateKey: 'drivers.isActive'
      }
    },
    {
      key: 'actions',
      label: 'drivers.list.actions',
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
            icon: 'material-symbols-outlined/delete',
            label: 'Eliminar',
            color: 'error',
            action: 'delete'
          }
        ]
      }
    }
  ],
  data: signal([]),
  exportable: true,
  selectable: false,
  pagination: true,
  pageSize: 5,
  pageSizeOptions: [5, 10, 20, 50],
  searchable: true,
  searchPlaceholder: 'drivers.list.searchPlaceholder',
  filterable: true,
  filters: [
    {
      key: 'name',
      label: 'drivers.list.name',
      type: 'text',
      width: 12
    },
    {
      key: 'email',
      label: 'drivers.list.email',
      type: 'text',
      width: 20,
    },
    {
      key: 'tags',
      label: 'drivers.list.tags',
      type: 'chips',
      multiple: true,
      width: 20,
      options: [
        { value: '1', label: 'tag_1' },
        { value: '2', label: 'tag_2' },
        { value: '3', label: 'tag_3' }
      ]
    },
    {
      key: 'is_active',
      label: 'drivers.list.is_active',
      type: 'select',
      options: [
        { value: 'ACTIVE', label: 'drivers.profile.ACTIVE' },
        { value: 'INACTIVE', label: 'drivers.profile.INACTIVE' },
      ]
    },
    {
      key: 'validated',
      label: 'drivers.list.validated',
      type: 'select',
      options: [
        { value: 'VALIDATE', label: 'drivers.profile.VALIDATE' },
        { value: 'NO_VALIDATE', label: 'drivers.profile.NO_VALIDATE' },
      ]
    },
    {
      key: 'rating',
      label: 'drivers.list.rating',
      type: 'text',
      width: 8
    },
    {
      key: 'phone',
      label: 'drivers.list.phone',
      type: 'text',
      width: 12
    },
    {
      key: 'city',
      label: 'drivers.list.city',
      type: 'text',
      width: 12,
    },
    {
      key: 'province',
      label: 'drivers.list.province',
      type: 'text',
      width: 10
    },
    {
      key: 'expiredDocuments',
      label: 'drivers.list.expiredDocuments',
      type: 'checkbox',
      width: 18
    },
    {
      key: 'newDocuments',
      label: 'drivers.list.newDocuments',
      type: 'checkbox',
      width: 18
    },
  ],
  exportConfig: {
    columns: ['name', 'dni', 'cif', 'province', 'city', 'email', 'phone', 'ratings', 'tags', 'validated', 'fortnight_earnings', 'is_active'],
    headers: ['Nombre', 'DNI', 'CIF', 'Provincia', 'Ciudad', 'Email', 'Telefono', 'Puntuación', 'Tags', 'Validación', 'Factura quincenal', 'Estado'],
    filename: `lista_conductores_${new Date().toISOString().split('T')[0]}.csv`
  },
  actions: {
    create: { label: 'drivers.list.create-driver', route: '/drivers/create-driver' }
  }
});
