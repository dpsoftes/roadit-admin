import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importar DBGrid desde shared
import { 
  DbGridComponent, 
  GbGridColumnComponent, 
  GridRowSelectEvent, 
  GridPageChangeEvent 
} from 'shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DbGridComponent, GbGridColumnComponent],
  template: `
    <div style="padding: 2rem;">
      <h1>🚗 Roadit Admin - DBGrid Demo</h1>
      
      <div style="height: 500px; background: white; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
        <db-grid
          [dataSource]="currentUsers()"
          [rows]="pageSize()"
          [totalRows]="totalUsers()"
          [currentPage]="currentPage()"
          [hasFooter]="true"
          (onRowSelected)="onUserSelected($event)"
          (onPageChange)="onPageChanged($event)">
          
          <gb-grid-column field="id" width="70px" [header]="'ID'" format="N0" align="RIGHT" />
          <gb-grid-column field="name" width="200px" [header]="'Nombre'" format="STRING" align="LEFT" />
          <gb-grid-column field="email" width="220px" [header]="'Email'" format="STRING" align="LEFT" />
          <gb-grid-column field="salary" width="120px" [header]="'Salario'" format="N.2" align="RIGHT" />
          <gb-grid-column field="isActive" width="80px" [header]="'Activo'" format="CHECK" align="CENTER" />
          
        </db-grid>
      </div>
      
      <p>Página {{ currentPage() }} de 2 | Total: {{ totalUsers() }} usuarios</p>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  // Datos mock simples (40 usuarios)
  private allUsers = [
    // Página 1 (primeros 20)
    { id: 1, name: 'Juan Pérez', email: 'juan@roadit.com', salary: 45000.50, isActive: true },
    { id: 2, name: 'María López', email: 'maria@roadit.com', salary: 38000.75, isActive: false },
    { id: 3, name: 'Carlos Silva', email: 'carlos@roadit.com', salary: 42000.00, isActive: true },
    { id: 4, name: 'Ana García', email: 'ana@roadit.com', salary: 40000.25, isActive: true },
    { id: 5, name: 'Luis Martínez', email: 'luis@roadit.com', salary: 48000.80, isActive: true },
    { id: 6, name: 'Carmen Rodríguez', email: 'carmen@roadit.com', salary: 35000.60, isActive: false },
    { id: 7, name: 'Miguel Hernández', email: 'miguel@roadit.com', salary: 52000.90, isActive: true },
    { id: 8, name: 'Isabel Jiménez', email: 'isabel@roadit.com', salary: 36000.40, isActive: true },
    { id: 9, name: 'Pedro Moreno', email: 'pedro@roadit.com', salary: 46000.30, isActive: false },
    { id: 10, name: 'Lucía Ruiz', email: 'lucia@roadit.com', salary: 39000.70, isActive: true },
    { id: 11, name: 'Javier González', email: 'javier@roadit.com', salary: 44000.15, isActive: true },
    { id: 12, name: 'Patricia Álvarez', email: 'patricia@roadit.com', salary: 41000.85, isActive: true },
    { id: 13, name: 'Roberto Castro', email: 'roberto@roadit.com', salary: 49000.50, isActive: false },
    { id: 14, name: 'Mónica Vega', email: 'monica@roadit.com', salary: 37000.20, isActive: true },
    { id: 15, name: 'Alejandro Ramos', email: 'alejandro@roadit.com', salary: 53000.75, isActive: true },
    { id: 16, name: 'Teresa Navarro', email: 'teresa@roadit.com', salary: 37500.60, isActive: true },
    { id: 17, name: 'Francisco Blanco', email: 'francisco@roadit.com', salary: 47000.40, isActive: false },
    { id: 18, name: 'Raquel Méndez', email: 'raquel@roadit.com', salary: 40500.90, isActive: true },
    { id: 19, name: 'Daniel Ortega', email: 'daniel@roadit.com', salary: 43500.25, isActive: true },
    { id: 20, name: 'Cristina Delgado', email: 'cristina@roadit.com', salary: 42500.80, isActive: true },
    
    // Página 2 (siguientes 20)
    { id: 21, name: 'Andrés Serrano', email: 'andres@roadit.com', salary: 50000.65, isActive: false },
    { id: 22, name: 'Beatriz Herrero', email: 'beatriz@roadit.com', salary: 38500.40, isActive: true },
    { id: 23, name: 'Enrique Pascual', email: 'enrique@roadit.com', salary: 54000.20, isActive: true },
    { id: 24, name: 'Silvia Guerrero', email: 'silvia@roadit.com', salary: 38000.95, isActive: true },
    { id: 25, name: 'Rubén Calvo', email: 'ruben@roadit.com', salary: 48500.35, isActive: false },
    { id: 26, name: 'Nuria Campos', email: 'nuria@roadit.com', salary: 41000.70, isActive: true },
    { id: 27, name: 'Sergio Molina', email: 'sergio@roadit.com', salary: 45500.55, isActive: true },
    { id: 28, name: 'Alicia Pardo', email: 'alicia@roadit.com', salary: 43000.15, isActive: true },
    { id: 29, name: 'Víctor Nieto', email: 'victor@roadit.com', salary: 51000.90, isActive: false },
    { id: 30, name: 'Pilar Bravo', email: 'pilar@roadit.com', salary: 39500.25, isActive: true },
    { id: 31, name: 'Óscar Peña', email: 'oscar@roadit.com', salary: 55000.80, isActive: true },
    { id: 32, name: 'Inés Soler', email: 'ines@roadit.com', salary: 39000.45, isActive: true },
    { id: 33, name: 'Fernando Cano', email: 'fernando@roadit.com', salary: 49500.60, isActive: false },
    { id: 34, name: 'Rocío Marín', email: 'rocio@roadit.com', salary: 42000.30, isActive: true },
    { id: 35, name: 'Joaquín León', email: 'joaquin@roadit.com', salary: 46500.85, isActive: true },
    { id: 36, name: 'Amparo Román', email: 'amparo@roadit.com', salary: 44000.50, isActive: true },
    { id: 37, name: 'Guillermo Sanz', email: 'guillermo@roadit.com', salary: 52000.75, isActive: false },
    { id: 38, name: 'Esperanza Ibáñez', email: 'esperanza@roadit.com', salary: 40500.40, isActive: true },
    { id: 39, name: 'Tomás Velasco', email: 'tomas@roadit.com', salary: 56000.95, isActive: true },
    { id: 40, name: 'Remedios Santana', email: 'remedios@roadit.com', salary: 40000.65, isActive: true }
  ];

  // Estado de paginación
  currentUsers = signal<any[]>([]);
  pageSize = signal(20);
  totalUsers = signal(40);
  currentPage = signal(1);

  constructor() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    const startIndex = (page - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    const pageData = this.allUsers.slice(startIndex, endIndex);
    
    this.currentUsers.set(pageData);
    this.currentPage.set(page);
    
    console.log(`Página ${page}: ${pageData.length} usuarios`);
  }

  onUserSelected(event: GridRowSelectEvent) {
    console.log('Usuario seleccionado:', event.item);
    alert(`Usuario: ${event.item.name} - ${event.item.email}`);
  }

  onPageChanged(event: GridPageChangeEvent) {
    console.log('Cambio a página:', event.page);
    this.loadPage(event.page);
  }
}
