import { Component, input } from '@angular/core';

@Component({
  selector: 'dp-dynamic-table-column.component',
  imports: [],
  templateUrl: './dp-dynamic-table-column.component.html',
  styleUrl: './dp-dynamic-table-column.component.scss'
})
export class DynamicTableColumnComponent {
    key  = input.required<string>();
    label = input<string>();
    type = input< 'text' | 'image' | 'chip' | 'chip-array' | 'actions' | 'checkbox'>();
    sortable?: boolean;
    width = input<string|number>(); // Porcentaje (ej: '25%', 25) o valor fijo (ej: '200px', 200)
    minWidth = input<string|number>();
    maxWidth = input<string|number>();
    flex = input<string|number>(); // Para distribución proporcional del espacio restante
    chipType= input<'role' | 'status' | 'department' | 'custom' | 'tags'>();
    chipCustomClass= input<string>();
    chipTranslateKey= input<string>();
    actionIcon = input<string>();
    actionLabel = input<string>()
    action = input<string>()
    actionColor = input<'primary' | 'accent' | 'warn' | 'error'>();
    actionHandle = input<(row: any) => void>();
    actionCondition = input<(row: any) => boolean>();
    imageWith = input<string>();
    imageHeight = input<string>();
    imageAlt = input<string>();
    imageFallback = input<string>();
    

 getCellValue(row: any): any {
    return this.getNestedValue(row);
  }

  private getNestedValue(obj: any): any {
    if (typeof this.key() !== 'string') {
      return obj[this.key()];
    }
    return this.key().split('.').reduce((current, key) => current?.[key], obj);
  }

  getChipClass(value: any): string {
    if(!this.chipType()) {
      return `chip ${value?.toString().toLowerCase()}`;
    }  
    if (this.chipType() === 'custom' && this.chipCustomClass()) {
      return this.chipCustomClass()!;
    }
    if (this.chipType() === 'tags') {
      return `tags-chip ${value?.toString().toLowerCase()}`;
    }
    if (this.chipType()) {
      return `${this.chipType()}-chip ${value?.toString().toLowerCase()}`;
    }
    if (value === 'nuevo' || value === 'en_riesgo' || value === 'seguro_propio') {
      return `tag-${value?.toString().toLowerCase()}`;
    }
    return `chip ${value?.toString().toLowerCase()}`;
  }

  getChipText(value: any): string {
    const tagLabels: { [key: string]: string } = {
      'nuevo': 'Nuevo',
      'en_riesgo': 'En Riesgo',
      'seguro_propio': 'Seguro Propio'
    };
    if(!this.chipTranslateKey() ){
      return tagLabels[value] || value;
    }
    if (this.chipTranslateKey()) {
      return `${this.chipTranslateKey()}.${value}`;
    }
    return tagLabels[value] || value;
  }
getColumnStyles(): string {
    const styles: string[] = [];
    
    if (this.width() || this.minWidth() || this.maxWidth() || this.flex()) {
      if (this.width()) {
        let width: string;
        if (typeof this.width() === 'number') {
          width = `${this.width()}%`;
        } else {
          width = this.width() as string;
        }
        styles.push(`width: ${width}`);
      }
      
      if (this.minWidth()) {
        const minWidth = typeof this.minWidth() === 'number' ? `${this.minWidth()}px` : this.minWidth();
        styles.push(`min-width: ${minWidth}`);
      }

      if (this.maxWidth()) {
        const maxWidth = typeof this.maxWidth() === 'number' ? `${this.maxWidth()}px` : this.maxWidth();
        styles.push(`max-width: ${maxWidth}`);
      }
      
      if (this.flex()) {
        const flex = typeof this.flex() === 'number' ? this.flex()!.toString() : this.flex();
        styles.push(`flex: ${flex}`);
      }
      
      return styles.join('; ');
    }
    
    return '';
  }

  getCellClass(): string {
    const classes: string[] = [];
    
    switch (this.type()) {
      case 'text':
        classes.push('text-cell');
        break;
      case 'actions':
        classes.push('actions-cell');
        break;
      case 'chip':
      case 'chip-array':
        classes.push('chip-cell');
        break;
    }
    
    return classes.join(' ');
  }


}
