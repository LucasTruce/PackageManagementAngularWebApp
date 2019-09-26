import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {AuthGuardService} from '../../service/authentication/auth-guard.service';
import {UserDetails, UserDetailsService} from '../../service/user-details/user-details.service';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  error: object = {};
  userDetails: UserDetails = new UserDetails('', '', '', '', '', '', '');

  constructor(private authService: AuthenticationService,
              private userDetailsService: UserDetailsService,
              private userService: UserService) { }

  ngOnInit() {
    this.userDetailsService.getOne(this.authService.getLogin()).subscribe(
      results => {
        this.successfulUserDetailsResponse(results);
      }
    );
  }

  updateUserDetails() {
    this.userDetailsService.update(this.userDetails, this.authService.getLogin()).subscribe(
      results => {
        this.successfulUserDetailsResponse(results);
      },
      err => {
        const errors = err.error.errors;

        for (const err of errors) {
          const field = err.field;
          const message = err.defaultMessage;
          this.error[field] = message;
        }
      }
    );
  }

  successfulUserDetailsResponse(response) {
    this.userDetails = response;
  }

}
