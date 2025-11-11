import { Component, effect, inject, resource, signal } from '@angular/core';
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
  currentType = signal<TransportPrincipalType>(TransportPrincipalType.SIMPLE_MOVEMENT);
  protocols = signal<ProtocolDto[]>([]);
  protocolTableConfig: TableConfig = protocolTableConfig;
  protocolAssignedTableConfig: TableConfig = protocolAssignedTableConfig;
  transportPrincipalTypes =  Object.entries(transportPrincipalTypeDescriptions).map(([key, value]) => ({ key, value }));

  constructor(
    private modalService:ModalService
  ){
    this.loadTemplates();
    effect(() => {
      var type = this.currentType();
      this.loadTemplates();
    });
    protocolTableConfig.data = this.protocols;

  }


  openOptionModal(){
    let dialogRef = this.modalService.open({
      title: 'modals.multiselection.title',
      component: MultiselectionContentComponent,
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


}
