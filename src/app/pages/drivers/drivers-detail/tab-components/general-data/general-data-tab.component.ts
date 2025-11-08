import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-general-data-tab',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './general-data-tab.component.html',
  styleUrls: ['./general-data-tab.component.scss']
})
export class GeneralDataTabComponent {
  driverData = input<any>(null);
  saveDriver = output<any>();

  selectedFile = signal<File | null>(null);
  imagePreview = signal<SafeUrl | null>(null);
  countries = signal<Country[]>([
    { code: 'ES', name: 'España' },
    { code: 'FR', name: 'Francia' },
    { code: 'DE', name: 'Alemania' },
    { code: 'IT', name: 'Italia' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GB', name: 'Reino Unido' },
    { code: 'US', name: 'Estados Unidos' }
  ]);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      //VALIDAR TIPO DE ARCHIVO
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, WEBP).');
        return;
      }

      //VALIDAR TAMAÑO (MAX 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
        return;
      }

      this.selectedFile.set(file);

      //CREAR PREVIEW
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.selectedFile.set(null);
    this.imagePreview.set(null);

    //RESETEAR INPUT FILE
    const fileInput = document.getElementById('photoUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSaveChanges(): void {
    console.log('Guardar cambios');
    //AQUÍ SE IMPLEMENTARÁ LA LÓGICA DE GUARDADO
  }
}
