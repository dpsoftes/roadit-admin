import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm, UserFormData } from '@components/user-form/user-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [
    CommonModule,
    TranslatePipe,
    UserForm
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser {
  userData = signal<UserFormData>({
    name: 'Luis',
    lastname: 'Garcia',
    email: 'luis@gmail.com',
    img: 'assets/images/sample_user_icon.png',
    password: '123456',
    roles: ['ADMIN'],
    status: 'ACTIVE',
    departments: ['IT']
  });

  constructor(private router: Router) {}

  onUserDataChange(userData: UserFormData): void {
    this.userData.set(userData);
  }
  onSave(userData: UserFormData): void {
    console.log('Guardando usuario:', userData);
  }
  onCancel(): void {
    console.log('Cancelando cambios');
  }
  onPhotoChanged(photo: string): void {
    console.log('Foto cambiada:', photo);
  }
  onPhotoDeleted(photo: string): void {
    console.log('Foto eliminada:', photo);
  }

}
