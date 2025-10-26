import { Component, signal, ChangeDetectionStrategy, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserForm } from './user-form/user-form';
import { StoreService } from '@store/store.service';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';
import { AdminSignalsModel } from '@models/UsersSignalsModel';
import { AdminSignal } from '@entities/admins.entities';
import { Helpers } from '@utils/helpers';
import { AdminProvider } from '@providers';
import { User } from '@dtos/user.dto';
import { LoginRequestDto, LoginResponseDto } from '@dtos/auth.dto';

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
  private readonly router = inject(Router);
  private readonly userState = inject (UsersState);
  private readonly globalState = inject(GlobalStore);
  private readonly adminProvider = inject(AdminProvider);
  profile: AdminSignal = new AdminSignal();
  isProfile = computed(() => {
    const currentUserId = this.globalState.user().user.id;
    return this.profile.id() === currentUserId;
  });
  isCreating = computed(() => !this.profile.id());
  titlLabel = computed(() => this.isCreating() ? 'users.create-user' : 'users.edit-user');
  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];

  async ngOnInit() {
    let userId = this.globalState.user().user.id!;
    if (this.route.snapshot.paramMap.get('id')) {
      userId = Number(this.route.snapshot.paramMap.get('id'));
    }
    
    if(this.route.snapshot.url[0].path.includes('new')){
        this.profile.copyFromDto(new AdminSignal().toDto());
        return;
    }
    const user = await this.userState.getAdminProfile(userId) as AdminSignal;
       this.profile.copyFromDto( (user).toDto());
  }

  onCancel(): void {
    this.router.navigate(['/users']);
    
    // Aquí implementarías la lógica de cancelación
  }
  async onSave() {

    // Nuevo método onSave con lógica de patch
    const errors = this.validateProfile();
    if (errors.length > 0) {
      Helpers.Instance.showToast(errors.join('\n'), 'ERROR');
      return;
    }
//    if (!this.isCreating()) {

      const patchDto = this.profile.toPatch();
      const id = this.profile.id();
      const result = !this.isCreating() ? await this.adminProvider.updateAdmin(id, patchDto) : await this.adminProvider.createAdmin(patchDto);
      if (result) {
        Helpers.Instance.showToast('Usuario actualizado correctamente', 'OK');
        if(this.isProfile()){
          // Si es el propio usuario, actualizar el GlobalStore

          const currentUser = this.globalState.user().user ;
          this.globalState.user().user.image = Helpers.toSrc(result.image!);

          this.globalState.setUser(this.globalState.user());
          
         
        }

        this.router.navigate(['/users']);
        
      } else {
        Helpers.Instance.showToast('Error al actualizar usuario', 'ERROR');
      }
  //  }
  }
   validateProfile(): string[] {
    const errors: string[] = [];
    const p = this.profile;
    if (!p.name()) errors.push('El nombre es obligatorio');
    if (!p.last_name()) errors.push('El apellido es obligatorio');
    if (!p.email() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(p.email())) errors.push('Email inválido');
    if (!p.image()) errors.push('La imagen es obligatoria');
    if (!p.roles() || p.roles().length === 0) errors.push('Debe seleccionar al menos un rol');
    if (typeof p.is_active() !== 'boolean') errors.push('Debe seleccionar el estado');
    // No se valida departamentos ni teléfono ni username
    return errors;
  }
  onPhotoChanged(photo: string): void {
    console.log('Foto cambiada:', photo);
  }

  onPhotoDeleted(photo: string): void {
    console.log('Foto eliminada:', photo);
  }
}
