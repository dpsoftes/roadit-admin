import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { additionalServicesTableConfig } from './additionalServicesTableConfig';
import { additionalServicesAssignedTableConfig } from './additionalServicesAssignedTableConfig';
  
export interface AdditionalService {
  id: string;
  title: string;
  clientPrice: number;
  driverPayment: number;
  applicationMoment: 'departure' | 'arrival' | 'both';
  certificationName: string;
  requiresCertification: boolean;
  selectedByDefault: boolean;
  visibleToDriver: boolean;
  requiresImageAndLocation: boolean;
}

@Component({
  selector: 'app-additional-services',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    TranslatePipe,
    DynamicTableComponent,
    ButtonsComponent
  ],
  templateUrl: './additional-services.component.html',
  styleUrl: './additional-services.component.scss'
})
export class AdditionalServicesComponent {

  additionalServicesTableConfig = additionalServicesTableConfig;
  additionalServicesAssignedTableConfig = additionalServicesAssignedTableConfig;

  // Signals para el formulario
  service = signal<AdditionalService>({
    id: '',
    title: '',
    clientPrice: 0,
    driverPayment: 0,
    applicationMoment: 'both',
    certificationName: '',
    requiresCertification: false,
    selectedByDefault: false,
    visibleToDriver: false,
    requiresImageAndLocation: false
  });

  // Opciones para el dropdown
  applicationMoments = signal([
    { value: 'departure', label: 'clients.create-client.departure' },
    { value: 'arrival', label: 'clients.create-client.arrival' },
    { value: 'both', label: 'clients.create-client.both' }
  ]);

  // Métodos para actualizar el formulario
  updateTitle(title: string): void {
    this.service.update(service => ({ ...service, title }));
  }

  updateClientPrice(price: number): void {
    this.service.update(service => ({ ...service, clientPrice: price }));
  }

  updateDriverPayment(payment: number): void {
    this.service.update(service => ({ ...service, driverPayment: payment }));
  }

  updateApplicationMoment(moment: 'departure' | 'arrival' | 'both'): void {
    this.service.update(service => ({ ...service, applicationMoment: moment }));
  }

  updateCertificationName(name: string): void {
    this.service.update(service => ({ ...service, certificationName: name }));
  }

  updateRequiresCertification(requires: boolean): void {
    this.service.update(service => ({ ...service, requiresCertification: requires }));
  }

  updateSelectedByDefault(selected: boolean): void {
    this.service.update(service => ({ ...service, selectedByDefault: selected }));
  }

  updateVisibleToDriver(visible: boolean): void {
    this.service.update(service => ({ ...service, visibleToDriver: visible }));
  }

  updateRequiresImageAndLocation(requires: boolean): void {
    this.service.update(service => ({ ...service, requiresImageAndLocation: requires }));
  }

  onAssign(): void {
    console.log('Asignando servicio:', this.service());
    // Aquí se implementaría la lógica para asignar el servicio
  }

  onCancel(): void {
    console.log('Cancelando');
    // Aquí se implementaría la lógica para cancelar
  }

  onEditCertification(): void {
    console.log('Editando certificación');
    // Aquí se implementaría la lógica para editar la certificación
  }
}
