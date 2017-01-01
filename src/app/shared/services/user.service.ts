import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private usersUrl: string = 'https://reqres.in/api/users';

  constructor(private http: Http) { }

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
  createUser(user: User): Observable<User> {
    return this.http.post(this.usersUrl, user)
      .map(res => res.json())
      //.do(user => this.userCreated(user))
      .catch(this.handleError);
  }

  /**
   * Attempt to update a user but return an HTTP 404 error.
   */
  updateUserWithError(user: User): Observable<User> {
    return this.http.get(`${this.usersUrl}/23`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update a user.
   */
  updateUser(user: User): Observable<User> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Delete a user.
   */

  private toUser(apiUser): User {
    return {
      id: apiUser.id,
      username: `${apiUser.first_name[0]}${apiUser.last_name}`,
      fullName: `${apiUser.first_name} ${apiUser.last_name}`,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
      avatar: apiUser.avatar
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
