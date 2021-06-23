import { UserContextService } from './user-context.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private userContext: UserContextService
  ) { }

  signIn(username: string, password: string): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${API}/auth`, {
      username,
      password
    })
    .pipe(
      tap(res => this.userContext.signIn(res.token))
    );
  }

  signOut(): void {
    this.userContext.signOut();
  }
}

interface AuthResult {
  success: boolean,
  error: string,
  token: string
}
