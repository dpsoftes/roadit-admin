import { Injectable, computed, inject } from '@angular/core';
import { GlobalStore } from '@store/global.state';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsersState } from './users.state';
import { ApiService } from '@services/api.service';
import { EndPoints } from '@services/EndPoints';
import { UserRole } from '@enums/user.enum';
import { AdminProvider, ClientsProvider } from '@providers';
import { TagDto } from '@dtos/tag.dto';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // Singleton estático
  public static instance: StoreService | null = null;

  // Propiedad estática global para acceso desde cualquier lugar


  // Store global de la aplicación
  readonly global = inject(GlobalStore);
  readonly router = inject(Router)
  readonly users = inject(UsersState);
  readonly api = inject(ApiService);
  readonly adminProvider = inject(AdminProvider);
  readonly clientProvider = inject(ClientsProvider);
  get isDebug() {
    return !environment.production;
  }

  constructor() {
    // Establecer la instancia singleton
    if (StoreService.instance) {
      return StoreService.instance;
    }
    StoreService.instance = this;

    // Inicializar desde localStorage al arrancar la aplicación
    this.global.initializeFromStorage();
    this.global.getUserLoggedOutObservable().subscribe(async (loggedIn) => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      } else {
        if (this.global.user().user.role === UserRole.ADMIN) {

          const adminsList = await this.adminProvider.getAdmins({});
          if (adminsList && adminsList.results && adminsList.results.length > 0) {
            this.global.updateState({
              usersAdmin: adminsList.results.map(admin => {
                return { id: admin.id!, name: admin.name + ' ' + admin.last_name, otherData: admin };
              })
            });
          }
          const groups = await this.clientProvider.getGroups({});
          if (groups && groups.length > 0) {
            this.global.updateState({
              groups: groups.map(group => {
                return { id: group.id!, name: group.name };
              })
            });
          }
        }

        if (this.global.tags().length === 0) {
          this.loadTags();


        }
      }

    });
  }

  // Método para obtener el estado completo de todos los stores (útil para debugging)
  getFullState() {
    return {
      global: {
        user: this.global.user(),
        language: this.global.language(),
        userFull: this.global.userFull(),
        menuCollapsed: this.global.menuCollapsed(),
        isAuthenticated: this.global.isAuthenticated()
      }
    };
  }

  // Método para resetear todos los stores
  resetAllStores() {
    this.global.logout();
  }
  async loadTags() {
    try {
      const response = await this.api.get<any[]>({ url: EndPoints.getTags });
      if (response && response.length > 0) {
        //CONVERTIR CADA TAG A INSTANCIA DE TagDto
        const tagsDto = response.map(tagData => TagDto.fromJson(tagData));
        this.global.updateState({ tags: tagsDto });
      }
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  }

}
