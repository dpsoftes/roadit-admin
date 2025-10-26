import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import { LoginResponseDto, UserFullDto } from '@dtos';
import { Helpers } from '@utils/helpers';
import { GlobalStateData } from './global.state';
import { Subject } from 'rxjs';
//import { DevToolsHelper } from './devtools.helper';
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
      getUserLoggedOutObservable: () => {
        return userLoggedSubject.asObservable();
      },
      setUser: (user: LoginResponseDto, isFromInit: boolean = false) => {
          // Actualizar el estado
          patchState(store, { user });
          
          if(!isFromInit) {
            // Guardar en localStorage usando el helper
            Helpers.setStorage('roadit_user', user);
            
            // Si hay token, guardar también la fecha de expiración
            if (user.token) {
              const expirationTime = new Date();
              expirationTime.setHours(expirationTime.getHours() + 8); // 8 horas por defecto
              Helpers.setStorage('roadit_token_expiration', expirationTime.toISOString());
            }
          }
          userLoggedSubject.next(true);
    },
    
    setUserFull: (userFull: UserFullDto) => {
      patchState(store, { userFull });
      Helpers.setStorage('roadit_user_full', userFull);
    },
    
    setLanguage: (language: string) => {
      patchState(store, { language });
      //DevToolsHelper.logAction('SET_LANGUAGE', { language });
    },
    
    toggleMenu: () => {
      patchState(store, (state) => ({ 
        menuCollapsed: !state.menuCollapsed 
      }));
    },
    setMenuCollapsed: (collapsed: boolean) => {
      patchState(store, { menuCollapsed: collapsed });
    },
    logout: () => {
      // Limpiar el estado
      patchState(store, {
        user: new LoginResponseDto(),
        userFull: new UserFullDto()
      });

      // Limpiar localStorage
      Helpers.removeStorage('roadit_user');
      Helpers.removeStorage('roadit_token_expiration');
      Helpers.removeStorage('roadit_user_full');
      userLoggedSubject.next(false);
    },
  }}),

  withMethods((store) => {
    return {
    updateState: (updates: Partial<GlobalStateData>) => {
      var newStore : GlobalStateData = new GlobalStateData();
      newStore.language = updates.language || store.language();
      newStore.menuCollapsed = updates.menuCollapsed !== undefined ? updates.menuCollapsed : store.menuCollapsed();
      newStore.user = updates.user || store.user();
      newStore.userFull = updates.userFull || store.userFull();
      newStore.tags = updates.tags || store.tags();
      patchState(store, newStore);
    },

    // Método para inicializar desde localStorage
    initializeFromStorage: () => {
      const savedUser = Helpers.getStorage<LoginResponseDto>('roadit_user');
      const savedUserFull = Helpers.getStorage<UserFullDto>('roadit_user_full');
      const tokenExpiration = Helpers.getStorage<string>('roadit_token_expiration');

      // Verificar si el token ha expirado
      if (savedUser?.token && tokenExpiration) {
        const expDate = new Date(tokenExpiration);
        const now = new Date();
        
        if (now > expDate) {
          // Token expirado, limpiar datos
          console.log('Token expirado, realizando logout automático');
          patchState(store, {
            user: new LoginResponseDto(),
            userFull: new UserFullDto()
          });
          Helpers.removeStorage('roadit_user');
          Helpers.removeStorage('roadit_token_expiration');
          Helpers.removeStorage('roadit_user_full');
          userLoggedSubject.next(false);
          return;
        }
      }

      // Restaurar datos si existen
      if (savedUser) {
        store.setUser(savedUser, true);
        //patchState(store, { user: savedUser });
      }
      
      if (savedUserFull) {
        patchState(store, { userFull: savedUserFull });
      }
    }
    };
  })
);