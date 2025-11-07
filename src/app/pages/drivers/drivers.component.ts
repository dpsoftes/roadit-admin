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
import { DriverStore } from '@store/driver.state';
import { I18nService } from '@i18n/i18n.service';
import { GlobalStore } from '@store/global.state';
import { TableColumn } from '@components/dp-datagrid/dp-datagrid.interfaces';

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

//INTERFACE PARA LAS OPCIONES DE TAG
export interface TagOption {
  value: string;
  label: string;
  color?: string;
}

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
    DpDatagridActionComponent
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

  //CONFIGURACIÓN DE ACCIONES
  actionsConfig: ActionConfig = {
    actions: [
      {
        action: 'view',
        icon: 'visibility',
        label: 'Ver',
        color: 'primary',
        condition: (row: any) => true
      },
      {
        action: 'delete',
        icon: 'delete',
        label: 'Eliminar',
        color: 'warn',
        condition: (row: any) => true
      }
    ]
  };

  //FUNCIONES DE RENDERIZADO PERSONALIZADO
  //NOTA: LAS FIRMAS DEBEN SER (column: TableColumn, row: any) => string
  renderFullName = (column: TableColumn, row: any): string => {
    return `
      <div class="name-cell">
        <div>${row.name || ''}</div>
        <div class="last-name">${row.last_name || ''}</div>
      </div>
    `;
  };

  renderDniCif = (column: TableColumn, row: any): string => {
    return `
      <div class="dni-cif-cell">
        <div class="dni-line">${row.dni || '-'}</div>
        <div class="cif-line">${row.cif || '-'}</div>
      </div>
    `;
  };

  renderDate = (column: TableColumn, row: any): string => {
    //FORMATEAR FECHA DE ISO A FORMATO ESPAÑOL DD/MM/YY
    if (!row.created_datetime) return '-';

    const date = new Date(row.created_datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  renderTags = (column: TableColumn, row: any): string => {
    const currentLanguage = this.globalStore.language() as 'es' | 'en';

    if (!Array.isArray(row.tags) || row.tags.length === 0) {
      return '<span class="no-tags">-</span>';
    }

    const chipsHtml = row.tags
      .map((driverTag: any) => {
        const tagId = typeof driverTag === 'object' ? driverTag.id : driverTag;
        const fullTag = this.findTagById(tagId);

        if (!fullTag) {
          return `<span class="tag-chip unknown-tag" style="background-color: #cccccc; color: #666666;">ID: ${tagId}</span>`;
        }

        const tagName = this.getTagName(fullTag, currentLanguage);
        const tagColor = this.getTagColor(fullTag);
        const textColor = this.isLightColor(tagColor) ? '#000000' : '#ffffff';

        return `<span class="tag-chip" style="background-color: ${tagColor}; color: ${textColor};">${tagName}</span>`;
      })
      .join('');

    return `<div class="tags-container">${chipsHtml}</div>`;
  };

  renderValidated = (column: TableColumn, row: any): string => {
    //RENDERIZADO PERSONALIZADO PARA validated
    //EVALUA SI EL VALOR ES true O false Y DEVUELVE SVG + TRADUCCION
    const isValidated = row.validated;
    const translationKey = isValidated ? 'drivers.profile.VALIDATE' : 'drivers.profile.NO_VALIDATE';
    const translatedText = this.i18n.translate(translationKey);

    //RUTA A LOS SVG EXTERNOS
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

  renderStatus = (column: TableColumn, row: any): string => {
    //RENDERIZADO PERSONALIZADO PARA is_active
    //EVALUA SI EL VALOR ES true O false Y TRADUCCION
    const isActive = row.is_active;
    const translationKey = isActive ? 'drivers.isActive.ACTIVE' : 'drivers.isActive.INACTIV';
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
      this.drivers.set(this.store.drivers());
    });

    //EFECTO QUE REFRESCA LA VISTA CUANDO CAMBIA EL IDIOMA
    effect(() => {
      //FORZAR LA LECTURA DEL IDIOMA PARA QUE EL EFECTO SE EJECUTE CUANDO CAMBIE
      const currentLanguage = this.globalStore.language() as 'es' | 'en';

      console.log('🔄 Effect ejecutado - Idioma:', currentLanguage);
      console.log('🏷️ Tag options actuales:', this.tagOptions());

      //FORZAR ACTUALIZACIÓN DE LOS DATOS PARA QUE SE RE-RENDERICEN LAS COLUMNAS PERSONALIZADAS
      this.drivers.set([...untracked(this.drivers)]);
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

  //CARGAR CONDUCTORES
  async loadDrivers() {
    await this.store.getDrivers();
  }

  //MANEJAR CAMBIOS DE FILTROS
  onFilterChange(event: FilterChangeEvent) {
    console.log('Filtros aplicados:', event);
    //AQUÍ PUEDES IMPLEMENTAR LÓGICA ADICIONAL DE FILTRADO SI ES NECESARIO
  }

  //MANEJAR ACCIÓN DE CREAR CONDUCTOR
  onCreateDriver(event: any) {
    console.log('Crear nuevo conductor');
    //IMPLEMENTAR NAVEGACIÓN O MODAL PARA CREAR CONDUCTOR
  }

  //HELPER: OBTENER NOMBRE DE TAG EN EL IDIOMA ESPECIFICADO
  private getTagName(tag: any, language: 'es' | 'en' = 'es'): string {
    if (typeof tag.getName === 'function') {
      return tag.getName(language);
    }
    if (tag.name && typeof tag.name === 'object') {
      return tag.name[language] || tag.name.es || '';
    }
    return tag.name || '';
  }

  //HELPER: OBTENER COLOR DE TAG CON #
  private getTagColor(tag: any): string {
    if (typeof tag.getColorWithHash === 'function') {
      return tag.getColorWithHash();
    }
    if (tag.color) {
      return tag.color.startsWith('#') ? tag.color : `#${tag.color}`;
    }
    return '#999999';
  }

  //HELPER: BUSCAR TAG POR ID
  private findTagById(tagId: number): any | null {
    return this.allTags.find((tag: any) => tag.id === tagId) || null;
  }

  //HELPER: CALCULAR SI EL COLOR ES CLARO U OSCURO
  private isLightColor(hexColor: string): boolean {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }
}
