import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  inject,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';
import { createDriversTableConfig } from './driversTableConfig';
import { DriverStore } from '@store/driver.state';
import { I18nService } from '@i18n/i18n.service';

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
  private i18n = inject(I18nService);
  store = inject(DriverStore);
  drivers = signal(this.store.drivers());

  //CONFIGURACION DE LA TABLA
  driversTableConfig = signal(createDriversTableConfig(this.drivers, this.i18n));

  constructor() {
    //EFECTO QUE ACTUALIZA LA SEÑAL LOCAL CUANDO CAMBIA EL STORE
    effect(() => {
      this.drivers.set(this.store.drivers());
      //ACTUALIZAR LA TABLA CUANDO CAMBIEN LOS DATOS
      this.driversTableConfig().data.set(this.drivers());
    });
  }

  async ngOnInit() {
    //INICIALIZAR DESDE LOCALSTORAGE
    this.store.initializeFromStorage();

    //CARGAR CONDUCTORES DESDE EL BACKEND
    await this.loadDrivers();
  }

  //CARGAR CONDUCTORES EN LA TABLA
  async loadDrivers(params?: TableEvent) {
    //EL MÉTODO getDrivers DEL STORE AUTOMÁTICAMENTE ACTUALIZA EL ESTADO
    await this.store.getDrivers();

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
        break;
      case 'view':
        console.log('Ver conductor:', row);
        break;
      case 'delete':
        console.log('Eliminar conductor:', row);
        break;
    }
  }
}
