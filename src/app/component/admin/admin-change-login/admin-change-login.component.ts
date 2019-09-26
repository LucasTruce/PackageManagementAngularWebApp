import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {User, UserService} from '../../../service/user/user.service';

@Component({
  selector: 'app-admin-change-login',
  templateUrl: './admin-change-login.component.html',
  styleUrls: ['./admin-change-login.component.css']
})
export class AdminChangeLoginComponent implements OnInit {

  user: User = new User('', '', '');
  error: object = {};
  constructor(private authService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(this.authService.getLogin()).subscribe(
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

  updateUserAdmin() {

  }
}
