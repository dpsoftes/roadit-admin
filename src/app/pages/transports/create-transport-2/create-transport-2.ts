import { Component, signal, inject, computed, effect } from '@angular/core';
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
import { TransportStore } from '@store/transports.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransportsRetrieveResponse } from '@dtos/transports/transports.dto.old';

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
  private transportStore = inject(TransportStore);
  
  // Exponer FuelType para el template
  FuelType = FuelType;

  transportData = signal<TransportData | null>(null);
  transportType = signal<TransportPrincipalType | ''>('');
  vehicles = signal<VehicleEntity[]>([]);
  vehiclesLeft = signal<VehicleEntity[]>([]);
  vehiclesRight = signal<VehicleEntity[]>([]);
  userData = signal<{ logo?: string } | null>(null);
  billingCenters = signal<string[]>([]);
  
  // Estado del formulario de añadir vehículo
  showAddVehicleForm = signal<boolean>(false);
  newVehicleLicensePlate = signal<string>('');
  newVehicleBrand = signal<string>('');
  newVehicleModel = signal<string>('');
  newVehicleFuelType = signal<FuelType | null>(null);
  
  // Vehículos por etapa
  pickupVehicleId = signal<number | null>(null);
  stopoverVehicleId = signal<number | null>(null);
  deliveryVehicleId = signal<number | null>(null);
  
  // Vehículo seleccionado (para servicios complementarios)
  selectedVehicleId = signal<number | null>(null);

  // Datos de schedule
  scheduleData = signal<ScheduleData | null>(null);
  
  // Datos de dirección de recogida
  pickupAddress = signal<AddressData | null>(null);
  
  // Datos de dirección de entrega
  deliveryAddress = signal<AddressData | null>(null);
  
  // Datos de dirección de etapa (parada intermedia)
  stopoverAddress = signal<AddressData | null>(null);
  
  // Computed para verificar si debe mostrarse la etapa
  showStopover = computed(() => {
    const type = this.transportType();
    return type === TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER || 
           type === TransportPrincipalType.WITH_STOPOVER;
  });

  // Computed para verificar si debe mostrarse el botón de añadir etapa
  showAddStageButton = computed(() => {
    return !this.showStopover();
  });
  
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
  
  // Documentos por etapa y fase
  // A → B (Recogida → Etapa)
  pickupABDocuments = signal<Document[]>([]);
  deliveryABDocuments = signal<Document[]>([]);
  // B → C (Etapa → Entrega)
  pickupBCDocuments = signal<Document[]>([]);
  deliveryBCDocuments = signal<Document[]>([]);
  
  // Documentos legacy (sin etapa)
  pickupDocuments = signal<Document[]>([]);
  deliveryDocuments = signal<Document[]>([]);
  
  // Campos adicionales
  referenceNumber = signal<string>('');
  comment = signal<string>('');

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const typeParam = params.get('type');
        if (typeParam && Object.values(TransportPrincipalType).includes(typeParam as TransportPrincipalType)) {
          this.transportType.set(typeParam as TransportPrincipalType);
        } else {
          this.transportType.set('');
        }
      });

    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const transportIdParam = params.get('transportId') ?? params.get('id');
        if (transportIdParam) {
          const numericId = Number(transportIdParam);
          const idToLoad = Number.isNaN(numericId) ? transportIdParam : numericId;
          this.transportStore.loadTransport(idToLoad);
        } else {
          this.transportStore.clearCurrentTransport();
          this.resetTransportData();
          this.initializeSampleData();
        }
      });

    effect(() => {
      const transport = this.transportStore.currentTransport();
      const loading = this.transportStore.currentTransportLoading();
      if (transport) {
        this.populateFromTransport(transport);
      } else if (!loading) {
        // Mantener datos existentes si es un nuevo transporte
        if (!this.vehicles().length) {
          this.initializeSampleData();
        }
      }
    }, { allowSignalWrites: true });
  }

  private initializeSampleData(): void {
    if (this.vehicles().length) {
      return;
    }
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
    // Dividir vehículos en dos columnas
    this.vehiclesLeft.set([vehicle1]);
    this.vehiclesRight.set([vehicle2]);
  }

  private resetTransportData(): void {
    this.transportData.set(null);
    this.vehicles.set([]);
    this.vehiclesLeft.set([]);
    this.vehiclesRight.set([]);
    this.selectedVehicleId.set(null);
    this.pickupVehicleId.set(null);
    this.stopoverVehicleId.set(null);
    this.deliveryVehicleId.set(null);
    this.scheduleData.set(null);
    this.pickupAddress.set(null);
    this.deliveryAddress.set(null);
    this.stopoverAddress.set(null);
    this.pickupDocuments.set([]);
    this.deliveryDocuments.set([]);
    this.pickupABDocuments.set([]);
    this.deliveryABDocuments.set([]);
    this.pickupBCDocuments.set([]);
    this.deliveryBCDocuments.set([]);
    this.billingCenters.set([]);
  }

  private populateFromTransport(transport: TransportsRetrieveResponse): void {
    this.resetTransportData();

    // Datos generales
    const distance = transport.kilometers ? Number(transport.kilometers) : undefined;
    const timeLabel = this.formatDurationLabel(transport.duration ?? null);

    this.transportData.set({
      distance: Number.isFinite(distance ?? NaN) ? distance : undefined,
      time: timeLabel,
      price: undefined
    });

    if (transport.transport_principal_type) {
      this.transportType.set(transport.transport_principal_type as TransportPrincipalType);
    }

    if (transport.client_name) {
      this.billingCenters.set([transport.client_name, ...(transport.countries || [])]);
    } else if (transport.countries?.length) {
      this.billingCenters.set(transport.countries);
    }

    // Campos adicionales
    if (transport.reference_number) {
      this.referenceNumber.set(transport.reference_number);
    }
    if (transport.comment) {
      this.comment.set(transport.comment);
    }

    // Vehículos asociados
    const vehicleMap = new Map<number, VehicleEntity>();
    (transport.legs || []).forEach(leg => {
      if (leg.vehicle && typeof leg.vehicle.id === 'number') {
        if (!vehicleMap.has(leg.vehicle.id)) {
          // Normalizar fechas del vehículo si vienen como strings
          const normalizedVehicle = {
            ...leg.vehicle,
            created_date: this.parseIsoToDate(leg.vehicle.created_date),
            modified_date: this.parseIsoToDate(leg.vehicle.modified_date),
            insurance_date_start: this.parseIsoToDate(leg.vehicle.insurance_date_start),
            insurance_date_end: this.parseIsoToDate(leg.vehicle.insurance_date_end)
          };
          vehicleMap.set(leg.vehicle.id, VehicleEntity.fromDto(normalizedVehicle));
        }
      }
    });

    const vehicles = Array.from(vehicleMap.values());
    if (vehicles.length) {
      this.vehicles.set(vehicles);
      // Dividir vehículos en dos columnas (mitad cada una)
      const midPoint = Math.ceil(vehicles.length / 2);
      this.vehiclesLeft.set(vehicles.slice(0, midPoint));
      this.vehiclesRight.set(vehicles.slice(midPoint));
      this.selectedVehicleId.set(vehicles[0].id());
    }

    // Direcciones
    const firstLeg = transport.legs?.[0];
    const secondLeg = transport.legs?.[1];
    
    if (firstLeg?.origin_address) {
      this.pickupAddress.set(this.mapAddress(firstLeg.origin_address));
    }
    
    // Si hay segunda leg, su origin_address es la etapa y su destination_address es la entrega
    if (secondLeg) {
      if (secondLeg.origin_address) {
        this.stopoverAddress.set(this.mapAddress(secondLeg.origin_address));
      }
      if (secondLeg.destination_address) {
        this.deliveryAddress.set(this.mapAddress(secondLeg.destination_address));
      }
    } else if (firstLeg?.destination_address) {
      // Si no hay segunda leg, la destination del primero es la entrega
      this.deliveryAddress.set(this.mapAddress(firstLeg.destination_address));
    }

    // Horario
    if (firstLeg) {
      const departureFrom = this.parseIsoToDate(firstLeg.expected_departure_from);
      const departureTo = this.parseIsoToDate(firstLeg.expected_departure_to);
      
      // Si hay segunda leg, usar sus fechas para la etapa y entrega
      if (secondLeg) {
        const stopoverFrom = this.parseIsoToDate(secondLeg.expected_departure_from);
        const stopoverTo = this.parseIsoToDate(secondLeg.expected_departure_to);
        const arrivalFrom = this.parseIsoToDate(secondLeg.expected_arrival_from);
        const arrivalTo = this.parseIsoToDate(secondLeg.expected_arrival_to);
        
        this.scheduleData.set({
          departure: {
            date: this.stripTime(departureFrom),
            fromTime: this.extractTimeString(departureFrom),
            toTime: this.extractTimeString(departureTo)
          },
          stopover: {
            date: this.stripTime(stopoverFrom),
            fromTime: this.extractTimeString(stopoverFrom),
            toTime: this.extractTimeString(stopoverTo)
          },
          arrival: {
            date: this.stripTime(arrivalFrom),
            fromTime: this.extractTimeString(arrivalFrom),
            toTime: this.extractTimeString(arrivalTo)
          }
        });
        
        // Asignar vehículos por etapa
        if (firstLeg.vehicle?.id) {
          this.pickupVehicleId.set(firstLeg.vehicle.id);
        }
        if (secondLeg.vehicle?.id) {
          this.deliveryVehicleId.set(secondLeg.vehicle.id);
          // Si el vehículo del segundo leg es diferente, también asignarlo a etapa
          if (firstLeg.vehicle?.id !== secondLeg.vehicle?.id) {
            this.stopoverVehicleId.set(secondLeg.vehicle.id);
          }
        }
      } else {
        const arrivalFrom = this.parseIsoToDate(firstLeg.expected_arrival_from);
        const arrivalTo = this.parseIsoToDate(firstLeg.expected_arrival_to);
        
        this.scheduleData.set({
          departure: {
            date: this.stripTime(departureFrom),
            fromTime: this.extractTimeString(departureFrom),
            toTime: this.extractTimeString(departureTo)
          },
          arrival: {
            date: this.stripTime(arrivalFrom),
            fromTime: this.extractTimeString(arrivalFrom),
            toTime: this.extractTimeString(arrivalTo)
          }
        });
        
        // Asignar vehículo único
        if (firstLeg.vehicle?.id) {
          this.pickupVehicleId.set(firstLeg.vehicle.id);
        }
      }
    }
  }

  private mapAddress(address: any): AddressData {
    const primaryContact = Array.isArray(address.contacts) ? address.contacts[0] : null;
    return {
      name: address.title || address.client_name || '—',
      address: address.description || this.composeAddressLine(address),
      contact: primaryContact?.name || address.client_name || '—',
      phone: primaryContact?.phone,
      schedule: address.opening_hours_summary
    };
  }

  private composeAddressLine(address: any): string {
    const parts = [address.country, address.city, address.postal_code, address.province, address.title]
      .filter((value: string | null | undefined) => !!value);
    return parts.join(', ');
  }

  private parseIsoToDate(value: string | Date | null | undefined): Date | null {
    if (!value) {
      return null;
    }
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private stripTime(date: Date | null): Date | null {
    if (!date) {
      return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private extractTimeString(date: Date | null): string {
    if (!date) {
      return '';
    }
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  private formatDurationLabel(duration: number | null): string | undefined {
    if (duration === null || duration === undefined) {
      return undefined;
    }
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    const hourPart = hours > 0 ? `${hours} h` : '';
    const minutePart = minutes > 0 ? `${minutes} min` : '';
    const separator = hourPart && minutePart ? ' ' : '';
    const label = `${hourPart}${separator}${minutePart}`.trim();
    return label || `${duration.toFixed(1)} h`;
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

  onDeleteVehicle(vehicle: VehicleEntity, column?: 'left' | 'right') {
    const showStopover = this.showStopover();
    
    if (showStopover && column) {
      if (column === 'left') {
        const currentVehicles = this.vehiclesLeft();
        const updatedVehicles = currentVehicles.filter(v => v.id() !== vehicle.id());
        this.vehiclesLeft.set(updatedVehicles);
      } else {
        const currentVehicles = this.vehiclesRight();
        const updatedVehicles = currentVehicles.filter(v => v.id() !== vehicle.id());
        this.vehiclesRight.set(updatedVehicles);
      }
      // Actualizar lista general
      const allVehicles = [...this.vehiclesLeft(), ...this.vehiclesRight()];
      this.vehicles.set(allVehicles);
    } else {
      const currentVehicles = this.vehicles();
      const updatedVehicles = currentVehicles.filter(v => v.id() !== vehicle.id());
      this.vehicles.set(updatedVehicles);
    }
    console.log('Deleting vehicle:', vehicle.toDto());
  }

  onAddVehicle(column?: 'left' | 'right') {
    const showStopover = this.showStopover();
    if (showStopover && column) {
      console.log('Adding vehicle to', column, 'column');
    } else {
      this.showAddVehicleForm.set(true);
      this.newVehicleLicensePlate.set('');
      this.newVehicleBrand.set('');
      this.newVehicleModel.set('');
      this.newVehicleFuelType.set(null);
    }
  }
  
  onSaveVehicle() {
    const vehicleData = {
      license_plate: this.newVehicleLicensePlate(),
      brand: this.newVehicleBrand(),
      model: this.newVehicleModel(),
      fuel_type: this.newVehicleFuelType()
    };
    console.log('Saving vehicle:', vehicleData);
    // Aquí se implementaría la lógica para guardar el vehículo
    // Por ahora solo cerramos el formulario
    this.showAddVehicleForm.set(false);
  }
  
  onCancelAddVehicle() {
    this.showAddVehicleForm.set(false);
    this.newVehicleLicensePlate.set('');
    this.newVehicleBrand.set('');
    this.newVehicleModel.set('');
    this.newVehicleFuelType.set(null);
  }
  
  onSelectFuelType(fuelType: FuelType) {
    const currentFuelType = this.newVehicleFuelType();
    this.newVehicleFuelType.set(currentFuelType === fuelType ? null : fuelType);
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
  onAddDocument(phase: 'pickup' | 'delivery', leg?: 'AB' | 'BC') {
    const showStopover = this.showStopover();
    let inputId: string;
    
    if (showStopover && leg) {
      if (leg === 'AB') {
        inputId = phase === 'pickup' ? 'pickupABFileInput' : 'deliveryABFileInput';
      } else {
        inputId = phase === 'pickup' ? 'pickupBCFileInput' : 'deliveryBCFileInput';
      }
    } else {
      inputId = phase === 'pickup' ? 'pickupFileInput' : 'deliveryFileInput';
    }
    
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Manejar selección de archivo
  onFileSelected(event: Event, phase: 'pickup' | 'delivery', leg?: 'AB' | 'BC') {
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

    const showStopover = this.showStopover();
    
    if (showStopover && leg) {
      if (leg === 'AB') {
        if (phase === 'pickup') {
          const currentDocs = this.pickupABDocuments();
          this.pickupABDocuments.set([...currentDocs, newDocument]);
        } else {
          const currentDocs = this.deliveryABDocuments();
          this.deliveryABDocuments.set([...currentDocs, newDocument]);
        }
      } else {
        if (phase === 'pickup') {
          const currentDocs = this.pickupBCDocuments();
          this.pickupBCDocuments.set([...currentDocs, newDocument]);
        } else {
          const currentDocs = this.deliveryBCDocuments();
          this.deliveryBCDocuments.set([...currentDocs, newDocument]);
        }
      }
    } else {
      if (phase === 'pickup') {
        const currentDocs = this.pickupDocuments();
        this.pickupDocuments.set([...currentDocs, newDocument]);
      } else {
        const currentDocs = this.deliveryDocuments();
        this.deliveryDocuments.set([...currentDocs, newDocument]);
      }
    }

    // Resetear el input para permitir seleccionar el mismo archivo de nuevo
    input.value = '';
  }

  // Eliminar documento
  onDeleteDocument(documentId: string, phase: 'pickup' | 'delivery', leg?: 'AB' | 'BC') {
    const showStopover = this.showStopover();
    
    if (showStopover && leg) {
      if (leg === 'AB') {
        if (phase === 'pickup') {
          const currentDocs = this.pickupABDocuments();
          const updatedDocs = currentDocs.filter(doc => doc.id !== documentId);
          this.pickupABDocuments.set(updatedDocs);
        } else {
          const currentDocs = this.deliveryABDocuments();
          const updatedDocs = currentDocs.filter(doc => doc.id !== documentId);
          this.deliveryABDocuments.set(updatedDocs);
        }
      } else {
        if (phase === 'pickup') {
          const currentDocs = this.pickupBCDocuments();
          const updatedDocs = currentDocs.filter(doc => doc.id !== documentId);
          this.pickupBCDocuments.set(updatedDocs);
        } else {
          const currentDocs = this.deliveryBCDocuments();
          const updatedDocs = currentDocs.filter(doc => doc.id !== documentId);
          this.deliveryBCDocuments.set(updatedDocs);
        }
      }
    } else {
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
  getDocuments(phase: 'pickup' | 'delivery', leg?: 'AB' | 'BC'): Document[] {
    const showStopover = this.showStopover();
    
    if (showStopover && leg) {
      if (leg === 'AB') {
        return phase === 'pickup' ? this.pickupABDocuments() : this.deliveryABDocuments();
      } else {
        return phase === 'pickup' ? this.pickupBCDocuments() : this.deliveryBCDocuments();
      }
    } else {
      return phase === 'pickup' ? this.pickupDocuments() : this.deliveryDocuments();
    }
  }
  
  // Seleccionar vehículo para una etapa específica
  onSelectVehicleForStage(vehicle: VehicleEntity, stage: 'pickup' | 'stopover' | 'delivery') {
    const vehicleId = vehicle.id();
    if (stage === 'pickup') {
      this.pickupVehicleId.set(vehicleId);
    } else if (stage === 'stopover') {
      this.stopoverVehicleId.set(vehicleId);
    } else {
      this.deliveryVehicleId.set(vehicleId);
    }
    this.selectedVehicleId.set(vehicleId);
  }
  
  // Verificar si un vehículo está seleccionado para una etapa
  isVehicleSelectedForStage(vehicle: VehicleEntity, stage: 'pickup' | 'stopover' | 'delivery'): boolean {
    const vehicleId = vehicle.id();
    if (stage === 'pickup') {
      return this.pickupVehicleId() === vehicleId;
    } else if (stage === 'stopover') {
      return this.stopoverVehicleId() === vehicleId;
    } else {
      return this.deliveryVehicleId() === vehicleId;
    }
  }
  
  // Obtener vehículo seleccionado para una etapa
  getSelectedVehicleForStage(stage: 'pickup' | 'stopover' | 'delivery'): VehicleEntity | null {
    const vehicles = this.vehicles();
    let vehicleId: number | null;
    
    if (stage === 'pickup') {
      vehicleId = this.pickupVehicleId();
    } else if (stage === 'stopover') {
      vehicleId = this.stopoverVehicleId();
    } else {
      vehicleId = this.deliveryVehicleId();
    }
    
    if (vehicleId === null) return null;
    return vehicles.find(v => v.id() === vehicleId) || null;
  }

  onPublishTransport() {
    const transportPayload = this.buildTransportPayload();
    console.log('Transport payload:', JSON.stringify(transportPayload, null, 2));
  }

  private buildTransportPayload(): any {
    const schedule = this.scheduleData();
    const pickupAddr = this.pickupAddress();
    const deliveryAddr = this.deliveryAddress();
    const vehicles = this.vehicles();
    const vehicleServicesMap = this.vehicleServices();
    const transportId = this.transportStore.currentTransportId();
    
    // Construir fechas ISO desde schedule
    const buildIsoDateTime = (date: Date | null, time: string): string | null => {
      if (!date || !time) return null;
      const [hours, minutes] = time.split(':').map(Number);
      const dateTime = new Date(date);
      dateTime.setHours(hours, minutes, 0, 0);
      return dateTime.toISOString();
    };

    // Construir dirección completa desde AddressData
    const buildAddress = (addressData: AddressData | null, addressType: string): any => {
      if (!addressData) return null;
      
      return {
        title: addressData.name,
        description: addressData.address,
        address_type: addressType,
        contacts: addressData.contact ? [{
          name: addressData.contact,
          phone: addressData.phone || null,
          email: null
        }] : [],
        opening_hours_summary: addressData.schedule || null
      };
    };

    // Construir servicios adicionales por vehículo
    const buildAdditionalServices = (vehicleId: number): any[] => {
      const serviceSet = vehicleServicesMap.get(vehicleId);
      if (!serviceSet || serviceSet.size === 0) return [];
      
      const services = this.complementaryServices();
      return Array.from(serviceSet).map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return service ? {
          id: serviceId,
          name: service.name,
          price: service.price.toString()
        } : null;
      }).filter(s => s !== null) as any[];
    };

    // Construir documentos por fase y etapa
    const buildDocuments = (phase: 'pickup' | 'delivery', leg?: 'AB' | 'BC'): any[] => {
      const docs = this.getDocuments(phase, leg);
      return docs.map(doc => ({
        title: doc.name,
        phase: phase.toUpperCase(),
        file: doc.file.name
      }));
    };

    // Calcular duración desde las fechas si están disponibles
    const calculateDuration = (): number | null => {
      if (!schedule?.departure.date || !schedule?.arrival.date) {
        // Si hay datos de transportData, intentar parsear
        if (this.transportData()?.time) {
          const timeStr = this.transportData()!.time!.replace(/[^\d.]/g, '');
          const parsed = parseFloat(timeStr);
          return isNaN(parsed) ? null : parsed;
        }
        return null;
      }
      
      const departure = buildIsoDateTime(schedule.departure.date, schedule.departure.fromTime);
      const arrival = buildIsoDateTime(schedule.arrival.date, schedule.arrival.fromTime);
      
      if (!departure || !arrival) return null;
      
      const depDate = new Date(departure);
      const arrDate = new Date(arrival);
      const diffMs = arrDate.getTime() - depDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      
      return diffHours > 0 ? diffHours : null;
    };

    // Construir legs
    const legDuration = calculateDuration();
    const stopoverAddr = this.stopoverAddress();
    const showStopover = this.showStopover();
    
    const buildVehicleData = (vehicleId: number | null) => {
      if (!vehicleId) return null;
      const vehicle = vehicles.find(v => v.id() === vehicleId);
      if (!vehicle) return null;
      
      return {
        id: vehicle.id(),
        license_plate: vehicle.license_plate(),
        brand: vehicle.brand(),
        model: vehicle.model(),
        fuel_type: vehicle.fuel_type(),
        size: vehicle.size(),
        image: vehicle.image(),
        insurance_date_start: vehicle.insurance_date_start()?.toISOString().split('T')[0] || null,
        insurance_date_end: vehicle.insurance_date_end()?.toISOString().split('T')[0] || null
      };
    };

    let legs: any[] = [];
    
    if (showStopover && stopoverAddr) {
      // Si hay etapa, crear dos legs: origen -> etapa y etapa -> destino
      const pickupVehicleId = this.pickupVehicleId();
      const stopoverVehicleId = this.stopoverVehicleId();
      const deliveryVehicleId = this.deliveryVehicleId();
      
      // Usar vehículo de etapa para el segundo leg si está definido, sino el de entrega
      const leg2VehicleId = stopoverVehicleId || deliveryVehicleId;
      
      // Horarios de etapa
      const stopoverFrom = schedule?.stopover ? buildIsoDateTime(schedule.stopover.date, schedule.stopover.fromTime) : null;
      const stopoverTo = schedule?.stopover ? buildIsoDateTime(schedule.stopover.date, schedule.stopover.toTime) : null;
      
      legs = [
        {
          order: 1,
          duration: legDuration ? legDuration / 2 : null,
          kilometers: this.transportData()?.distance ? (Number(this.transportData()!.distance) / 2).toString() : null,
          has_ferry: false,
          expected_departure_from: schedule ? buildIsoDateTime(schedule.departure.date, schedule.departure.fromTime) : null,
          expected_departure_to: schedule ? buildIsoDateTime(schedule.departure.date, schedule.departure.toTime) : null,
          expected_arrival_from: stopoverFrom || (schedule ? buildIsoDateTime(schedule.stopover?.date || schedule.arrival.date, schedule.stopover?.fromTime || schedule.arrival.fromTime) : null),
          expected_arrival_to: stopoverTo || (schedule ? buildIsoDateTime(schedule.stopover?.date || schedule.arrival.date, schedule.stopover?.toTime || schedule.arrival.toTime) : null),
          origin_address: buildAddress(pickupAddr, 'DEALERSHIP'),
          destination_address: buildAddress(stopoverAddr, 'PRIVATE'),
          connection_type: 'STOPOVER',
          vehicle: buildVehicleData(pickupVehicleId),
          documents: [
            ...buildDocuments('pickup', 'AB'),
            ...buildDocuments('delivery', 'AB')
          ],
          additional_services: pickupVehicleId ? buildAdditionalServices(pickupVehicleId) : []
        },
        {
          order: 2,
          duration: legDuration ? legDuration / 2 : null,
          kilometers: this.transportData()?.distance ? (Number(this.transportData()!.distance) / 2).toString() : null,
          has_ferry: false,
          expected_departure_from: stopoverFrom || (schedule ? buildIsoDateTime(schedule.stopover?.date || schedule.arrival.date, schedule.stopover?.fromTime || schedule.arrival.fromTime) : null),
          expected_departure_to: stopoverTo || (schedule ? buildIsoDateTime(schedule.stopover?.date || schedule.arrival.date, schedule.stopover?.toTime || schedule.arrival.toTime) : null),
          expected_arrival_from: schedule ? buildIsoDateTime(schedule.arrival.date, schedule.arrival.fromTime) : null,
          expected_arrival_to: schedule ? buildIsoDateTime(schedule.arrival.date, schedule.arrival.toTime) : null,
          origin_address: buildAddress(stopoverAddr, 'PRIVATE'),
          destination_address: buildAddress(deliveryAddr, 'REPAIR_SHOP'),
          connection_type: 'DESTINATION',
          vehicle: buildVehicleData(leg2VehicleId),
          documents: [
            ...buildDocuments('pickup', 'BC'),
            ...buildDocuments('delivery', 'BC')
          ],
          additional_services: leg2VehicleId ? buildAdditionalServices(leg2VehicleId) : []
        }
      ];
    } else {
      // Sin etapa, un solo leg: origen -> destino
      const pickupVehicleId = this.pickupVehicleId();
      const vehicleId = pickupVehicleId || (vehicles.length > 0 ? vehicles[0].id() : null);
      
      legs = [{
        order: 1,
        duration: legDuration,
        kilometers: this.transportData()?.distance?.toString() || null,
        has_ferry: false,
        expected_departure_from: schedule ? buildIsoDateTime(schedule.departure.date, schedule.departure.fromTime) : null,
        expected_departure_to: schedule ? buildIsoDateTime(schedule.departure.date, schedule.departure.toTime) : null,
        expected_arrival_from: schedule ? buildIsoDateTime(schedule.arrival.date, schedule.arrival.fromTime) : null,
        expected_arrival_to: schedule ? buildIsoDateTime(schedule.arrival.date, schedule.arrival.toTime) : null,
        origin_address: buildAddress(pickupAddr, 'DEALERSHIP'),
        destination_address: buildAddress(deliveryAddr, 'REPAIR_SHOP'),
        connection_type: 'DESTINATION',
        vehicle: buildVehicleData(vehicleId),
        documents: [
          ...buildDocuments('pickup'),
          ...buildDocuments('delivery')
        ],
        additional_services: vehicleId ? buildAdditionalServices(vehicleId) : []
      }];
    }

    // Obtener datos del transporte actual si existe (modo edición)
    const currentTransport = this.transportStore.currentTransport();
    
    // Construir objeto completo
    const payload: any = {
      id: transportId || null,
      is_express: currentTransport?.is_express || false,
      transport_principal_type: this.transportType() || currentTransport?.transport_principal_type || 'SIMPLE_MOVEMENT',
      transport_type: currentTransport?.transport_type || null,
      phone: pickupAddr?.phone || currentTransport?.phone || null,
      has_ferry: currentTransport?.has_ferry || false,
      appointment_management: currentTransport?.appointment_management || false,
      emails: currentTransport?.emails || [],
      comment: this.comment() || currentTransport?.comment || null,
      group_number: currentTransport?.group_number || null,
      reservation_number: currentTransport?.reservation_number || null,
      reference_number: this.referenceNumber() || currentTransport?.reference_number || null,
      is_blocked: currentTransport?.is_blocked || false,
      invoiced: currentTransport?.invoiced || false,
      duration: legDuration || currentTransport?.duration || null,
      transport_status: currentTransport?.transport_status || 'PENDING',
      cancelled_comment: currentTransport?.cancelled_comment || null,
      cancelled_reason: currentTransport?.cancelled_reason || null,
      client_id: currentTransport?.client_id || null,
      client_name: currentTransport?.client_name || null,
      driver_id: currentTransport?.driver_id || null,
      driver_name: currentTransport?.driver_name || null,
      admin_id: currentTransport?.admin_id || null,
      admin_name: currentTransport?.admin_name || null,
      tags: currentTransport?.tags || [],
      legs: legs,
      kilometers: legs.length > 0 ? legs[0].kilometers || currentTransport?.kilometers || null : currentTransport?.kilometers || null,
      created_date: currentTransport?.created_date || null,
      modified_date: new Date().toISOString(),
      show_timeline: currentTransport?.show_timeline ?? true,
      timeline: currentTransport?.timeline || [],
      countries: this.billingCenters().length > 0 ? this.billingCenters() : (currentTransport?.countries || [])
    };

    return payload;
  }

  onCancelTransport() {
    this.router.navigate(['/transports/create']);
  }

  // Abrir modal de schedule
  openScheduleModal() {
    const currentSchedule = this.scheduleData();
    const showStopover = this.showStopover();
    const initialData: ScheduleData | null = currentSchedule || {
      departure: {
        date: null,
        fromTime: '08:00',
        toTime: '10:00'
      },
      ...(showStopover ? {
        stopover: {
          date: null,
          fromTime: '08:00',
          toTime: '10:00'
        }
      } : {}),
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

  // Obtener datos de etapa
  getStopoverDate(): string {
    const schedule = this.scheduleData();
    return this.formatDateForInput(schedule?.stopover?.date || null);
  }

  getStopoverFromTime(): string {
    const schedule = this.scheduleData();
    return schedule?.stopover?.fromTime || '';
  }

  getStopoverToTime(): string {
    const schedule = this.scheduleData();
    return schedule?.stopover?.toTime || '';
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

  // Validar parada (mínimo 2 horas = 120 minutos)
  isValidStopoverTimeRange(): boolean {
    const schedule = this.scheduleData();
    if (!schedule?.stopover) return false;
    
    const difference = this.calculateTimeDifference(
      schedule.stopover.fromTime,
      schedule.stopover.toTime
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

  // Abrir modal de direcciones de etapa
  openStopoverAddressModal() {
    const currentAddress = this.stopoverAddress();

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      data: {
        title: 'transports.create.stopover',
        component: AddressModalComponent,
        componentInputs: currentAddress ? {
          initialAddress: currentAddress
        } : {},
        showActions: false
      }
    });

    dialogRef.afterClosed().subscribe((result: AddressData | undefined) => {
      if (result) {
        this.stopoverAddress.set(result);
      }
    });
  }
}
