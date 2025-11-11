# 🧪 **Ejemplo de Uso - DBGrid con Nuevos Formatos**

## 📊 **Ejemplo Completo con Todos los Formatos**

```typescript
import { Component, signal } from '@angular/core';
import { DbGridComponent, GBGridColumnComponent } from '@roadit/shared';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DbGridComponent, GBGridColumnComponent],
  template: `
    <div class="grid-container">
      <DBGrid 
        [dataSource]="productos()"
        [rows]="filasPorPagina()"
        [totalRows]="totalProductos()"
        [currentPage]="paginaActual()"
        [hasFooter]="mostrarPaginador()"
        rowHeight="35px"
        rowFontSize="14px"
        (onRowSelected)="onProductoSeleccionado($event)"
        (onPageChange)="onCambioPagina($event)">
        
        <!-- ID sin separador de miles -->
        <GBGridColumn 
          field="id" 
          [header]="'ID'" 
          format="N0" 
          width="80px" 
          align="RIGHT" />
        
        <!-- Código de producto -->
        <GBGridColumn 
          field="codigo" 
          [header]="'Código'" 
          format="STRING" 
          width="120px" 
          align="CENTER" />
          
        <!-- Nombre del producto -->
        <GBGridColumn 
          field="nombre" 
          [header]="'Producto'" 
          format="STRING" 
          width="250px" 
          align="LEFT" />
        
        <!-- Precio unitario con separador de miles -->
        <GBGridColumn 
          field="precioUnitario" 
          [header]="'Precio Unit.'" 
          format="N.2" 
          width="120px" 
          align="RIGHT" />
        
        <!-- Stock con separador de miles (entero) -->
        <GBGridColumn 
          field="stock" 
          [header]="'Stock'" 
          format="N.0" 
          width="100px" 
          align="RIGHT" />
        
        <!-- Peso con un decimal y separador -->
        <GBGridColumn 
          field="peso" 
          [header]="'Peso (Kg)'" 
          format="N.1" 
          width="100px" 
          align="RIGHT" />
        
        <!-- Total sin separador -->
        <GBGridColumn 
          field="total" 
          [header]="'Total S/Sep'" 
          format="N2" 
          width="120px" 
          align="RIGHT" />
          
        <!-- Total con separador de miles -->
        <GBGridColumn 
          field="totalConSeparador" 
          [header]="'Total C/Sep'" 
          format="N.2" 
          width="130px" 
          align="RIGHT" />
        
        <!-- Fecha de creación -->
        <GBGridColumn 
          field="fechaCreacion" 
          [header]="'Creado'" 
          format="DATE" 
          width="120px" 
          align="CENTER" />
        
        <!-- Última actualización -->
        <GBGridColumn 
          field="ultimaActualizacion" 
          [header]="'Actualizado'" 
          format="DATETIME" 
          width="160px" 
          align="CENTER" />
        
        <!-- Estado activo -->
        <GBGridColumn 
          field="activo" 
          [header]="'Activo'" 
          format="CHECK" 
          width="70px" 
          align="CENTER" />
          
      </DBGrid>
    </div>
  `,
  styles: [`
    .grid-container {
      height: 600px;
      width: 100%;
      padding: 20px;
      background: #f5f5f5;
    }
  `]
})
export class ProductsComponent {
  // 🎯 Datos de ejemplo que muestran diferentes formatos
  productos = signal([
    {
      id: 1,
      codigo: 'PROD-001',
      nombre: 'Laptop Gamer RGB',
      precioUnitario: 1500000.99,      // Se mostrará: 1.500.000,99
      stock: 25000,                    // Se mostrará: 25.000
      peso: 2500.5,                    // Se mostrará: 2.500,5
      total: 1500000.99,               // Se mostrará: 1500000.99 (sin separador)
      totalConSeparador: 1500000.99,   // Se mostrará: 1.500.000,99 (con separador)
      fechaCreacion: '2025-01-15',
      ultimaActualizacion: '2025-09-28T14:30:00',
      activo: true
    },
    {
      id: 2,
      codigo: 'PROD-002', 
      nombre: 'Monitor 4K Ultra HD',
      precioUnitario: 850000.00,
      stock: 150000,
      peso: 8250.75,
      total: 850000.00,
      totalConSeparador: 850000.00,
      fechaCreacion: '2025-02-20',
      ultimaActualizacion: '2025-09-27T09:15:00',
      activo: true
    },
    {
      id: 3,
      codigo: 'PROD-003',
      nombre: 'Teclado Mecánico',
      precioUnitario: 125000.50,
      stock: 500000,
      peso: 1200.25,
      total: 125000.50,
      totalConSeparador: 125000.50,
      fechaCreacion: '2025-03-10',
      ultimaActualizacion: '2025-09-28T16:45:00',
      activo: false
    },
    {
      id: 4,
      codigo: 'PROD-004',
      nombre: 'Mouse Inalámbrico',
      precioUnitario: 75000.00,
      stock: 1000000,
      peso: 125.5,
      total: 75000.00,
      totalConSeparador: 75000.00,
      fechaCreacion: '2025-04-05',
      ultimaActualizacion: '2025-09-28T11:20:00',
      activo: true
    }
  ]);

  filasPorPagina = signal(20);
  totalProductos = signal(150);
  paginaActual = signal(1);
  mostrarPaginador = signal(true);

  // 📋 Eventos del grid
  onProductoSeleccionado(producto: any): void {
    console.log('Producto seleccionado:', producto);
  }

  onCambioPagina(pagina: number): void {
    console.log('Cambio de página:', pagina);
    this.paginaActual.set(pagina);
    // Aquí cargarías los datos de la nueva página
  }
}
```

## 📊 **Resultado Visual Esperado**

| ID | Código   | Producto         | Precio Unit.    | Stock    | Peso (Kg) | Total S/Sep | Total C/Sep    | Creado     | Actualizado        | Activo |
|----|----------|------------------|-----------------|----------|-----------|-------------|----------------|------------|--------------------| -------|
| 1  | PROD-001 | Laptop Gamer RGB | 1.500.000,99   | 25.000   | 2.500,5   | 1500000.99  | 1.500.000,99  | 15-01-2025 | 28-09-2025 14:30  | ✓      |
| 2  | PROD-002 | Monitor 4K Ultra | 850.000,00     | 150.000  | 8.250,8   | 850000.00   | 850.000,00    | 20-02-2025 | 27-09-2025 09:15  | ✓      |
| 3  | PROD-003 | Teclado Mecánico | 125.000,50     | 500.000  | 1.200,3   | 125000.50   | 125.000,50    | 10-03-2025 | 28-09-2025 16:45  |        |
| 4  | PROD-004 | Mouse Inalámbrico| 75.000,00      | 1.000.000| 125,5     | 75000.00    | 75.000,00     | 05-04-2025 | 28-09-2025 11:20  | ✓      |

## 🎯 **Diferencias Clave Entre Formatos**

### **Sin Separador vs Con Separador:**
- **`N2`**: `1500000.99` 
- **`N.2`**: `1.500.000,99`

### **Decimales con Separador:**
- **`N.0`**: `25000` → `25.000`
- **`N.1`**: `2500.5` → `2.500,5`  
- **`N.2`**: `1500000.99` → `1.500.000,99`

Los nuevos formatos `N.0`, `N.1`, `N.2` mejoran significativamente la **legibilidad** de números grandes, especialmente útiles para:
- 💰 **Precios y montos**
- 📊 **Cantidades de stock**
- 📈 **Datos financieros**
- 🔢 **Estadísticas numéricas**