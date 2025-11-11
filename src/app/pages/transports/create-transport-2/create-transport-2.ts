import { Component, signal, inject, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TransportPrincipalType } from '@enums/transport.enum';
import { VehicleEntity } from '@entities/transports.entities.old';
import { VehicleSize, FuelType, fuelTypeDescriptions } from '@enums/vehicle.enum';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';
import { ScheduleModalComponent, ScheduleData } from './components/schedule-modal.component';
import { AddressModalComponent, AddressData } from './components/address-modal.component';

interface TransportData {
  distance?: number;
  time?: string;
  price?: number;
}

interface ComplementaryService {
  id: string;
  name: string;
  price: number;
  translationKey: string;
}

interface Document {
  id: string;
  name: string;
  file: File;
  phase: 'pickup' | 'delivery';
}

@Component({
  selector: 'app-create-transport-2',
  imports: [
    ButtonsComponent,
    TranslatePipe,
    DecimalPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './create-transport-2.html',
  styleUrl: './create-transport-2.scss'
})
export class CreateTransport2 {
  private dialog = inject(MatDialog);

  transportData = signal<TransportData | null>(null);
  transportType = signal<TransportPrincipalType | ''>('');
  vehicles = signal<VehicleEntity[]>([]);
  userData = signal<{ logo?: string } | null>(null);
  billingCenters = signal<string[]>([]);
  
  // Vehículo seleccionado
  selectedVehicleId = signal<number | null>(null);

  // Datos de schedule
  scheduleData = signal<ScheduleData | null>(null);
  
  // Datos de dirección de recogida
  pickupAddress = signal<AddressData | null>(null);
  
  // Datos de dirección de entrega
  deliveryAddress = signal<AddressData | null>(null);
  
  // Servicios complementarios disponibles
  complementaryServices = signal<ComplementaryService[]>([
    {
      id: 'cleaning',
      name: 'Limpieza',
      price: 23.50,
      translationKey: 'transports.create.cleaning-service'
    },
    {
      id: 'demonstration',
      name: 'Demostración vehículo',
      price: 23.50,
      translationKey: 'transports.create.demostration-service'
    },
    {
      id: 'revision',
      name: 'Revisión técnica',
      price: 23.50,
      translationKey: 'transports.create.revision-service'
    }
  ]);
  
  // Mapa que relaciona vehicleId con los serviceIds añadidos
  vehicleServices = signal<Map<number, Set<string>>>(new Map());
  
  // Documentos por fase (Recogida/Entrega)
  pickupDocuments = signal<Document[]>([]);
  deliveryDocuments = signal<Document[]>([]);

  constructor(private route: ActivatedRoute, private router: Router) {
    // Initialize with sample data for development
    this.initializeSampleData();
    
    this.route.paramMap.subscribe(params => {
      const typeParam = params.get('type');
      if (typeParam && Object.values(TransportPrincipalType).includes(typeParam as TransportPrincipalType)) {
        this.transportType.set(typeParam as TransportPrincipalType);
      } else {
        this.transportType.set('');
      }
    });
  }

  private initializeSampleData(): void {
    // Sample vehicles for development
    const vehicle1 = VehicleEntity.fromDto({
      id: 1,
      image: 'assets/images/vehicle.png',
      brand: 'Tesla',
      model: 'Model 3',
      license_plate: '12345678A',
      fuel_type: FuelType.ELECTRIC,
      size: VehicleSize.SMALL,
      created_date: null,
      modified_date: null,
      insurance_date_start: null,
      insurance_date_end: null
    });

    const vehicle2 = VehicleEntity.fromDto({
      id: 2,
      image: 'assets/images/vehicle.png',
      brand: 'Ford',
      model: 'Transit',
      license_plate: '87654321B',
      fuel_type: FuelType.GASOLINE,
      size: VehicleSize.MEDIUM,
      created_date: null,
      modified_date: null,
      insurance_date_start: null,
      insurance_date_end: null
    });

    this.vehicles.set([vehicle1, vehicle2]);
  }

  onBack() {
    this.router.navigate(['/transports/create']);
  }

  onAddPickup() {
    console.log('Adding pickup');
  }

  onImportCsv() {
    console.log('Importing CSV');
  }

  onDeleteVehicle(vehicle: VehicleEntity) {
    const currentVehicles = this.vehicles();
    const updatedVehicles = currentVehicles.filter(v => v.id() !== vehicle.id());
    this.vehicles.set(updatedVehicles);
    console.log('Deleting vehicle:', vehicle.toDto());
  }

  getFuelTypeTranslation(fuelType: FuelType): string {
    return fuelTypeDescriptions[fuelType] || fuelType;
  }

  getFuelTypeIcon(fuelType: FuelType): string {
    const iconMap: Record<FuelType, string> = {
      [FuelType.GASOLINE]: 'local_gas_station',
      [FuelType.DIESEL]: 'local_gas_station',
      [FuelType.ELECTRIC]: 'ev_station',
      [FuelType.HYBRID]: 'eco',
      [FuelType.PLUG_IN_HYBRID]: 'ev_station',
      [FuelType.LPG]: 'propane_tank',
      [FuelType.CNG]: 'propane_tank'
    };
    return iconMap[fuelType] || 'local_gas_station';
  }

  onAddVehicle() {
    console.log('Adding vehicle');
  }

  // Seleccionar un vehículo
  onSelectVehicle(vehicle: VehicleEntity) {
    const vehicleId = vehicle.id();
    const currentSelected = this.selectedVehicleId();
    
    // Si ya está seleccionado, deseleccionarlo
    if (currentSelected === vehicleId) {
      this.selectedVehicleId.set(null);
    } else {
      this.selectedVehicleId.set(vehicleId);
    }
  }

  // Verificar si un vehículo está seleccionado
  isVehicleSelected(vehicle: VehicleEntity): boolean {
    return this.selectedVehicleId() === vehicle.id();
  }

  // Añadir o quitar un servicio complementario al vehículo seleccionado
  onToggleService(serviceId: string) {
    const selectedVehicleId = this.selectedVehicleId();
    if (selectedVehicleId === null) {
      return;
    }

    const currentVehicleServices = new Map(this.vehicleServices());
    
    if (!currentVehicleServices.has(selectedVehicleId)) {
      currentVehicleServices.set(selectedVehicleId, new Set());
    }

    const vehicleServiceSet = currentVehicleServices.get(selectedVehicleId)!;
    
    if (vehicleServiceSet.has(serviceId)) {
      vehicleServiceSet.delete(serviceId);
    } else {
      vehicleServiceSet.add(serviceId);
    }

    this.vehicleServices.set(currentVehicleServices);
  }

  // Verificar si un servicio está añadido al vehículo seleccionado
  isServiceAddedToSelectedVehicle(serviceId: string): boolean {
    const selectedVehicleId = this.selectedVehicleId();
    if (selectedVehicleId === null) {
      return false;
    }

    const vehicleServices = this.vehicleServices();
    const serviceSet = vehicleServices.get(selectedVehicleId);
    return serviceSet ? serviceSet.has(serviceId) : false;
  }

  // Obtener el número de servicios añadidos a un vehículo
  getVehicleServicesCount(vehicle: VehicleEntity): number {
    const vehicleServices = this.vehicleServices();
    const serviceSet = vehicleServices.get(vehicle.id());
    return serviceSet ? serviceSet.size : 0;
  }

  // Obtener el precio total de servicios de un vehículo
  getVehicleServicesPrice(vehicle: VehicleEntity): number {
    const vehicleServices = this.vehicleServices();
    const serviceSet = vehicleServices.get(vehicle.id());
    if (!serviceSet || serviceSet.size === 0) {
      return 0;
    }

    const services = this.complementaryServices();
    return Array.from(serviceSet).reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  }

  // Documentación requerida - Añadir archivo
  onAddDocument(phase: 'pickup' | 'delivery') {
    const inputId = phase === 'pickup' ? 'pickupFileInput' : 'deliveryFileInput';
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Manejar selección de archivo
  onFileSelected(event: Event, phase: 'pickup' | 'delivery') {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const documentId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newDocument: Document = {
      id: documentId,
      name: file.name,
      file: file,
      phase: phase
    };

    if (phase === 'pickup') {
      const currentDocs = this.pickupDocuments();
      this.pickupDocuments.set([...currentDocs, newDocument]);
    } else {
      const currentDocs = this.deliveryDocuments();
      this.deliveryDocuments.set([...currentDocs, newDocument]);
    }

    // Resetear el input para permitir seleccionar el mismo archivo de nuevo
    input.value = '';
  }

  // Eliminar documento
  onDeleteDocument(documentId: string, phase: 'pickup' | 'delivery') {
    if (phase === 'pickup') {
      const currentDocs = this.pickupDocuments();
      const updatedDocs = currentDocs.filter(doc => doc.id !== documentId);
      this.pickupDocuments.set(updatedDocs);
    } else {
      const currentDocs = this.deliveryDocuments();
      const updatedDocs = currentDocs.filter(doc => doc.id !== documentId);
      this.deliveryDocuments.set(updatedDocs);
    }
  }

  // Descargar documento
  onDownloadDocument(doc: Document) {
    const url = URL.createObjectURL(doc.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Obtener documentos por fase
  getDocuments(phase: 'pickup' | 'delivery'): Document[] {
    return phase === 'pickup' ? this.pickupDocuments() : this.deliveryDocuments();
  }

  onPublishTransport() {
    console.log('Publishing transport');
  }

  onCancelTransport() {
    this.router.navigate(['/transports/create']);
  }

  // Abrir modal de schedule
  openScheduleModal() {
    const currentSchedule = this.scheduleData();
    const initialData: ScheduleData | null = currentSchedule || {
      departure: {
        date: null,
        fromTime: '08:00',
        toTime: '10:00'
      },
      arrival: {
        date: null,
        fromTime: '08:00',
        toTime: '10:00'
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '900px',
      maxHeight: '90vh',
      panelClass: 'schedule-dialog',
      data: {
        title: 'transports.create.schedule',
        component: ScheduleModalComponent,
        componentInputs: {
          initialData: initialData
        },
        showActions: false,
        hideTitle: true
      }
    });

    dialogRef.afterClosed().subscribe((result: ScheduleData | undefined) => {
      if (result) {
        this.scheduleData.set(result);
      }
    });
  }

  // Formatear fecha para input date (YYYY-MM-DD)
  formatDateForInput(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Obtener datos de salida
  getDepartureDate(): string {
    const schedule = this.scheduleData();
    return this.formatDateForInput(schedule?.departure.date || null);
  }

  getDepartureFromTime(): string {
    const schedule = this.scheduleData();
    return schedule?.departure.fromTime || '';
  }

  getDepartureToTime(): string {
    const schedule = this.scheduleData();
    return schedule?.departure.toTime || '';
  }

  // Obtener datos de llegada
  getArrivalDate(): string {
    const schedule = this.scheduleData();
    return this.formatDateForInput(schedule?.arrival.date || null);
  }

  getArrivalFromTime(): string {
    const schedule = this.scheduleData();
    return schedule?.arrival.fromTime || '';
  }

  getArrivalToTime(): string {
    const schedule = this.scheduleData();
    return schedule?.arrival.toTime || '';
  }

  // Validar si hay al menos 2 horas entre "desde" y "hasta"
  private calculateTimeDifference(fromTime: string, toTime: string): number {
    if (!fromTime || !toTime) return 0;
    
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
    const [toHours, toMinutes] = toTime.split(':').map(Number);
    
    const fromTotalMinutes = fromHours * 60 + fromMinutes;
    const toTotalMinutes = toHours * 60 + toMinutes;
    
    // Si la hora "to" es menor que "from", asumimos que es del día siguiente
    let difference = toTotalMinutes - fromTotalMinutes;
    if (difference < 0) {
      difference += 24 * 60; // Sumar 24 horas
    }
    
    return difference;
  }

  // Validar salida (mínimo 2 horas = 120 minutos)
  isValidDepartureTimeRange(): boolean {
    const schedule = this.scheduleData();
    if (!schedule?.departure) return false;
    
    const difference = this.calculateTimeDifference(
      schedule.departure.fromTime,
      schedule.departure.toTime
    );
    
    return difference >= 120; // 2 horas = 120 minutos
  }

  // Validar llegada (mínimo 2 horas = 120 minutos)
  isValidArrivalTimeRange(): boolean {
    const schedule = this.scheduleData();
    if (!schedule?.arrival) return false;
    
    const difference = this.calculateTimeDifference(
      schedule.arrival.fromTime,
      schedule.arrival.toTime
    );
    
    return difference >= 120; // 2 horas = 120 minutos
  }

  // Validar ambos (salida y llegada)
  isValidSchedule(): boolean {
    return this.isValidDepartureTimeRange() && this.isValidArrivalTimeRange();
  }

  // Abrir modal de direcciones
  openAddressModal() {
    const currentAddress = this.pickupAddress();

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      data: {
        title: 'transports.create.pickup',
        component: AddressModalComponent,
        componentInputs: currentAddress ? {
          initialAddress: currentAddress
        } : {},
        showActions: false
      }
    });

    dialogRef.afterClosed().subscribe((result: AddressData | undefined) => {
      if (result) {
        this.pickupAddress.set(result);
      }
    });
  }

  // Abrir modal de direcciones de entrega
  openDeliveryAddressModal() {
    const currentAddress = this.deliveryAddress();

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      data: {
        title: 'transports.create.delivery',
        component: AddressModalComponent,
        componentInputs: currentAddress ? {
          initialAddress: currentAddress
        } : {},
        showActions: false
      }
    });

    dialogRef.afterClosed().subscribe((result: AddressData | undefined) => {
      if (result) {
        this.deliveryAddress.set(result);
      }
    });
  }
}
