import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserDetails, UserDetailsService} from '../../service/user-details/user-details.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User, UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User('', '', '');

  errors: object = {};

  constructor(private router: Router, private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSumbit() {
    this.errors = {};

    this.userService.saveUser(this.user).subscribe(
        data => {
          this.authenticationService.authenticate(this.user.login, this.user.password).subscribe(
            tempData =>
              this.router.navigate(['profile'])
          );
        },
        error => {
            const errors = error.error.errors;

            for (const err of errors) {
              const field = err.field;
              const message = err.defaultMessage;

              this.errors[field] = message;
            }
        }
      );
  }
}
