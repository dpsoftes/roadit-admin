import { Component, signal, input, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { ModalComponent } from '@components/modal/modal.component';
import { EditAddressModalComponent } from './edit-address-modal.component';

export interface AddressData {
  name: string;
  address: string;
  contact: string;
  phone?: string;
  schedule?: string;
}

@Component({
  selector: 'app-address-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslatePipe,
    ButtonsComponent
  ],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss'
})
export class AddressModalComponent {
  private dialogRef = inject(MatDialogRef<AddressModalComponent>);
  private dialog = inject(MatDialog);

  // Recibir datos iniciales desde el componente padre
  initialAddress = input<AddressData | null>(null);

  searchQuery = signal<string>('');
  selectedAddress = signal<AddressData | null>(null);

  // Dirección favorita de ejemplo
  favoriteAddress = signal<AddressData>({
    name: 'SEMAT',
    address: '16 N-152z, 08130 Santa Perpètua de Mogoda, España',
    contact: 'JULIO',
    phone: '+34634784259',
    schedule: 'Lun-Sab : 08h-21h'
  });

  constructor() {
    // Inicializar con la dirección seleccionada previamente si existe
    effect(() => {
      const initial = this.initialAddress();
      if (initial) {
        this.selectedAddress.set(initial);
      }
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onSelectAddress(address: AddressData) {
    this.selectedAddress.set(address);
  }

  onAddNewAddress() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '1200px',
      maxHeight: '90vh',
      panelClass: 'edit-address-dialog',
      data: {
        title: 'transports.create.add-new-address',
        component: EditAddressModalComponent,
        componentInputs: {},
        showActions: false,
        hideTitle: true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Aquí podrías agregar la nueva dirección a la lista
        console.log('Nueva dirección creada:', result);
      }
    });
  }

  onSave() {
    const selected = this.selectedAddress();
    if (selected) {
      this.dialogRef.close(selected);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}

