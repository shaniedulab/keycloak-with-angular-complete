// app.component.ts
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './keyCloak.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private api:ApiService,private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    // Initialize Keycloak when the component is loaded
    // this.keycloakService.init().then((authenticated) => {
    //   console.log('Keycloak initialized:', authenticated);
    // });
  }

  login(): void {
    // Call the login method to open the Keycloak login page
    this.keycloakService.login();
  }

  logout(): void {
    // Call the logout method to logout to Keycloak
    this.keycloakService.logout();
  }

  register(): void {
    // Call the register method to open the Keycloak register page
    this.keycloakService.register();
  }

  getToken(): void {
    console.log(this.keycloakService.getToken());
    
  }

  button(){
    this.api.get('s').subscribe((data)=>{
      console.log("datadata",data);
    })
  }

  isTokenExpired(){
    console.log("this.keycloakService.isTokenExpired()",this.keycloakService.isTokenExpired());
  }

  updateToken(){
    this.keycloakService.updateToken()
    console.log("updateToken");
  }
}
