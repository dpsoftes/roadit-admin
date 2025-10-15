import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm} from '@components/user-form/user-form';
import { Router } from '@angular/router';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';
import { AdminSignalsModel } from '@models/UsersSignalsModel';

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
export class EditUser implements OnInit{


  constructor(private router: Router)  {}

    private readonly userState = inject (UsersState);
  private readonly globalState = inject(GlobalStore);
  profile: AdminSignalsModel = new AdminSignalsModel();

/*   onUserDataChange(userData: UserFormData): void {
    this.userData.set(userData);
  }
  onSave(userData: UserFormData): void {
    console.log('Guardando usuario:', userData);
  } */
   async ngOnInit() {
       this.profile =  await this.userState.getAdminProfile(this.globalState.user().user.id!) as AdminSignalsModel;
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
