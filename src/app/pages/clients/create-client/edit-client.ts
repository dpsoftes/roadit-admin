import { Component, signal, input, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { GeneralTabComponent } from './components/general-tab/general-tab.component';
import { MatCardModule } from '@angular/material/card';
import { DocumentTabComponent } from './components/document-tab.component/document-tab.component';
import { BillingComponent } from './components/billing.component/billing.component';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import { DriverConsignsComponent } from './components/driver-consigns/driver-consigns.component';
import { PricesComponent } from './components/prices/prices.component';
import { CertsComponent } from './components/certs-tab/certs.component';
import { ProtocolComponent } from './components/protocol/protocol.component';
import { ExtraContactComponent } from './components/extra-contact/extra-contact.component';
import { AdditionalServicesComponent } from './components/additional-services/additional-services.component';
import { ClientStore } from '@store/clients.state';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  imports: [
    CommonModule,
    TranslatePipe,
    MatButtonModule,
    GeneralTabComponent,
    DocumentTabComponent,
    BillingComponent,
    TabsComponent,
    DriverConsignsComponent,
    PricesComponent,
    CertsComponent,
    ProtocolComponent,  
    ExtraContactComponent,
    AdditionalServicesComponent
    ],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.scss'
})
export class EditClient  implements OnInit{


  clientGroups = input<any[]>([]);
  managers = input<any[]>([]);

  activeTab = signal<string>('general');
  clientForm = signal<any>({});
  clientStore = inject(ClientStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  tabs = signal(['general', 'protocol', 'slogans', 'documents', 'extra-contact', 'billing', 'prices', 'certs', 'additional-services']);
  displayedTabs = computed(() => { 
    if(this.clientStore.client().id){
      return this.tabs();
    }
    return ['general', 'protocol', 'slogans', 'documents', 'extra-contact', 'billing', 'prices', 'certs', 'additional-services'];
   });


  async ngOnInit(){
    this.clientStore.initializeFromStorage();
    let id = null;
    if (this.route.snapshot.paramMap.get('id')) {
      id = Number(this.route.snapshot.paramMap.get('id'));
    }
    if(id){
      const client = this.clientStore.loadById(id);
      
    }
  }


  onTabChange(tab: string) {
    this.activeTab.set(tab);
  }

  onFormDataChange(formData: any) {
   // this.clientForm.set(formData);
  }

  onSave() {
    console.log('Saving client:', this.clientForm());
  }

  onCancel() {
    console.log('Cancelling client creation');
  }
}
