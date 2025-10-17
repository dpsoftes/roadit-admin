import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
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
  // Input signals
  availableAdmins = input<any[]>([]);
  groupData = input< any| null>(null);
  
  // Output signals
  groupCreated = output<any>();
  groupCancelled = output<void>();

  // Formulario reactivo
  groupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      assigned_admins: [[]]
    });
  }

  get selectedAdmins() {
    const selectedIds = this.groupForm.get('assigned_admins')?.value || [];
    return this.availableAdmins().filter(admin =>
      selectedIds.includes(admin.id)
    );
  }

  onSave() {
    if (this.groupForm.valid) {
      const formData = this.groupForm.value as any;
      this.groupCreated.emit(formData);
    } else {
      console.log('Formulario inválido:', this.groupForm.errors);
      this.groupForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.groupForm.reset();
    this.groupCancelled.emit();
  }
}
