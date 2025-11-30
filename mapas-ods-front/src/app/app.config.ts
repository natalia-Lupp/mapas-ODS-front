import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners, 
  provideZoneChangeDetection,
  APP_INITIALIZER, //depreciado ficar esperto que pode quebrar e inda não sei como fazer o novo '-'
  inject 
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './services/authInterceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { PocketBaseService } from './services/pocketbase.service';


const initializePocketBaseFactory = () => {
  // Obtém a instância do serviço usando a função inject()
  const pbService = inject(PocketBaseService);
  
  return () => pbService.loadSession();
};


export const appConfig: ApplicationConfig = {
  providers: [
    
    {
      provide: APP_INITIALIZER, // o o depreciado aqui de novo
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