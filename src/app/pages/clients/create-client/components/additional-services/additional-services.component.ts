import { Component, signal, inject } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';
import { CertificationComponent } from '../certification/certification.component';
  
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
  private dialog = inject(MatDialog);

  additionalServicesTableConfig = additionalServicesTableConfig;
  additionalServicesAssignedTableConfig = additionalServicesAssignedTableConfig;

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

  applicationMoments = signal([
    { value: 'departure', label: 'clients.create-client.departure' },
    { value: 'arrival', label: 'clients.create-client.arrival' },
    { value: 'both', label: 'clients.create-client.both' }
  ]);

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
  }

  onCancel(): void {
    console.log('Cancelando');
  }

  onEditCertification(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '90vh',
      data: {
        title: 'clients.create-client.edit-certification',
        component: CertificationComponent,
        showActions: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Certificación guardada:', result);
      }
    });
  }

  /* private getDefaultCertification(): Certification {
    return {
      id: '',
      title: '',
      questions: [
        {
          id: '1',ov
          text: '',
          answers: [
            { id: 'A', text: '', isCorrect: true },
            { id: 'B', text: '', isCorrect: false },
            { id: 'C', text: '', isCorrect: false }
          ]
        },
        {
          id: '2',
          text: '',
          answers: [
            { id: 'A', text: '', isCorrect: true },
            { id: 'B', text: '', isCorrect: false },
            { id: 'C', text: '', isCorrect: false }
          ]
        }
      ],
      attemptsPerWeek: 1,
      availableForNewDrivers: false
    };
  } */
}
