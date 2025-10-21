import { Component, signal, OnInit } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { TableConfig, TableEvent } from '../../components/dynamic-table/dynamic-table.interfaces';
import { Router } from '@angular/router';
import { tableConfig } from './configTable';
import { AdminProvider } from '@providers';
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

  constructor(private router: Router, private adminProvider: AdminProvider) {}

  tableConfig: TableConfig = tableConfig;

  async ngOnInit() {
    var data = await this.adminProvider.getAdmins();
    

    this.tableConfig.data.set(data?.results as any[]);
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
