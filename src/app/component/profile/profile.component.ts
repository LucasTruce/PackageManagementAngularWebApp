import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {UserDetails, UserDetailsService} from '../../service/user-details/user-details.service';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserDetails = new UserDetails('', '', '', '', '', '', '');

  error: object = {};
  temp = true;
  authenticate = false;
  comunicate: string = '';

  constructor(private userService: UserService, private userDetailsService: UserDetailsService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.error = {};

    this.userDetailsService.getOne(this.authenticationService.getLogin()).subscribe(
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
    this.userDetails = response;
  }

  createUser() {
    this.error = {};
    this.temp = true;
    this.comunicate = '';

    if(this.authenticate == true) {
      this.userDetailsService.update(this.userDetails, this.authenticationService.getLogin()).subscribe(
          response => {
            this.handleSuccessfulResponse(response);
            this.comunicate = 'Dane zmienione poprawnie!';
            this.router.navigate(['/profile']);
          }
      );
    }
    else {

      this.userDetailsService.saveUserDetails(this.userDetails, this.authenticationService.getLogin()).subscribe(
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
