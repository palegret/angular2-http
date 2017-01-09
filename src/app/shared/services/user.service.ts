import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private usersUrl: string = 'https://reqres.in/api/users';

  // Observable source; same basic idea as Azure Service Bus Topics (pub/sub)
  private userCreatedSource: Subject<User> = new Subject<User>();
  private userDeletedSource: Subject<any> = new Subject();

  // Observable Stream - userCreatedStream, userDeletedStream; $ is idiomatic
  userCreated$: Observable<User> = this.userCreatedSource.asObservable();
  userDeleted$: Observable<User> = this.userDeletedSource.asObservable();

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

    // See also:
    // Helper library for handling JWTs in Angular 2 apps
    // https://github.com/auth0/angular2-jwt
    
    let token   = localStorage.getItem('auth_token');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.usersUrl}/${id}`, { headers })
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
      .do(user => this.userCreated(user))
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
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`)
      .do(res => this.userDeleted())
      .catch(this.handleError);
  }

  userCreated(user: User) {
    this.userCreatedSource.next(user);
  }

  userDeleted() {
    this.userDeletedSource.next();
  }

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
