import { Component, OnInit } from '@angular/core';

import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
	selector: 'my-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
	
	constructor(private userService: UserService, ) { 
    this.userService.userCreated$.subscribe(user => {
			const fullName = `${user.firstName} ${user.lastName}`;
      this.successMessage = `${fullName} has been created!`;
      this.clearMessages();
    });

    this.userService.userDeleted$.subscribe(() => {
      this.successMessage = `The user has been deleted!`;
      this.clearMessages();
    });		
	}

  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }

	ngOnInit() { }
}