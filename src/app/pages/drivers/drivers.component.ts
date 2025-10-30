import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';
import { createDriversTableConfig } from './driversTableConfig';

@Component({
  selector: 'app-drivers',
  imports: [
    CommonModule,
    DynamicTableComponent,
    TranslatePipe
  ],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriversComponent implements OnInit {
  //DATOS MOCK DE CONDUCTORES
  listArray = signal<any[]>([
    {
      id: 1,
      image: 'assets/images/sample_user_icon.png',
      name: 'Juan García Martínez',
      dni: '12345678A',
      cif: 'B12345678',
      province: 'Sevilla',
      city: 'Dos Hermanas',
      email: 'juan.garcia@example.com',
      phone: '612 345 678',
      created_datetime: '2024-01-15',
      rating: '4.8',
      tags: ['Puntual', 'Profesional'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.250,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 2,
      image: 'assets/images/sample_user_icon.png',
      name: 'María López Fernández',
      dni: '87654321B',
      cif: 'B87654321',
      province: 'Sevilla',
      city: 'Sevilla',
      email: 'maria.lopez@example.com',
      phone: '623 456 789',
      created_datetime: '2024-02-20',
      rating: '4.9',
      tags: ['Responsable', 'Puntual'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.450,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 3,
      image: 'assets/images/sample_user_icon.png',
      name: 'Carlos Ruiz Sánchez',
      dni: '45678912C',
      cif: 'B45678912',
      province: 'Málaga',
      city: 'Málaga',
      email: 'carlos.ruiz@example.com',
      phone: '634 567 890',
      created_datetime: '2024-03-10',
      rating: '4.5',
      tags: ['Experiencia'],
      validated: 'NO_VALIDATE',
      fortnightEarnings: '980,00 €',
      is_active: 'INACTIVE'
    },
    {
      id: 4,
      image: 'assets/images/sample_user_icon.png',
      name: 'Ana Martín Pérez',
      dni: '78912345D',
      cif: 'B78912345',
      province: 'Cádiz',
      city: 'Jerez de la Frontera',
      email: 'ana.martin@example.com',
      phone: '645 678 901',
      created_datetime: '2024-01-25',
      rating: '4.7',
      tags: ['Puntual', 'Eficiente'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.320,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 5,
      image: 'assets/images/sample_user_icon.png',
      name: 'Pedro González Torres',
      dni: '23456789E',
      cif: 'B23456789',
      province: 'Sevilla',
      city: 'Alcalá de Guadaíra',
      email: 'pedro.gonzalez@example.com',
      phone: '656 789 012',
      created_datetime: '2024-04-05',
      rating: '4.6',
      tags: ['Nuevo', 'Responsable'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.150,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 6,
      image: 'assets/images/sample_user_icon.png',
      name: 'Laura Jiménez Castro',
      dni: '34567891F',
      cif: 'B34567891',
      province: 'Huelva',
      city: 'Huelva',
      email: 'laura.jimenez@example.com',
      phone: '667 890 123',
      created_datetime: '2024-02-14',
      rating: '4.9',
      tags: ['Profesional', 'Puntual', 'Eficiente'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.520,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 7,
      image: 'assets/images/sample_user_icon.png',
      name: 'Francisco Romero Muñoz',
      dni: '56789123G',
      cif: 'B56789123',
      province: 'Córdoba',
      city: 'Córdoba',
      email: 'francisco.romero@example.com',
      phone: '678 901 234',
      created_datetime: '2024-03-22',
      rating: '4.4',
      tags: ['Experiencia'],
      validated: 'NO_VALIDATE',
      fortnightEarnings: '890,00 €',
      is_active: 'INACTIVE'
    },
    {
      id: 8,
      image: 'assets/images/sample_user_icon.png',
      name: 'Isabel Moreno Díaz',
      dni: '67891234H',
      cif: 'B67891234',
      province: 'Sevilla',
      city: 'Mairena del Aljarafe',
      email: 'isabel.moreno@example.com',
      phone: '689 012 345',
      created_datetime: '2024-01-30',
      rating: '4.8',
      tags: ['Responsable', 'Profesional'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.380,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 9,
      image: 'assets/images/sample_user_icon.png',
      name: 'Miguel Ángel Herrera Gil',
      dni: '89123456I',
      cif: 'B89123456',
      province: 'Málaga',
      city: 'Marbella',
      email: 'miguel.herrera@example.com',
      phone: '690 123 456',
      created_datetime: '2024-04-12',
      rating: '4.7',
      tags: ['Puntual', 'Eficiente'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.420,00 €',
      is_active: 'ACTIVE'
    },
    {
      id: 10,
      image: 'assets/images/sample_user_icon.png',
      name: 'Carmen Silva Rodríguez',
      dni: '91234567J',
      cif: 'B91234567',
      province: 'Granada',
      city: 'Granada',
      email: 'carmen.silva@example.com',
      phone: '601 234 567',
      created_datetime: '2024-02-28',
      rating: '4.6',
      tags: ['Profesional'],
      validated: 'VALIDATE',
      fortnightEarnings: '1.280,00 €',
      is_active: 'ACTIVE'
    }
  ]);

  //CONFIGURACION DE LA TABLA
  driversTableConfig = signal(createDriversTableConfig(this.listArray()));

  ngOnInit() {
    this.loadDrivers();
  }

  //CARGAR CONDUCTORES EN LA TABLA
  loadDrivers(params?: TableEvent) {
    //AQUÍ SE IMPLEMENTARÍA LA LLAMADA AL BACKEND
    //POR AHORA CARGAMOS LOS DATOS MOCK
    this.driversTableConfig().data.set(this.listArray());
  }

  //MANEJAR EVENTOS DE LA TABLA
  handleTableEvent(event: TableEvent) {
    console.log('Table event:', event);

    if (event.type === 'action') {
      this.handleAction(event.data?.action!, event.data?.row);
    } else if (event.type === 'page') {
      this.loadDrivers(event);
    } else if (event.type === 'search' || event.type === 'filter') {
      this.loadDrivers(event);
    }
  }

  //MANEJAR ACCIONES DE LA TABLA
  handleAction(action: string, row: any) {
    console.log(`Action ${action} on row:`, row);

    switch (action) {
      case 'edit':
        console.log('Editar conductor:', row);
        //AQUÍ IMPLEMENTAR NAVEGACIÓN A EDICIÓN
        break;
      case 'view':
        console.log('Ver conductor:', row);
        //AQUÍ IMPLEMENTAR NAVEGACIÓN A VISTA DETALLE
        break;
      case 'delete':
        console.log('Eliminar conductor:', row);
        //AQUÍ IMPLEMENTAR CONFIRMACIÓN Y ELIMINACIÓN
        break;
    }
  }
}
