import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-create-group',
  imports: [
    CommonModule,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './create-group.html',
  styleUrl: './create-group.scss'
})
export class CreateGroup {
  selectedUserIds = signal<number[]>([]);

  availableUsers = signal([
    { id: 1, name: 'Luis', lastname: 'García', role: 'ADMIN' },
    { id: 2, name: 'María', lastname: 'Fernández', role: 'ADMIN' },
    { id: 3, name: 'Carlos', lastname: 'Ruiz', role: 'USER' },
    { id: 4, name: 'Ana', lastname: 'Martín', role: 'ADMIN' },
    { id: 5, name: 'Pedro', lastname: 'López', role: 'USER' },
    { id: 6, name: 'Sofia', lastname: 'González', role: 'ADMIN' },
    { id: 7, name: 'Miguel', lastname: 'Hernández', role: 'USER' },
    { id: 8, name: 'Laura', lastname: 'Jiménez', role: 'ADMIN' },
    { id: 9, name: 'David', lastname: 'Morales', role: 'USER' },
    { id: 10, name: 'Carmen', lastname: 'Vargas', role: 'ADMIN' }
  ]);

  get selectedUsers() {
    return this.availableUsers().filter(user =>
      this.selectedUserIds().includes(user.id)
    );
  }

  onUserSelectionChange(selectedIds: number[]) {
    this.selectedUserIds.set(selectedIds);
  }

  removeUser(userId: number) {
    const currentIds = this.selectedUserIds();
    const updatedIds = currentIds.filter(id => id !== userId);
    this.selectedUserIds.set(updatedIds);
  }

  onSave() {
    console.log('Saving group');
  }

  onCancel() {
    console.log('Cancelling group creation');
  }
}
