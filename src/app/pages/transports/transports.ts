import { Component, signal, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { assignmentTableConfig } from './assignmentTableConfig';
import { TransportsService } from '../../core/services/transports.service';

@Component({
  selector: 'app-transports',
  imports: [
    TranslatePipe,
    TabsComponent,
    RouterModule,
    DynamicTableComponent,
  ],
  templateUrl: './transports.html',
  styleUrl: './transports.scss'
})
export class Transports implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transportsService = inject(TransportsService);

  // Signals para el estado del componente
  activeTab = signal<string>('assignment');

  // Configuración de la tabla
  assignmentTableConfig = assignmentTableConfig;

  // Signals del servicio (readonly)
  transports = this.transportsService.transports;
  loading = this.transportsService.loading;
  error = this.transportsService.error;
  totalCount = this.transportsService.totalCount;
  currentPage = this.transportsService.currentPage;
  pageSize = this.transportsService.pageSize;
  filters = this.transportsService.filters;
  searchTerm = this.transportsService.searchTerm;

  // Computed signals del servicio
  hasTransports = this.transportsService.hasTransports;
  isEmpty = this.transportsService.isEmpty;
  hasError = this.transportsService.hasError;
  totalPages = this.transportsService.totalPages;
  hasNextPage = this.transportsService.hasNextPage;
  hasPreviousPage = this.transportsService.hasPreviousPage;
  processedTransports = this.transportsService.processedTransports;

  ngOnInit() {
    // Cargar datos iniciales
    this.loadInitialData();
    
    // Suscribirse a cambios de ruta
    this.route.params.subscribe(params => {
      if(params['tab'] === 'create') {
        this.activeTab.set('create');
      } else if(params['tab'] === 'assignment') {
        this.activeTab.set('assignment');
      } else if(params['tab'] === 'history') {
        this.activeTab.set('history');
      }
    });
  }

  onTabChange(tab: string) {
    if(tab === 'create') {
      this.router.navigate([`/transports/${tab}`]);
    } else {
      this.activeTab.set(tab);
    }
  }

  // Métodos para interactuar con el servicio
  async loadInitialData() {
    await this.transportsService.loadTransports();
    // Actualizar la configuración de la tabla con los datos procesados
    this.assignmentTableConfig.data.set(this.processedTransports());
  }

  async onSearch(searchTerm: string) {
    await this.transportsService.searchTransports(searchTerm);
    this.assignmentTableConfig.data.set(this.processedTransports());
  }

  async onFilterChange(filters: any) {
    await this.transportsService.applyFilters(filters);
    this.assignmentTableConfig.data.set(this.processedTransports());
  }

  async onPageChange(event: any) {
    await this.transportsService.changePage(event.pageIndex + 1);
    this.assignmentTableConfig.data.set(this.processedTransports());
  }

  async onPageSizeChange(size: number) {
    await this.transportsService.changePageSize(size);
    this.assignmentTableConfig.data.set(this.processedTransports());
  }

  async refreshData() {
    await this.transportsService.refreshTransports();
    this.assignmentTableConfig.data.set(this.processedTransports());
  }

  clearError() {
    this.transportsService.clearError();
  }
}