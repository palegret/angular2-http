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
      .map(users => users.map(this.toUser))
      .catch(this.handleError); 
  }

  /** 
   * Get a single user.
   */
  getUser(id: number): Observable<User> {
    return this.http.get(`${this.usersUrl}/${id}`)
      .map(res => res.json().data)
      .map(this.toUser)
      .catch(this.handleError);
  }

  /**
   * Create a user.
   */

  /**
   * Update a user.
   */

  /**
   * Delete a user.
   */

  private toUser(user): User {
    return {
      id: user.id,
      username: `${user.first_name[0]}${user.last_name}`,
      fullName: `${user.first_name} ${user.last_name}`,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar
    };
  }

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
