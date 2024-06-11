import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { requestInterceptor } from './interceptors/request.interceptor';
import { responseInterceptor } from './interceptors/response.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors([requestInterceptor, responseInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
