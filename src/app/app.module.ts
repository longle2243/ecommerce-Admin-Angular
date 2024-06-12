import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { requestInterceptor } from './interceptors/request.interceptor';
import {
  handleTokenExpired,
  responseInterceptor,
} from './interceptors/response.interceptor';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { handleErrorInterceptor } from './interceptors/handle-error.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    importProvidersFrom(HttpClientModule),
    // provideHttpClient(
      // withInterceptors([authInterceptor])
      // withInterceptors([requestInterceptor, responseInterceptor])
      // withInterceptors([requestInterceptor, responseInterceptor, handleTokenExpired])
    // ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: handleErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
