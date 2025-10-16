// input-multi-tag.component.ts
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'input-multi-tag', 
  templateUrl: './input-multi-tag.component.html',
  styleUrls: ['./input-multi-tag.component.scss']
})
export class InputMultiTagComponent implements OnInit {
  @Input() label: string = 'Etiquetas';
  @Input() value: string[] = [];
  @Output() valueChange = new EventEmitter<string[]>(); 

  @ViewChild('chipInput') inputRef!: ElementRef<HTMLInputElement>;
  
  isFocused: boolean = false;
  shouldLabelFloat: boolean = false; 
  inputValue: string = ''; 

  ngOnInit() {
    this.updateFloatingState();
  }

  onFocus() {
    this.isFocused = true;
    this.updateFloatingState();
  }

  // CORRECCIÓN: Añade chip al perder el foco (clic fuera) si hay texto
  onBlur(): void {
    this.isFocused = false;
    
    if (this.inputValue.trim().length > 0) {
      this.addChip();
    }
    
    this.updateFloatingState();
  }
  
  updateFloatingState() {
    const hasValue = this.value && this.value.length > 0;
    this.shouldLabelFloat = hasValue || this.isFocused; 
  }

  // Lógica principal para añadir chip
  addChip(): void {
    const value = this.inputValue.trim(); 
    
    if (value && this.value.indexOf(value) === -1) {
      const newValues = [...this.value, value]; 
      this.value = newValues; 
      this.valueChange.emit(newValues); 
    }

    this.inputValue = '';
    if (this.inputRef) {
       this.inputRef.nativeElement.value = ''; 
    }
    this.updateFloatingState();
  }
  
  // NUEVO: Maneja Enter y Tab para añadir el chip y previene el comportamiento por defecto
  handleKeydown(event: KeyboardEvent): void {
    // Si la tecla es Enter o Tab
    if (event.key === 'Enter' || event.key === 'Tab') {
      
      const value = this.inputValue.trim();

      // Si hay contenido escrito
      if (value.length > 0) {
        // Prevenir el comportamiento por defecto (salto de línea o cambio de foco)
        event.preventDefault(); 
        
        // Añadir el chip
        this.addChip();
      }
      // Si la tecla es Tab y no hay contenido, permitimos el comportamiento por defecto (cambio de foco).
    }
  }

  removeChip(chip: string): void {
    const index = this.value.indexOf(chip);

    if (index >= 0) {
      const newValues = this.value.filter(c => c !== chip);
      this.value = newValues;
      this.valueChange.emit(newValues); 
    }
    this.updateFloatingState();
    
    if (this.inputRef) {
      this.inputRef.nativeElement.focus();
    }
  }
}