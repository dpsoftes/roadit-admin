import { Component, effect, inject, signal } from '@angular/core';
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
  billingAccounts = signal<BillingAccountItemDto[]>([]);
  docstype = Object.entries(EntityDocumentTypeDescriptions).map(([key, value]) => ({ key, value })); 
  constructor() {
    // Mock data for billing accounts
    effect(() => {
      this.billingAccounts.set(this.store.billingsAccounts());
    });
  }
  
/*   email_send_invoice = signal<string>('');
  state = signal<string>('');
  iban = signal<string>('');
  iva = signal<string>('');
  irpf = signal<string>('');
  bic = signal<string>('');
  is_favourite = signal<boolean>(false);
  business_name = signal<string>('');
  entity_number = signal<string>('');
  document = signal<string>('');
  document_type = signal<string>('');
  address = signal<string>('');
  address_complement = signal<string>('');
  postal_code = signal<string>('');
  country = signal<string>('');
  city = signal<string>('');
  phone = signal<string>('');
  expire_period_days = signal<number>(0);
  client = signal<number>(0); */

  onSave(): void {
   /*  const formData = {
      email_send_invoice: this.email_send_invoice(),
      state: this.state(),
      iban: this.iban(),
      iva: this.iva(),
      irpf: this.irpf(),
      bic: this.bic(),
      is_favourite: this.is_favourite(),
      business_name: this.business_name(),
      entity_number: this.entity_number(),
      document: this.document(),
      document_type: this.document_type(),
      address: this.address(),
      address_complement: this.address_complement(),
      postal_code: this.postal_code(),
      country: this.country(),
      city: this.city(),
      phone: this.phone(),
      expire_period_days: this.expire_period_days(),
      client: this.client(),
    };
     
    console.log('Form data:', formData);*/
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