import { Component, computed, inject, signal } from '@angular/core';
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
import { transportPrincipalTypeDescriptions } from '@enums/transport.enum';
import { FileUploadType, directionTypeDescriptions, fileUploadTypeDescriptions } from '@enums/additional.enum';
import { ClientStore } from '@store/clients.state';
import { DocumentTemplateTransportEntity } from '@entities/clients.entities';
import { ImageDropComponent } from '@components/index';

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
    ButtonsComponent,
    ImageDropComponent,
  ],
  templateUrl: './document-tab.component.html',
  styleUrl: './document-tab.component.scss'
})
export class DocumentTabComponent {

  transportType = Object.entries(transportPrincipalTypeDescriptions).map(([key, value]) => ({ key, value }));
  applicationMoment =  Object.entries(directionTypeDescriptions).map(([key, value]) => ({ key, value }));
  fileUploadTypeDescriptions = Object.entries(fileUploadTypeDescriptions).map(([key, value]) => ({ key, value }));
  selectedFileUploadType = signal<FileUploadType>(FileUploadType.URL);
  filetype = fileUploadTypeDescriptions;
  store = inject(ClientStore);
  documents = this.store.documents;
  curDocument = new DocumentTemplateTransportEntity()
  file = signal<File|null>(null);
  onImageAccepted(event: { base64: string, file: File }): void {
    if(event.file){
      this.file.set(event.file);
    }
  }
  imgUrl = computed(() => {
    if(this.file()){
      return URL.createObjectURL(this.file() as File);
    }
    return "";
  });
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
    data: signal([
      { doc_type: 'Doc Type 1', 'archive/link': 'Archive/Link 1' },
      { doc_type: 'Doc Type 2', 'archive/link': 'Archive/Link 2' },
      { doc_type: 'Doc Type 3', 'archive/link': 'Archive/Link 3' },
    ]),
    
  };  


}
