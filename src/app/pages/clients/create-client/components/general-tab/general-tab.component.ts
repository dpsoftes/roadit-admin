import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation, input, output } from '@angular/core';
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
  clientData = input< any| null>(null);
  clientGroups = input<any[]>([]);
  managersInput = input<any[]>([]);
  
  formDataChange = output<any>();

  name = signal<string>('');
  eurotransport_identifier = signal<string>('');
  revel_identifier = signal<string>('');
  client_group = signal<any>(null);
  department = signal<string>('');
  parent = signal<any>(null);
  client_type = signal<string>('');
  client_origin = signal<string>('');
  billing_type = signal<string>('');
  contact_person_name = signal<string>('');
  contact_person_email = signal<string>('');
  contact_person_phone = signal<string>('');
  is_subentity = signal<boolean>(false);
  own_insurance = signal<boolean>(false);
  at_risk = signal<boolean>(false);
  managers = signal<any[]>([]);
  sendFinalCustomer = signal<boolean>(false);
  invite_delay_minutes = signal<string>('');
  reminder_interval_minutes = signal<string>('');

  onImageAccepted(event: { base64: string, file: File }): void {
    if (this.clientData()?.image) {
      this.clientData().image.set(event.file);
    }
  }
  onPhotoChanged(){
    
  }

  onSave(): void {
    const formData = {
      name: this.name(),
      eurotransport_identifier: this.eurotransport_identifier(),
      revel_identifier: this.revel_identifier(),
      client_group: this.client_group(),
      department: this.department(),
      parent: this.parent(),
      client_type: this.client_type(),
      client_origin: this.client_origin(),
      billing_type: this.billing_type(),
      contact_person_name: this.contact_person_name(),
      contact_person_email: this.contact_person_email(),
      contact_person_phone: this.contact_person_phone(),
      is_subentity: this.is_subentity(),
      own_insurance: this.own_insurance(),
      at_risk: this.at_risk(),
      managers: this.managers(),
      sendFinalCustomer: this.sendFinalCustomer(),
      invite_delay_minutes: this.invite_delay_minutes(),
      reminder_interval_minutes: this.reminder_interval_minutes()
    };
    
    this.formDataChange.emit(formData);
  }

  onCancel(): void {
    this.name.set('');
    this.eurotransport_identifier.set('');
    this.revel_identifier.set('');
    this.client_group.set(null);
    this.department.set('');
    this.parent.set(null);
    this.client_type.set('');
    this.client_origin.set('');
    this.billing_type.set('');
    this.contact_person_name.set('');
    this.contact_person_email.set('');
    this.contact_person_phone.set('');
    this.is_subentity.set(false);
    this.own_insurance.set(false);
    this.at_risk.set(false);
    this.managers.set([]);
    this.sendFinalCustomer.set(false);
    this.invite_delay_minutes.set('');
    this.reminder_interval_minutes.set('');
    console.log('cancel')
  }

  clientTypes = signal<string[]>(['Type 1', 'Type 2']);
  clientOrigins = signal<string[]>(['Origin 1', 'Origin 2']);
  billingTypes = signal<string[]>(['Manual', 'Automatic']);
  departments = signal<string[]>(['IT', 'HR', 'Finance', 'Operations', 'Marketing']);
}
