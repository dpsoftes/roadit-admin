import { Component } from '@angular/core';
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

  protocolTableConfig: TableConfig = protocolTableConfig;
  protocolAssignedTableConfig: TableConfig = protocolAssignedTableConfig;

  constructor(
    private modalService:ModalService
  ){}


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

}
