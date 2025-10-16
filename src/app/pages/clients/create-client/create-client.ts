import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { GeneralTabComponent } from './components/general-tab/general-tab.component';
import { MatCardModule } from '@angular/material/card';
import { DocumentTabComponent } from './components/document-tab.component/document-tab.component';
import { BillingComponent } from './components/billing.component/billing.component';

@Component({
  selector: 'app-create-client',
  imports: [
    CommonModule,
    TranslatePipe,
    MatButtonModule,
    GeneralTabComponent,
    DocumentTabComponent,
    BillingComponent,
    ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss'
})
export class CreateClient {

  activeTab = signal<string>('general');


  onTabChange(tab: string) {
    this.activeTab.set(tab);
  }

}
