# 📚 Manual de Implementación - DP DataGrid Component

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Importación](#importación)
3. [Uso Básico](#uso-básico)
4. [Componente Principal: dp-datagrid](#componente-principal-dp-datagrid)
5. [Componentes de Columnas](#componentes-de-columnas)
6. [Componentes de Filtros](#componentes-de-filtros)
7. [Componentes de Acciones](#componentes-de-acciones)
8. [Tipos de Celda](#tipos-de-celda)
9. [Modos de Operación](#modos-de-operación)
10. [Eventos](#eventos)
11. [Persistencia de Estado](#persistencia-de-estado)
12. [Ejemplos Completos](#ejemplos-completos)

---

## Instalación

### Dependencias Requeridas

```bash
npm install @angular/core @angular/common @angular/forms
npm install @angular/material @angular/cdk
npm install @ngrx/signals
```

### Versiones Compatibles

- **Angular**: 18+
- **Angular Material**: 18+
- **@ngrx/signals**: 18+

---

## Importación

### 1. En tu componente Angular

```typescript
import {
  DpDatagridComponent,
  DpDatagridColumnsComponent,
  DpDatagridColumnComponent,
  DpDatagridFilterComponent,
  DpDatagridFilterContainerComponent,
  DpDatagridActionsComponent,
  DpDatagridActionComponent
} from './dp-datagrid';
```

### 2. Agregar a imports del componente

```typescript
@Component({
  selector: 'app-root',
  imports: [
    DpDatagridComponent,
    DpDatagridColumnsComponent,
    DpDatagridColumnComponent,
    DpDatagridFilterComponent,
    DpDatagridFilterContainerComponent,
    DpDatagridActionsComponent,
    DpDatagridActionComponent
  ],
  // ...
})
```

---

## Uso Básico

### Ejemplo mínimo funcional

```html
<dp-datagrid
  datagridId="my-grid"
  [data]="myData()">

  <dp-datagrid-columns>
    <dp-datagrid-column
      key="id"
      label="ID"
      type="text">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="name"
      label="Nombre"
      type="text">
    </dp-datagrid-column>
  </dp-datagrid-columns>

</dp-datagrid>
```

```typescript
export class MyComponent {
  myData = signal([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);
}
```

---

## Componente Principal: dp-datagrid

### Propiedades (Inputs)

#### **Identificación y Persistencia**

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `datagridId` | `string` | `'default-datagrid'` | **ID único** del grid. Obligatorio si hay múltiples grids en la página. Se usa para persistir el estado en sessionStorage. |
| `persistenceConfig` | `DatagridPersistenceConfig` | Ver abajo | Configuración de persistencia del estado |

**DatagridPersistenceConfig:**
```typescript
{
  enabled: boolean;              // true = guardar estado
  storageKey: string;            // Clave en sessionStorage
  persistSearch: boolean;        // Persistir búsqueda
  persistFilters: boolean;       // Persistir filtros
  persistPagination: boolean;    // Persistir paginación
  persistSort: boolean;          // Persistir ordenamiento
  persistSelection: boolean;     // Persistir selección
}
```

#### **Datos**

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `data` | `any[]` | **Requerido** | Array de datos a mostrar en el grid. Debe ser un **signal**. |
| `localData` | `boolean` | `true` | **true**: El grid maneja datos localmente (filtrado, ordenamiento, paginación). **false**: Modo servidor (emite eventos `onLoadData`). |
| `totalRecords` | `number` | `0` | Total de registros en el servidor. **Solo usado cuando localData = false**. |

#### **Funcionalidades**

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `selectable` | `boolean` | `false` | Habilita checkboxes para selección de filas. |
| `searchable` | `boolean` | `true` | Habilita barra de búsqueda global. |
| `searchPlaceholder` | `string` | `'Buscar...'` | Placeholder del campo de búsqueda. |
| `pagination` | `boolean` | `true` | Habilita paginación. |
| `pageSize` | `number` | `10` | Número de registros por página inicial. |
| `pageSizeOptions` | `number[]` | `[5, 10, 25, 50, 100]` | Opciones de tamaño de página disponibles. |

#### **Personalización de Paginación**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `paginationItemsPerPageLabel` | `string` | Texto del label "Resultados por página:" (traducible). |
| `paginationRangeLabel` | `(page, pageSize, length) => string` | Función para personalizar el texto del rango (ej: "1-10 of 100"). |

**Ejemplo de personalización:**
```typescript
paginationRangeLabel = (page: number, pageSize: number, length: number) => {
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, length);
  return `Mostrando ${startIndex}-${endIndex} de ${length} registros`;
};
```

### Eventos (Outputs)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onPageChange` | `PageChangeEvent` | Emitido cuando cambia la página o tamaño de página. |
| `onFilterChange` | `FilterChangeEvent` | Emitido cuando cambian los filtros o búsqueda. |
| `onLoadData` | `LoadDataEvent` | **Solo modo servidor** (localData = false). Emitido cuando se necesita cargar datos. |

**PageChangeEvent:**
```typescript
{
  page: number;              // Página actual (base 0)
  pageSize: number;          // Tamaño de página
  searchTerm: string;        // Término de búsqueda activo
  filters: { [key: string]: any }; // Filtros activos
}
```

**FilterChangeEvent:**
```typescript
{
  searchTerm: string;        // Término de búsqueda
  filters: { [key: string]: any }; // Filtros activos
}
```

**LoadDataEvent:**
```typescript
{
  trigger: 'search' | 'filter' | 'sort' | 'page'; // Qué disparó el evento
  changedKey?: string;       // Clave del filtro que cambió
  searchTerm: string;        // Término de búsqueda
  filters: { [key: string]: any }; // Filtros activos
  page: number;              // Página solicitada (base 0)
  pageSize: number;          // Tamaño de página
  sortColumn: string | null; // Columna ordenada
  sortDirection: 'asc' | 'desc' | null; // Dirección del ordenamiento
}
```

---

## Componentes de Columnas

### dp-datagrid-columns

Contenedor para las columnas. Es un componente envolvente sin propiedades.

```html
<dp-datagrid-columns>
  <!-- Aquí van los dp-datagrid-column -->
</dp-datagrid-columns>
```

### dp-datagrid-column

Define una columna del grid.

#### Propiedades

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `key` | `string` | **Requerido** | Clave del campo en los datos. Debe coincidir con la propiedad del objeto. |
| `label` | `string` | **Requerido** | Texto del encabezado de la columna. |
| `type` | `string` | **Requerido** | Tipo de celda: `'text'`, `'image'`, `'chip'`, `'chip-array'`, `'checkbox'`, `'custom'`. |
| `sortable` | `boolean` | `false` | Habilita ordenamiento en esta columna. |
| `align` | `string` | `'left'` | Alineación del contenido: `'left'`, `'center'`, `'right'`. |
| `width` | `string \| number` | `'*'` | Ancho de la columna (px, %, em, etc.). `'*'` = flexible. |
| `minWidth` | `string \| number` | - | Ancho mínimo de la columna. |
| `maxWidth` | `string \| number` | - | Ancho máximo de la columna. |

#### Propiedades de Estilo del Header

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `headerBackground` | `string` | Color de fondo del header (ej: `'#f5f5f5'`). |
| `headerColor` | `string` | Color del texto del header (ej: `'#333'`). |
| `headerFontSize` | `string` | Tamaño de fuente del header (ej: `'14px'`). |
| `headerFontWeight` | `string` | Peso de fuente del header (ej: `'600'`). |
| `headerFontFamily` | `string` | Familia de fuente del header. |

#### Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onRender` | `ColumnRenderEvent` | Emitido cuando se renderiza la celda. |
| `onClick` | `ColumnClickEvent` | Emitido cuando se hace click en la celda. |
| `onSort` | `ColumnSortEvent` | Emitido cuando se ordena por esta columna. |

**ColumnRenderEvent:**
```typescript
{
  column: TableColumn; // Configuración de la columna
  row: any;           // Datos de la fila
}
```

**ColumnClickEvent:**
```typescript
{
  column: TableColumn; // Configuración de la columna
  row: any;           // Datos de la fila
}
```

**ColumnSortEvent:**
```typescript
{
  column: TableColumn;     // Configuración de la columna
  direction: 'asc' | 'desc'; // Dirección del ordenamiento
  page: number;            // Página actual
  pageSize: number;        // Tamaño de página
  searchTerm: string;      // Término de búsqueda
  filters: { [key: string]: any }; // Filtros activos
}
```

#### Ejemplo Completo

```html
<dp-datagrid-column
  key="name"
  label="NOMBRE COMPLETO"
  type="text"
  [sortable]="true"
  align="left"
  width="250"
  headerBackground="#f5f5f5"
  headerColor="#333"
  headerFontSize="14px"
  headerFontWeight="600"
  (onClick)="onNameClick($event)"
  (onSort)="onNameSort($event)">
</dp-datagrid-column>
```

---

## Componentes de Filtros

### dp-datagrid-filter-container

Contenedor para los filtros. Controla la visibilidad del panel de filtros.

#### Propiedades

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `isVisible` | `boolean` | `false` | Controla si el panel de filtros está visible inicialmente. |

```html
<dp-datagrid-filter-container [isVisible]="true">
  <!-- Aquí van los dp-datagrid-filter -->
</dp-datagrid-filter-container>
```

### dp-datagrid-filter

Define un filtro individual.

#### Propiedades Comunes

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `key` | `string` | **Requerido** | Clave del campo a filtrar. Debe coincidir con la propiedad del objeto. |
| `label` | `string` | **Requerido** | Etiqueta del filtro. |
| `type` | `string` | **Requerido** | Tipo de filtro (ver tipos abajo). |
| `width` | `number` | `250` | Ancho del filtro en píxeles. |
| `emptyOption` | `string` | `'Todos'` | Texto de la opción vacía (para select, chip-select). |

#### Tipos de Filtro

##### 1. **text** - Campo de texto

```html
<dp-datagrid-filter
  key="name"
  label="Nombre"
  type="text">
</dp-datagrid-filter>
```

##### 2. **select** - Dropdown de selección única

```html
<dp-datagrid-filter
  key="status"
  label="Estado"
  type="select"
  [options]="[
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
  ]">
</dp-datagrid-filter>
```

**Propiedades adicionales:**
- `options`: Array de `{ value: string, label: string }`

##### 3. **chip-select** - Selección múltiple con chips

```html
<dp-datagrid-filter
  key="categories"
  label="Categorías"
  type="chip-select"
  [options]="[
    { value: 'electronics', label: 'Electrónica' },
    { value: 'clothing', label: 'Ropa' },
    { value: 'food', label: 'Alimentos' }
  ]">
</dp-datagrid-filter>
```

**Propiedades adicionales:**
- `options`: Array de `{ value: string, label: string }`

##### 4. **checkbox** - Checkbox booleano

```html
<dp-datagrid-filter
  key="active"
  label="Activo"
  type="checkbox">
</dp-datagrid-filter>
```

##### 5. **date** - Selector de fecha

```html
<dp-datagrid-filter
  key="startDate"
  label="Fecha de inicio"
  type="date">
</dp-datagrid-filter>
```

##### 6. **date-range** - Rango de fechas

```html
<dp-datagrid-filter
  key="dateRange"
  label="Rango de fechas"
  type="date-range">
</dp-datagrid-filter>
```

##### 7. **chips** - Chips editables (entrada de texto como chips)

```html
<dp-datagrid-filter
  key="tags"
  label="Etiquetas"
  type="chips">
</dp-datagrid-filter>
```

##### 8. **chip-array** - Array de chips predefinidos

```html
<dp-datagrid-filter
  key="skills"
  label="Habilidades"
  type="chip-array"
  [options]="[
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ]">
</dp-datagrid-filter>
```

**Propiedades adicionales:**
- `options`: Array de `{ value: string, label: string }`

---

## Componentes de Acciones

### dp-datagrid-actions

Contenedor para los botones de acción del grid.

```html
<dp-datagrid-actions>
  <!-- Aquí van los dp-datagrid-action -->
</dp-datagrid-actions>
```

### dp-datagrid-action

Define un botón de acción.

#### Propiedades

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `key` | `string` | **Requerido** | Identificador único de la acción. |
| `text` | `string` | **Requerido** | Texto del botón. |
| `icon` | `string` | - | Nombre del icono de Material Icons (ej: `'add'`, `'download'`). |
| `color` | `string` | `'primary'` | Color del botón: `'primary'`, `'accent'`, `'warn'`. |

#### Eventos

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onClick` | `ActionClickEvent` | Emitido cuando se hace click en el botón. |

**ActionClickEvent:**
```typescript
{
  key: string; // Identificador de la acción
  data?: any;  // Datos adicionales (opcional)
}
```

#### Ejemplo

```html
<dp-datagrid-actions>
  <dp-datagrid-action
    key="export"
    text="EXPORTAR"
    icon="download"
    color="accent"
    (onClick)="onExport($event)">
  </dp-datagrid-action>

  <dp-datagrid-action
    key="add"
    text="CREAR NUEVO"
    icon="add"
    color="primary"
    (onClick)="onCreate($event)">
  </dp-datagrid-action>
</dp-datagrid-actions>
```

```typescript
onExport(event: ActionClickEvent) {
  console.log('Export clicked:', event.key);
  // Lógica de exportación
}

onCreate(event: ActionClickEvent) {
  console.log('Create clicked:', event.key);
  // Lógica de creación
}
```

---

## Tipos de Celda

### 1. TEXT - Texto simple

Muestra el valor como texto plano.

```html
<dp-datagrid-column
  key="name"
  label="Nombre"
  type="text">
</dp-datagrid-column>
```

**Datos esperados:**
```typescript
{ name: 'John Doe' }
```

---

### 2. IMAGE - Imagen

Muestra una imagen desde una URL.

```html
<dp-datagrid-column
  key="avatar"
  label="Avatar"
  type="image"
  width="120">
</dp-datagrid-column>
```

**Datos esperados:**
```typescript
{ avatar: 'https://example.com/image.jpg' }
```

**Características:**
- Dimensiones: 80x50px por defecto
- Border radius: 4px
- Object-fit: cover
- Fallback: Icono broken_image si falla la carga

---

### 3. CHIP - Chip único

Muestra un chip con color de fondo.

```html
<dp-datagrid-column
  key="status"
  label="Estado"
  type="chip"
  align="center">
</dp-datagrid-column>
```

**Datos esperados (opción 1 - objeto completo):**
```typescript
{
  status: {
    value: 'active',      // Valor intrínseco (se usa para filtrado, backend, etc.)
    label: 'Activo',      // Lo que se muestra visualmente
    color: '#4caf50'      // Color de fondo (opcional)
  }
}
```

**Datos esperados (opción 2 - string simple):**
```typescript
{
  status: 'Activo' // Se usa como value y label, color por defecto (#e0e0e0)
}
```

**Importante:**
- `value`: Es el valor real (puede ser `string`, `number`, etc.). Se usa para identificar el dato, filtrar, enviar al backend.
- `label`: Es el texto que se muestra visualmente en el chip.
- `color`: Color de fondo del chip (opcional).

**Características:**
- Border radius: 12px
- Padding: 4px 12px
- Font size: 12px
- Font weight: 500
- Color automático del texto (blanco o negro según luminosidad del fondo)

---

### 4. CHIP-ARRAY - Array de chips

Muestra múltiples chips.

```html
<dp-datagrid-column
  key="tags"
  label="Etiquetas"
  type="chip-array"
  width="300">
</dp-datagrid-column>
```

**Datos esperados (opción 1 - array de objetos completos):**
```typescript
{
  tags: [
    { value: 'premium', label: 'Premium', color: '#9c27b0' },
    { value: 'new', label: 'Nuevo', color: '#ff9800' },
    { value: 'featured', label: 'Destacado', color: '#f44336' }
  ]
}
```

**Datos esperados (opción 2 - array de strings):**
```typescript
{
  tags: ['Premium', 'Nuevo', 'Destacado'] // Se usan como value y label, colores por defecto
}
```

**Importante:**
- Cada chip tiene:
  - `value`: Valor intrínseco (se usa para filtrado, identificación)
  - `label`: Texto visible en el chip
  - `color`: Color de fondo (opcional)

**Características:**
- Display: flex wrap
- Gap: 4px entre chips
- Mismo estilo que CHIP simple
- Máximo 10 chips visibles (configurable)

---

### 5. CHECKBOX - Checkbox de solo lectura

Muestra un checkbox marcado o desmarcado (solo visual, no editable).

```html
<dp-datagrid-column
  key="active"
  label="Activo"
  type="checkbox"
  align="center">
</dp-datagrid-column>
```

**Datos esperados:**
```typescript
{
  active: true  // true = checked, false = unchecked
}
```

**Características:**
- Checkbox de Material Design
- Solo lectura (disabled)
- Color primario cuando está checked

---

### 6. CUSTOM - Renderizado personalizado

Permite renderizar HTML personalizado mediante una función.

```html
<dp-datagrid-column
  key="actions"
  label="Acciones"
  type="custom"
  [render]="renderActions">
</dp-datagrid-column>
```

**Función render:**
```typescript
renderActions = (column: TableColumn, row: any) => {
  return `
    <div style="display: flex; gap: 8px;">
      <button onclick="edit(${row.id})">Editar</button>
      <button onclick="delete(${row.id})">Eliminar</button>
    </div>
  `;
};
```

**Características:**
- Renderizado con `[innerHTML]`
- Soporte completo de HTML y CSS inline
- Eventos onclick deben estar en el scope global

---

## Modos de Operación

### Modo Local (localData = true)

El grid maneja **todos los datos localmente**. Ideal para datasets pequeños/medianos.

**Características:**
- ✅ Filtrado local
- ✅ Ordenamiento local
- ✅ Paginación local
- ✅ Búsqueda local
- ❌ No requiere backend

**Ejemplo:**

```html
<dp-datagrid
  datagridId="local-grid"
  [data]="products()"
  [localData]="true"
  [pagination]="true"
  [pageSize]="10">
  <!-- ... columnas ... -->
</dp-datagrid>
```

```typescript
products = signal([
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  // ... todos los datos
]);
```

---

### Modo Servidor (localData = false)

El grid **solo muestra datos**, el backend maneja filtrado, ordenamiento y paginación.

**Características:**
- ✅ Ideal para datasets grandes (millones de registros)
- ✅ Menor uso de memoria
- ✅ Paginación eficiente
- ✅ Filtrado y ordenamiento en base de datos
- ⚠️ Requiere implementar endpoint de backend

**Ejemplo:**

```html
<dp-datagrid
  datagridId="server-grid"
  [data]="products()"
  [localData]="false"
  [totalRecords]="totalProducts()"
  [pagination]="true"
  [pageSize]="20"
  (onLoadData)="loadProducts($event)">
  <!-- ... columnas ... -->
</dp-datagrid>
```

```typescript
products = signal<any[]>([]);
totalProducts = signal<number>(0);

loadProducts(event: LoadDataEvent) {
  console.log('Load data event:', event);
  
  // Construir parámetros para la API
  const params = {
    page: event.page + 1,        // La API usa base 1
    page_size: event.pageSize,
    search: event.searchTerm,
    ordering: event.sortColumn && event.sortDirection
      ? `${event.sortDirection === 'desc' ? '-' : ''}${event.sortColumn}`
      : undefined,
    ...event.filters  // Agregar filtros
  };
  
  // Llamada a la API
  this.http.get('/api/products', { params }).subscribe({
    next: (response: any) => {
      this.products.set(response.results);
      this.totalProducts.set(response.count);
    },
    error: (error) => {
      console.error('Error loading products:', error);
    }
  });
}
```

**LoadDataEvent - Propiedades:**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `trigger` | `'search' \| 'filter' \| 'sort' \| 'page'` | Qué disparó el evento |
| `changedKey` | `string \| undefined` | Clave del filtro que cambió |
| `searchTerm` | `string` | Término de búsqueda |
| `filters` | `{ [key: string]: any }` | Objeto con todos los filtros activos |
| `page` | `number` | Página solicitada (base 0) |
| `pageSize` | `number` | Tamaño de página |
| `sortColumn` | `string \| null` | Columna a ordenar |
| `sortDirection` | `'asc' \| 'desc' \| null` | Dirección del ordenamiento |

---

## Eventos

### onPageChange

Emitido cuando cambia la página o el tamaño de página.

```typescript
onPageChange(event: PageChangeEvent) {
  console.log('Página actual:', event.page);
  console.log('Tamaño de página:', event.pageSize);
  console.log('Búsqueda activa:', event.searchTerm);
  console.log('Filtros activos:', event.filters);
}
```

---

### onFilterChange

Emitido cuando cambian los filtros o la búsqueda.

```typescript
onFilterChange(event: FilterChangeEvent) {
  console.log('Término de búsqueda:', event.searchTerm);
  console.log('Filtros activos:', event.filters);
  
  // Ejemplo: Guardar filtros en localStorage
  localStorage.setItem('myFilters', JSON.stringify(event.filters));
}
```

---

### onLoadData

**Solo en modo servidor** (localData = false).

Emitido cuando se necesita cargar datos del servidor.

```typescript
onLoadData(event: LoadDataEvent) {
  console.log('Trigger:', event.trigger);
  
  if (event.trigger === 'search') {
    console.log('Usuario buscó:', event.searchTerm);
  }
  
  if (event.trigger === 'filter') {
    console.log('Filtro cambiado:', event.changedKey);
  }
  
  if (event.trigger === 'sort') {
    console.log('Ordenar por:', event.sortColumn, event.sortDirection);
  }
  
  if (event.trigger === 'page') {
    console.log('Cambio de página:', event.page);
  }
  
  // Cargar datos del servidor
  this.loadDataFromAPI(event);
}
```

---

## Persistencia de Estado

El grid puede **guardar y restaurar automáticamente** su estado en `sessionStorage`.

### Configuración Predeterminada

```typescript
const DEFAULT_CONFIG = {
  enabled: true,                    // Habilitar persistencia
  storageKey: 'dp-datagrid-state',  // Clave en sessionStorage
  persistSearch: true,              // Guardar búsqueda
  persistFilters: true,             // Guardar filtros
  persistPagination: true,          // Guardar paginación
  persistSort: true,                // Guardar ordenamiento
  persistSelection: false           // NO guardar selección (por defecto)
};
```

### Personalizar Configuración

```typescript
myPersistenceConfig: DatagridPersistenceConfig = {
  enabled: true,
  storageKey: 'my-custom-grid-state',
  persistSearch: true,
  persistFilters: true,
  persistPagination: false,  // NO persistir paginación
  persistSort: true,
  persistSelection: true     // SÍ persistir selección
};
```

```html
<dp-datagrid
  datagridId="my-grid"
  [persistenceConfig]="myPersistenceConfig"
  [data]="myData()">
  <!-- ... -->
</dp-datagrid>
```

### Deshabilitar Persistencia

```typescript
noPersistenceConfig: DatagridPersistenceConfig = {
  enabled: false,
  storageKey: '',
  persistSearch: false,
  persistFilters: false,
  persistPagination: false,
  persistSort: false,
  persistSelection: false
};
```

### ¿Qué se Persiste?

| Estado | Descripción |
|--------|-------------|
| **Search** | Término de búsqueda actual |
| **Filters** | Todos los valores de filtros activos |
| **Pagination** | Página actual y tamaño de página |
| **Sort** | Columna ordenada y dirección |
| **Selection** | IDs de las filas seleccionadas |
| **ShowFilters** | Si el panel de filtros está visible |

### Ciclo de Vida

1. **Al inicializar el componente:**
   - El grid busca el estado en `sessionStorage` usando `datagridId`
   - Si existe, restaura el estado (búsqueda, filtros, página, etc.)
   - Emite el evento `onLoadData` (modo servidor) con el estado restaurado

2. **Durante el uso:**
   - Cada vez que cambia algo (búsqueda, filtro, página), se guarda automáticamente
   - El estado se serializa y guarda en `sessionStorage`

3. **Al recargar la página:**
   - El estado se restaura automáticamente
   - El usuario ve el grid exactamente como lo dejó

### Múltiples Grids

Si tienes **múltiples grids en la misma página**, cada uno debe tener un `datagridId` único:

```html
<!-- Grid 1 -->
<dp-datagrid datagridId="products-grid" [data]="products()">
  <!-- ... -->
</dp-datagrid>

<!-- Grid 2 -->
<dp-datagrid datagridId="orders-grid" [data]="orders()">
  <!-- ... -->
</dp-datagrid>
```

---

## Ejemplos Completos

### Ejemplo 1: Grid Local Básico

```typescript
// component.ts
export class ProductsComponent {
  products = signal([
    { id: 1, name: 'Laptop', price: 1200, category: 'Electronics', active: true },
    { id: 2, name: 'Mouse', price: 25, category: 'Accessories', active: true },
    { id: 3, name: 'Keyboard', price: 75, category: 'Accessories', active: false }
  ]);
}
```

```html
<!-- component.html -->
<dp-datagrid
  datagridId="products-grid"
  [data]="products()"
  [selectable]="true"
  [searchable]="true"
  searchPlaceholder="Buscar productos..."
  [pagination]="true"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 20, 50]">

  <dp-datagrid-columns>
    <dp-datagrid-column
      key="id"
      label="ID"
      type="text"
      [sortable]="true"
      width="80">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="name"
      label="PRODUCTO"
      type="text"
      [sortable]="true"
      width="250">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="price"
      label="PRECIO"
      type="text"
      [sortable]="true"
      align="right"
      width="120">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="category"
      label="CATEGORÍA"
      type="text"
      width="150">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="active"
      label="ACTIVO"
      type="checkbox"
      align="center"
      width="100">
    </dp-datagrid-column>
  </dp-datagrid-columns>

  <dp-datagrid-filter-container [isVisible]="true">
    <dp-datagrid-filter
      key="category"
      label="Categoría"
      type="select"
      [options]="[
        { value: 'Electronics', label: 'Electrónica' },
        { value: 'Accessories', label: 'Accesorios' }
      ]">
    </dp-datagrid-filter>

    <dp-datagrid-filter
      key="active"
      label="Activo"
      type="checkbox">
    </dp-datagrid-filter>
  </dp-datagrid-filter-container>

  <dp-datagrid-actions>
    <dp-datagrid-action
      key="export"
      text="EXPORTAR"
      icon="download"
      color="accent">
    </dp-datagrid-action>
  </dp-datagrid-actions>

</dp-datagrid>
```

---

### Ejemplo 2: Grid con Modo Servidor

```typescript
// component.ts
import { HttpClient } from '@angular/common/http';

export class OrdersComponent {
  private http = inject(HttpClient);
  
  orders = signal<any[]>([]);
  totalOrders = signal<number>(0);
  
  onLoadOrders(event: LoadDataEvent) {
    const params: any = {
      page: event.page + 1,
      page_size: event.pageSize
    };
    
    if (event.searchTerm) {
      params.search = event.searchTerm;
    }
    
    if (event.sortColumn && event.sortDirection) {
      params.ordering = `${event.sortDirection === 'desc' ? '-' : ''}${event.sortColumn}`;
    }
    
    Object.keys(event.filters).forEach(key => {
      if (event.filters[key] != null) {
        params[key] = event.filters[key];
      }
    });
    
    this.http.get('/api/orders', { params }).subscribe({
      next: (response: any) => {
        this.orders.set(response.results);
        this.totalOrders.set(response.count);
      }
    });
  }
  
  onExport() {
    console.log('Exportando pedidos...');
  }
}
```

```html
<!-- component.html -->
<dp-datagrid
  datagridId="orders-grid"
  [data]="orders()"
  [localData]="false"
  [totalRecords]="totalOrders()"
  [pagination]="true"
  [pageSize]="20"
  (onLoadData)="onLoadOrders($event)">

  <dp-datagrid-columns>
    <dp-datagrid-column
      key="id"
      label="ID"
      type="text"
      [sortable]="true"
      width="80">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="customer_name"
      label="CLIENTE"
      type="text"
      [sortable]="true"
      width="200">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="status"
      label="ESTADO"
      type="chip"
      align="center"
      width="150">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="total"
      label="TOTAL"
      type="text"
      [sortable]="true"
      align="right"
      width="120">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="created_at"
      label="FECHA"
      type="text"
      [sortable]="true"
      width="150">
    </dp-datagrid-column>
  </dp-datagrid-columns>

  <dp-datagrid-filter-container>
    <dp-datagrid-filter
      key="status"
      label="Estado"
      type="select"
      [options]="[
        { value: 'pending', label: 'Pendiente' },
        { value: 'completed', label: 'Completado' },
        { value: 'cancelled', label: 'Cancelado' }
      ]">
    </dp-datagrid-filter>

    <dp-datagrid-filter
      key="date_from"
      label="Desde"
      type="date">
    </dp-datagrid-filter>

    <dp-datagrid-filter
      key="date_to"
      label="Hasta"
      type="date">
    </dp-datagrid-filter>
  </dp-datagrid-filter-container>

  <dp-datagrid-actions>
    <dp-datagrid-action
      key="export"
      text="EXPORTAR"
      icon="download"
      color="accent"
      (onClick)="onExport()">
    </dp-datagrid-action>
  </dp-datagrid-actions>

</dp-datagrid>
```

---

### Ejemplo 3: Grid con Todos los Tipos de Celda

```typescript
// component.ts
export class CatalogComponent {
  vehicles = signal([
    {
      id: 1,
      name: 'Tesla Model 3',
      image: 'https://example.com/tesla.jpg',
      status: { value: 'Disponible', color: '#4caf50' },
      tags: [
        { value: 'Eléctrico', color: '#8bc34a' },
        { value: 'Premium', color: '#9c27b0' }
      ],
      price: 52000,
      active: true
    },
    // ... más vehículos
  ]);
}
```

```html
<!-- component.html -->
<dp-datagrid
  datagridId="vehicles-grid"
  [data]="vehicles()"
  [selectable]="true">

  <dp-datagrid-columns>
    <!-- TEXT -->
    <dp-datagrid-column
      key="id"
      label="ID"
      type="text"
      width="80">
    </dp-datagrid-column>

    <!-- IMAGE -->
    <dp-datagrid-column
      key="image"
      label="IMAGEN"
      type="image"
      width="150">
    </dp-datagrid-column>

    <!-- TEXT -->
    <dp-datagrid-column
      key="name"
      label="NOMBRE"
      type="text"
      [sortable]="true"
      width="200">
    </dp-datagrid-column>

    <!-- CHIP -->
    <dp-datagrid-column
      key="status"
      label="ESTADO"
      type="chip"
      align="center"
      width="140">
    </dp-datagrid-column>

    <!-- CHIP-ARRAY -->
    <dp-datagrid-column
      key="tags"
      label="TAGS"
      type="chip-array"
      width="250">
    </dp-datagrid-column>

    <!-- TEXT -->
    <dp-datagrid-column
      key="price"
      label="PRECIO"
      type="text"
      align="right"
      [sortable]="true"
      width="120">
    </dp-datagrid-column>

    <!-- CHECKBOX -->
    <dp-datagrid-column
      key="active"
      label="ACTIVO"
      type="checkbox"
      align="center"
      width="100">
    </dp-datagrid-column>
  </dp-datagrid-columns>

</dp-datagrid>
```

---

### Ejemplo 4: Grid con Renderizado Personalizado

```typescript
// component.ts
export class UsersComponent {
  users = signal([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ]);
  
  renderUser = (column: TableColumn, row: any) => {
    return `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1976d2;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        ">
          ${row.name.charAt(0)}
        </div>
        <div>
          <div style="font-weight: 500;">${row.name}</div>
          <div style="font-size: 12px; color: #666;">${row.email}</div>
        </div>
      </div>
    `;
  };
  
  renderActions = (column: TableColumn, row: any) => {
    return `
      <div style="display: flex; gap: 8px;">
        <button 
          onclick="window.editUser(${row.id})"
          style="
            padding: 4px 12px;
            border: 1px solid #1976d2;
            background: white;
            color: #1976d2;
            border-radius: 4px;
            cursor: pointer;
          ">
          Editar
        </button>
        <button 
          onclick="window.deleteUser(${row.id})"
          style="
            padding: 4px 12px;
            border: 1px solid #f44336;
            background: white;
            color: #f44336;
            border-radius: 4px;
            cursor: pointer;
          ">
          Eliminar
        </button>
      </div>
    `;
  };
}

// Agregar funciones al scope global
declare global {
  interface Window {
    editUser: (id: number) => void;
    deleteUser: (id: number) => void;
  }
}

window.editUser = (id: number) => {
  console.log('Edit user:', id);
};

window.deleteUser = (id: number) => {
  console.log('Delete user:', id);
};
```

```html
<!-- component.html -->
<dp-datagrid
  datagridId="users-grid"
  [data]="users()">

  <dp-datagrid-columns>
    <dp-datagrid-column
      key="id"
      label="ID"
      type="text"
      width="80">
    </dp-datagrid-column>

    <!-- Renderizado personalizado del usuario -->
    <dp-datagrid-column
      key="user"
      label="USUARIO"
      type="custom"
      [render]="renderUser"
      width="300">
    </dp-datagrid-column>

    <dp-datagrid-column
      key="role"
      label="ROL"
      type="text"
      width="150">
    </dp-datagrid-column>

    <!-- Renderizado personalizado de acciones -->
    <dp-datagrid-column
      key="actions"
      label="ACCIONES"
      type="custom"
      [render]="renderActions"
      width="200">
    </dp-datagrid-column>
  </dp-datagrid-columns>

</dp-datagrid>
```

---

## Buenas Prácticas

### 1. **Usar datagridId único**

```typescript
// ✅ BIEN
<dp-datagrid datagridId="products-grid" [data]="products()">
<dp-datagrid datagridId="orders-grid" [data]="orders()">

// ❌ MAL (mismo ID en la misma página)
<dp-datagrid datagridId="default-datagrid" [data]="products()">
<dp-datagrid datagridId="default-datagrid" [data]="orders()">
```

### 2. **Usar signals para data**

```typescript
// ✅ BIEN
products = signal([...]);
<dp-datagrid [data]="products()">

// ❌ MAL (no usar arrays normales)
products = [...];
<dp-datagrid [data]="products">
```

### 3. **Modo servidor para datasets grandes**

```typescript
// ✅ BIEN (más de 10,000 registros)
<dp-datagrid [localData]="false" [totalRecords]="1000000">

// ❌ MAL (cargar 1 millón de registros en memoria)
<dp-datagrid [data]="millionRecords()">
```

### 4. **Especificar width en columnas**

```typescript
// ✅ BIEN
<dp-datagrid-column key="id" label="ID" width="80">
<dp-datagrid-column key="name" label="Nombre" width="250">

// ⚠️ PUEDE CAUSAR PROBLEMAS (columnas muy estrechas)
<dp-datagrid-column key="name" label="Nombre">
```

### 5. **Usar persistenceConfig según necesidad**

```typescript
// ✅ BIEN para reportes (no persistir)
persistenceConfig = { enabled: false, ... }

// ✅ BIEN para formularios (persistir todo)
persistenceConfig = { enabled: true, persistSearch: true, persistFilters: true, ... }
```

---

## Preguntas Frecuentes (FAQ)

### ¿Cómo cambio el idioma del paginador?

Usa las propiedades `paginationItemsPerPageLabel` y `paginationRangeLabel`:

```typescript
paginationItemsPerPageLabel = 'Elementos por página:';

paginationRangeLabel = (page: number, pageSize: number, length: number) => {
  const startIndex = page * pageSize + 1;
  const endIndex = Math.min((page + 1) * pageSize, length);
  return `${startIndex}-${endIndex} de ${length}`;
};
```

### ¿Puedo tener múltiples grids en la misma página?

Sí, solo asegúrate de que cada grid tenga un `datagridId` único:

```html
<dp-datagrid datagridId="grid-1" [data]="data1()"></dp-datagrid>
<dp-datagrid datagridId="grid-2" [data]="data2()"></dp-datagrid>
```

### ¿Cómo exporto los datos?

Usa un `dp-datagrid-action` y maneja el evento `onClick`:

```html
<dp-datagrid-action
  key="export"
  text="EXPORTAR"
  icon="download"
  (onClick)="exportData($event)">
</dp-datagrid-action>
```

```typescript
exportData(event: ActionClickEvent) {
  const data = this.myData(); // Obtener datos
  // Lógica de exportación (CSV, Excel, PDF, etc.)
}
```

### ¿Cómo obtengo las filas seleccionadas?

El grid usa `SelectionModel` de Angular CDK internamente. Puedes acceder a la selección mediante el servicio:

```typescript
// TODO: Exponer método público para obtener selección
```

### ¿Puedo personalizar los estilos?

Sí, el componente usa variables CSS y clases específicas. Puedes sobrescribir los estilos en tu `styles.scss`:

```scss
::ng-deep {
  .dp-datagrid {
    // Tus estilos personalizados
  }
  
  .dp-datagrid-header {
    background-color: #f5f5f5;
  }
}
```

### ¿Funciona con SSR (Server-Side Rendering)?

Sí, el componente es compatible con SSR. La persistencia usa `sessionStorage` que se maneja de forma segura.

---

## Soporte y Contribuciones

Para reportar bugs o solicitar features:
- GitHub Issues: [Repositorio del proyecto]
- Email: [Tu email de contacto]

---

## Changelog

### v1.0.0 (2025-11-02)
- ✨ Release inicial
- ✅ Soporte para todos los tipos de celda
- ✅ Modo local y servidor
- ✅ Persistencia de estado
- ✅ Filtros avanzados
- ✅ Paginación completa
- ✅ Selección de filas
- ✅ Ordenamiento

---

## Licencia

[Tu licencia aquí]

---

**¡Gracias por usar DP DataGrid Component! 🚀**
