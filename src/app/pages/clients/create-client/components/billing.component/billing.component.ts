import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ClientStore } from '@store/clients.state';
import { ClientBillingAccountEntity } from '@entities/clients.entities';
import { BillingAccountItemDto } from '@dtos/clients/billingsAccounts.dto';
import { EntityDocumentTypeDescriptions } from '@enums/common.enum';
import { ISO_COUNTRIES_SELECT } from '@dtos/country-langs.dto';



@Component({
  selector: 'app-billing',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
  store = inject(ClientStore);
  current = new  ClientBillingAccountEntity();
  errors = computed(() => this.store.errors());
  billingAccounts = computed(() => this.store.billingsAccounts());
  docstype = Object.entries(EntityDocumentTypeDescriptions).map(([key, value]) => ({ key, value })); 
  ISO_COUNTRIES_SELECT = Object.entries(ISO_COUNTRIES_SELECT).map(([key, value]) => ({ key, value })); 
  constructor() {
    // Mock data for billing accounts
/*     effect(() => {
      this.billingAccounts.set(this.store.billingsAccounts());
    }); */
  }
  

  onSave(): void {
    this.store.updateState({currentBillingAccount: this.current.toDto()});
    this.store.saveBilling();
  }

  onAddAccount(): void {
    console.log('Add account clicked');
  }

  onEditAccount(account: BillingAccountItemDto): void {
    console.log('Edit account:', account);
  }

  onViewAccount(account: BillingAccountItemDto): void {
    console.log('View account:', account);
  }

  onDeleteAccount(account: BillingAccountItemDto): void {
    console.log('Delete account:', account);
  }
}