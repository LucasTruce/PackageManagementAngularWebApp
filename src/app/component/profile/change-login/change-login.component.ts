import {Component, OnInit } from '@angular/core';

import {User, UserService} from '../../../service/user/user.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {

  user: User = new User('', '', '');
  error: object = {};

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userService.getUser(this.authenticationService.getLogin()).subscribe(
      response => {
        this.handleSuccessfulResponse(response);
      },
      err => {
        this.error = err.error.message;
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.user = response;
  }

  updateUser() {

  }

}
