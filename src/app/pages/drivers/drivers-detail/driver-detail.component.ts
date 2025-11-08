import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TabsComponent } from '@components/tabs.component/tabs.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatButtonModule,
    MatCardModule,
    TabsComponent
  ],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.scss'
})
export class DriverDetailComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  activeTab = signal<string>('general-data');
  driverId = signal<number | null>(null);

  //TABS DISPONIBLES
  tabs = signal([
    'general-data',
    'quality',
    'certifications',
    'blacklist',
    'documentation',
    'billing',
    'timeline'
  ]);

  displayedTabs = computed(() => {
    if (this.driverId()) {
      return this.tabs();
    }
    //SI ES CREACION, MOSTRAR SOLO LA PRIMERA TAB
    return ['general-data'];
  });

  async ngOnInit() {
    //OBTENER ID DE LA RUTA SI EXISTE
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.driverId.set(Number(id));
      //CARGAR DATOS DEL CONDUCTOR DESDE EL BACKEND
      await this.loadDriver(Number(id));
    }
  }

  async loadDriver(id: number) {
    //IMPLEMENTAR CARGA DE DATOS DEL CONDUCTOR
    console.log('Cargando conductor:', id);
  }

  onTabChange(tab: string) {
    this.activeTab.set(tab);
  }

  onFormDataChange(formData: any) {
    console.log('Datos del formulario cambiados:', formData);
  }

  onSave() {
    console.log('Guardando conductor');
  }

  onCancel() {
    this.router.navigate(['/drivers']);
  }
}
