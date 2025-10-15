import { signal, Signal } from '@angular/core';
import { RoleAdmin } from '../enums/user.enum';
import { BaseSignalsModel } from './BaseSignalsModel';

export interface AdminSignalsModelProps {
  id: string;
  username: string;
  email: string;
  phone: string;
  name: string;
  last_name: string;
  image: string | null;
  is_active: boolean;
  roles: RoleAdmin[];
  departments: string[];
  created_date: string;
  modified_date: string;
  state: boolean;
}

export class AdminSignalsModel extends BaseSignalsModel<AdminSignalsModelProps, AdminSignalsModel> {
  id = signal<string>('');
  username = signal<string>('');
  email = signal<string>('');
  phone = signal<string>('');
  name = signal<string>('');
  last_name = signal<string>('');
  image = signal<string | null>(null);
  is_active = signal<boolean>(false);
  roles = signal<RoleAdmin[]>([]);
  departments = signal<string[]>([]);
  created_date = signal<string>('');
  modified_date = signal<string>('');
  state = signal<boolean>(false);

  constructor(data: Partial<AdminSignalsModelProps> = {}) {
    super();
    if (data.id !== undefined) this.id.set(data.id);
    if (data.username !== undefined) this.username.set(data.username);
    if (data.email !== undefined) this.email.set(data.email);
    if (data.phone !== undefined) this.phone.set(data.phone);
    if (data.name !== undefined) this.name.set(data.name);
    if (data.last_name !== undefined) this.last_name.set(data.last_name);
    if (data.image !== undefined) this.image.set(data.image);
    if (data.is_active !== undefined) this.is_active.set(data.is_active);
    if (data.roles !== undefined) this.roles.set(data.roles);
    if (data.departments !== undefined) this.departments.set(data.departments);
    if (data.created_date !== undefined) this.created_date.set(data.created_date);
    if (data.modified_date !== undefined) this.modified_date.set(data.modified_date);
    if (data.state !== undefined) this.state.set(data.state);
  }


  override toJson(): AdminSignalsModelProps {
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
      created_date: this.created_date(),
      modified_date: this.modified_date(),
      state: this.state()
    };
  }

  override copyWith(updates: Partial<AdminSignalsModelProps>): AdminSignalsModel {
    return new AdminSignalsModel({
      ...this.toJson(),
      ...updates
    });
  }
    copyFrom(source: AdminSignalsModel): void {
    this.id.set(source.id());
    this.username.set(source.username());
    this.email.set(source.email());
    this.phone.set(source.phone());
    this.name.set(source.name());
    this.last_name.set(source.last_name());
    this.image.set(source.image());
    this.is_active.set(source.is_active());
    this.roles.set([...source.roles()]);
    this.departments.set([...source.departments()]);
    this.created_date.set(source.created_date());
    this.modified_date.set(source.modified_date());
    this.state.set(source.state());
  }
}
