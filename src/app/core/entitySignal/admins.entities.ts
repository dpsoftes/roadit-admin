import { signal, Signal } from '@angular/core';
import { AdminRequestDto, AdminRequestPatchedDto, AdminDto, AdminSummaryDto } from '../dtos/admins.dto';

// EntitySignal para AdminDto
export class AdminSignal {
  id = signal<number>(0);
  username = signal<string>('');
  email = signal<string>('');
  phone = signal<string>('');
  name = signal<string>('');
  last_name = signal<string>('');
  image = signal<File>(new File([''], ''));
  is_active = signal<boolean>(false);
  roles = signal<string[]>([]);
  departments = signal<string[]>([]);

  static fromDto(dto: AdminDto): AdminSignal {
    const entity = new AdminSignal();
    entity.id.set(dto.id);
    entity.username.set(dto.username);
    entity.email.set(dto.email);
  entity.phone.set(dto.phone ?? '');
  entity.name.set(dto.name ?? '');
  entity.last_name.set(dto.last_name ?? '');
  entity.image.set(dto.image!?? new File([''], ''));
  entity.is_active.set(dto.is_active ?? false);
  entity.roles.set(dto.roles ?? []);
  entity.departments.set(dto.departments ?? []);
    return entity;
  }

  toDto(): AdminDto {
    return {
      id: this.id(),
      username: this.username(),
      email: this.email(),
  phone: this.phone(),
  name: this.name(),
  last_name: this.last_name(),
  image: this.image(),
  is_active: this.is_active(),
  roles: this.roles(),
  departments: this.departments(),
    };
  }

  copyFromDto(dto: AdminDto): void {
    this.id.set(dto.id);
    this.username.set(dto.username);
    this.email.set(dto.email);
    this.phone.set(dto.phone ?? '');
    this.name.set(dto.name ?? '');
    this.last_name.set(dto.last_name ?? '');
    this.image.set(dto.image ?? new File([''], ''));
    this.is_active.set(dto.is_active ?? false);
    this.roles.set(dto.roles ?? []);
    this.departments.set(dto.departments ?? []);
  }

  toPatch<T>(): Partial<T> {
    const defaults = new AdminSignal();
    const patch: Partial<T> = {};
    if ((this.username() as any) !== (defaults.username() as any)) (patch as any).username = this.username();
    if ((this.email() as any) !== (defaults.email() as any)) (patch as any).email = this.email();
    if ((this.phone() as any) !== (defaults.phone() as any)) (patch as any).phone = this.phone();
    if ((this.name() as any) !== (defaults.name() as any)) (patch as any).name = this.name();
    if ((this.last_name() as any) !== (defaults.last_name() as any)) (patch as any).last_name = this.last_name();
    if ((this.image() as any) !== (defaults.image() as any)) (patch as any).image = this.image();
    if ((this.is_active() as any) !== (defaults.is_active() as any)) (patch as any).is_active = this.is_active();
    if (JSON.stringify(this.roles()) !== JSON.stringify(defaults.roles())) (patch as any).roles = this.roles();
    if (JSON.stringify(this.departments()) !== JSON.stringify(defaults.departments())) (patch as any).departments = this.departments();
    return patch;
  }
}

// EntitySignal para AdminRequestDto (crear/actualizar)
export class AdminRequestSignal {
  username = signal<string>('');
  email = signal<string>('');
  phone = signal<string>('');
  name = signal<string>('');
  last_name = signal<string>('');
  image = signal<File>(new File([''], ''));
  is_active = signal<boolean>(false);
  roles = signal<string[]>([]);
  departments = signal<string[]>([]);
  password = signal<string>('');
  password_confirmation = signal<string>('');

  static fromDto(dto: AdminRequestDto): AdminRequestSignal {
    const entity = new AdminRequestSignal();
    entity.username.set(dto.username);
    entity.email.set(dto.email);
  entity.phone.set(dto.phone ?? '');
  entity.name.set(dto.name ?? '');
  entity.last_name.set(dto.last_name ?? '');
  entity.image.set(dto.image ?? new File([''], ''));
  entity.is_active.set(dto.is_active ?? false);
  entity.roles.set(dto.roles ?? []);
  entity.departments.set(dto.departments ?? []);
  entity.password.set(dto.password ?? '');
  entity.password_confirmation.set(dto.password_confirmation ?? '');
    return entity;
  }

  toDto(): AdminRequestDto {
    return {
      username: this.username(),
      email: this.email(),
  phone: this.phone(),
  name: this.name(),
  last_name: this.last_name(),
  image: this.image(),
  is_active: this.is_active(),
  roles: this.roles(),
  departments: this.departments(),
  password: this.password(),
  password_confirmation: this.password_confirmation(),
    };
  }

  copyFromDto(dto: AdminRequestDto): void {
    this.username.set(dto.username);
    this.email.set(dto.email);
    this.phone.set(dto.phone ?? '');
    this.name.set(dto.name ?? '');
    this.last_name.set(dto.last_name ?? '');
    this.image.set(dto.image ?? new File([''], ''));
    this.is_active.set(dto.is_active ?? false);
    this.roles.set(dto.roles ?? []);
    this.departments.set(dto.departments ?? []);
    this.password.set(dto.password ?? '');
    this.password_confirmation.set(dto.password_confirmation ?? '');
  }

  toPatch<T>(): Partial<T> {
    const defaults = new AdminRequestSignal();
    const patch: Partial<T> = {};
    if ((this.username() as any) !== (defaults.username() as any)) (patch as any).username = this.username();
    if ((this.email() as any) !== (defaults.email() as any)) (patch as any).email = this.email();
    if ((this.phone() as any) !== (defaults.phone() as any)) (patch as any).phone = this.phone();
    if ((this.name() as any) !== (defaults.name() as any)) (patch as any).name = this.name();
    if ((this.last_name() as any) !== (defaults.last_name() as any)) (patch as any).last_name = this.last_name();
    if ((this.image() as any) !== (defaults.image() as any)) (patch as any).image = this.image();
    if ((this.is_active() as any) !== (defaults.is_active() as any)) (patch as any).is_active = this.is_active();
    if (JSON.stringify(this.roles()) !== JSON.stringify(defaults.roles())) (patch as any).roles = this.roles();
    if (JSON.stringify(this.departments()) !== JSON.stringify(defaults.departments())) (patch as any).departments = this.departments();
    if ((this.password() as any) !== (defaults.password() as any)) (patch as any).password = this.password();
    if ((this.password_confirmation() as any) !== (defaults.password_confirmation() as any)) (patch as any).password_confirmation = this.password_confirmation();
    return patch;
  }
}

// EntitySignal para AdminSummaryDto
export class AdminSummarySignal {
  id = signal<number>(0);
  email = signal<string>('');
  name = signal<string>('');
  last_name = signal<string>('');

  static fromDto(dto: AdminSummaryDto): AdminSummarySignal {
    const entity = new AdminSummarySignal();
    entity.id.set(dto.id);
    entity.email.set(dto.email);
  entity.name.set(dto.name ?? '');
  entity.last_name.set(dto.last_name ?? '');
    return entity;
  }

  toDto(): AdminSummaryDto {
    return {
      id: this.id(),
      email: this.email(),
  name: this.name(),
  last_name: this.last_name(),
    };
  }

  copyFromDto(dto: AdminSummaryDto): void {
    this.id.set(dto.id);
    this.email.set(dto.email);
    this.name.set(dto.name ?? '');
    this.last_name.set(dto.last_name ?? '');
  }

  toPatch<T>(): Partial<T> {
    const defaults = new AdminSummarySignal();
    const patch: Partial<T> = {};
    if ((this.id() as any) !== (defaults.id() as any)) (patch as any).id = this.id();
    if ((this.email() as any) !== (defaults.email() as any)) (patch as any).email = this.email();
    if ((this.name() as any) !== (defaults.name() as any)) (patch as any).name = this.name();
    if ((this.last_name() as any) !== (defaults.last_name() as any)) (patch as any).last_name = this.last_name();
    return patch;
  }
}
