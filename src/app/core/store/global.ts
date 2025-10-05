import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { LoginResponseDto, UserFullDto, Helpers } from 'shared';
import { GlobalStateData } from './global.state';
import { DevToolsHelper } from './devtools.helper';

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
  
  // Estado inicial usando directamente GlobalStateData
  withState(new GlobalStateData()),
  
  // Computed values
  withComputed((state) => ({
    isAuthenticated: computed(() => !!state.user?.token)
  })),
  
  // Métodos para actualizar el estado
  withMethods((store) => {
    // Inicializar DevTools
    DevToolsHelper.initDevTools('RoadIt Global Store');
    
    return {
    setUser: (user: LoginResponseDto) => {
      // Actualizar el estado
      patchState(store, { user });
      
      // Log para DevTools
      DevToolsHelper.logAction('SET_USER', {
        user: store.user(),
        language: store.language(),
        userFull: store.userFull(),
        menuCollapsed: store.menuCollapsed()
      });
      
      // Guardar en localStorage usando el helper
      Helpers.setStorage('roadit_user', user);
      
      // Si hay token, guardar también la fecha de expiración
      if (user.token) {
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 8); // 8 horas por defecto
        Helpers.setStorage('roadit_token_expiration', expirationTime.toISOString());
      }
    },
    
    setUserFull: (userFull: UserFullDto) => {
      // Actualizar el estado
      patchState(store, { userFull });
      
      // Log para DevTools
      DevToolsHelper.logAction('SET_USER_FULL', {
        user: store.user(),
        language: store.language(),
        userFull: store.userFull(),
        menuCollapsed: store.menuCollapsed()
      });
      
      // Guardar en localStorage usando el helper
      Helpers.setStorage('roadit_user_full', userFull);
    },
    
    setLanguage: (language: string) => {
      patchState(store, { language });
      DevToolsHelper.logAction('SET_LANGUAGE', { language });
    },
    
    toggleMenu: () => {
      patchState(store, (state) => ({ 
        menuCollapsed: !state.menuCollapsed 
      }));
      DevToolsHelper.logAction('TOGGLE_MENU', { menuCollapsed: store.menuCollapsed() });
    },
    
    setMenuCollapsed: (collapsed: boolean) => {
      patchState(store, { menuCollapsed: collapsed });
      DevToolsHelper.logAction('SET_MENU_COLLAPSED', { menuCollapsed: collapsed });
    },
    
    logout: () => {
      // Limpiar el estado
      patchState(store, {
        user: new LoginResponseDto(),
        userFull: new UserFullDto()
      });
      
      // Log para DevTools
      DevToolsHelper.logAction('LOGOUT', {
        user: store.user(),
        userFull: store.userFull()
      });
      
      // Limpiar localStorage
      Helpers.removeStorage('roadit_user');
      Helpers.removeStorage('roadit_token_expiration');
      Helpers.removeStorage('roadit_user_full');
    },

    // Método que usa copyWith para actualizaciones complejas
    updateState: (updates: Partial<GlobalStateData>) => {
      const currentState = new GlobalStateData({
        user: store.user(),
        language: store.language(),
        userFull: store.userFull(),
        menuCollapsed: store.menuCollapsed()
      });
      const newState = currentState.copyWith(updates);
      patchState(store, newState);
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
          return;
        }
      }

      // Restaurar datos si existen
      if (savedUser) {
        patchState(store, { user: savedUser });
      }
      
      if (savedUserFull) {
        patchState(store, { userFull: savedUserFull });
      }
    }
    };
  })
);