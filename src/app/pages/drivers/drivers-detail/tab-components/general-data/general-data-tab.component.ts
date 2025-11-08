import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ISO_COUNTRIES } from '@dtos/country-langs.dto';
import { InputMultiTagComponent } from '@components/input-multi-tag/input-multi-tag.component';

@Component({
  selector: 'app-general-data-tab',
  standalone: true,
  imports: [CommonModule, TranslatePipe, InputMultiTagComponent],
  templateUrl: './general-data-tab.component.html',
  styleUrls: ['./general-data-tab.component.scss']
})
export class GeneralDataTabComponent {
  driverData = input<any>(null);
  saveDriver = output<any>();

  selectedFile = signal<File | null>(null);
  imagePreview = signal<SafeUrl | null>(null);

  //TAGS SELECCIONADAS (ARRAY DE IDs)
  selectedTagIds = signal<number[]>([]);

  //LISTA DE PAÍSES USANDO ISO_COUNTRIES
  countries = signal(
    Object.entries(ISO_COUNTRIES)
      .map(([code, data]) => ({
        code,
        name: data.description
      }))
      .sort((a, b) => {
        //PRIORIZAR ESPAÑA PRIMERO
        if (a.code === 'ES') return -1;
        if (b.code === 'ES') return 1;
        //LUEGO ORDENAR ALFABÉTICAMENTE
        return a.name.localeCompare(b.name);
      })
  );

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      //VALIDAR TIPO DE ARCHIVO
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
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

  onlyNumAndSymnbolInput(event: any) {
    const regex = /[^0-9!@#$%^&*()_\-+=.,/\\]/g;
    event.target.value = event.target.value.replace(regex, '');
  }

  //MANEJAR CAMBIOS EN LAS TAGS SELECCIONADAS
  onTagsChange(tagIds: number[]): void {
    console.log('🔄 onTagsChange llamado con:', tagIds);
    console.log('📊 Valor anterior:', this.selectedTagIds());
    this.selectedTagIds.set(tagIds);
    console.log('✅ Valor actualizado:', this.selectedTagIds());
  }

  onSaveChanges(): void {
    console.log('Guardar cambios');
    console.log('Tags a guardar:', this.selectedTagIds());
  }
}
