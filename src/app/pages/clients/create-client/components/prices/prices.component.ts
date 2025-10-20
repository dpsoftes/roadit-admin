import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { pricesTableConfig } from './pricesTableConfig';
import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-prices',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckbox,
    ButtonsComponent,
    DynamicTableComponent
  ],
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PricesComponent {
  pricesData = input<any | null>(null);

  form: FormGroup;
  pricesTableConfig: TableConfig = pricesTableConfig;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'included-fuel': [false],
      'client-price': [''],
      'driver-price': [''],
      // Ferry
      'ferry-price': [''],
      // Vehículo eléctrico
      'ev-client-price': [''],
      'ev-driver-price': [''],
      // Adicionales
      'express-transport-percent': [''],
      'stage-discount-percent': [''],
      // Franjas de kilómetros
      'km-from': [''],
      'km-to': [''],
      // Precio al cliente
      'price-type': [''],
      'standard-price-eur': [''],
      'price-vu-lt-12': [''],
      'price-vu-gt-12': ['']
    });
  }
  onSave() {
    console.log('Saving prices:', this.form.value);
  }
}
