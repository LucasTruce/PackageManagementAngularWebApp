import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Password, PasswordService} from '../../service/password/password.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  password: Password = new Password('', '', '');

  errors: object = {};

  fields: string[] = ['email', 'login', 'password'];

  constructor(private router: Router, private passwordService: PasswordService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSumbit() {
    this.errors = {};

    this.passwordService.savePassword(this.password).subscribe(
        data => {
          this.authenticationService.authenticate(this.password.login, this.password.password).subscribe(
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
