import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private usersUrl: string = 'https://reqres.in/api/users';

  constructor(private http: Http) {
    // Empty
  }

  /**
   * Get all users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json().data)
      .catch(this.handleError); 
  }

  /** 
   * Get a single user.
   */

  /**
   * Create a user.
   */

  /**
   * Update a user.
   */

  /**
   * Delete a user.
   */

  private handleError(err) {
    let message: string;

    if (err instanceof Response) {
      const body = err.json() || '';
      const bodyError = body.error || JSON.stringify(body);
      const statusText = err.statusText || '';
      message = `${err.status} - ${statusText} ${bodyError}`;
    } else {
      message = err.message ? err.message : err.toString();
    }

    return Observable.throw(message);
  }
}
