import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../../service/user/user.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User('', '', '', '', '', 0);

  error: object = {};
  temp = true;
  authenticate = false;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.error = {};

    this.userService.getOne(this.authenticationService.getLogin()).subscribe(
      response => {
        this.handleSuccessfulResponse(response);
        this.authenticate = true;
      },
        err => {
          this.error = err.error.message;
          this.temp = false;

        }
    );

  }

  handleSuccessfulResponse(response) {
    this.user = response;
  }

  createUser() {
    this.error = {};
    this.temp = true;

    if(this.authenticate == true) {
      this.userService.updateUser(this.user).subscribe(
          response => {
            this.handleSuccessfulResponse(response);
            this.router.navigate(['/profile']);
          }
      );
    }
    else {

      this.userService.saveUser(this.user, this.authenticationService.getLogin()).subscribe(
        response => {
          this.handleSuccessfulResponse(response);
          this.router.navigate(['']);
        },
        er => {
          const errors = er.error.errors;

          for (const err of errors) {
            const field = err.field;
            const message = err.defaultMessage;
            this.error[field] = message;
          }

          this.router.navigate(['/profile']);
        }
      );

    }
  }

}
