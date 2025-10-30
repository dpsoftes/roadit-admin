import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { LoginResponseDto, SimpleDataDto, Tag, UserFullDto } from '@dtos';
import { Helpers } from '@utils/helpers';
import { Subject } from 'rxjs';
//import { DevToolsHelper } from './devtools.helper';

export class GlobalStateData {
    user: LoginResponseDto = new LoginResponseDto();
    language: string = "es";
    userFull: UserFullDto = new UserFullDto();
    tags: Tag[] = [];
    menuCollapsed: boolean = false;
    usersAdmin: SimpleDataDto[] = [];
    groups: SimpleDataDto[] = [];
}





const userLoggedSubject = new Subject<boolean>();
export const GlobalStore = signalStore(
  { 
    providedIn: 'root',
    // Configuración para Redux DevTools
    ...(typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && {
      devtools: {
        name: 'RoadIt Global Store',
        trace: true,
        traceLimit: 25
      }
    })
  },
  withDevtools('GlogalStore'),
  // Estado inicial usando directamente GlobalStateData
  withState(new GlobalStateData()),
  
  // Computed values
  withComputed((state) => ({
    isAuthenticated: computed(() => 
    {
      if(state.user && state.user().token != "") return true;
      return false;

    }
      ),
      token: computed(() => {
      if (state.user && state.user().token != "") {
        const expiration = Helpers.getStorage('roadit_token_expiration');
        if (expiration) {
          const expDate = new Date(expiration);
          const now = new Date();
          if (now < expDate) {
            return state.user().token;
          }
        }
      }
      return "expired";
    })
  })),
  





  withMethods((store) => {
   
    return {
     updateState: (updates: Partial<GlobalStateData>) => {
      var newStore : GlobalStateData = new GlobalStateData();
      newStore.language = updates.language || store.language();
      newStore.menuCollapsed = updates.menuCollapsed !== undefined ? updates.menuCollapsed : store.menuCollapsed();
      newStore.user = updates.user || store.user();
      newStore.userFull = updates.userFull || store.userFull();
      newStore.tags = updates.tags || store.tags();
      newStore.usersAdmin = updates.usersAdmin || store.usersAdmin();
      newStore.groups = updates.groups || store.groups();
      patchState(store, newStore);
      saveGlobalStoreToStorage(newStore);
    }};}),

    withMethods((store) => {
      return {

      getUserLoggedOutObservable: () => {
        return userLoggedSubject.asObservable();
      },
      setUser:  async (user: LoginResponseDto, isFromInit: boolean = false) => {
        store.updateState( { user: user  });
          // Actualizar el estado
          
          
          if(!isFromInit) {
            // Guardar en localStorage usando el helper
            //Helpers.setStorage('roadit_user', user);
            
            // Si hay token, guardar también la fecha de expiración
            if (user.token) {
              const expirationTime = new Date();
              expirationTime.setHours(expirationTime.getHours() + 8); // 8 horas por defecto
              Helpers.setStorage('roadit_token_expiration', expirationTime.toISOString());
            }
          }
          userLoggedSubject.next(true);

    },
    logout: () => {
      // Limpiar el estado
      patchState(store, {
        user: new LoginResponseDto(),
        userFull: new UserFullDto()
      });

      // Limpiar localStorage
      Helpers.clearStorage();
      userLoggedSubject.next(false);
    },
  }}),

  withMethods((store) => {
    return {
    setMenuCollapsed: (collapsed: boolean) => {
      store.updateState( { menuCollapsed: collapsed  });  
    },
    toggleMenu: () => {
    
      store.updateState( { menuCollapsed: !store.menuCollapsed()  });
    },
    // Método para inicializar desde localStorage
    initializeFromStorage: () => {
/*       const savedUser = Helpers.getStorage<LoginResponseDto>('roadit_user');
      const savedUserFull = Helpers.getStorage<UserFullDto>('roadit_user_full');*/   
      const tokenExpiration = Helpers.getStorage<string>('roadit_token_expiration');
    
      var loadedStore = loadGlobalStoreFromStorage();
      if(loadedStore){
        patchState(store, loadedStore);
      }

      // Verificar si el token ha expirado
      if (store.token()  &&  tokenExpiration) {
        const expDate = new Date(tokenExpiration);
        const now = new Date();
        
        if (now > expDate) {
          // Token expirado, limpiar datos
          console.log('Token expirado, realizando logout automático');
          patchState(store, {
            user: new LoginResponseDto(),
            userFull: new UserFullDto()
          });
          Helpers.clearStorage();
          userLoggedSubject.next(false);
          return;
        }
      }

    }
    };
  })
);

// Guarda solo las claves de GlobalStateData, asumiendo que todas son signals
function saveGlobalStoreToStorage(store: any, key = 'roadit_global_store') {
  const result: Record<string, unknown> = {};
  for (const prop of Object.keys(new GlobalStateData())) {
    result[prop] = store[prop];
  }
  Helpers.setStorage(key, result);
}

// Restaura solo las claves de GlobalStateData, asumiendo que todas son signals
function loadGlobalStoreFromStorage( key = 'roadit_global_store'): GlobalStateData | null {
  
  return Helpers.getStorage<GlobalStateData>(key);

}