import { Component, inject, signal, ViewChild, TemplateRef } from '@angular/core';
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

  close(result?: any) {
    this.dialogRef.close(result);
  }

  onComponentEvent(event: any) {
    this.close(event);
  }

  onComponentCreated(component: any) {
    if (component && component.save) {
      component.save.subscribe((result: any) => {
        this.close(result);
      });
    }
    
    if (component && component.certificationChange) {
      component.certificationChange.subscribe((event: any) => {
        if (event && event.type === 'save') {
          this.close(event.certification);
        }
      });
    }
  }
}