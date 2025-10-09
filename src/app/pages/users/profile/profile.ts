import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm, UserFormData } from '@components/user-form/user-form';

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
  userData = signal<UserFormData>({
    name: 'John',
    lastname: 'Doe',
    email: 'john@doe.com',
    img: 'assets/images/sample_user_icon.png',
    password: 'password',
    roles: ['USER'],
    status: 'ACTIVE',
    departments: ['Comercial', 'Marketing']
  });

  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];

  onUserDataChange(userData: UserFormData): void {
    this.userData.set(userData);
  }

  onSave(userData: UserFormData): void {
    console.log('Guardando usuario:', userData);
    // Aquí implementarías la lógica de guardado
  }

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
