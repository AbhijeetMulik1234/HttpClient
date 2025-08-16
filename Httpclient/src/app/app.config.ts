import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

import { loaderinterceptor } from './core/interceptors/loader-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Required to use HttpClient and interceptors
    importProvidersFrom(HttpClientModule),

    //  Register the class-based interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
    // errorinterceptor register as a class
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: errorInterceptor,
    //   multi: true,
    // },
    // loaderinterceptor register as a class
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loaderinterceptor,
      multi: true,
    },
  ],
};
