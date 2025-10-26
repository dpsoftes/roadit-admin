import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { TranslatePipe } from '@i18n/translate.pipe';

@Component({
  selector: 'app-multiselection-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule, ButtonsComponent, TranslatePipe],
  templateUrl: './multiselection-content.component.html',
  styleUrl: './multiselection-content.component.scss'
})
export class MultiselectionContentComponent {
  options = signal([
    { id: 1, label: 'Opción 1', value: '' },
    { id: 2, label: 'Opción 2', value: '' },
    { id: 3, label: 'Opción 3', value: '' }
  ]);

  addNewOption() {
    const newId = Math.max(...this.options().map(o => o.id)) + 1;
    const newOption = {
      id: newId,
      label: `Opción ${newId}`,
      value: ''
    };
    this.options.update(current => [...current, newOption]);
  }

  save() {
    console.log('Opciones guardadas:', this.options());
  }
}
