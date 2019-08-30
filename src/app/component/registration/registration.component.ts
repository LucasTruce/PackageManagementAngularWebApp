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

  constructor(private router: Router, private passwordService: PasswordService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSumbit() {
      this.passwordService.savePassword(this.password).subscribe(
        data => {
          this.authenticationService.authenticate(this.password.login, this.password.password).subscribe(
            tempData =>
              this.router.navigate([''])
          );
        }
      );
  }
}
