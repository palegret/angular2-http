import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUser(id)
      .subscribe(
        user => {this.user = user; console.log(user);},
        err => null
      );    
  }
}
