import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
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
  pricesTableConfig: TableConfig = pricesTableConfig;

  id = signal<number>(0);
  client = signal<number>(0);
  transport = signal<number>(0);
  ferry_fixed_cost = signal<number>(0);
  express_surcharge_percentage = signal<number>(0);
  stage_discount_percentage = signal<number>(0);
  charging_requires_ticket = signal<boolean>(true);
  client_charging_price = signal<number>(0);
  driver_charging_price = signal<number>(0);
  is_fuel_included = signal<boolean>(true);
  client_fuel_price = signal<number>(0);
  driver_fuel_price = signal<number>(0);
  
  distance_brackets = signal<any[]>([{
    id: 0,
    min_km: 0,
    max_km: 0,
    pricing_type: 'FIXED',
    standard_price: 0,
    small_vehicule_price: 0,
    big_vehicule_price: 0,
    created_date: new Date().toISOString(),
    modified_date: new Date().toISOString()
  }]);

  updateDistanceBracket(field: string, value: any) {
    const currentBrackets = this.distance_brackets();
    const updatedBrackets = [...currentBrackets];
    updatedBrackets[0] = { ...updatedBrackets[0], [field]: value };
    this.distance_brackets.set(updatedBrackets);
  }

  onSave() {
    const formData = {
      id: this.id(),
      client: this.client(),
      transport: this.transport(),
      ferry_fixed_cost: this.ferry_fixed_cost(),
      express_surcharge_percentage: this.express_surcharge_percentage(),
      stage_discount_percentage: this.stage_discount_percentage(),
      charging_requires_ticket: this.charging_requires_ticket(),
      client_charging_price: this.client_charging_price(),
      driver_charging_price: this.driver_charging_price(),
      is_fuel_included: this.is_fuel_included(),
      client_fuel_price: this.client_fuel_price(),
      driver_fuel_price: this.driver_fuel_price(),
      distance_brackets: this.distance_brackets(),
      created_date: new Date().toISOString(),
      modified_date: new Date().toISOString()
    };
    
    console.log('Saving prices:', formData);
  }
}
