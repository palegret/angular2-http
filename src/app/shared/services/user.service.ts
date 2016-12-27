import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
      .map(response => response.json().data);
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
}
