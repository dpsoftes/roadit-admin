import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AdminDto } from '@dtos/admins.dto';
//import { AdminSignalsModel } from '../models/UsersSignalsModel';
//import { BaseSignalsModel } from '../models/BaseSignalsModel';
import { UserFullDto, AdminRequestDto } from '@dtos';
import { AdminRequestSignal, AdminSignal } from '@entities/admins.entities';
import { ApiService } from '@services/api.service';
import { EndPoints, HttpMethod } from '@services/index';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withSignalStoreBase } from './storeBase';

export class UsersStateData {
  users: UserFullDto[] = [];
  adminUsers: AdminDto[] = [];
  adminProfile: AdminDto | null = null;
}

export const UsersState = signalStore(
  { providedIn: 'root' },
  withState(new UsersStateData()),
  withDevtools('UsersStore'),
  withSignalStoreBase<UsersStateData>(),
  withMethods((store, apiService = inject(ApiService)) => ({
    async getAdminProfile(id: number): Promise<AdminSignal | null> {
      try {
        const profile = await apiService.call<AdminDto>(HttpMethod.GET, {
          url: EndPoints.getAdmin,
          queryParams: { adminId: id },
        });
        store.patch({ adminProfile: profile });
        return AdminSignal.fromDto(profile);
      } catch (e) {
        store.patch({ adminProfile: null });
        return null;
      }
    },
    async getAdminUsers() {
      // Método vacío como en el original
    },
    // Aquí puedes añadir más métodos específicos de este store
  }))
);