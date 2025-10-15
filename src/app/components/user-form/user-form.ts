import { Component, EventEmitter, Input, Output, signal, computed, ChangeDetectionStrategy, inject, OnInit, WritableSignal } from '@angular/core';
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
import { AdminDto } from '@dtos/admin.dto';
import { StoreService } from '@store/store.service';
import { UsersState } from '@store/users.state';
import { GlobalStore } from '@store/global';
import { AdminSignalsModel } from '@models/UsersSignalsModel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMultiTagComponent } from '@components/input-multi-tag/input-multi-tag.component';



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
    InputMultiTagComponent
],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss'],
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
  @Input({ required: true }) profile!: AdminSignalsModel; 
  Object = Object;
  @Input() departments: string[] = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];
  @Input() showPhotoSection = true;
  @Input() showPasswordField = true;
  @Input() showFooterButtons = true;
  @Input() isCreating = false;

  @Output() userDataChange = new EventEmitter<AdminDto>();
  @Output() save = new EventEmitter<AdminDto>();
  @Output() cancel = new EventEmitter<void>();
  @Output() photoChanged = new EventEmitter<string>();
  @Output() photoDeleted = new EventEmitter<string>();

  readonly rolesEnum = UserRole;
  readonly rolesAdmin = roleAdminDescriptions;

    
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
  }

  onCancel(): void {
    this.cancel.emit();
  }

  public updateUserData(updates: Partial<AdminDto>): void {
    const newData: AdminDto = { ...this.userState.adminProfile()!, ...updates } as AdminDto;
    this.userState.patch({ adminProfile: newData });
    this.userDataChange.emit(newData);
  }

}
