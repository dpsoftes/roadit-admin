import { signal, WritableSignal } from "@angular/core";
import { TableConfig } from "@components/dynamic-table/dynamic-table.interfaces";
import { I18nService } from "@i18n/i18n.service";

//INTERFACE PARA LAS OPCIONES DE TAG
export interface TagOption {
  value: string;
  label: string;
  color?: string;
}

//HELPER: BUSCAR TAG POR ID EN EL ARRAY DE TODAS LAS TAGS
const findTagById = (tagId: number, allTags: any[]): any | null => {
  return allTags.find((tag: any) => tag.id === tagId) || null;
};

//HELPER: OBTENER NOMBRE DE TAG EN EL IDIOMA ESPECIFICADO
const getTagName = (tag: any, language: 'es' | 'en' = 'es'): string => {
  if (typeof tag?.getName === 'function') {
    return tag.getName(language);
  }
  if (tag?.name && typeof tag.name === 'object') {
    return tag.name[language] || tag.name.es || '';
  }
  return tag?.name || 'Sin nombre';
};

//HELPER: OBTENER COLOR DE TAG CON #
const getTagColor = (tag: any): string => {
  if (typeof tag?.getColorWithHash === 'function') {
    return tag.getColorWithHash();
  }
  if (tag?.color) {
    return tag.color.startsWith('#') ? tag.color : `#${tag.color}`;
  }
  return '#999999';
};

//HELPER: CALCULAR SI EL COLOR ES CLARO U OSCURO PARA DECIDIR COLOR DE TEXTO
const isLightColor = (hexColor: string): boolean => {
  //ELIMINAR EL # SI EXISTE
  const hex = hexColor.replace('#', '');

  //CONVERTIR A RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  //CALCULAR LUMINOSIDAD (FORMULA ESTÁNDAR)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  //SI LA LUMINOSIDAD ES MAYOR A 0.5, ES UN COLOR CLARO
  return luminance > 0.5;
};

//HELPER: RENDERIZAR CHIPS DE TAGS CON COLORES Y NOMBRES TRADUCIDOS
//AHORA USA ESTILOS INLINE DIRECTAMENTE
const renderTagChips = (driverTags: any[], allTags: any[], language: 'es' | 'en'): string => {
  if (!Array.isArray(driverTags) || driverTags.length === 0) {
    return '<span class="no-tags">-</span>';
  }

  const chipsHtml = driverTags
    .map((driverTag: any) => {
      //SI LA TAG DEL CONDUCTOR ES UN OBJETO CON ID
      const tagId = typeof driverTag === 'object' ? driverTag.id : driverTag;

      //BUSCAR LA TAG COMPLETA EN TODAS LAS TAGS
      const fullTag = findTagById(tagId, allTags);

      if (!fullTag) {
        return `<span class="tag-chip unknown-tag" style="background-color: #cccccc; color: #666666;">ID: ${tagId}</span>`;
      }

      const tagName = getTagName(fullTag, language);
      const tagColor = getTagColor(fullTag);

      //DETERMINAR COLOR DE TEXTO BASADO EN LA LUMINOSIDAD DEL FONDO
      const textColor = isLightColor(tagColor) ? '#000000' : '#ffffff';

      //USAR ESTILOS INLINE DIRECTAMENTE (ANGULAR PERMITE background-color Y color)
      return `<span class="tag-chip" style="background-color: ${tagColor}; color: ${textColor};">${tagName}</span>`;
    })
    .join('');

  return `<div class="tags-container">${chipsHtml}</div>`;
};

export const createDriversTableConfig = (
  listArray: WritableSignal<any[]>,
  i18n: I18nService,
  tagOptions: TagOption[] = [],
  allTags: any[] = [],
  currentLanguage: 'es' | 'en' = 'es'
): TableConfig => ({
  columns: [
    {
      key: 'image',
      label: 'drivers.list.image',
      type: 'image',
      width: 8,
      align: 'center',
      imageConfig: {
        width: '40px',
        height: '40px',
        alt: 'Logo del cliente',
        fallback: 'assets/images/sample_user_icon.png'
      }
    },
    {
      key: 'name',
      label: 'drivers.list.name',
      type: 'custom',
      width: 8,
      render: (column: any, row: any) => {
        //RENDERIZADO HTML PERSONALIZADO PARA DNI/CIF
        //LOS ESTILOS ESTÁN EN drivers.component.scss
        return `
          <div class="dni-cif-cell">
            <div>${row.name}</div>
            <div>${row.last_name}</div>
          </div>
        `;
      }
      // render: (column: any, row: any) => {
      //   //CONCATENAR NOMBRE Y APELLIDO
      //   const fullName = `${row.name || ''} ${row.last_name || ''}`.trim();
      //   return fullName || '-';
      // }
    },
    {
      key: 'dni/cif',
      label: 'drivers.list.dni/cif',
      type: 'custom',
      width: 10,
      render: (column: any, row: any) => {
        //RENDERIZADO HTML PERSONALIZADO PARA DNI/CIF
        //LOS ESTILOS ESTÁN EN drivers.component.scss
        return `
          <div class="dni-cif-cell">
            <div class="dni-line">${row.dni}</div>
            <div class="cif-line">${row.cif}</div>
          </div>
        `;
      }
    },
    {
      key: 'province',
      label: 'drivers.list.province',
      type: 'text',
      width: 10,
      align: 'center'
    },
    {
      key: 'city',
      label: 'drivers.list.city',
      type: 'text',
      width: 10,
      // align: 'center'
    },
    {
      key: 'email',
      label: 'drivers.list.email',
      type: 'text',
      width: 20,
    },
    {
      key: 'phone',
      label: 'drivers.list.phone',
      type: 'text',
      width: 13
    },
    {
      key: 'created_datetime',
      label: 'drivers.list.created_datetime',
      type: 'text',
      width: 10,
      render: (column: any, row: any) => {
        //FORMATEAR FECHA DE ISO A FORMATO ESPAÑOL DD/MM/YY
        if (!row.created_datetime) return '-';

        const date = new Date(row.created_datetime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        return `${day}/${month}/${year}`;
      }
    },
    {
      key: 'rating',
      label: 'drivers.list.rating',
      type: 'text',
      width: 12,
      align: 'center'
    },
    {
      key: 'tags',
      label: 'drivers.list.tags',
      type: 'custom',
      width: 15,
      render: (column: any, row: any) => {
        return renderTagChips(row.tags || [], allTags, currentLanguage);
      }
    },
    {
      key: 'validated',
      label: 'drivers.list.validated',
      type: 'custom',
      width: 13,
      render: (column: any, row: any) => {
        //RENDERIZADO PERSONALIZADO PARA validated
        //EVALUA SI EL VALOR ES true O false Y DEVUELVE SVG + TRADUCCION
        const isValidated = row.validated;
        const translationKey = isValidated ? 'drivers.profile.VALIDATE' : 'drivers.profile.NO_VALIDATE';
        const translatedText = i18n.translate(translationKey);

        //RUTA A LOS SVG EXTERNOS
        const iconPath = isValidated
          ? 'assets/icons/validatedIcon.svg'
          : 'assets/icons/noValidatedIcon.svg';

        return `
          <div class="validated-cell">
            <img src="${iconPath}" alt="${translatedText}" class="validated-icon" />
            <span class="validated-text">${translatedText}</span>
          </div>
        `;
      }
    },
    {
      key: 'is_active',
      label: 'drivers.list.status',
      type: 'custom',
      width: 9,
      render: (column: any, row: any) => {
        //RENDERIZADO PERSONALIZADO PARA is_active
        //EVALUA SI EL VALOR ES true O false Y DEVUELVE LA TRADUCCION CORRESPONDIENTE
        const isActive = row.is_active;
        const translationKey = isActive ? 'drivers.isActive.ACTIVE' : 'drivers.isActive.INACTIVE';
        const translatedText = i18n.translate(translationKey);

        return `<span>${translatedText}</span>`;
      }
    },
    {
      key: 'actions',
      label: 'drivers.list.actions',
      type: 'actions',
      width: 10,
      actionConfig: {
        actions: [
          {
            icon: 'material-symbols-outlined/edit_square',
            label: 'Editar',
            color: 'primary',
            action: 'edit'
          },
          {
            icon: 'material-symbols-outlined/delete',
            label: 'Eliminar',
            color: 'error',
            action: 'delete'
          }
        ]
      }
    }
  ],
  data: listArray,
  exportable: true,
  selectable: false,
  pagination: true,
  pageSize: 5,
  pageSizeOptions: [5, 10, 20, 50],
  searchable: true,
  searchPlaceholder: 'drivers.list.searchPlaceholder',
  filterable: true,
  filters: [
    {
      key: 'name',
      label: 'drivers.list.name',
      type: 'text',
      width: 12
    },
    {
      key: 'email',
      label: 'drivers.list.email',
      type: 'text',
      width: 20,
    },
    {
      key: 'tags',
      label: 'drivers.list.tags',
      type: 'chips',
      multiple: true,
      width: 20,
      //USAR LAS OPCIONES REALES DESDE EL BACKEND
      options: tagOptions
    },
    {
      key: 'is_active',
      label: 'drivers.list.is_active',
      type: 'select',
      options: [
        { value: 'ACTIVE', label: 'drivers.profile.ACTIVE' },
        { value: 'INACTIVE', label: 'drivers.profile.INACTIVE' },
      ]
    },
    {
      key: 'validated',
      label: 'drivers.list.validated',
      type: 'select',
      options: [
        { value: 'VALIDATE', label: 'drivers.profile.VALIDATE' },
        { value: 'NO_VALIDATE', label: 'drivers.profile.NO_VALIDATE' },
      ]
    },
    {
      key: 'rating',
      label: 'drivers.list.rating',
      type: 'text',
      width: 8
    },
    {
      key: 'phone',
      label: 'drivers.list.phone',
      type: 'text',
      width: 12
    },
    {
      key: 'city',
      label: 'drivers.list.city',
      type: 'text',
      width: 12,
    },
    {
      key: 'province',
      label: 'drivers.list.province',
      type: 'text',
      width: 10
    },
    {
      key: 'expiredDocuments',
      label: 'drivers.list.expiredDocuments',
      type: 'checkbox',
      width: 18
    },
    {
      key: 'newDocuments',
      label: 'drivers.list.newDocuments',
      type: 'checkbox',
      width: 18
    },
  ],
  exportConfig: {
    columns: ['name', 'dni', 'cif', 'province', 'city', 'email', 'phone', 'ratings', 'tags', 'validated', 'fortnight_earnings', 'is_active'],
    headers: ['Nombre', 'DNI', 'CIF', 'Provincia', 'Ciudad', 'Email', 'Telefono', 'Puntuación', 'Tags', 'Validación', 'Factura quincenal', 'Estado'],
    filename: `lista_conductores_${new Date().toISOString().split('T')[0]}.csv`
  },
  actions: {
    create: { label: 'drivers.list.create-driver', route: '/drivers/create-driver' }
  }
});
