import { Component, OnInit } from '@angular/core';

import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  users: User[];

  constructor(private userService: UserService) {
    // Empty
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
} 
