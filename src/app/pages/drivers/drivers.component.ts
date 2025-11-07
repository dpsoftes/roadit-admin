import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  inject,
  effect,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TableEvent } from '@components/dynamic-table/dynamic-table.interfaces';
import { createDriversTableConfig } from './driversTableConfig';
import { DriverStore } from '@store/driver.state';
import { I18nService } from '@i18n/i18n.service';
import { GlobalStore } from '@store/global.state';

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
  private globalStore = inject(GlobalStore);

  //OBTENER TODAS LAS TAGS DEL GLOBALSTORE
  allTags = this.globalStore.tags();

  //COMPUTED: FILTRAR SOLO LAS TAGS TIPO DRIVER
  driverTags = computed(() => {
    return this.allTags.filter((tag: any) => tag.type === 'DRIVER');
  });

  //COMPUTED: CONVERTIR TAGS A FORMATO DE OPCIONES PARA EL FILTRO
  tagOptions = computed(() => {
    const currentLanguage = this.globalStore.language() as 'es' | 'en';
    return this.driverTags().map((tag: any) => ({
      value: String(tag.id),
      label: this.getTagName(tag, currentLanguage),
      color: this.getTagColor(tag)
    }));
  });

  //CONFIGURACION DE LA TABLA
  driversTableConfig = signal(
    createDriversTableConfig(
      this.drivers,
      this.i18n,
      this.tagOptions(),
      this.allTags,
      this.globalStore.language() as 'es' | 'en'
    )
  );

  constructor() {
    //EFECTO QUE ACTUALIZA LA SEÑAL LOCAL CUANDO CAMBIA EL STORE
    effect(() => {
      this.drivers.set(this.store.drivers());
      //ACTUALIZAR LA TABLA CUANDO CAMBIEN LOS DATOS
      this.driversTableConfig().data.set(this.drivers());
    });

    //EFECTO QUE ACTUALIZA LA CONFIG DE LA TABLA CUANDO CAMBIAN LAS TAG OPTIONS O EL IDIOMA
    effect(() => {
      //FORZAR LA LECTURA DEL IDIOMA PARA QUE EL EFECTO SE EJECUTE CUANDO CAMBIE
      const currentLanguage = this.globalStore.language() as 'es' | 'en';
      const currentOptions = this.tagOptions();

      console.log('🔄 Effect ejecutado - Idioma:', currentLanguage);
      console.log('🏷️ Tag options actuales:', currentOptions);

      //RECREAR LA CONFIGURACIÓN DE LA TABLA COMPLETAMENTE
      //ESTO ASEGURA QUE LAS FUNCIONES render SE EJECUTEN CON EL NUEVO IDIOMA
      const newConfig = createDriversTableConfig(
        this.drivers,
        this.i18n,
        currentOptions,
        this.allTags,
        currentLanguage
      );

      //ACTUALIZAR LA SEÑAL DE CONFIGURACIÓN
      this.driversTableConfig.set(newConfig);

      console.log('✅ Configuración de tabla actualizada');
    });
  }

  async ngOnInit() {
    //INICIALIZAR DESDE LOCALSTORAGE
    this.store.initializeFromStorage();

    //CARGAR CONDUCTORES DESDE EL BACKEND
    await this.loadDrivers();

    //LOG PARA DEBUG
    console.log('📊 Drivers cargados:', this.drivers().length);
    console.log('🏷️ Tags disponibles:', this.allTags.length);
    console.log('🌍 Idioma actual:', this.globalStore.language());
  }

  //HELPER: OBTENER NOMBRE DE TAG EN EL IDIOMA ESPECIFICADO
  private getTagName(tag: any, language: 'es' | 'en' = 'es'): string {
    //SI LA TAG TIENE EL METODO getName (ES INSTANCIA DE TagDto)
    if (typeof tag.getName === 'function') {
      return tag.getName(language);
    }
    //SI ES OBJETO PLANO CON LA ESTRUCTURA NUEVA
    if (tag.name && typeof tag.name === 'object') {
      return tag.name[language] || tag.name.es || '';
    }
    //FALLBACK PARA ESTRUCTURA ANTIGUA
    return tag.name || '';
  }

  //HELPER: OBTENER COLOR DE TAG CON #
  private getTagColor(tag: any): string {
    //SI LA TAG TIENE EL METODO getColorWithHash (ES INSTANCIA DE TagDto)
    if (typeof tag.getColorWithHash === 'function') {
      return tag.getColorWithHash();
    }
    //SI ES OBJETO PLANO
    if (tag.color) {
      return tag.color.startsWith('#') ? tag.color : `#${tag.color}`;
    }
    //FALLBACK
    return '#999999';
  }

  //DEBUG: MOSTRAR TAGS EN FORMATO JSON LEGIBLE
  tagsDebug(): string {
    return JSON.stringify({
      totalTags: this.allTags.length,
      driverTags: this.driverTags().length,
      tagOptions: this.tagOptions().length,
      currentLanguage: this.globalStore.language(),
      sampleTag: this.allTags[0] || null,
      sampleDriverTag: this.driverTags()[0] || null,
      sampleOption: this.tagOptions()[0] || null
    }, null, 2);
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
