import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AdminDto } from '@dtos/admin.dto';
import { UserFullDto } from '@dtos/user.dto';
import { ApiService } from '@services/api.service';
import { EndPoints, HttpMethod } from '@services/index';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export class UsersStateData {
  users: UserFullDto[] = [];
  adminUsers: AdminDto[] = [];
  adminProfile: AdminDto | null = null;
}

export const UsersState = signalStore(
  { providedIn: 'root' },
  withState(new UsersStateData()),
  withDevtools('UsersStore'),
  withMethods((store, apiService = inject(ApiService)) => ({
    async getAdminProfile(id: number) {
      try {
        const profile = await apiService.call<AdminDto>(HttpMethod.GET, {
          url: EndPoints.getAdmin,
          queryParams: { adminId: id },
        });
        patchState(store, { adminProfile: profile });
      } catch (e) {
        patchState(store, { adminProfile: null });
      }
    },
    async getAdminUsers() {
      // Método vacío como en el original
    },
    // Método genérico para mutar el estado
    patch(stateUpdate: Partial<UsersStateData>) {
      patchState(store, stateUpdate);
    },
  }))
);