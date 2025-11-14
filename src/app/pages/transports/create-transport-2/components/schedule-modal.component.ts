import { Component, signal, input, effect, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { MatDialogRef } from '@angular/material/dialog';

export interface ScheduleData {
  departure: {
    date: Date | null;
    fromTime: string;
    toTime: string;
  };
  stopover?: {
    date: Date | null;
    fromTime: string;
    toTime: string;
  };
  arrival: {
    date: Date | null;
    fromTime: string;
    toTime: string;
  };
}

@Component({
  selector: 'app-schedule-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatCalendar,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    MatCardModule,
    ButtonsComponent
  ],
  templateUrl: './schedule-modal.component.html',
  styleUrl: './schedule-modal.component.scss'
})
export class ScheduleModalComponent {
  private dialogRef = inject(MatDialogRef<ScheduleModalComponent>);
  
  // El componente recibe datos a través de inputs del ModalComponent
  initialData = input<ScheduleData | null>(null);

  // Datos de salida
  departureDate = signal<Date | null>(null);
  departureFromTime = signal<string>('08:00');
  departureToTime = signal<string>('10:00');

  // Datos de etapa (opcional)
  stopoverDate = signal<Date | null>(null);
  stopoverFromTime = signal<string>('08:00');
  stopoverToTime = signal<string>('10:00');
  
  // Datos de llegada
  arrivalDate = signal<Date | null>(null);
  arrivalFromTime = signal<string>('08:00');
  arrivalToTime = signal<string>('10:00');
  
  // Verificar si hay etapa
  hasStopover = computed(() => {
    const data = this.initialData();
    return data?.stopover !== undefined;
  });

  // Validar si ambas fechas están seleccionadas
  isValidToSave = computed(() => {
    const hasStopover = this.hasStopover();
    if (hasStopover) {
      return this.departureDate() !== null && this.stopoverDate() !== null && this.arrivalDate() !== null;
    }
    return this.departureDate() !== null && this.arrivalDate() !== null;
  });

  // Mensaje de error si faltan fechas
  showDateError = signal<boolean>(false);

  constructor() {
    // Efecto para inicializar datos cuando cambian los inputs
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.departureDate.set(data.departure.date);
        this.departureFromTime.set(data.departure.fromTime);
        this.departureToTime.set(data.departure.toTime);
        if (data.stopover) {
          this.stopoverDate.set(data.stopover.date);
          this.stopoverFromTime.set(data.stopover.fromTime);
          this.stopoverToTime.set(data.stopover.toTime);
        }
        this.arrivalDate.set(data.arrival.date);
        this.arrivalFromTime.set(data.arrival.fromTime);
        this.arrivalToTime.set(data.arrival.toTime);
      }
    });
    
    // También inicializar directamente si ya hay datos
    const initialData = this.initialData();
    if (initialData) {
      this.departureDate.set(initialData.departure.date);
      this.departureFromTime.set(initialData.departure.fromTime);
      this.departureToTime.set(initialData.departure.toTime);
      if (initialData.stopover) {
        this.stopoverDate.set(initialData.stopover.date);
        this.stopoverFromTime.set(initialData.stopover.fromTime);
        this.stopoverToTime.set(initialData.stopover.toTime);
      }
      this.arrivalDate.set(initialData.arrival.date);
      this.arrivalFromTime.set(initialData.arrival.fromTime);
      this.arrivalToTime.set(initialData.arrival.toTime);
    }
  }

  onSave() {
    // Validar que todas las fechas estén seleccionadas
    if (!this.isValidToSave()) {
      this.showDateError.set(true);
      return;
    }

    this.showDateError.set(false);

    const scheduleData: ScheduleData = {
      departure: {
        date: this.departureDate(),
        fromTime: this.departureFromTime(),
        toTime: this.departureToTime()
      },
      ...(this.hasStopover() ? {
        stopover: {
          date: this.stopoverDate(),
          fromTime: this.stopoverFromTime(),
          toTime: this.stopoverToTime()
        }
      } : {}),
      arrival: {
        date: this.arrivalDate(),
        fromTime: this.arrivalFromTime(),
        toTime: this.arrivalToTime()
      }
    };

    this.dialogRef.close(scheduleData);
  }

  onDepartureFromTimeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.departureFromTime.set(target.value);
  }

  onDepartureToTimeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.departureToTime.set(target.value);
  }

  onArrivalFromTimeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.arrivalFromTime.set(target.value);
  }

  onArrivalToTimeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.arrivalToTime.set(target.value);
  }

  onDepartureDateChange(date: Date | null) {
    this.departureDate.set(date);
    // Ocultar error si se selecciona la fecha
    if (date !== null && this.arrivalDate() !== null) {
      this.showDateError.set(false);
    }
  }

  onArrivalDateChange(date: Date | null) {
    this.arrivalDate.set(date);
    // Ocultar error si se seleccionan todas las fechas necesarias
    const hasStopover = this.hasStopover();
    if (hasStopover) {
      if (date !== null && this.departureDate() !== null && this.stopoverDate() !== null) {
        this.showDateError.set(false);
      }
    } else {
      if (date !== null && this.departureDate() !== null) {
        this.showDateError.set(false);
      }
    }
  }

  onStopoverDateChange(date: Date | null) {
    this.stopoverDate.set(date);
    if (date !== null && this.departureDate() !== null && this.arrivalDate() !== null) {
      this.showDateError.set(false);
    }
  }

  onStopoverFromTimeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.stopoverFromTime.set(target.value);
  }

  onStopoverToTimeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.stopoverToTime.set(target.value);
  }

  onClose() {
    this.dialogRef.close();
  }
}

