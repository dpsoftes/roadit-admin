import { Component, inject, signal, ViewChild, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgComponentOutlet } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';

interface ModalData<T = any> {
  title?: string;
  content?: string;
  component?: any;
  componentInputs?: Partial<T>;
  confirmText?: string;
  cancelText?: string;
  showActions?: boolean;
  hideTitle?: boolean;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, NgComponentOutlet, TranslatePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent<T = any> {
  private dialogRef = inject(MatDialogRef<ModalComponent<T>>);
  private data = inject<ModalData<T>>(MAT_DIALOG_DATA);

  title = signal(this.data.title);
  content = signal(this.data.content);
  component = signal(this.data.component);
  componentInputs = signal(this.data.componentInputs);
  confirmText = signal(this.data.confirmText);
  cancelText = signal(this.data.cancelText);
  showActions = signal(this.data.showActions ?? true);
  hideTitle = signal(this.data.hideTitle ?? false);

  close(result?: any) {
    this.dialogRef.close(result);
  }

  onComponentEvent(event: any) {
    this.close(event);
  }

  onComponentCreated(component: any) {
    // Inicializar datos del componente si tiene componentInputs
    const inputs = this.componentInputs();
    if (component && inputs) {
      Object.keys(inputs).forEach((key: string) => {
        const value = (inputs as any)[key];
        // Intentar asignar el valor directamente si es un input signal
        if (component[key] !== undefined) {
          if (typeof component[key] === 'function') {
            // Si es un signal input, intentar asignarlo
            try {
              // Para signals inputs, Angular los maneja automáticamente con ngComponentOutletInputs
              // Pero si no funciona, intentamos asignarlo manualmente
              if ('set' in component[key] && typeof component[key].set === 'function') {
                component[key].set(value);
              } else {
                // Si es un input signal, Angular debería haberlo asignado ya
                // Pero verificamos si necesita actualización
                const currentValue = component[key]();
                if (currentValue !== value) {
                  // Intentar asignar directamente si es posible
                  component[key] = value;
                }
              }
            } catch (e) {
              // Si falla, intentar asignación directa
              try {
                component[key] = value;
              } catch (e2) {
                console.warn(`No se pudo asignar el input ${key} al componente`, e2);
              }
            }
          } else {
            // Si es una propiedad normal, asignarla
            component[key] = value;
          }
        }
      });
    }

    // Si el componente tiene un Subject save, suscribirse para cerrar el modal
    if (component && component.save && component.save.subscribe) {
      component.save.subscribe((result: any) => {
        this.close(result);
      });
    }
    
    // Si el componente tiene certificationChange, suscribirse
    if (component && component.certificationChange) {
      component.certificationChange.subscribe((event: any) => {
        if (event && event.type === 'save') {
          this.close(event.certification);
        }
      });
    }
  }
}