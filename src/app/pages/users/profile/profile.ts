import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    TranslatePipe
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile {
  user = signal({
    name: 'John',
    lastname: 'Doe',
    email: 'john@doe.com',
    img: 'assets/images/sample_user_icon.png',
    password: 'password',
    roles: ['USER'],
    status: 'ACTIVE',
    departments: ['Comercial', 'Marketing']
  });

  readonly rolesEnum = UserRole;
  readonly roles = computed(() => {
    return Object.values(UserRole).filter(v => typeof v === 'string') as string[];
  })

  statusesEnum = UserStatus;
  readonly statuses = computed(() => {
    return Object.values(UserStatus).filter(v => typeof v === 'string') as string[];
  });

  departments = ['Comercial', 'Marketing', 'Producción', 'Diseño', 'IT', 'RRHH'];

  showPassword = signal(false);

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onRolesChange(selected: string[] | unknown): void {
    const roles = Array.isArray(selected) ? selected.filter(v => typeof v === 'string') as string[] : [];
    this.user.update(u => ({ ...u, roles }));
  }

  onStatusChange(status: string | unknown): void {
    const newStatus = typeof status === 'string' ? status : 'Inactive';
    this.user.update(u => ({ ...u, status: newStatus }));
  }

  onDepartmentsChange(selected: string[] | unknown): void {
    const departments = Array.isArray(selected) ? selected.filter(v => typeof v === 'string') as string[] : [];
    this.user.update(u => ({ ...u, departments }));
  }

}
