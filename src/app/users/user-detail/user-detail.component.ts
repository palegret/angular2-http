import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(id)
      .subscribe(
        user => this.user = user,
        err => null
      );    
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id)
      .subscribe(data => {
        console.log('User was deleted.');
        // Route back to the users page
        this.router.navigate(['/users']);
      });
  }  
}
