import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '@i18n/translate.pipe';

@Component({
  selector: 'app-general-tab-component',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    MatCheckboxModule,
  ],
  templateUrl: './general-tab.component.html',
  styleUrl: './general-tab.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GeneralTabComponent {


  onPhotoChanged(photo: string): void {
    console.log('Photo changed:', photo);
  }
  onPhotoDeleted(photo: string): void {
    console.log('Photo deleted:', photo);
  }

  groups = signal<string[]>(['Group 1', 'Group 2', 'Group 3']);

  selectedGroup = signal<string>('');
  onGroupChange(group: string): void {
    this.selectedGroup.set(group);
  }
  clients = signal<{ id: number, name: string }[]>(
    [
      {
        id: 1,
        name: 'Client 1'
      },
      {
        id: 2,
        name: 'Client 2'
      },
      {
        id: 3,
        name: 'Client 3'
      }
    ]
  );
  selectedClient = signal<string>('');
  onClientChange(client: string): void {
    this.selectedClient.set(client);
  }
  isSubentity = signal<boolean>(false);
  onSubentityChange(isSubentity: boolean): void {
    this.isSubentity.set(isSubentity);
  }

  billingTypes = signal<string[]>(['Manual', 'Automatic']);
  selectedBillingType = signal<string>('');
  onBillingTypeChange(billingType: string): void {
    this.selectedBillingType.set(billingType);
  }

  sendManualInvoice = signal<boolean>(false);
  onSendManualInvoiceChange(sendManualInvoice: boolean): void {
    this.sendManualInvoice.set(sendManualInvoice);
  }
  CheckOwnInsurance = signal<boolean>(false);
  onCheckOwnInsuranceChange(CheckOwnInsurance: boolean): void {
    this.CheckOwnInsurance.set(CheckOwnInsurance);
  }
  CheckAtRisk = signal<boolean>(false);
  onCheckAtRiskChange(CheckAtRisk: boolean): void {
    this.CheckAtRisk.set(CheckAtRisk);
  }


}
