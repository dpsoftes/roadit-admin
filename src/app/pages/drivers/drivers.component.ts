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
import { DriversProvider, PaginatedDriversResponse } from 'src/app/core/providers/drivers.provider';
import { I18nService } from '@i18n/i18n.service';
import { GlobalStore } from '@store/global.state';
import { DriverDto, TagDto } from '@dtos';
import { FilterOption, TableColumn } from '@components/dp-datagrid/dp-datagrid.interfaces';
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
  LoadDataEvent,
  ActionConfig
} from '@components/dp-datagrid';

//INTERFACE PARA LAS OPCIONES DE TAG (FILTRO)
export interface TagOption {
  value: string;
  label: string;
  color?: string;
}

//TIPO PARA DRIVER CON TAGS TRANSFORMADAS (SOLO PARA DISPLAY)
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
  tags: TagDto[];
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
  private driversProvider = inject(DriversProvider);
  private globalStore = inject(GlobalStore);
  private router = inject(Router);

  //SIGNALS PARA DATOS DEL GRID (MODO SERVIDOR)
  drivers = signal<DriverDisplayData[]>([]);
  totalDrivers = signal<number>(0);
  loading = signal<boolean>(false);

  //SIGNAL PARA LOS IDs DE TAGS SELECCIONADOS EN EL FILTRO
  selectedTagIds = signal<number[]>([]);

  //COMPUTED: OBTENER TODAS LAS TAGS DEL GLOBALSTORE (REACTIVO)
  allTags = computed<TagDto[]>(() => {
    return this.globalStore.tags();
  });

  //COMPUTED: FILTRAR SOLO LAS TAGS TIPO DRIVER
  driverTags = computed<TagDto[]>(() => {
    return this.allTags().filter((tag: TagDto) => tag.type === 'DRIVER');
  });

  //COMPUTED: CONVERTIR TAGS A FORMATO DE OPCIONES PARA EL FILTRO
  tagOptions = computed<TagOption[]>(() => {
    const currentLanguage = this.globalStore.language() as 'es' | 'en';
    return this.driverTags().map((tag: TagDto) => {
      //VERIFICAR SI EL OBJETO TAG TIENE EL METODO getName
      if (typeof tag.getName === 'function') {
        return {
          value: String(tag.id),
          label: tag.getName(currentLanguage),
          color: tag.getColorWithHash()
        };
      } else {
        //FALLBACK: ACCEDER DIRECTAMENTE A LAS PROPIEDADES
        const tagName = tag.name && typeof tag.name === 'object'
          ? (tag.name[currentLanguage] || tag.name.es || '')
          : (tag.name || '');

        const color = tag.color?.startsWith('#') ? tag.color : `#${tag.color || ''}`;

        return {
          value: String(tag.id),
          label: tagName,
          color: color
        };
      }
    });
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
    //EFECTO QUE REFRESCA LA VISTA CUANDO CAMBIA EL IDIOMA
    effect(() => {
      const currentLanguage = this.globalStore.language() as 'es' | 'en';
      console.log('🔄 Effect ejecutado - Idioma:', currentLanguage);
      console.log('🏷️ Tag options actuales:', this.tagOptions());

      //FORZAR ACTUALIZACION DE LOS DATOS PARA QUE SE RE-RENDERICEN LAS COLUMNAS
      const currentDrivers = untracked(() => this.drivers());
      this.drivers.set([...currentDrivers]);
    });
  }

  async ngOnInit(): Promise<void> {
    //CARGAR PRIMERA PAGINA DE CONDUCTORES
    console.log('🚀 Inicializando DriversComponent en modo servidor');
  }

  //MANEJAR EVENTO ONLOADDATA DEL DP-DATAGRID (MODO SERVIDOR)
  async onLoadDrivers(event: LoadDataEvent): Promise<void> {
    console.log('📡 onLoadDrivers evento recibido:', event);

    this.loading.set(true);

    try {
      //CONSTRUIR QUERYPARAMS PARA LA API
      const queryParams: Record<string, any> = {
        page: event.page + 1, //LA API USA BASE 1
        page_size: event.pageSize
      };

      //AGREGAR BUSQUEDA SI EXISTE
      if (event.searchTerm && event.searchTerm.length > 0) {
        queryParams['search'] = event.searchTerm;
      }

      //AGREGAR ORDENAMIENTO SI EXISTE
      if (event.sortColumn && event.sortDirection) {
        const prefix = event.sortDirection === 'desc' ? '-' : '';
        queryParams['ordering'] = `${prefix}${event.sortColumn}`;
      }

      //AGREGAR FILTROS (EXCEPTO TAGS QUE SE MANEJAN APARTE)
      Object.entries(event.filters).forEach(([key, value]) => {
        if (key !== 'tags' && value !== null && value !== undefined && value !== '') {
          //CONVERTIR BOOLEANS DESDE STRING SI ES NECESARIO
          if (value === 'true') {
            queryParams[key] = true;
          } else if (value === 'false') {
            queryParams[key] = false;
          } else {
            queryParams[key] = value;
          }
        }
      });

      //AGREGAR FILTRO DE TAGS SI EXISTEN TAGS SELECCIONADAS
      const currentTagIds = this.selectedTagIds();
      if (currentTagIds && currentTagIds.length > 0) {
        //EL BACKEND PROBABLEMENTE ESPERA 'tags' COMO PARAMETRO
        //AJUSTAR SEGUN LA API REAL
        queryParams['tags'] = currentTagIds.join(',');
      }

      console.log('📤 Enviando queryParams al backend:', queryParams);

      //LLAMAR AL PROVIDER
      const response: PaginatedDriversResponse | null = await this.driversProvider.getDrivers(queryParams);

      if (response) {
        console.log(`✅ Datos recibidos: ${response.results.length} conductores de ${response.count} totales`);

        //TRANSFORMAR LAS TAGS Y ACTUALIZAR SIGNALS
        const driversWithTransformedTags = response.results.map(driver =>
          this.transformDriverTags(driver)
        );

        this.drivers.set(driversWithTransformedTags);
        this.totalDrivers.set(response.count);
      } else {
        console.error('Error: No se recibieron datos del backend');
        this.drivers.set([]);
        this.totalDrivers.set(0);
      }
    } catch (error) {
      console.error(' Error al cargar conductores:', error);
      this.drivers.set([]);
      this.totalDrivers.set(0);
    } finally {
      this.loading.set(false);
    }
  }

  //⭐ METODO PARA TRANSFORMAR LAS TAGS AL FORMATO QUE ENTIENDE EL CHIP-ARRAY
  private transformDriverTags(driver: DriverDto): DriverDisplayData {
    const transformedTags: TagDto[] = [];

    if (Array.isArray(driver.tags) && driver.tags.length > 0) {
      for (const tagItem of driver.tags) {
        if (typeof tagItem === 'number') {
          //ES UN ID, BUSCAR LA TAG COMPLETA EN allTags
          const fullTag = this.allTags().find((t: TagDto) => t.id === tagItem);
          if (fullTag) {
            transformedTags.push(fullTag);
          }
        } else if (typeof tagItem === 'object' && tagItem !== null) {
          //YA ES UN OBJETO TagDto
          transformedTags.push(tagItem as TagDto);
        }
      }
    }

    //RETORNAR UN NUEVO OBJETO CON LAS TAGS TRANSFORMADAS
    return {
      ...driver,
      tags: transformedTags
    };
  }

  //MANEJAR CAMBIOS EN LAS TAGS SELECCIONADAS
  onTagsChange(newTagIds: number[] | string[]): void {
    console.log('🏷️ Tags seleccionadas cambiadas:', newTagIds);
    this.selectedTagIds.set(newTagIds as number[]);

    //EL DP-DATAGRID NO DETECTA CAMBIOS EN FILTROS CUSTOM
    //NECESITAMOS DISPARAR MANUALMENTE UN onLoadData
    //ESTO SE HARA AUTOMATICAMENTE CUANDO EL USUARIO HAGA OTRA ACCION
    //O PODEMOS DISPARARLO MANUALMENTE:
    // (El dp-datagrid ya maneja esto internamente)
  }

  driverStatus = computed<FilterOption[]>(() => {
    return [
      { value: true.toString(), label: this.i18n.translate('userStatus.ACTIVE') },
      { value: false.toString(), label: this.i18n.translate('userStatus.INACTIVE') }
    ]

  });

  driverValidate = computed<FilterOption[]>(() => {
    return [
      { value: true.toString(), label: this.i18n.translate('drivers.profile.VALIDATE') },
      { value: false.toString(), label: this.i18n.translate('drivers.profile.NO_VALIDATE') }
    ]

  });

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
