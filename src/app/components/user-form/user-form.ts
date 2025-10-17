import { Component, signal, computed, ChangeDetectionStrategy, inject, OnInit, WritableSignal, input, output } from '@angular/core';
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
// import { AdminDto } from '@dtos/admin.dto'; // Temporalmente comentado
import { StoreService } from '@store/store.service';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';
import { AdminSignalsModel } from '@models/UsersSignalsModel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    FormsModule
],
  templateUrl: './user-form.html',
  // styleUrls: ['./user-form.scss'], // Archivo no existe temporalmente
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserForm implements OnInit {
removeDepartment(_t77: string) {
throw new Error('Method not implemented.');
}
selectDepartment($event: MatAutocompleteSelectedEvent) {
throw new Error('Method not implemented.');
}
addDepartment($event: MatChipInputEvent) {
throw new Error('Method not implemented.');
}

  private readonly globalState = inject(GlobalStore);
  private readonly userState = inject (UsersState);
  
  profile = input.required<AdminSignalsModel>();
  departments = input<string[]>(['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH']);
  showPhotoSection = input<boolean>(true);
  showPasswordField = input<boolean>(true);
  showFooterButtons = input<boolean>(true);
  isCreating = input<boolean>(false);

  userDataChange = output<any>();
  save = output<any>();
  cancel = output<void>();
  photoChanged = output<string>();
  photoDeleted = output<string>();

  Object = Object;

  readonly rolesEnum = UserRole;
  readonly rolesAdmin = roleAdminDescriptions;

    
  readonly userRolesDescriptions: Record<string, string> =
  this.globalState.user().user.role === UserRole.ADMIN
    ? roleAdminDescriptions
    : userStatusDescriptions;



  showPassword = signal(false);
  password = signal<string>('');
  async ngOnInit() {
  //  this.profile =  await this.userState.getAdminProfile(StoreService.instance?.global.user()?.user.id!) as AdminSignalsModel;
  }


  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onRolesChange(selected: string[] | unknown): void {
    const roles = Array.isArray(selected) ? selected.filter(v => typeof v === 'string') as string[] : [];
//    this.updateUserData({ roles });
  }



  onDepartmentsChange(selected: string[] | unknown): void {
    const departments = Array.isArray(selected) ? selected.filter(v => typeof v === 'string') as string[] : [];
    this.updateUserData({ departments });
  }

  onPhotoChanged(photo: string): void {
    this.updateUserData({ image: photo });
    this.photoChanged.emit(photo);
  }

  onPhotoDeleted(photo: string): void {
    this.updateUserData({ image: 'assets/images/sample_user_icon.png' });
    this.photoDeleted.emit(photo);
  }

  onSave(): void {
    this.userState.patch({ adminProfile: this.userState.adminProfile() });
    this.save.emit(this.userState.adminProfile()!);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  public updateUserData(updates: Partial<any>): void {
    const newData: any = { ...this.userState.adminProfile()!, ...updates };
    this.userState.patch({ adminProfile: newData });
    this.userDataChange.emit(newData);
  }

}
