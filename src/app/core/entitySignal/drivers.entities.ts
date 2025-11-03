
import { signal } from '@angular/core';
import { DriverDto } from '@dtos/index';


export class DriverEntity {
	id = signal<number>(0);
	username = signal<string>('');
	email = signal<string>('');
	phone = signal<string | null>(null);
	name = signal<string>('');
	last_name = signal<string>('');
	image = signal<string | null>(null);
	is_active = signal<boolean>(false);
	dni = signal<string>('');
	cif = signal<string>('');
	validated = signal<boolean>(false);
	rating = signal<string>('');
	city = signal<string>('');
	province = signal<string>('');
	postal_code = signal<string>('');
	billing_blocked = signal<boolean>(false);
	transport_blocked = signal<boolean>(false);
	allows_access_location = signal<boolean>(false);
	tags = signal<any[]>([]); // TagDto[] pero sin import circular
	created_datetime = signal<string | null>(null);

	static fromDto(dto: DriverDto): DriverEntity {
		const entity = new DriverEntity();
		entity.id.set(typeof dto.id === 'string' ? parseInt(dto.id, 10) : dto.id ?? 0);
		entity.username.set(dto.username);
		entity.email.set(dto.email);
		entity.phone.set(dto.phone);
		entity.name.set(dto.name);
		entity.last_name.set(dto.last_name);
		entity.image.set(dto.image);
		entity.is_active.set(dto.is_active);
		entity.dni.set(dto.dni);
		entity.cif.set(dto.cif);
		entity.validated.set(dto.validated);
		entity.rating.set(dto.rating);
		entity.city.set(dto.city);
		entity.province.set(dto.province);
		entity.postal_code.set(dto.postal_code);
		entity.billing_blocked.set(dto.billing_blocked);
		entity.transport_blocked.set(dto.transport_blocked);
		entity.allows_access_location.set(dto.allows_access_location);
		entity.tags.set(dto.tags);
		entity.created_datetime.set(dto.created_datetime);
		return entity;
	}

	toDto(): DriverDto {
		return new DriverDto({
			id: String(this.id()),
			username: this.username(),
			email: this.email(),
			phone: this.phone(),
			name: this.name(),
			last_name: this.last_name(),
			image: this.image(),
			is_active: this.is_active(),
			dni: this.dni(),
			cif: this.cif(),
			validated: this.validated(),
			rating: this.rating(),
			city: this.city(),
			province: this.province(),
			postal_code: this.postal_code(),
			billing_blocked: this.billing_blocked(),
			transport_blocked: this.transport_blocked(),
			allows_access_location: this.allows_access_location(),
			tags: this.tags(),
			created_datetime: this.created_datetime(),
		});
	}

	copyFromDto(dto: Partial<DriverDto>): void {
		if (dto.id !== undefined) this.id.set(typeof dto.id === 'string' ? parseInt(dto.id, 10) : dto.id);
		if (dto.username !== undefined) this.username.set(dto.username);
		if (dto.email !== undefined) this.email.set(dto.email);
		if (dto.phone !== undefined) this.phone.set(dto.phone);
		if (dto.name !== undefined) this.name.set(dto.name);
		if (dto.last_name !== undefined) this.last_name.set(dto.last_name);
		if (dto.image !== undefined) this.image.set(dto.image);
		if (dto.is_active !== undefined) this.is_active.set(dto.is_active);
		if (dto.dni !== undefined) this.dni.set(dto.dni);
		if (dto.cif !== undefined) this.cif.set(dto.cif);
		if (dto.validated !== undefined) this.validated.set(dto.validated);
		if (dto.rating !== undefined) this.rating.set(dto.rating);
		if (dto.city !== undefined) this.city.set(dto.city);
		if (dto.province !== undefined) this.province.set(dto.province);
		if (dto.postal_code !== undefined) this.postal_code.set(dto.postal_code);
		if (dto.billing_blocked !== undefined) this.billing_blocked.set(dto.billing_blocked);
		if (dto.transport_blocked !== undefined) this.transport_blocked.set(dto.transport_blocked);
		if (dto.allows_access_location !== undefined) this.allows_access_location.set(dto.allows_access_location);
		if (dto.tags !== undefined) this.tags.set(dto.tags);
		if (dto.created_datetime !== undefined) this.created_datetime.set(dto.created_datetime);
	}

	toPatch<T>(): Partial<T> {
		const defaults = new DriverEntity();
		const patch: Partial<T> = {};
		if (this.id() !== defaults.id()) (patch as any).id = this.id();
		if (this.username() !== defaults.username()) (patch as any).username = this.username();
		if (this.email() !== defaults.email()) (patch as any).email = this.email();
		if (this.phone() !== defaults.phone()) (patch as any).phone = this.phone();
		if (this.name() !== defaults.name()) (patch as any).name = this.name();
		if (this.last_name() !== defaults.last_name()) (patch as any).last_name = this.last_name();
		if (this.image() !== defaults.image()) (patch as any).image = this.image();
		if (this.is_active() !== defaults.is_active()) (patch as any).is_active = this.is_active();
		if (this.dni() !== defaults.dni()) (patch as any).dni = this.dni();
		if (this.cif() !== defaults.cif()) (patch as any).cif = this.cif();
		if (this.validated() !== defaults.validated()) (patch as any).validated = this.validated();
		if (this.rating() !== defaults.rating()) (patch as any).rating = this.rating();
		if (this.city() !== defaults.city()) (patch as any).city = this.city();
		if (this.province() !== defaults.province()) (patch as any).province = this.province();
		if (this.postal_code() !== defaults.postal_code()) (patch as any).postal_code = this.postal_code();
		if (this.billing_blocked() !== defaults.billing_blocked()) (patch as any).billing_blocked = this.billing_blocked();
		if (this.transport_blocked() !== defaults.transport_blocked()) (patch as any).transport_blocked = this.transport_blocked();
		if (this.allows_access_location() !== defaults.allows_access_location()) (patch as any).allows_access_location = this.allows_access_location();
		if (this.tags() !== defaults.tags()) (patch as any).tags = this.tags();
		if (this.created_datetime() !== defaults.created_datetime()) (patch as any).created_datetime = this.created_datetime();
		return patch;
	}
}
