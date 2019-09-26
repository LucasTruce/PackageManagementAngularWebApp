import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserDetails, UserDetailsService} from '../../service/user-details/user-details.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Role, User, UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User('', '', '');

  errors: object = {};

  comunicate: string = '';

  constructor(private router: Router, private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSumbit() {
    this.errors = {};
    this.comunicate = '';

    this.userService.registerUser(this.user).subscribe(
        data => {
          this.authenticationService.authenticate(this.user.login, this.user.password).subscribe(
            tempData =>
              this.router.navigate(['profile'])
          );
        },
        error => {
            if (error.status === 404) {
              this.comunicate = 'Login/email zajety!';
            }
            else {
              const errors = error.error.errors;

                for (const err of errors) {
                  const field = err.field;
                  const message = err.defaultMessage;

                  this.errors[field] = message;
                }
            }
        }
      );
  }
}
