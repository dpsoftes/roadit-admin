import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableConfig, TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';

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

  groupsArray = signal([
    {
      id: 1,
      group_name: 'Grupo Empresarial Madrid',
      country: 'España',
      users_assigned: ['Juan Pérez', 'María García', 'Carlos López']
    },
    {
      id: 2,
      group_name: 'Corporación Barcelona',
      country: 'España',
      users_assigned: ['Ana Martín', 'Pedro Ruiz', 'Sofia González', 'Juan Pérez', 'María García', 'Carlos López']
    },
    {
      id: 3,
      group_name: 'Grupo Internacional París',
      country: 'Francia',
      users_assigned: ['Pierre Dubois', 'Marie Leclerc', 'Jean Martin']
    },
    {
      id: 4,
      group_name: 'Empresa Lisboa',
      country: 'Portugal',
      users_assigned: ['João Silva', 'Maria Santos', 'António Costa']
    },
    {
      id: 5,
      group_name: 'Corporación Roma',
      country: 'Italia',
      users_assigned: ['Marco Rossi', 'Giulia Bianchi', 'Francesco Ferrari']
    },
    {
      id: 6,
      group_name: 'Grupo Empresarial Berlín',
      country: 'Alemania',
      users_assigned: ['Hans Mueller', 'Anna Schmidt', 'Klaus Weber']
    },
    {
      id: 7,
      group_name: 'Empresa Londres',
      country: 'Reino Unido',
      users_assigned: ['John Smith', 'Emma Johnson', 'Michael Brown']
    },
    {
      id: 8,
      group_name: 'Corporación Amsterdam',
      country: 'Países Bajos',
      users_assigned: ['Jan de Vries', 'Lisa van der Berg', 'Tom Bakker']
    }
  ]);

  listArray = signal([
    {
      id: 1,
      logo: 'assets/images/sample_user_icon.png',
      name: 'TechCorp Solutions',
      group: 'Grupo Empresarial Madrid',
      cif: 'A12345678',
      registration_date: '2023-01-15',
      department: 'IT',
      tags: ['nuevo', 'seguro_propio'],
      main_client: 'Juan Pérez'
    },
    {
      id: 2,
      logo: 'assets/images/sample_user_icon.png',
      name: 'InnovateLab',
      group: 'Corporación Barcelona',
      cif: 'B87654321',
      registration_date: '2023-02-20',
      department: 'Operations',
      tags: ['nuevo'],
      main_client: 'María García'
    },
    {
      id: 3,
      logo: 'assets/images/sample_user_icon.png',
      name: 'GlobalTrade Ltd',
      group: 'Grupo Internacional París',
      cif: 'C11223344',
      registration_date: '2023-03-10',
      department: 'Sales',
      tags: ['en_riesgo', 'seguro_propio'],
      main_client: 'Pierre Dubois'
    },
    {
      id: 4,
      logo: 'assets/images/sample_user_icon.png',
      name: 'FinancePro',
      group: 'Empresa Lisboa',
      cif: 'D55667788',
      registration_date: '2023-04-05',
      department: 'Finance',
      tags: ['seguro_propio'],
      main_client: 'João Silva'
    },
    {
      id: 5,
      logo: 'assets/images/sample_user_icon.png',
      name: 'HR Solutions',
      group: 'Corporación Roma',
      cif: 'E99887766',
      registration_date: '2023-05-12',
      department: 'HR',
      tags: ['en_riesgo'],
      main_client: 'Marco Rossi'
    },
    {
      id: 6,
      logo: 'assets/images/sample_user_icon.png',
      name: 'DataAnalytics Inc',
      group: 'Grupo Empresarial Madrid',
      cif: 'F44332211',
      registration_date: '2023-06-18',
      department: 'IT',
      tags: ['nuevo', 'en_riesgo'],
      main_client: 'Carlos López'
    },
    {
      id: 7,
      logo: 'assets/images/sample_user_icon.png',
      name: 'LogisticsPro',
      group: 'Corporación Barcelona',
      cif: 'G77889900',
      registration_date: '2023-07-22',
      department: 'Operations',
      tags: ['seguro_propio'],
      main_client: 'Ana Martín'
    },
    {
      id: 8,
      logo: 'assets/images/sample_user_icon.png',
      name: 'MarketingHub',
      group: 'Grupo Internacional París',
      cif: 'H00112233',
      registration_date: '2023-08-30',
      department: 'Sales',
      tags: ['nuevo', 'seguro_propio'],
      main_client: 'Marie Leclerc'
    },
    {
      id: 9,
      logo: 'assets/images/sample_user_icon.png',
      name: 'CloudServices',
      group: 'Empresa Lisboa',
      cif: 'I44556677',
      registration_date: '2023-09-14',
      department: 'IT',
      tags: ['en_riesgo', 'seguro_propio'],
      main_client: 'Maria Santos'
    },
    {
      id: 10,
      logo: 'assets/images/sample_user_icon.png',
      name: 'ConsultingGroup',
      group: 'Corporación Roma',
      cif: 'J88990011',
      registration_date: '2023-10-08',
      department: 'HR',
      tags: ['nuevo'],
      main_client: 'Giulia Bianchi'
    }
  ]);

  showGroupsTable = signal(true);
  showListTable = signal(false);
  activeButton = signal<'groups' | 'list'>('groups');

  groupsTableConfig: TableConfig = {
    columns: [
      {
        key: 'group_name',
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
        key: 'users_assigned',
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
        key: 'users_assigned',
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
        key: 'group',
        label: 'clients.list.group',
        type: 'text',
        width: 15
      },
      {
        key: 'cif',
        label: 'clients.list.cif',
        type: 'text',
        width: 10
      },
      {
        key: 'registration_date',
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
        key: 'main_client',
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
        key: 'group',
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
        key: 'registration_date',
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
        key: 'main_client',
        label: 'clients.list.main_client_filter',
        type: 'select',
        width: 10,
        options: this.listArray().map((item: any) => ({ value: item.main_client, label: item.main_client }))
        
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
    this.groupsTableConfig.data = this.groupsArray();
    this.listTableConfig.data = this.listArray();
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

    const isGroupData = data[0]?.group_name !== undefined;
    
    let columns: string[];
    let headers: string[];
    let filename: string;

    if (isGroupData) {
      columns = ['group_name', 'country', 'users_assigned'];
      headers = ['Nombre del Grupo', 'País', 'Usuarios Asignados'];
      filename = `grupos_clientes_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      columns = ['name', 'group', 'cif', 'registration_date', 'department', 'tags', 'main_client'];
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
