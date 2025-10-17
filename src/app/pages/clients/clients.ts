import { Component, signal, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableConfig, TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';
// import { ClientDto, ClientMiniDto, ClientGroupDto } from '@dtos'; // Temporalmente comentado

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    TranslatePipe,
    DynamicTableComponent
  ],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients implements OnInit {
  // Input signals para recibir datos del backend
  clientsData = input<any[]>([]);
  groupsData = input<any[]>([]);

  groupsArray = signal<any[]>([]);

  listArray = signal<any[]>([]);

  showGroupsTable = signal(true);
  showListTable = signal(false);
  activeButton = signal<'groups' | 'list'>('groups');

  groupsTableConfig: TableConfig = {
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
    actions: {
      create: { label: 'clients.list.create-client', route: '/clients/create' }
    }
  };

  listTableConfig: TableConfig = {
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
        key: 'client_group',
        label: 'clients.list.group',
        type: 'text',
        width: 15
      },
      {
        key: 'CIF',
        label: 'clients.list.cif',
        type: 'text',
        width: 10
      },
      {
        key: 'created_at',
        label: 'clients.list.registration_date',
        type: 'text',
        width: 10
      },
      {
        key: 'department',
        label: 'clients.list.department-name',
        type: 'chip',
        width: 12,
        chipConfig: {
          type: 'department',
          translateKey: 'clients.list.department'
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
        key: 'contact_person_name',
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
        key: 'CIF',
        label: 'clients.list.cif_filter',
        type: 'text',
        width: 10
      },
      {
        key: 'created_at',
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
        options: this.listArray().map((item: any) => ({ value: item.contact_person_name || '', label: item.contact_person_name || '' }))
        
      },
      {
        key: 'name',
        label: 'clients.list.subentity_filter',
        type: 'select',
        width: 14,
        options: this.listArray().map((item: any) => ({ value: item.name, label: item.name }))
      }
    ],
    actions: {
      create: { label: 'clients.list.create-client', route: '/clients/create' }
    }
  };

  ngOnInit() {
    // Usar datos de input signals si están disponibles, sino usar datos mock
    const clientsData = this.clientsData();
    const groupsData = this.groupsData();
    
    this.groupsTableConfig.data = groupsData.length > 0 ? groupsData : this.groupsArray();
    this.listTableConfig.data = clientsData.length > 0 ? clientsData : this.listArray();
  }
  onClientsGroup() {
    this.showGroupsTable.set(true);
    this.showListTable.set(false);
    this.activeButton.set('groups');
  }
  onClientsList() {
    this.showGroupsTable.set(false);
    this.showListTable.set(true);
    this.activeButton.set('list');
  }

  onTableEvent(event: TableEvent) {
    switch (event.type) {
      case 'action':
        if (event.data?.action === 'edit') {
          this.edit(event.data.row);
        } else if (event.data?.action === 'delete') {
          this.delete(event.data.row);
        } else if (event.data?.action === 'view') {
          this.view(event.data.row);
        } else if (event.data?.action === 'add') {
          this.add(event.data.row);
        } else if (event.data?.action === 'activate') {
          this.createClient(event.data.row);
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
    console.log('Edit client:', element);
  }

  delete(element: any) {
    console.log('Delete client:', element);
  }

  view(element: any) {
    console.log('View client:', element);
  }

  add(element: any) {
    console.log('Add to client:', element);
  }

  createClient(element: any) {
    console.log('Create client:', element);
  }

  exportToCSV(data: any[]) {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const isGroupData = data[0]?.name !== undefined;
    
    let columns: string[];
    let headers: string[];
    let filename: string;

    if (isGroupData) {
      columns = ['name', 'country', 'assigned_admins'];
      headers = ['Nombre del Grupo', 'País', 'Usuarios Asignados'];
      filename = `grupos_clientes_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      columns = ['name', 'client_group', 'CIF', 'created_at', 'department', 'tags', 'contact_person_name'];
      headers = ['Nombre', 'Grupo', 'CIF', 'Fecha Alta', 'Departamento', 'Tags', 'Cliente Principal'];
      filename = `lista_clientes_${new Date().toISOString().split('T')[0]}.csv`;
    }

    let csvContent = headers.join(',') + '\n';
    
    data.forEach(item => {
      const row = columns.map(column => {
        let value = item[column] || '';
        if (Array.isArray(value)) {
          value = value.join('; ');
        }
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
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  

}
