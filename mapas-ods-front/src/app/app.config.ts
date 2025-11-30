import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZoneChangeDetection,
  APP_INITIALIZER, // 👈 Novo Import
  inject // 👈 Novo Import
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './services/authInterceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { PocketBaseService } from './services/pocketbase.service'; // 👈 Novo Import


const initializePocketBaseFactory = () => {
  // Obtém a instância do serviço usando a função inject()
  const pbService = inject(PocketBaseService);
  
  return () => pbService.loadSession();
};


export const appConfig: ApplicationConfig = {
  providers: [
    
    {
      provide: APP_INITIALIZER,
      useFactory: initializePocketBaseFactory,
      multi: true
    },
    
    // Provedores existentes
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};