// keyCloak.service.ts
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable()
export class KeycloakService {
  private keycloakInstance;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:8000',
      realm: 'myRealm1',
      clientId: 'myClient',
    });
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloakInstance
        .init({}) // Remove the 'promiseType' option
        .then((authenticated) => {
          resolve(authenticated);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login(): void {
    this.keycloakInstance.login({redirectUri :'http://localhost:4200/home'});
  }

  logout(): void {
    this.keycloakInstance.logout({redirectUri :'http://localhost:4200'});
  }
 
  register(): void {
    this.keycloakInstance.register();
  }

  getToken():string | undefined {
    console.log("getToken");
    
    return this.keycloakInstance.token;
  }

  isAuthenticated(): boolean | undefined {
    return this.keycloakInstance.authenticated;
  }

  isTokenExpired():boolean{
    return this.keycloakInstance.isTokenExpired();
  }

  updateToken(): Promise<boolean>{
    return this.keycloakInstance.updateToken(5);
  }

  updateExpiredToken(){
    console.log("updateExpiredToken");
    
    if(this.keycloakInstance.isTokenExpired()){
      this.keycloakInstance.updateToken(5);
    }
  }
 
}
  