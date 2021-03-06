import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() { 
    let id = this.route.snapshot.params['id'];
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  updateUser() {
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateUser(this.user)
    // this.userService.updateUserWithError(this.user)
      .subscribe(
        user => {
          this.successMessage = 'User was updated.';
          console.log('User was updated.');
        },
        err => {
          this.errorMessage = `User cannot be updated. (${err})`;
          console.error(err);
        }
      );
  }
}
