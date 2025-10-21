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
import { ImageDropComponent } from '@components/index';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';

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
    ImageDropComponent,
    ButtonsComponent
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
      'id-eurotransport': ['', Validators.required],
      'id-revel': ['', Validators.required],
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
      sendFinalCustomer: [false],
      appointment_time: [''],
      appointment_time_between: ['']
    });
  }

  onImageAccepted(event: { base64: string, file: File }): void {
    if (this.clientData()?.image) {
      this.clientData().image.set(event.file);
    }
  }
  onPhotoChanged(){
    
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
    console.log('cancel')
  }

  clientTypes = signal<string[]>(['Type 1', 'Type 2']);
  clientOrigins = signal<string[]>(['Origin 1', 'Origin 2']);
  billingTypes = signal<string[]>(['Manual', 'Automatic']);
  departments = signal<string[]>(['IT', 'HR', 'Finance', 'Operations', 'Marketing']);
}
