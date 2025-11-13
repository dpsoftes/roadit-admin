import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { certsCreatedTableConfig } from './certsCreatedTableConfig';
import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';
import { certsAssignedTableConfig } from './certsAssignedTableConfig';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CertificationComponent} from '../certification/certification.component';
import { CertificationsDto } from '@dtos/certifications.dto';
import { ClientStore } from '@store/clients.state';
import { ClientCertification, ClientCertificationFromTemplate } from '@dtos/clients/clientsCertifications.dto';

interface Cert {
  title: string;
  description: string;
  url: string;
  questions: string[];
}

@Component({
  selector: 'app-certs',
  imports: [
    DynamicTableComponent,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    CertificationComponent
  ],
  templateUrl: './certs.component.html',
  styleUrl: './certs.component.scss'
})
export class CertsComponent implements OnDestroy{
  store = inject(ClientStore);
  certificationsTemplate = signal<CertificationsDto[]>([]);
  certifications = signal<ClientCertification[]>([]);
  certsCreatedTableConfig: TableConfig = certsCreatedTableConfig;
  certsAssignedTableConfig: TableConfig = certsAssignedTableConfig;
  currentCertification = signal<ClientCertification>({} as ClientCertification);
  curAction = signal< 'nothing' | 'edit' | 'create'>('nothing');
  updateTempletes = effect(() => {
      var certs = this.store.certificationsTemplates();
      this.certificationsTemplate.set(certs)
    });
  updateCertifications = effect(() => {
      var certs = this.store.certifications();
      this.certifications.set(certs)
    });
    
  constructor() {
    this.confingTables();
  }
  ngOnDestroy(): void {
    this.updateTempletes.destroy();
    this.updateCertifications.destroy();
  }
  confingTables(){
    certsCreatedTableConfig.data = this.certificationsTemplate;
    certsAssignedTableConfig.data = this.certifications;
    var actionsTemplates = certsCreatedTableConfig.columns.find(c => c.key == 'actions')?.actionConfig?.actions;
    var actionsAssigned = certsAssignedTableConfig.columns.find(c => c.key == 'actions')?.actionConfig?.actions;
    actionsTemplates![0].onClick = (cert: CertificationsDto) => {
      this.currentCertification.set(ClientCertificationFromTemplate(cert));
      this.store.updateState({currentCertification: this.currentCertification()});
      this.curAction.set('create');
    };
    actionsAssigned![0].onClick = (cert: ClientCertification) => {
      this.currentCertification.set(cert);
      this.store.updateState({currentCertification: this.currentCertification()});
      this.curAction.set('edit');
    };
  }

  onSaveCertification(certification: ClientCertification): void {
    if(this.curAction() === 'create'){
      delete(certification.id);
    }
    certification.client = this.store.client().id;
    delete(certification.exam.id);
    for(const e of certification.exam.questions){
      delete(e.id);
      for(const o of e.options){
        delete(o.id);
      }
    }
    var result = this.store.saveCertification(certification);
    if(result instanceof Error){
      return;
    }
    this.curAction.set('nothing');
  }
 
}
