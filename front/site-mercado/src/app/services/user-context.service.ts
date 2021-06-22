import { Injectable } from '@angular/core';

const TOKEN_KEY = "SiteMercado:Token";

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  constructor() { }

  signIn(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  get isLogged() {
    return !!this.token;
  }

  get token() {
    return localStorage.getItem(TOKEN_KEY);
  }
}
