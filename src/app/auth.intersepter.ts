import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeycloakService } from './keyCloak.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.keycloakService.isTokenExpired()) {
      console.log("if", this.keycloakService.isTokenExpired());

      // Token is expired, try to update it
      return from(this.keycloakService.updateToken()).pipe(
        switchMap((updated) => {
          if (updated) {
            // Token was updated successfully, retry the request with the new token
            const authToken = this.keycloakService.getToken();
            if (authToken) {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
            }
            // Continue with the modified request
            return next.handle(request);
          } else {
            // Token refresh failed or user is logged out, handle the error accordingly
            // For example, you can redirect to the login page or show an error message
            throw new Error('Token refresh failed');
          }
        })
      );
    } else {
      console.log("else");

      // Token is not expired, continue with the original request
      const authToken = this.keycloakService.getToken();
      if (authToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
      // Continue with the modified request
      return next.handle(request);
    }
  }
}
