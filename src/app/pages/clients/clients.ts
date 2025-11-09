import { Component, signal, OnInit, input, WritableSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import {  TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';
import { groupsTableConfig } from './groupTableConfig';
import { createClientTableConfig } from './clientTableConfig';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientGroupSummary, ClientSummary } from '@dtos/clients/clients.dto';
import { ClientsProvider } from '@providers';
import { ClientStore } from '@store/clients.state';
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
  clientsProvider = inject(ClientsProvider);
  clientStore = inject(ClientStore);

  groupsArray = signal<ClientGroupSummary[]>([]);

  listArray = signal<ClientSummary[]>([]);

  showGroupsTable = signal(true);
  showListTable = signal(false);
  activeTab = signal<'groups' | 'list'>('groups');

  groupsTableConfig = signal(groupsTableConfig);

  clientTableConfig = signal(createClientTableConfig([]));

  constructor(
    private route:ActivatedRoute, 
    private router:Router,
  ){
    this.route.params.subscribe(params => {
      if(params['type'] === 'groups') {
        this.activeTab.set('groups');
      } else if(params['type'] === 'list') {
        this.activeTab.set('list');
      }
      this.onTabChange(params['type']);

    });
    var act = this.clientTableConfig().actions;
    act!.create!.action = () => {this.createClient()};
    act!.create!.route = "";
    this.clientTableConfig.set({...this.clientTableConfig(), actions: act});
    
  }  

  async ngOnInit() {
    let type: 'groups' | 'list' = "groups";
     if (this.route.snapshot.paramMap.get('type')) {
      type = this.route.snapshot.paramMap.get('type')! as 'groups' | 'list';
    }
    this.activeTab.set(type);
    await this.loadGroups();
    
  }
  async loadGroups(params?: TableEvent){
    const options = {page: 1, page_size: 10, params: {} as any};
    if(params){
      if(params.type === 'page'){
        options.page = params.page!;
        options.page_size = params.pageSize!;
      }
      if(params.data){
        if(params.data.searchTerm){
        }
      if(params.data.filters){
          for(const filterKey of Object.keys(params.data.filters)){
            options.params[filterKey] = params.data.filters[filterKey];
          }
        }
      }
    }
    var data = await this.clientsProvider.getGroups(options);
    this.groupsTableConfig().data.set(data as any[]);

  }
  async loadClients(params?: TableEvent){
    const options = {page: 1, page_size: 10, params: {} as any};
    if(params){
      if(params.type === 'page'){
        options.page = params.page!;
        options.page_size = params.pageSize!;
      }
      if(params.data){
        if(params.data.searchTerm){
          //TODO search
        }
      if(params.data.filters){
          for(const filterKey of Object.keys(params.data.filters)){
            options.params[filterKey] = params.data.filters[filterKey];
          }
        }
      }
    }
    var data = await this.clientsProvider.getClients(options);
    this.clientTableConfig.set({...this.clientTableConfig(), data: signal(data as any[])});
  }

  onTabChange(tab: string) {
    if (tab === 'groups') {
      this.showGroupsTable.set(true);
      this.showListTable.set(false);
      this.activeTab.set('groups');
      this.loadGroups();
    } else if (tab === 'list') {
      this.showGroupsTable.set(false);
      this.showListTable.set(true);
      this.activeTab.set('list');
      this.loadClients();
    }
  }

  async onTableEvent(event: TableEvent, type: 'groups' | 'client') {
    switch (event.type) {
      case 'action':
        if (event.data?.action === 'edit') {
          this.edit(event.data.row, type);
        } else if (event.data?.action === 'delete') {
          this.delete(event.data.row, type);
        } else if (event.data?.action === 'view') {
          this.view(event.data.row, type);
        } else if (event.data?.action === 'add') {
          this.add(event.data.row, type);
        } else if (event.data?.action === 'activate') {
          //this.createClient(event.data.row);
        }
        break;
      case 'select':
        console.log('Selected items:', event.data?.selected);
        break;
      case 'filter':
      case 'search':
      case 'page':
       this.activeTab() == 'groups' ? await this.loadGroups(event) : await this.loadClients(event);
        break;
      case 'export':
        console.log('Exportación completada:', event.data?.filename);
        break;
    }
  }
  
  edit(element: any, type: 'groups' | 'client') {
    if(type === 'groups'){
        this.router.navigate(['/clients/edit-group', element.id]);
    }else{
        this.router.navigate(['/clients/edit-client', element.id]);
    }
    
  }

  delete(element: any, type: 'groups' | 'client') {
    console.log('Delete client:', element);
  }

  view(element: any, type: 'groups' | 'client') {
    this.edit(element, type);
  }

  add(element: any, type: 'groups' | 'client') {
    console.log('Add to client:', element);
  }

  createClient() {
    this.clientStore.clearStore();    
    this.router.navigate(['/clients/create-client']);


  }


  

}
