import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@i18n/translate.pipe';

interface BillingAccount {
  idRef: string;
  taxId: string;
  companyName: string;
  city: string;
  email: string;
  retention: string;
  duePeriod: string;
}

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
  
  billingAccounts = signal<BillingAccount[]>([]);

  onAddAccount(): void {
    console.log('Add account clicked');
  }

  onEditAccount(account: BillingAccount): void {
    console.log('Edit account:', account);
  }

  onViewAccount(account: BillingAccount): void {
    console.log('View account:', account);
  }

  onDeleteAccount(account: BillingAccount): void {
    console.log('Delete account:', account);
  }
}