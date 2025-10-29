
import { Component, ElementRef, EventEmitter, Output, ViewChild, input, output } from '@angular/core';
import { Helpers } from '@utils/helpers';
import { environment } from 'src/environments/environment';
import { TranslatePipe } from "../../core/i18n/translate.pipe";

@Component({
  selector: 'image-drop',
  standalone: true,
  template: `
    <div
      class="image-dropzone"
      [style.width]="width() || '100%'"
      [style.height]="height() || 'auto'"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
      (click)="clickHendle()"
  [class.has-image]="!!imageUrl"
    >
      <input type="file" accept=".jpg,.jpeg,.png,.gif" style="display:none" #fileInput (change)="onFileSelected($event)">
        @if (!isEmptyImage) {
          @if(showLink()){
          <a [href]="imageUrl" target="_blank">View Image</a>
          }@else {
          <img [src]="imageUrl"
               [style.maxWidth]="width() || '100%'"
               [style.maxHeight]="height() || '100%'"
               [style.width]="width() || null"
               [style.height]="height() || null"
               style="object-fit:contain; display:block; margin:auto;" />
          }
          @if(canDelete()){
          <div class="image-error" (click)="$event.stopPropagation(); imageAccepted.emit({ base64: '', file: null! });" style="cursor:pointer;">
            &times; {{'dropFile.deleteFile' | translate}}
          </div>
          }
        } @else {
          <div class="placeholder"
               [style.width]="width() || '100%'"
               [style.height]="height() || 'auto'"
               style="display: flex; align-items: center; justify-content: center; text-align: center;">
            {{text() | translate  }}
          </div>
        }
    </div>
  `,

  styles: [`
    .image-dropzone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      background: #fafafa;
      box-sizing: border-box;
      display: grid;
      place-items: center;
    }
    .image-dropzone.has-image {
      border: none;
    }
    .image-dropzone img {
      object-fit: contain;
      display: block;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
    .placeholder {
      color: #888;
      text-align: center;
      font-size: 14px;
    }
    .image-error {
      color: #c00;
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: #fff8f8;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
    }
  `],
  imports: [TranslatePipe]
})
export class ImageDropComponent {
  width = input<string | undefined>();
  height = input<string | undefined>();
  formats = input<string[]>();
  maxWeight = input<number>(); // en KB
  src = input<string | File | null>();
  imageAccepted  = output<{ base64: string, file: File }>();
  text = input<string>("dropFile.dropImage");
  showLink = input<boolean>(false);
  canDelete = input<boolean>(false);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  clickHendle = () => {
    if(!this.isEmptyImage && this.showLink() && this.canDelete()){
      return;
    }
    this.fileInput.nativeElement.click();
  }


  /**
   * Propiedad computada para mostrar la imagen correctamente
   * Si src es string (URL o dataURL), la muestra; si es File, la convierte a blob URL
   * Si es string base64 tipo fichero, la convierte a blob URL
   */
  get imageUrl(): string {
    const value = this.src();
    if (!value) return '';
    if (typeof value === 'string') {
      if (value.startsWith('http') || value.startsWith('data:') || value.startsWith('blob:')) {
        return value;
      }
      // Si es un string base64 tipo fichero (data:image/...), convertir a blob URL
      try {
        if (/^data:.*;base64,/.test(value)) {
          const arr = value.split(',');
          const mime = arr[0].match(/:(.*?);/)?.[1] || '';
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          return URL.createObjectURL(blob);
        }
      } catch {}
      // Si no es file, blob ni http, anteponer apiUrl
      return environment.apiUrl + value;
    }
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return '';
  }
  // Fin de la clase
  imageError: string = '';
  /**
   * Devuelve true si la imagen está vacía (string vacío, null, undefined o File vacío)
   */
  get isEmptyImage(): boolean {
    const value = this.src();
    if (!value) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (value instanceof File) return !value.name && value.size === 0;
    return false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.dataTransfer || event.dataTransfer.files.length === 0) return;
    const file = event.dataTransfer.files[0];
    await this.handleFile(file);
  }

  async onFileSelected(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.files || inputEl.files.length === 0) return;
    const file = inputEl.files[0];
  await this.handleFile(file);
  }

  private async handleFile(file: File) {
    const formatsValue = this.formats();
    const formats = Array.isArray(formatsValue) && formatsValue.length > 0 ? formatsValue : ["JPG", "JPEG", "GIF", "PNG"];
    const maxWeightValue = this.maxWeight();
    const maxWeight = typeof maxWeightValue === 'number' ? maxWeightValue : 800;
    const result = await Helpers.validateAndReadFile(file, formats, maxWeight);
    if (!result.valid) {
      Helpers.Instance.showToast(result.error || 'Archivo no válido', 'ERROR');
      //this.imageError = result.error || 'Archivo no válido';
      return;
    }
  this.imageError = '';
  const base64 = 'data:image/' + file.name.split('.').pop()?.toLowerCase() + ';base64,' + result.base64;
  this.imageAccepted.emit({ base64, file });
  }
}
