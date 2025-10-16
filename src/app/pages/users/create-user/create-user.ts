import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm} from '@components/user-form/user-form';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';
import { AdminSignalsModel } from '@models/UsersSignalsModel';

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
export class CreateUser  implements OnInit {

  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];
      private readonly userState = inject (UsersState);
  private readonly globalState = inject(GlobalStore);
  profile: AdminSignalsModel = new AdminSignalsModel();


/*   onUserDataChange(userData: UserFormData): void {
    this.userData.set(userData);
  }

  onSave(userData: UserFormData): void {
    console.log('Creando usuario:', userData);
  }


 */
   async ngOnInit() {
       this.profile =  await this.userState.getAdminProfile(this.globalState.user().user.id!) as AdminSignalsModel;
  }
  onCancel(): void {
    console.log('Cancelando creación');
  }

  onPhotoChanged(photo: string): void {
    console.log('Foto cambiada:', photo);
  }

  onPhotoDeleted(photo: string): void {
    console.log('Foto eliminada:', photo);
  }
}
