import { Component, signal, input } from '@angular/core';
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
import { CertsComponent } from './components/certs/certs.component';

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
    CertsComponent
    ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss'
})
export class CreateClient {
  clientData = input<any | null>(null);
  clientGroups = input<any[]>([]);
  managers = input<any[]>([]);

  activeTab = signal<string>('general');
  clientForm = signal<any>({});
  tabs = ['general', 'protocol', 'slogans', 'documents', 'extra-contact', 'billing', 'prices', 'certs', 'additional-services']

  onTabChange(tab: string) {
    this.activeTab.set(tab);
  }

  onFormDataChange(formData: any) {
    this.clientForm.set(formData);
  }

  onSave() {
    console.log('Saving client:', this.clientForm());
  }

  onCancel() {
    console.log('Cancelling client creation');
  }
}
