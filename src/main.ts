import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]) 
    ),

    ...(appConfig.providers ?? []),

    importProvidersFrom(
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
      })
    ),
  ],
});
