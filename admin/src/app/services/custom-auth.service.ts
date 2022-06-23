import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { environment as env } from 'src/environments/environment';

const auth0 = new Auth0Client({
  domain: env.authManagement.domain,
  client_id: env.authManagement.clientId,
  audience: env.authManagement.audience,
  scope: env.authManagement.scope
});

@Injectable({
  providedIn: 'root'
})
export class CustomAuthService {

  constructor(private auth: AuthService) { }

  async getDecodedToken() {
    let token = await this.getToken();

    if(!token) {
      return null;
    }

    let jwtHelper = new JwtHelperService();
    let decodedToken = jwtHelper.decodeToken(token);

    return decodedToken;
  }

  async getToken() {
    //return await auth0.getTokenSilently();
    return await auth0.getTokenWithPopup();
  }
}
