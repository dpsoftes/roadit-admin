import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
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
import { ClientStore } from '@store/clients.state';
import { DistanceBracketRuleEntity, PriceRulesEntity } from '@entities/clients.entities';
import { Helpers } from '@utils/helpers';
import { ErrorBase } from '@dtos/errors.dtos';
import { I18nService } from '@i18n/i18n.service';

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
  store = inject(ClientStore);
  i18n = inject(I18nService);
  curPrices: PriceRulesEntity = PriceRulesEntity.fromDto(this.store.priceRules());
  curBracket: DistanceBracketRuleEntity = new DistanceBracketRuleEntity();
  brackets: WritableSignal< DistanceBracketRuleEntity[]> = signal<DistanceBracketRuleEntity[]>([]);
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


  constructor() {
    effect(() => {
      this.curPrices = PriceRulesEntity.fromDto(this.store.priceRules());
      this.pricesTableConfig.data.set(this.store.priceRules().distance_brackets || []);
    });
    var actions = pricesTableConfig.columns.filter(col => col.key === 'actions')
    actions[0].actionConfig!.actions[0].onClick = this.editBracket;
    actions[0].actionConfig!.actions[1].onClick = this.deleteBracket;
    
  }
  canSave = computed(() => {
    return !(Helpers.isEmptyOrZero(this.curBracket.max_km()) || Helpers.isEmptyOrZero(this.curBracket.standard_price()))
  })
  editBracket = (row: any) => {
    this.curBracket.copyFromDto(row);
  }
  deleteBracket = (row: any) => {
    var confirm = window.confirm(this.i18n.translate("confirmMessages.RengeKm")  );
    if(!confirm) return;
    this.curPrices.distance_brackets.set(this.curPrices.distance_brackets().filter(db => db.id() !== row.id));
    //this.curPrices.distance_brackets().splice(this.curPrices.distance_brackets().findIndex(db => db.id() === row.id), 1);
      var dto = this.curPrices.toDto();
      dto.distance_brackets = dto.distance_brackets.map(db => {
        const {id, ...rest} = db;
        return rest;
      });
            var result =this.store.updatePrices(dto);
        this.curBracket = new DistanceBracketRuleEntity();

  }
  updateDistanceBracket(field: string, value: any) {
    const currentBrackets = this.distance_brackets();
    const updatedBrackets = [...currentBrackets];
    updatedBrackets[0] = { ...updatedBrackets[0], [field]: value };
    this.distance_brackets.set(updatedBrackets);
  }
  async onPrice() {
       var dto = this.curPrices.toDto();
      dto.distance_brackets = dto.distance_brackets.map(db => {
        const {id, ...rest} = db;
        return rest;
      });
        
      try {
        var result = await this.store.updatePrices(dto);
        if((result instanceof ErrorBase)){

          return;
        }
        this.curBracket = new DistanceBracketRuleEntity();
        
      } catch (error) {
        console.error('Error al guardar las reglas de precios:', error);        
      }
  }
  async onSave() {

    var cur =       [
        ...this.curPrices.distance_brackets().filter(db => db.id() !== this.curBracket.id()).map(db => ({min: db.min_km() || 0, max: db.max_km()})),
        {min: this.curBracket.min_km(), max: this.curBracket.max_km()}
      ];

    var isOk = Helpers.checkNoRangeOverlap(
     cur
    )

    if(!isOk){
      alert("Los rangos de km no pueden solaparse");
      return;
    }
    if(Helpers.isEmptyOrZero(this.curBracket.id())){
      this.curPrices.distance_brackets().push(this.curBracket);
    }else{
      this.curPrices.distance_brackets.set([...this.curPrices.distance_brackets().filter(db => db.id() !== this.curBracket.id()), this.curBracket]);
    }
    var dto = this.curPrices.toDto();
      dto.distance_brackets = dto.distance_brackets.map(db => {
        const {id, ...rest} = db;
        return rest;
      });
        
      try {
        var result = await this.store.updatePrices(dto);
        if((result instanceof ErrorBase)){

          return;
        }
        this.curBracket = new DistanceBracketRuleEntity();
        
      } catch (error) {
        console.error('Error al guardar las reglas de precios:', error);        
      }
  }



}
