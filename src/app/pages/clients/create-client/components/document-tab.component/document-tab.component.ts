import { Component, computed, effect, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TableColumn, TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { transportPrincipalTypeDescriptions } from '@enums/transport.enum';
import { DirectionType, FileUploadType, directionTypeDescriptions, fileUploadTypeDescriptions } from '@enums/additional.enum';
import { ClientStore } from '@store/clients.state';
import { DocumentTemplateTransportEntity } from '@entities/clients.entities';
import { ImageDropComponent } from '@components/index';
import { Helpers } from '@utils/helpers';
import { I18nService } from '@i18n/i18n.service';

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
export class DocumentTabComponent implements OnInit {


  transportType = Object.entries(transportPrincipalTypeDescriptions).map(([key, value]) => ({ key, value }));
  applicationMoment =  Object.entries(directionTypeDescriptions).map(([key, value]) => ({ key, value }));
  fileUploadTypeDescriptions = Object.entries(fileUploadTypeDescriptions).map(([key, value]) => ({ key, value }));
  filetype = fileUploadTypeDescriptions;
  selectedFileUploadType = signal<FileUploadType>(FileUploadType.URL);
  store = inject(ClientStore);
  documents = signal(this.store.documents());
  curDocument = new DocumentTemplateTransportEntity()
  file = signal<File|null>(null);
  i18n = inject(I18nService);
  
  @ViewChild('fileDrop') fileDrop!: ImageDropComponent;
  onImageAccepted(event: { base64: string, file: File }): void {
    
      this.file.set(event.file);
    
  }
  linkText = computed(() => {
    if(this.file() != null ){
      return this.file()!.name;
    }else{
      return "dropFile.viewFile";
    }
  
  });
  imgUrl = computed(() => {
    if(this.file()){
      return URL.createObjectURL(this.file() as File);
    }
    return "";
  });
  effect = effect(() => {
      this.documents.set(this.store.documents());
    });
  ngOnInit(): void {
    
  }
  renderTime = (column: TableColumn, row: any) => {
    const value = row[column.key];
    return this.i18n.translate(directionTypeDescriptions[value as DirectionType ]);

  }
  renderLink = (column: TableColumn, row: any) => {
    if(!row.link) return row.file;
    return row.link;
  }
  saveDocument = () => {
    const errors = [];
    if(Helpers.isEmpty(this.curDocument.transport_principal_type())){
      errors.push('errors.documents.type-movement');
    }
    if(Helpers.isEmpty(this.curDocument.application_time())){
      errors.push('errors.documents.moment');
    }
    if(this.file() == null && (!this.curDocument.link() || this.curDocument.link()!.length == 0)){
      errors.push('errors.documents.not-file');
    }

    if(errors.length > 0){
        Helpers.Instance.showToast(errors.map((error) => this.i18n.translate(error)).join(', '), 'ERROR');
        return;
    }    
    this.store.saveDocument(this.curDocument.toDto(),this.selectedFileUploadType() == FileUploadType.FILE ? this.file() as File : null).then(doc => {
      if(doc){
        this.curDocument = new DocumentTemplateTransportEntity();
        this.file.set(null);
      }
    }) 
    
  }



    tableConfig: TableConfig = {
    columns: [
      { key: 'application_time', label: 'clients.create-client.doc_type', type: 'text', render: this.renderTime },
      { key: 'link', label: 'clients.create-client.archive-link', type: 'text', render: this.renderLink },
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
              action: 'view',
              onClick: (row: any) => {
                if(row.link && row.link.length > 0){
                  window.open(row.link, '_blank');
                }else if(row.file && row.file.length > 0){
                 
                  window.open(row.file, '_blank');
                }else{
                  Helpers.Instance.showToast(this.i18n.translate('errors.documents.no-file-to-view'), 'ERROR');
                }
              }
            },
            {
              icon: 'material-symbols-outlined/delete',
              label: 'Eliminar',
              color: 'error',
              action: 'delete',
              onClick: (row: any) => {
                const updatedDocs = this.store.documents()?.find(doc => doc.id == row.id);
                if(!updatedDocs) return;
                var resp = window.confirm(this.i18n.translate('errors.documents.confirm-delete-document')) 
                if(resp){
                  if(!this.store.deleteDocument(updatedDocs)){
                    alert(this.i18n.translate('errors.documents.error-delete-document'));
                  }
                }
              }

            },
          ]
        }
      }
    ],
    data: this.documents,
    
  };  

}
