import { Component, signal, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm } from './user-form/user-form';
import { StoreService } from '@store/store.service';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';
import { AdminSignalsModel } from '@models/UsersSignalsModel';
import { AdminSignal } from '@entities/admins.entities';

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
export class Profile implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly userState = inject (UsersState);
  private readonly globalState = inject(GlobalStore);
  profile: AdminSignal = new AdminSignal();

  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];

  async ngOnInit() {
    let userId = this.globalState.user().user.id!;
    if (this.route.snapshot.paramMap.get('id')) {
      userId = Number(this.route.snapshot.paramMap.get('id'));
    }

       this.profile.copyFromDto( (await this.userState.getAdminProfile(userId!) as AdminSignal).toDto());
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
