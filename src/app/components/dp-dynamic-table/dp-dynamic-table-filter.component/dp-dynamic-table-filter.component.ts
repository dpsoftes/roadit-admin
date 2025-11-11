import { Component, input, output } from '@angular/core';

@Component({
  selector: 'dynamic-table-filter.component',
  imports: [],
  templateUrl: './dp-dynamic-table-filter.component.html',
  styleUrl: './dp-dynamic-table-filter.component.scss'
})
export class DPDynamicTableFilterComponent {
  key = input.required<string>();
  label= input<string>();
  type= input<'select' | 'text' | 'date' | 'chips'>();
  options= input<{ value: string; label: string }[]>();
  multiplelabel= input<boolean>(); // Para filtros que permiten selección múltiple
  width= input<number>(); // Ancho del filtro en porcentaje (ej: 25 = 25%)
  onChange = output<any>();

  getFilterStyles(): string {
    if (!this.width) return '';
    // Todos los valores de width son números que representan porcentajes
    return `width: ${this.width()}%`;
  }
  filterChange(value: any){
    this.onChange.emit(value);
  }
  onFilterChange(value: string) {
    this.onChange.emit(value);
    
  }


}
