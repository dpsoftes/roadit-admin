import { signal } from "@angular/core";
import { TableConfig } from "@components/index";

export const tableConfig: TableConfig = {
    columns: [
      {
        key: 'image',
        label: 'users.list.photo',
        type: 'image',
        imageConfig: {
          width: '40px',
          height: '40px',
          fallback: 'assets/images/sample_user_icon.png'
        }
      },
      {
        key: 'name',
        label: 'users.list.name',
        type: 'text'
      },
      {
        key: 'last_name',
        label: 'users.list.lastname',
        type: 'text'
      },
      {
        key: 'email',
        label: 'users.list.email',
        type: 'text'
      },
      {
        key: 'roles',
        label: 'users.list.role',
        type: 'chip',
        chipConfig: {
          type: 'role',
          translateKey: 'users.profile'
        }
      },
      {
        key: 'is_active',
        label: 'users.list.status',
        type: 'chip',
        chipConfig: {
          type: 'status',
          translateKey: 'users.profile'
        }
      },
      {
        key: 'departments',
        label: 'users.list.department',
        type: 'chip',
        chipConfig: {
          type: 'department'
        }
      },
      {
        key: 'actions',
        label: 'users.list.actions',
        type: 'actions',
        actionConfig: {
          actions: [
            {
              icon: 'material-symbols-outlined/delete',
              label: 'Eliminar',
              color: 'error',
              action: 'delete'
            },
            {
              icon: 'material-symbols-outlined/edit_square',
              label: 'Editar',
              color: 'warn',
              action: 'edit'
            }
          ]
        }
      }
    ],
    data: signal([]),
    selectable: true,
    pagination: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    searchable: true,
    searchPlaceholder: 'users.list.searchPlaceholder',
    filterable: true,
    filters: [
      {
        key: 'role',
        label: 'users.profile.role',
        type: 'select',
        options: [
          { value: 'ADMIN', label: 'users.profile.ADMIN' },
          { value: 'USER', label: 'users.profile.USER' },
          { value: 'CLIENT_USER', label: 'users.profile.CLIENT_USER' },
          { value: 'DRIVER', label: 'users.profile.DRIVER' }
        ]
      },
      {
        key: 'status',
        label: 'users.list.status',
        type: 'select',
        options: [
          { value: 'ACTIVE', label: 'users.profile.ACTIVE' },
          { value: 'INACTIVE', label: 'users.profile.INACTIVE' },
        ]
      },
    ],
    exportable: true,
    actions: {
      create: {
        label: 'users.list.create-user',
        route: '/users/new'
      },
    }
  };