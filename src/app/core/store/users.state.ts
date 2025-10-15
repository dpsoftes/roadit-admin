import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AdminDto } from '@dtos/admin.dto';
import { AdminSignalsModel } from '../models/UsersSignalsModel';
import { BaseSignalsModel } from '../models/BaseSignalsModel';
import { UserFullDto } from '@dtos/user.dto';
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
    async getAdminProfile(id: number): Promise<AdminSignalsModel | null> {
      try {
        const profile = await apiService.call<AdminDto>(HttpMethod.GET, {
          url: EndPoints.getAdmin,
          queryParams: { adminId: id },
        });
        store.patch({ adminProfile: profile });
        return AdminSignalsModel.fromJson(profile);
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