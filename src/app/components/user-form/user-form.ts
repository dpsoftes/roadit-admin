import { Component, EventEmitter, Input, Output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '@i18n/translate.pipe';
import { UserRole, UserStatus } from '@enums/user.enum';

export interface UserFormData {
  name: string;
  lastname: string;
  email: string;
  img: string;
  password: string;
  roles: string[];
  status: string;
  departments: string[];
}

@Component({
  selector: 'app-user-form',
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
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserForm {

  @Input() userData = signal<UserFormData>({
    name: '',
    lastname: '',
    email: '',
    img: 'assets/images/sample_user_icon.png',
    password: '',
    roles: [],
    status: 'ACTIVE',
    departments: []
  });

  @Input() departments: string[] = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];
  @Input() showPhotoSection = true;
  @Input() showPasswordField = true;
  @Input() showFooterButtons = true;
  @Input() isCreating = false;

  @Output() userDataChange = new EventEmitter<UserFormData>();
  @Output() save = new EventEmitter<UserFormData>();
  @Output() cancel = new EventEmitter<void>();
  @Output() photoChanged = new EventEmitter<string>();
  @Output() photoDeleted = new EventEmitter<string>();

  readonly rolesEnum = UserRole;
  readonly roles = computed(() => {
    return Object.values(UserRole).filter(v => typeof v === 'string') as string[];
  });

  readonly statusesEnum = UserStatus;
  readonly statuses = computed(() => {
    return Object.values(UserStatus).filter(v => typeof v === 'string') as string[];
  });

  showPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onRolesChange(selected: string[] | unknown): void {
    const roles = Array.isArray(selected) ? selected.filter(v => typeof v === 'string') as string[] : [];
    this.updateUserData({ roles });
  }

  onStatusChange(status: string | unknown): void {
    const newStatus = typeof status === 'string' ? status : 'ACTIVE';
    this.updateUserData({ status: newStatus });
  }

  onDepartmentsChange(selected: string[] | unknown): void {
    const departments = Array.isArray(selected) ? selected.filter(v => typeof v === 'string') as string[] : [];
    this.updateUserData({ departments });
  }

  onPhotoChanged(photo: string): void {
    this.updateUserData({ img: photo });
    this.photoChanged.emit(photo);
  }

  onPhotoDeleted(photo: string): void {
    this.updateUserData({ img: 'assets/images/sample_user_icon.png' });
    this.photoDeleted.emit(photo);
  }

  onSave(): void {
    this.save.emit(this.userData());
  }

  onCancel(): void {
    this.cancel.emit();
  }

  public updateUserData(updates: Partial<UserFormData>): void {
    const newData = { ...this.userData(), ...updates };
    this.userData.set(newData);
    this.userDataChange.emit(newData);
  }

}
