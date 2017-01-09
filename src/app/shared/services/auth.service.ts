import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authUrl: string = 'https://reqres.in/api';
  private loggedIn: boolean = false;
  
  constructor(private http: Http) {
    // Check localStorage to see if user is logged in
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  /**
   * Check if the user is logged in.
   */
  isLoggedIn() {
    return this.loggedIn;
  }

  /**
   * Log the user in.
   */
  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.authUrl}/login`, { username, password })
      .map(res => res.json())
      .do(res => {
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }
      })
      .catch(this.handleError);
  }

  /**
   * Log the user out.
   */
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  private handleError(err) {
    let message: string;

    if (err instanceof Response) {
      const body = err.json() || '';
      const bodyError = body.error || JSON.stringify(body);
      message = `${err.status} - ${bodyError}`;
    } else {
      message = err.message ? err.message : err.toString();
    }

    return Observable.throw(message);
  }  
}