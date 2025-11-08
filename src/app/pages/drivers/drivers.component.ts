import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  inject,
  effect,
  computed,
  untracked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { Router } from '@angular/router';
import { DriverStore } from '@store/driver.state';
import { I18nService } from '@i18n/i18n.service';
import { GlobalStore } from '@store/global.state';
import { DriverDto, TagDto } from '@dtos';
import { TableColumn } from '@components/dp-datagrid/dp-datagrid.interfaces';
import { InputMultiTagComponent } from '@components/input-multi-tag/input-multi-tag.component';

//IMPORTAR COMPONENTES Y TIPOS DE DP-DATAGRID
import {
  DpDatagridComponent,
  DpDatagridColumnsComponent,
  DpDatagridColumnComponent,
  DpDatagridFilterComponent,
  DpDatagridFilterContainerComponent,
  DpDatagridActionsComponent,
  DpDatagridActionComponent,
  FilterChangeEvent,
  ActionConfig
} from '@components/dp-datagrid';

//INTERFACE PARA LAS OPCIONES DE TAG (FILTRO)
export interface TagOption {
  value: string;
  label: string;
  color?: string;
}

//TIPO PARA DRIVER CON TAGS TRANSFORMADAS (SOLO PARA DISPLAY)
//NO EXTIENDE DRIVERDTO PORQUE PERDEMOS LOS METODOS AL HACER SPREAD
export type DriverDisplayData = {
  id: number;
  username: string;
  email: string;
  phone: string | null;
  name: string;
  last_name: string;
  image: string | null;
  is_active: boolean;
  dni: string;
  cif: string;
  validated: boolean;
  rating: string;
  city: string;
  province: string;
  postal_code: string;
  billing_blocked: boolean;
  transport_blocked: boolean;
  allows_access_location: boolean;
  tags: TagDto[]; //TAGS YA SON OBJETOS COMPLETOS TAGDTO
  created_datetime: string | null;
};

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    DpDatagridComponent,
    DpDatagridColumnsComponent,
    DpDatagridColumnComponent,
    DpDatagridFilterComponent,
    DpDatagridFilterContainerComponent,
    DpDatagridActionsComponent,
    DpDatagridActionComponent,
    InputMultiTagComponent
  ],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriversComponent implements OnInit {
  private i18n = inject(I18nService);
  store = inject(DriverStore);
  private globalStore = inject(GlobalStore);
  private router = inject(Router);

  //SIGNAL PARA LOS CONDUCTORES ORIGINALES SIN FILTRAR
  private allDrivers = signal<DriverDto[]>(this.store.drivers());

  //SIGNAL PARA LOS CONDUCTORES FILTRADOS CON TAGS TRANSFORMADAS
  drivers = signal<DriverDisplayData[]>([]);

  //SIGNAL PARA LOS IDs DE TAGS SELECCIONADOS EN EL FILTRO
  selectedTagIds = signal<number[]>([]);

  //SIGNAL PARA OTROS FILTROS DEL DP-DATAGRID
  private otherFilters = signal<Record<string, string | boolean | number>>({});

  //OBTENER TODAS LAS TAGS DEL GLOBALSTORE
  allTags: TagDto[] = this.globalStore.tags();

  //COMPUTED: FILTRAR SOLO LAS TAGS TIPO DRIVER
  driverTags = computed<TagDto[]>(() => {
    return this.allTags.filter((tag: TagDto) => tag.type === 'DRIVER');
  });

  //COMPUTED: CONVERTIR TAGS A FORMATO DE OPCIONES PARA EL FILTRO
  tagOptions = computed<TagOption[]>(() => {
    const currentLanguage = this.globalStore.language() as 'es' | 'en';
    return this.driverTags().map((tag: TagDto) => ({
      value: String(tag.id),
      label: tag.getName(currentLanguage),
      color: tag.getColorWithHash()
    }));
  });

  //CONFIGURACION DE ACCIONES
  actionsConfig: ActionConfig = {
    actions: [
      {
        action: 'view',
        icon: 'visibility',
        label: 'Ver',
        color: 'primary',
        condition: (row: DriverDisplayData) => true,
        onClick: (row: DriverDisplayData) => this.viewDriver(row)
      },
      {
        action: 'delete',
        icon: 'delete',
        label: 'Eliminar',
        color: 'warn',
        condition: (row: DriverDisplayData) => true,
        onClick: (row: DriverDisplayData) => this.deleteDriver(row)
      }
    ]
  };

  //FUNCIONES DE RENDERIZADO PERSONALIZADO
  renderFullName = (column: TableColumn, row: DriverDisplayData): string => {
    return `
      <div class="name-cell">
        <div>${row.name || ''}</div>
        <div class="last-name">${row.last_name || ''}</div>
      </div>
    `;
  };

  renderDniCif = (column: TableColumn, row: DriverDisplayData): string => {
    return `
      <div class="dni-cif-cell">
        <div class="dni-line">${row.dni || '-'}</div>
        <div class="cif-line">${row.cif || '-'}</div>
      </div>
    `;
  };

  renderDate = (column: TableColumn, row: DriverDisplayData): string => {
    if (!row.created_datetime) return '-';

    const date = new Date(row.created_datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  //⭐ YA NO NECESITAS RENDERTAGS - EL CHIP-ARRAY LO MANEJA AUTOMATICAMENTE

  renderValidated = (column: TableColumn, row: DriverDisplayData): string => {
    const isValidated = row.validated;
    const translationKey = isValidated ? 'drivers.profile.VALIDATE' : 'drivers.profile.NO_VALIDATE';
    const translatedText = this.i18n.translate(translationKey);

    const iconPath = isValidated
      ? 'assets/icons/validatedIcon.svg'
      : 'assets/icons/noValidatedIcon.svg';

    return `
      <div class="validated-cell-wrapper">
        <img src="${iconPath}" alt="${translatedText}" class="validated-icon-24" />
        <span class="validated-text-span">${translatedText}</span>
      </div>
    `;
  };

  renderStatus = (column: TableColumn, row: DriverDisplayData): string => {
    const isActive = row.is_active;
    const translationKey = isActive ? 'drivers.isActive.ACTIVE' : 'drivers.isActive.INACTIVE';
    const translatedText = this.i18n.translate(translationKey);

    return `
      <div class="validated-cell-wrapper">
        <span class="validated-text-span">${translatedText}</span>
      </div>
    `;
  };

  constructor() {
    //EFECTO QUE ACTUALIZA LA SEÑAL LOCAL CUANDO CAMBIA EL STORE
    effect(() => {
      this.allDrivers.set(this.store.drivers());
      //APLICAR FILTROS DESPUES DE CARGAR LOS DATOS
      this.applyAllFilters();
    });

    //EFECTO QUE REFRESCA LA VISTA CUANDO CAMBIA EL IDIOMA
    effect(() => {
      const currentLanguage = this.globalStore.language() as 'es' | 'en';
      console.log('🔄 Effect ejecutado - Idioma:', currentLanguage);
      console.log('🏷️ Tag options actuales:', this.tagOptions());

      //FORZAR ACTUALIZACION DE LOS DATOS PARA QUE SE RE-RENDERICEN LAS COLUMNAS
      //TRANSFORMAR LAS TAGS NUEVAMENTE
      this.updateDriversWithTransformedTags();
    });
  }

  async ngOnInit(): Promise<void> {
    //INICIALIZAR DESDE LOCALSTORAGE
    this.store.initializeFromStorage();

    //CARGAR CONDUCTORES DESDE EL BACKEND
    await this.loadDrivers();

    //LOG PARA DEBUG
    console.log('📊 Drivers cargados:', this.drivers().length);
    console.log('🏷️ Tags disponibles:', this.allTags.length);
    console.log('🌍 Idioma actual:', this.globalStore.language());
  }

  //CARGAR CONDUCTORES
  async loadDrivers(): Promise<void> {
    await this.store.getDrivers();
  }

  //⭐ METODO PARA TRANSFORMAR LAS TAGS AL FORMATO QUE ENTIENDE EL CHIP-ARRAY
  //CONVIERTE IDS DE TAGS A OBJETOS TAGDTO COMPLETOS
  private transformDriverTags(driver: DriverDto): DriverDisplayData {
    const transformedTags: TagDto[] = [];

    if (Array.isArray(driver.tags) && driver.tags.length > 0) {
      for (const tagItem of driver.tags) {
        //SI YA ES UN TAGDTO, AGREGARLO DIRECTAMENTE
        if (typeof tagItem === 'object' && 'getName' in tagItem) {
          transformedTags.push(tagItem);
          continue;
        }

        //SI ES UN ID (NUMBER O OBJETO CON ID), EXTRAER EL ID
        let tagId: number;

        if (typeof tagItem === 'number') {
          tagId = tagItem;
        } else if (typeof tagItem === 'object' && tagItem !== null && 'id' in tagItem) {
          //SOLUCION ERROR 1: CAST EXPLICITO PARA ACCEDER A ID
          tagId = (tagItem as { id: number }).id;
        } else {
          console.warn(`⚠️ Tag con formato inválido`, tagItem);
          continue;
        }

        //BUSCAR LA TAG COMPLETA EN TODAS LAS TAGS
        const fullTag = this.allTags.find((tag: TagDto) => tag.id === tagId);

        if (fullTag) {
          transformedTags.push(fullTag);
        } else {
          console.warn(`⚠️ Tag con ID ${tagId} no encontrada`);
        }
      }
    }

    //RETORNAR OBJETO PLANO CON TODAS LAS PROPIEDADES DEL DRIVER Y TAGS TRANSFORMADAS
    return {
      id: driver.id,
      username: driver.username,
      email: driver.email,
      phone: driver.phone,
      name: driver.name,
      last_name: driver.last_name,
      image: driver.image,
      is_active: driver.is_active,
      dni: driver.dni,
      cif: driver.cif,
      validated: driver.validated,
      rating: driver.rating,
      city: driver.city,
      province: driver.province,
      postal_code: driver.postal_code,
      billing_blocked: driver.billing_blocked,
      transport_blocked: driver.transport_blocked,
      allows_access_location: driver.allows_access_location,
      tags: transformedTags,
      created_datetime: driver.created_datetime
    };
  }

  //METODO AUXILIAR PARA ACTUALIZAR DRIVERS CON TAGS TRANSFORMADAS
  private updateDriversWithTransformedTags(): void {
    const currentDrivers = untracked(this.allDrivers);
    const driversWithTransformedTags = currentDrivers.map(driver =>
      this.transformDriverTags(driver)
    );
    this.drivers.set(driversWithTransformedTags);
  }

  //MANEJAR CAMBIOS EN LAS TAGS SELECCIONADAS
  onTagsChange(newTagIds: number[] | string[]): void {
    this.selectedTagIds.set(newTagIds as number[]);
    this.applyAllFilters();
  }

  //MANEJAR CAMBIOS DE FILTROS DE DP-DATAGRID
  onFilterChange(event: FilterChangeEvent): void {
    console.log('Filtros de dp-datagrid aplicados:', event);
    this.otherFilters.set(event.filters);
    this.applyAllFilters();
  }

  //APLICAR TODOS LOS FILTROS (TAGS + DP-DATAGRID)
  private applyAllFilters(): void {
    let filteredData: DriverDto[] = [...this.allDrivers()];
    const tagIds = this.selectedTagIds();
    const filters = this.otherFilters();

    //FILTRAR POR TAGS SI HAY TAGS SELECCIONADAS
    if (tagIds && tagIds.length > 0) {
      filteredData = filteredData.filter((driver: DriverDto) => {
        if (!Array.isArray(driver.tags) || driver.tags.length === 0) {
          return false;
        }

        //SOLUCION ERROR 2: USAR FILTER PARA ELIMINAR UNDEFINED Y CAMBIAR EL TIPO
        const driverTagIds: number[] = driver.tags
          .map((tag: TagDto | number): number | undefined => {
            if (typeof tag === 'number') {
              return tag;
            }
            if (typeof tag === 'object' && tag !== null && 'id' in tag) {
              return tag.id;
            }
            return undefined;
          })
          .filter((id): id is number => id !== undefined);

        //VERIFICAR SI EL CONDUCTOR TIENE AL MENOS UNA DE LAS TAGS SELECCIONADAS
        return tagIds.some(selectedTagId => driverTagIds.includes(selectedTagId));
      });
    }

    //APLICAR OTROS FILTROS DE DP-DATAGRID SI EXISTEN
    if (filters && Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          filteredData = filteredData.filter((driver: DriverDto) => {
            //USAR KEYOF PARA ACCESO TIPADO
            const driverValue = driver[key as keyof DriverDto];

            //MANEJO ESPECIAL PARA DIFERENTES TIPOS DE FILTROS
            if (typeof value === 'string') {
              return String(driverValue).toLowerCase().includes(value.toLowerCase());
            } else if (typeof value === 'boolean') {
              return driverValue === value;
            } else if (Array.isArray(value)) {
              return value.includes(driverValue);
            }

            return String(driverValue) === String(value);
          });
        }
      });
    }

    console.log(`📊 Filtros aplicados: ${this.allDrivers().length} → ${filteredData.length} conductores`);

    //⭐ TRANSFORMAR LAS TAGS ANTES DE ASIGNAR A drivers
    const driversWithTransformedTags = filteredData.map(driver =>
      this.transformDriverTags(driver)
    );

    this.drivers.set(driversWithTransformedTags);
  }

  //MANEJAR ACCION DE CREAR CONDUCTOR
  onCreateDriver(event: any): void {
    console.log('Navegando a crear nuevo conductor');
    this.router.navigate(['/drivers/create-driver']);
  }

  //NAVEGAR A VER CONDUCTOR
  viewDriver(row: DriverDisplayData): void {
    console.log('Ver conductor:', row);
    this.router.navigate(['/drivers/edit-driver', row.id]);
  }

  //ELIMINAR CONDUCTOR
  deleteDriver(row: DriverDisplayData): void {
    console.log('Eliminar conductor:', row);
    //IMPLEMENTAR LOGICA DE ELIMINACION
  }
}
