import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm } from '@components/user-form/user-form';
import { StoreService } from '@store/store.service';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    TranslatePipe,
    UserForm
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile {
  



  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];


  onCancel(): void {
    console.log('Cancelando cambios');
    // Aquí implementarías la lógica de cancelación
  }

  onPhotoChanged(photo: string): void {
    console.log('Foto cambiada:', photo);
  }

  onPhotoDeleted(photo: string): void {
    console.log('Foto eliminada:', photo);
  }
}
