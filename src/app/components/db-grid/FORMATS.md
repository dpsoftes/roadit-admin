# 📊 **DBGrid - Formatos de Datos Soportados**

## 🔢 **Formatos Numéricos**

### **Formatos Sin Separador de Miles**
- **`N0`** - Entero sin decimales  
  - Ejemplo: `1234` → `1234`
  
- **`N1`** - Un decimal (redondeado correctamente)
  - Ejemplo: `1234.567` → `1234.6`
  
- **`N2`** - Dos decimales (redondeado correctamente)  
  - Ejemplo: `1234.567` → `1234.57`

### **Formatos Con Separador de Miles**
- **`N.0`** - Entero con separador de miles
  - Ejemplo: `1234567` → `1.234.567`
  
- **`N.1`** - Un decimal con separador de miles
  - Ejemplo: `1234567.89` → `1.234.567,9`
  
- **`N.2`** - Dos decimales con separador de miles
  - Ejemplo: `1234567.89` → `1.234.567,89`

## 📅 **Formatos de Fecha y Hora**

- **`DATE`** - Fecha en formato dd-mm-yyyy
  - Ejemplo: `2025-09-28` → `28-09-2025`
  
- **`DATETIME`** - Fecha y hora en formato dd-mm-yyyy hh:mm
  - Ejemplo: `2025-09-28T15:30:00` → `28-09-2025 15:30`

## ✅ **Formatos Especiales**

- **`CHECK`** - Valores booleanos como checkbox  
  - `true`, `'true'`, `1`, `'1'` → `✓`
  - `false`, `'false'`, `0`, `'0'` → ` `(vacío)
  
- **`STRING`** - Texto sin formato especial
  - Ejemplo: `"Cualquier texto"` → `Cualquier texto`

## 💡 **Ejemplos de Uso**

```typescript
// Componente usando diferentes formatos
<DBGrid [dataSource]="productos()">
  <GBGridColumn field="id" header="ID" format="N0" width="80px" />
  <GBGridColumn field="precio" header="Precio" format="N.2" width="120px" />
  <GBGridColumn field="cantidad" header="Cantidad" format="N.0" width="100px" />
  <GBGridColumn field="total" header="Total" format="N.2" width="150px" />
  <GBGridColumn field="fechaCreacion" header="Fecha" format="DATE" width="120px" />
  <GBGridColumn field="ultimaActualizacion" header="Actualizado" format="DATETIME" width="180px" />
  <GBGridColumn field="activo" header="Activo" format="CHECK" width="80px" />
  <GBGridColumn field="nombre" header="Nombre" format="STRING" width="200px" />
</DBGrid>
```

## 🌍 **Localización**

Los formatos con separador de miles (`N.0`, `N.1`, `N.2`) utilizan la localización española (`es-ES`):
- **Separador de miles**: `.` (punto)  
- **Separador decimal**: `,` (coma)

Por ejemplo: `1234567.89` se formatea como `1.234.567,89`