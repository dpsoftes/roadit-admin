import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '@i18n/translate.pipe';

@Component({
  selector: 'app-general-tab-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    MatCheckboxModule,
  ],
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralTabComponent {
  // Input signals
  clientData = input< any| null>(null);
  clientGroups = input<any[]>([]);
  managers = input<any[]>([]);
  
  // Output signals
  formDataChange = output<any>();

  // Formulario reactivo
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      CIF: ['', Validators.required],
      client_group: [null],
      department: [''],
      parent: [null],
      client_type: ['', Validators.required],
      client_origin: ['', Validators.required],
      billing_type: ['', Validators.required],
      contact_person_name: [''],
      contact_person_email: [''],
      contact_person_phone: [''],
      is_subentity: [false],
      own_insurance: [false],
      at_risk: [false],
      managers: [[]],
      sendFinalCustomer: [false]
    });
  }

  onPhotoChanged(photo: string): void {
    console.log('Photo changed:', photo);
  }
  
  onPhotoDeleted(photo: string): void {
    console.log('Photo deleted:', photo);
  }

  // Método único para guardar - se ejecuta solo cuando se presiona el botón
  onSave(): void {
    if (this.clientForm.valid) {
      const formData = this.clientForm.value as any;
      this.formDataChange.emit(formData);
    } else {
      console.log('Formulario inválido:', this.clientForm.errors);
      // Marcar todos los campos como tocados para mostrar errores
      this.clientForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.clientForm.reset();
  }

  clientTypes = signal<string[]>(['Type 1', 'Type 2']);
  clientOrigins = signal<string[]>(['Origin 1', 'Origin 2']);
  billingTypes = signal<string[]>(['Manual', 'Automatic']);
  departments = signal<string[]>(['IT', 'HR', 'Finance', 'Operations', 'Marketing']);
}
