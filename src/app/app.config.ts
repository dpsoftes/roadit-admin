import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from '@services/api.service';
import { environment } from '../environments/environment';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './core/i18n/custom-mat-paginator-intl.service';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';

// Factory para inicializar ApiService con la configuración del environment
export function initializeApiService(apiService: ApiService): () => void {
  return () => {
    apiService.setBaseUrl(environment.apiUrl);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()), // Configurar HttpClient
    provideRouter(routes),
    provideNativeDateAdapter(), // DateAdapter para MatCalendar y MatDatepicker
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApiService,
      deps: [ApiService],
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ]
};
