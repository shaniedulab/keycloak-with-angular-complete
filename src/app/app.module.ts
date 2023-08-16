import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService } from './keyCloak.service';
import { HomeComponent } from './home/home.component';
// import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.intersepter';

function keyCloakAuth(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: keyCloakAuth,
      deps: [KeycloakService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Use the AuthInterceptor for setting the header
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
