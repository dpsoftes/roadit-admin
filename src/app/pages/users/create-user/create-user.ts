import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm} from '@components/user-form/user-form';

@Component({
  selector: 'app-create-user',
  imports: [
    CommonModule,
    TranslatePipe,
    UserForm
  ],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss'
})
export class CreateUser {

  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];

/*   onUserDataChange(userData: UserFormData): void {
    this.userData.set(userData);
  }

  onSave(userData: UserFormData): void {
    console.log('Creando usuario:', userData);
  }

 */  onCancel(): void {
    console.log('Cancelando creación');
  }

  onPhotoChanged(photo: string): void {
    console.log('Foto cambiada:', photo);
  }

  onPhotoDeleted(photo: string): void {
    console.log('Foto eliminada:', photo);
  }
}
