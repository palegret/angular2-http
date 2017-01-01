import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: User = { 
    firstName: '', 
    lastName: '', 
    avatar: '' 
  };
  
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.createUser(this.user)
      .subscribe(user => {
        this.successMessage = 'User was created!';
        console.log('User was created.');
        this.router.navigate(['/users']);
      });
  }
}