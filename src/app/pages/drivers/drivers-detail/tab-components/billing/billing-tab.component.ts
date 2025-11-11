import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';

@Component({
  selector: 'app-billing-tab',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './billing-tab.component.html',
  styleUrls: ['./billing-tab.component.scss']
})
export class BillingTabComponent {
  driverData = input<any>(null);
  saveBilling = output<any>();

  //SEÑALES PARA LOS CAMPOS DEL FORMULARIO
  iban = signal<string>('');
  bic = signal<string>('');
  irpf = signal<string>('');
  biweeklyBilling = signal<string>('0'); //READONLY

  //PERMITIR SOLO NÚMEROS EN IRPF
  onlyNumericInput(event: any): void {
    const regex = /[^0-9.]/g;
    event.target.value = event.target.value.replace(regex, '');
  }

  onSaveChanges(): void {
    const billingData = {
      iban: this.iban(),
      bic: this.bic(),
      irpf: this.irpf(),
      biweeklyBilling: this.biweeklyBilling()
    };

    console.log('GUARDAR DATOS DE FACTURACIÓN:', billingData);
    this.saveBilling.emit(billingData);
  }
}
