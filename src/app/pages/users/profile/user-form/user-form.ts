 
import { Component, EventEmitter, Input, Output, signal, computed, ChangeDetectionStrategy, inject, OnInit, WritableSignal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '@i18n/translate.pipe';
import { roleAdminDescriptions, UserRole, UserStatus,  userStatusDescriptions } from '@enums/user.enum';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMultiTagComponent } from '@components/input-multi-tag/input-multi-tag.component';
import { ImageDropComponent } from '@components/index';
import { AdminSignal } from '@entities/admins.entities';
import { Helpers } from '@utils/helpers';
import { AdminProvider } from '@providers';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    TranslatePipe,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    InputMultiTagComponent, 
    ImageDropComponent
    
    
],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserForm implements OnInit {
  private readonly adminProvider = inject(AdminProvider);
  // ...existing code...

  private readonly globalState = inject(GlobalStore);
  private readonly userState = inject (UsersState);
  profile = input.required<AdminSignal>(); 
  departments = input<string[]>(['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH']);
  showPhotoSection =  input<boolean>(true);
  showPasswordField = input<boolean>(true);
  showFooterButtons = input<boolean>(true);
  isCreating = computed(() => !this.profile().id());
  cancel = output<void>();
  photoDeleted = output<string>();
  Object = Object;
  readonly userRolesDescriptions: Record<string, string> =
    this.globalState.user().user.role === UserRole.ADMIN
      ? roleAdminDescriptions
      : userStatusDescriptions;



  showPassword = signal(false);
  async ngOnInit() {
  //  this.profile =  await this.userState.getAdminProfile(StoreService.instance?.global.user()?.user.id!) as AdminSignalsModel;
  }


  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  // ...existing code...

  onPhotoDeleted(photo: string): void {
  //  this.updateUserData({ image: 'assets/images/sample_user_icon.png' });
  this.profile().image.set(new File([''], ''));
//    this.photoDeleted.emit(photo);
  }

  async onSave() {

    // Nuevo método onSave con lógica de patch
    const errors = this.validateProfile();
    if (errors.length > 0) {
      Helpers.Instance.showToast(errors.join('\n'), 'ERROR');
      return;
    }
    if (!this.isCreating()) {
      // PATCH: actualizar usuario existente
      const patchDto = this.profile().toPatch();
      const id = this.profile().id();
      const result = await this.adminProvider.updateAdmin(id, patchDto);
      if (result) {
        Helpers.Instance.showToast('Usuario actualizado correctamente', 'OK');
        // Actualiza el store si es necesario
      } else {
        Helpers.Instance.showToast('Error al actualizar usuario', 'ERROR');
      }
    }
    // ...código para crear si es necesario
  }

  onCancel(): void {
    this.cancel.emit();
  }

  public updateUserData(updates: Partial<AdminSignal>): void {
    // Actualiza los signals de profile con los datos proporcionados
    const profile = this.profile();
    Object.keys(updates).forEach((key) => {
      if (key in profile && typeof (profile as any)[key].set === 'function') {
        (profile as any)[key].set((updates as any)[key]);
      }
    });
  }
  // Actualiza el campo de profile al salir del input
  onFieldBlur(field: keyof AdminSignal, value: string) {
    const profile = this.profile();
    if (field in profile && typeof (profile as any)[field].set === 'function') {
      (profile as any)[field].set(value);
    }
  }
  // Validación de campos obligatorios excepto departamento
  validateProfile(): string[] {
  const errors: string[] = [];
  const p = this.profile();
  if (!p.name()) errors.push('El nombre es obligatorio');
  if (!p.last_name()) errors.push('El apellido es obligatorio');
  if (!p.email() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(p.email())) errors.push('Email inválido');
  if (!p.image()) errors.push('La imagen es obligatoria');
  if (!p.roles() || p.roles().length === 0) errors.push('Debe seleccionar al menos un rol');
  if (typeof p.is_active() !== 'boolean') errors.push('Debe seleccionar el estado');
  // No se valida departamentos ni teléfono ni username
  return errors;
  }
  onImageAccepted(event: { base64: string, file: File }) {
    this.profile().image.set(event.file);
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const allowed = ["JPG", "JPEG", "GIF", "PNG"];
    const maxKb = 800;
    const result = await Helpers.validateAndReadFile(file, allowed, maxKb);
    if (!result.valid) {
      Helpers.Instance.showToast(result.error || 'Archivo no válido', 'ERROR');
      // Aquí podrías mostrar un snackbar, toast, etc.
      return;
    }
    this.profile().image.set(file);
  }
 


}
