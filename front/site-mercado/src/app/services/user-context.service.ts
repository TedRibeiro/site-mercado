import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

const TOKEN_KEY = "SiteMercado:Token";

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  constructor() { }

  signIn(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  signOut() {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  get isLogged() {
    return !!this.token;
  }

  get token() {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
