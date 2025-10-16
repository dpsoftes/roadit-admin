import { Component, signal, OnInit } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { TableConfig, TableEvent } from '../../components/dynamic-table/dynamic-table.interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    TranslatePipe,
    DynamicTableComponent
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {

  constructor(private router: Router) {}

  tableConfig: TableConfig = {
    columns: [
      {
        key: 'photo',
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
        key: 'lastname',
        label: 'users.list.lastname',
        type: 'text'
      },
      {
        key: 'email',
        label: 'users.list.email',
        type: 'text'
      },
      {
        key: 'role',
        label: 'users.list.role',
        type: 'chip',
        chipConfig: {
          type: 'role',
          translateKey: 'users.profile'
        }
      },
      {
        key: 'status',
        label: 'users.list.status',
        type: 'chip',
        chipConfig: {
          type: 'status',
          translateKey: 'users.profile'
        }
      },
      {
        key: 'department',
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
            }
          ]
        }
      }
    ],
    data: [],
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
          { value: 'PENDING', label: 'users.profile.PENDING' },
          { value: 'SUSPENDED', label: 'users.profile.SUSPENDED' }
        ]
      },
      {
        key: 'department',
        label: 'users.list.department',
        type: 'chips',
        multiple: false,
        options: [
          { value: 'IT', label: 'IT' },
          { value: 'Comercial', label: 'Comercial' },
          { value: 'Marketing', label: 'Marketing' },
          { value: 'Operaciones España', label: 'Operaciones España' }
        ]
      }
    ],
    exportable: true,
    actions: {
      create: {
        label: 'users.list.create-user',
        route: '/users/new'
      },
    }
  };

  ngOnInit() {
    this.tableConfig.data = this.usersArray();
  }

  onTableEvent(event: TableEvent) {
    switch (event.type) {
      case 'action':
        if (event.data?.action === 'edit') {
          this.edit(event.data.row);
        } else if (event.data?.action === 'delete') {
          this.delete(event.data.row);
        }
        break;
      case 'select':
        console.log('Selected items:', event.data?.selected);
        break;
      case 'filter':
        console.log('Filters applied:', event.data?.filters);
        break;
      case 'search':
        console.log('Search term:', event.data?.searchTerm);
        break;
      case 'export':
        this.exportToCSV(event.data?.data);
        break;
    }
  }

  edit(element: any) {
    this.router.navigate(['/users/edit-user', element.id]);
  }

  delete(element: any) {
    alert("Delete user: " + element.name);
  }

  exportToCSV(data: any[]) {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const columns = ['name', 'lastname', 'email', 'role', 'status', 'department'];
    const headers = ['Nombre', 'Apellidos', 'Email', 'Rol', 'Estado', 'Departamento'];

    let csvContent = headers.join(',') + '\n';
    
    data.forEach(user => {
      const row = columns.map(column => {
        let value = user[column] || '';
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
      });
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // clearFilters(): void {
  //   this.selectedRole = '';
  //   this.selectedStatus = '';
  //   this.selectedDepartment = '';
  // }

  // applyFilters(): void {
  //   console.log('Aplicando filtros:', {
  //     role: this.selectedRole,
  //     status: this.selectedStatus,
  //     department: this.selectedDepartment
  //   });
  // }
  usersArray = signal([
    {
      id: 1,
      name: 'Luis',
      lastname: 'García',
      email: 'luis.garcia@example.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      department: 'IT',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 2,
      name: 'María',
      lastname: 'Fernández',
      email: 'maria.fernandez@example.com',
      role: 'USER',
      status: 'ACTIVE',
      department: 'Comercial',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 3,
      name: 'Carlos',
      lastname: 'Ruiz',
      email: 'carlos.ruiz@example.com',
      role: 'DRIVER',
      status: 'INACTIVE',
      department: 'Marketing',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 4,
      name: 'Ana',
      lastname: 'Martín',
      email: 'ana.martin@example.com',
      role: 'USER',
      status: 'SUSPENDED',
      department: 'Recursos Humanos',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 5,
      name: 'Pedro',
      lastname: 'López',
      email: 'pedro.lopez@example.com',
      role: 'DRIVER',
      status: 'PENDING',
      department: 'Logística',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 6,
      name: 'Sofia',
      lastname: 'González',
      email: 'sofia.gonzalez@example.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      department: 'Finanzas',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 7,
      name: 'Miguel',
      lastname: 'Hernández',
      email: 'miguel.hernandez@example.com',
      role: 'USER',
      status: 'INACTIVE',
      department: 'Ventas',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 8,
      name: 'Laura',
      lastname: 'Jiménez',
      email: 'laura.jimenez@example.com',
      role: 'DRIVER',
      status: 'ACTIVE',
      department: 'Operaciones',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 9,
      name: 'David',
      lastname: 'Morales',
      email: 'david.morales@example.com',
      role: 'USER',
      status: 'ACTIVE',
      department: 'Soporte',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 10,
      name: 'Carmen',
      lastname: 'Vargas',
      email: 'carmen.vargas@example.com',
      role: 'ADMIN',
      status: 'INACTIVE',
      department: 'Calidad',
      photo: 'assets/images/sample_user_icon.png'
    }
  ]);
}
