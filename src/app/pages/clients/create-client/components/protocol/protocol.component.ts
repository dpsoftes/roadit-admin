import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';
import { protocolTableConfig } from './protocolTableConfig';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { protocolAssignedTableConfig } from './protocolAssignedTableConfig';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { ModalService } from '@services/modal.service';
import { MultiselectionContentComponent } from '@components/modal/multiselection/multiselection-content.component';
import { TransportPrincipalType, transportPrincipalTypeDescriptions } from '@enums/client.enum';
import { ClientStore } from '@store/clients.state';
import { ClientsProvider } from '@providers';
import { ProtocolDto } from '@dtos/clients/protocols.dto';
import { I18nService } from '@i18n/i18n.service';
import { directionTypeDescriptions, ProtocolType, protocolTypeDescriptions } from '@enums/additional.enum';
import { ProtocolEntity } from '@entities/clients.entities';
import { DeepSignal } from '@ngrx/signals';
import { max } from 'rxjs';

@Component({
  selector: 'app-protocol',
  imports: [
    DynamicTableComponent,
    MatCardModule,
    TranslatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ButtonsComponent
  ],
  templateUrl: './protocol.component.html',
  styleUrl: './protocol.component.scss'
})
export class ProtocolComponent {
  store = inject(ClientStore);
  provider = inject(ClientsProvider);
  i18n = inject(I18nService);
  currentType = signal<TransportPrincipalType>(TransportPrincipalType.SIMPLE_MOVEMENT);
  protocols = signal<ProtocolDto[]>([]);
  currentProtocols = signal<ProtocolDto[]>(this.store.protocols());
  protocolTableConfig: TableConfig = protocolTableConfig;
  protocolAssignedTableConfig: TableConfig = protocolAssignedTableConfig;
  transportPrincipalTypes =  Object.entries(transportPrincipalTypeDescriptions).map(([key, value]) => ({ key, value }));
  curProtocol: ProtocolEntity = ProtocolEntity.fromDto(this.store.currentProtocol());
  protocolsType = Object.entries(protocolTypeDescriptions).map(([key, value]) => ({ key, value }));
  directionType = Object.entries(directionTypeDescriptions).map(([key, value]) => ({ key, value }));
  curAction = signal< 'nothing' | 'edit' | 'create'>('nothing');
  saveLabel = computed(() => {
    if(this.curAction() === 'create'){
      return this.i18n.translate('clients.create-client.assign');
    }else if(this.curAction() === 'edit'){
      return this.i18n.translate('clients.create-client.protocolo-save');
    }
    return "";

  });
  constructor(
    private modalService:ModalService
  ){
    this.loadTemplates();
    effect(() => {
      var type = this.currentType();
      this.loadTemplates().then(() => {});
    });
    effect(() => {
      var prots = this.store.protocols();
      this.currentProtocols.set(prots);
    });
    effect(() => {
      var prot = this.store.currentProtocol();
      this.curProtocol.copyFromDto(prot);
    });
    this.initTables();
  }
  initTables(){
    this.protocolTableConfig.data = this.protocols;
    this.protocolAssignedTableConfig.data = this.currentProtocols;
    let actions = protocolTableConfig.columns.filter(col => col.key === 'actions');
    actions[0].actionConfig!.actions[0].onClick = this.viewProtocolTemplate;
    actions = protocolAssignedTableConfig.columns.filter(col => col.key === 'actions');
    actions[0].actionConfig!.actions[0].onClick = this.editAssignedProtocol;
    actions[0].actionConfig!.actions[1].onClick = this.deleteAssignedProtocol;
    var type = protocolAssignedTableConfig.columns.find((tb) => tb.key === 'protocol_type');
    if(type){
      type.render = this.renderProtocolType;
    }
  }
  viewProtocolTemplate = (row: ProtocolDto) => {
    this.store.setCurrentProtocol(row);
    this.curAction.set('create');
  }
  editAssignedProtocol = (row: ProtocolDto) => {
    this.store.setCurrentProtocol(row);
    this.curAction.set('edit');
  }
  deleteAssignedProtocol = (row: any) => {
    this.curAction.set('nothing');
  } 
  renderProtocolType = (row: any, data: any) => {
    var typeKey = data['protocol_type'];
    return this.i18n.translate(protocolTypeDescriptions[typeKey as ProtocolType ]);
  }
  openOptionModal(){
    let dialogRef = this.modalService.open({
      title: 'modals.multiselection.title',
      component: MultiselectionContentComponent,
      componentInputs: {
        sign: this.store.currentProtocol,
        property: 'options',
        propertyValue: 'title',
        withDelete: true,
        maxOptions: this.curProtocol.protocol_type() === ProtocolType.SINGLE_CHECK ? 2 : null,
        updateOptions: (opts: any[]) => {
          console.log('Actualizando opciones:', opts);
          // Actualizar el protocolo en el store con las nuevas opciones
          const updatedProtocol = { ...this.curProtocol.toDto(), options: opts };
          this.store.setCurrentProtocol(updatedProtocol);
          dialogRef.close(true);
        }
      },
      width: '800px',
      showActions: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Opciones guardadas:', result);
      }
    });
  }

  async loadTemplates(){
    var result:any = await this.provider.getProtocolsTemplates(this.currentType());
    if(!result.results || result.results.length == 0){
      this.protocols.set([]);
        return;
    }
    this.protocols.set(result.results);
  }
  async Asign(){  
    if(this.curAction() === 'create'){
      this.curProtocol.transport_principal_types.set([this.currentType()]);
    }
    this.store.saveCurrentProtocol(this.curProtocol.toDto());
    this.curAction.set('nothing');
  }
  cancel(){
    this.store.setCurrentProtocol();
    this.curAction.set('nothing');
  }

}
