import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@components/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dialog: MatDialog) {}

  open<T = any>(config: {
    title?: string;
    content?: string;
    component?: any;
    componentInputs?: Partial<T>;
    confirmText?: string;
    cancelText?: string;
    showActions?: boolean;
    width?: string;
  }) {
    return this.dialog.open(ModalComponent, {
      width: config.width ?? '400px',
      data: config,
    });
  }
}