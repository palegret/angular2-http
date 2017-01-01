import { Component, OnInit } from '@angular/core';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {
    // Empty
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        err => null
      );
  }
}
 