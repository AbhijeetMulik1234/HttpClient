import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; //  hi link aaplya backend Api chi aahe
  constructor(private http: HttpClient) {}

  // login chi method for calling from backend
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          // saving token in localStorage
          localStorage.setItem('token', response.token);
        })
      );
  }
  // logout method
  logout(): void {
    localStorage.removeItem('token');
  }

  // get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // check if logged in
  isloggedIn() {
    return !!this.getToken();
  }
}
