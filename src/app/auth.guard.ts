import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from './keyCloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService:KeycloakService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("this.keycloakService.getToken()",this.keycloakService.isAuthenticated());
      
      if (this.keycloakService.isAuthenticated()) {
        return true;
      } else {
        // return this.router.parseUrl('/login'); // Redirect to the login page if not authenticated
        return false
      }
    }
  
}
