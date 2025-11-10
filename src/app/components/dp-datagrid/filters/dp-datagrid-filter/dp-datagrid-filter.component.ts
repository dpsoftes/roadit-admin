import { Component, input, output, computed, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterConfig, FilterOption } from '../../dp-datagrid.interfaces';
import { I18nService } from 'src/app/core/i18n/i18n.service';
import {
  TextFilterComponent,
  SelectFilterComponent,
  DateFilterComponent,
  DateRangeFilterComponent,
  CheckboxFilterComponent,
  ChipSelectFilterComponent,
  ChipsFilterComponent,
  ChipArrayFilterComponent
} from './filters';

/**
 * Componente orquestador de filtros
 * Responsabilidad única: Delegar renderizado al componente atómico apropiado según tipo
 * Reducción: 621 líneas → ~120 líneas (81% reducción)
 */
@Component({
  selector: 'dp-datagrid-filter',
  standalone: true,
  imports: [
    CommonModule,
    TextFilterComponent,
    SelectFilterComponent,
    DateFilterComponent,
    DateRangeFilterComponent,
    CheckboxFilterComponent,
    ChipSelectFilterComponent,
    ChipsFilterComponent,
    ChipArrayFilterComponent,
  ],
  template: `
    <div class="dp-datagrid-filter">
      <!-- Text Filter -->
      @if (type() === 'text') {
        <dp-text-filter
          [config]="filterConfig()"
          [label]="label()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Select Filter -->
      @if (type() === 'select') {
        <dp-select-filter
          [config]="filterConfig()"
          [label]="label()"
          [options]="options()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Date Filter -->
      @if (type() === 'date') {
        <dp-date-filter
          [config]="filterConfig()"
          [label]="label()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Date Range Filter -->
      @if (type() === 'date-range') {
        <dp-date-range-filter
          [config]="filterConfig()"
          [label]="label()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Chip Select Filter (Dropdown con chips) -->
      @if (type() === 'chip-select') {
        <dp-chip-select-filter
          [config]="filterConfig()"
          [label]="label()"
          [options]="options()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Chips Filter (Single selection) -->
      @if (type() === 'chips') {
        <dp-chips-filter
          [config]="filterConfig()"
          [label]="label()"
          [options]="options()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Chip Array Filter (Multiple selection) -->
      @if (type() === 'chip-array') {
        <dp-chip-array-filter
          [config]="filterConfig()"
          [label]="label()"
          [options]="options()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }

      <!-- Checkbox Filter -->
      @if (type() === 'checkbox') {
        <dp-checkbox-filter
          [config]="filterConfig()"
          [label]="label()"
          [valueInput]="value()"
          (filterChange)="onFilterChange($event)" />
      }
    </div>
  `,
  styles: [`
    .dp-datagrid-filter {
      width: 100%;
    }
  `]
})
export class DpDatagridFilterComponent {
  private i18n = inject(I18nService);
  // Inputs individuales (enfoque declarativo)
  key = input.required<string>();
  label = input.required<string>();
  type = input.required<FilterConfig['type']>();
  options = input<FilterOption[]>([]);
  multiple = input<boolean>(false);
  width = input<number>();
  emptyOption = input<string>('common.selectPlaceholder');
  value = input<any>(null); // Nuevo input para el valor del filtro

  // Output
  filterChange = output<{ key: string; value: any }>();

  // ViewChild references to atomic filter components
  @ViewChild(TextFilterComponent) textFilter?: TextFilterComponent;
  @ViewChild(SelectFilterComponent) selectFilter?: SelectFilterComponent;
  @ViewChild(DateFilterComponent) dateFilter?: DateFilterComponent;
  @ViewChild(DateRangeFilterComponent) dateRangeFilter?: DateRangeFilterComponent;
  @ViewChild(CheckboxFilterComponent) checkboxFilter?: CheckboxFilterComponent;
  @ViewChild(ChipSelectFilterComponent) chipSelectFilter?: ChipSelectFilterComponent;
  @ViewChild(ChipsFilterComponent) chipsFilter?: ChipsFilterComponent;
  @ViewChild(ChipArrayFilterComponent) chipArrayFilter?: ChipArrayFilterComponent;

  emptyOptionTranslated = computed(() => {
    return this.i18n.translate(this.emptyOption());
  });

  // Computed config para pasar a los componentes atómicos
  filterConfig = computed<FilterConfig>(() => ({
    key: this.key(),
    label: this.label(),
    type: this.type(),
    options: this.options(),
    multiple: this.multiple(),
    width: this.width(),
    emptyOption: this.emptyOptionTranslated()
  }));

  // Alias para mantener compatibilidad con el componente principal
  config = this.filterConfig;

  /**
   * Método público para actualizar el valor programáticamente
   * Este método se llama desde el datagrid padre para restaurar valores
   */
  setValue(newValue: any): void {
    console.log(`  → DpDatagridFilterComponent.setValue("${this.key()}")`, newValue);

    // Delegar al filtro atómico correspondiente según el tipo
    const filterType = this.type();

    switch (filterType) {
      case 'text':
        this.textFilter?.setValue(newValue);
        break;
      case 'select':
        this.selectFilter?.setValue(newValue);
        break;
      case 'date':
        this.dateFilter?.setValue(newValue);
        break;
      case 'date-range':
        this.dateRangeFilter?.setValue(newValue);
        break;
      case 'checkbox':
        this.checkboxFilter?.setValue(newValue);
        break;
      case 'chip-select':
        this.chipSelectFilter?.setValue(newValue);
        break;
      case 'chips':
        this.chipsFilter?.setValue(newValue);
        break;
      case 'chip-array':
        this.chipArrayFilter?.setValue(newValue);
        break;
    }
  }

  /**
   * Maneja el cambio de filtro de los componentes atómicos
   */
  onFilterChange(event: { key: string; value: any }): void {
    this.filterChange.emit(event);
  }
}
