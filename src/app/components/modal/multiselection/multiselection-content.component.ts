import { Component, inject, signal, input, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ClientStore } from '@store/clients.state';
import { DeepSignal } from '@ngrx/signals';
import { Helpers } from '@utils/helpers';

@Component({
  selector: 'app-multiselection-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule, ButtonsComponent, TranslatePipe],
  templateUrl: './multiselection-content.component.html',
  styleUrl: './multiselection-content.component.scss'
})
export class MultiselectionContentComponent<T> {
  store = inject(ClientStore);

  // Inputs usando signals
  sign = input.required<DeepSignal<T>>();
  property = input.required<string>();
  updateOptions = input.required<(opts: any[]) => void>();
  propertyValue = input.required<string>();
  maxOptions = input<number | null>(null);
  withDelete = input<boolean>(false);
  
  // Signal local editable
  options = signal<any[]>([]);
  canAddMore = computed(() => {
    const max = this.maxOptions();
    let canAdd =  max === null || this.options().length < max;
    this.options().map((option) => {
      if(Helpers.isEmpty(option[this.propertyValue()])) canAdd = false;
    } );
    return canAdd;
  });
  constructor() {
    // Inicializar options cuando los inputs estén disponibles
    effect(() => {
      const currentSign = this.sign();
      const prop = this.property();
      const value = currentSign[prop as keyof typeof currentSign];
      
      if (value) {
        console.log('Inicializando options desde sign:', value);
        // Si value es un signal, obtener su valor, si no, usarlo directamente
        const optionsValue = typeof value === 'function' ? (value as any)() : value;
        this.options.set(optionsValue || []);
      }
    });
  }

  addNewOption() {

    const newOption = {
      id: null,
      [this.propertyValue()]: ''
    };
    this.options.update(current => [...current, newOption]);
  }
  deleteOption(option:any) {
    this.options.update(current => current.filter(opt => opt !== option));
  }

  onOptionChange(option: any, event: Event) {
    const input = event.target as HTMLInputElement;
    option[this.propertyValue()] = input.value;
    // Forzar actualización del signal para que los computed se actualicen
    this.options.set([...this.options()]);
  }

  save() {
    console.log('Opciones guardadas:', this.options());
    // Llamar a la función updateOptions pasada como input
    this.updateOptions()(this.options().filter((opt) => !Helpers.isEmpty(opt[this.propertyValue()]))  );
  }
}
