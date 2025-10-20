import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';

@Component({
  selector: 'app-document-tab',
  imports: [
    CommonModule,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DynamicTableComponent,
    MatIconModule,
    MatButtonModule,
    ButtonsComponent
  ],
  templateUrl: './document-tab.component.html',
  styleUrl: './document-tab.component.scss'
})
export class DocumentTabComponent {


  tableConfig: TableConfig = {
    columns: [
      { key: 'doc_type', label: 'clients.create-client.doc_type', type: 'text' },
      { key: 'archive/link', label: 'clients.create-client.archive-link', type: 'text' },
      {
        key: 'actions',
        label: 'clients.list.actions',
        type: 'actions',
        width: 10,
        actionConfig: {
          actions: [
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
    data: [
      { doc_type: 'Doc Type 1', 'archive/link': 'Archive/Link 1' },
      { doc_type: 'Doc Type 2', 'archive/link': 'Archive/Link 2' },
      { doc_type: 'Doc Type 3', 'archive/link': 'Archive/Link 3' },
    ],
    
  };  


}
