import { 
  Component, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Importar Material components para iconos y botones
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

// Importar nuestro store

@Component({
  selector: 'app-pruebas',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PruebasComponent {
  title = signal('roadit-admin');
  
  // Inyectar store
  
  // Exponer selectores del store

  
  // Datos mock simples (40 usuarios) - público para template
  allUsers = [
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

  // Sistema de datos con signals para DBGrid
  currentUsers = signal<any[]>([]);
  pageSize = signal(20);
  totalUsers = signal(40);
  currentPage = signal(1);

  // Computed signals para información derivada
  totalPages = computed(() => Math.ceil(this.totalUsers() / this.pageSize()));
  hasNextPage = computed(() => this.currentPage() < this.totalPages());
  hasPreviousPage = computed(() => this.currentPage() > 1);
  startRow = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  endRow = computed(() => Math.min(this.startRow() + this.pageSize() - 1, this.totalUsers()));

  // Propiedades planas para DbGrid (sin signals)
  gridDataSource: any[] = [];
  gridRows: number = 20;
  gridTotalRows: number = 40;
  gridCurrentPage: number = 1;
  gridHasFooter: boolean = true;

  // Getters con type assertion para bypass errores de tipos (mantenidos por compatibilidad)
  get dataSourceForGrid() { return this.currentUsers() as any; }
  get rowsForGrid() { return this.pageSize() as any; }
  get totalRowsForGrid() { return this.totalUsers() as any; }
  get currentPageForGrid() { return this.currentPage() as any; }

  // Propiedades estáticas temporales para bypass de signals (deprecated)
  get staticDataSource() { return this.currentUsers(); }
  get staticRows() { return this.pageSize(); }
  get staticTotalRows() { return this.totalUsers(); }
  get staticCurrentPage() { return this.currentPage(); }
  get staticHasFooter() { return true; }

  constructor() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    const startIndex = (page - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    const pageData = this.allUsers.slice(startIndex, endIndex);
    
    // Actualizar signals (se propagan automáticamente a DBGrid)
    this.currentUsers.set(pageData);
    this.currentPage.set(page);
    
    console.log(`Página ${page}: ${pageData.length} usuarios`);
  }

  // Métodos de navegación usando signals
  goToNextPage() {
    if (this.hasNextPage()) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  goToPreviousPage() {
    if (this.hasPreviousPage()) {
      this.loadPage(this.currentPage() - 1);
    }
  }

  goToFirstPage() {
    this.loadPage(1);
  }

  goToLastPage() {
    this.loadPage(this.totalPages());
  }

  onUserSelected(event: {item: any, index: number}) {
    console.log('Usuario seleccionado:', event.item);
    alert(`Usuario: ${event.item.name} - ${event.item.email}`);
  }

  onPageChanged(event: {page: number, previousPage: number}) {
    console.log('Cambio a página:', event.page);
    this.loadPage(event.page);
  }
}