import { Component, signal, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableConfig, TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';
import { groupsTableConfig } from './groupTableConfig';
import { createListTableConfig } from './listTableConfig';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import { ActivatedRoute } from '@angular/router';
// import { ClientDto, ClientMiniDto, ClientGroupDto } from '@dtos'; // Temporalmente comentado

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    TranslatePipe,
    DynamicTableComponent,
    TabsComponent,
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
  activeTab = signal<'groups' | 'list'>('groups');

  groupsTableConfig = groupsTableConfig;

  listTableConfig!: TableConfig;

  constructor(
    private route:ActivatedRoute
  ){
    this.route.params.subscribe(params => {
      if(params['tab'] === 'group') {
        this.activeTab.set('groups');
      } else if(params['tab'] === 'list') {
        this.activeTab.set('list');
      }
    });

  }  

  ngOnInit() {
    // Usar datos de input signals si están disponibles, sino usar datos mock
    const clientsData = this.clientsData();
    const groupsData = this.groupsData();
    
    this.groupsTableConfig.data = groupsData.length > 0 ? groupsData : this.groupsArray();
    
    // Crear configuración dinámica para la tabla de lista
    const listData = clientsData.length > 0 ? clientsData : this.listArray();
    this.listTableConfig = createListTableConfig(listData);
  }
  onTabChange(tab: string) {
    if (tab === 'groups') {
      this.showGroupsTable.set(true);
      this.showListTable.set(false);
      this.activeTab.set('groups');
    } else if (tab === 'list') {
      this.showGroupsTable.set(false);
      this.showListTable.set(true);
      this.activeTab.set('list');
    }
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
        console.log('Exportación completada:', event.data?.filename);
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


  

}
