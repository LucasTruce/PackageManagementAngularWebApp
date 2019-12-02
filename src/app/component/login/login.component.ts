import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User, UserService} from '../../service/user/user.service';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';
  invalidLogin = false;
  errors: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
  this.login = '';
  this.password = '';
  }

  checkLogin() {
    this.authenticationService.authenticate(this.login, this.password).subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          this.errors = error.error.message;
          this.invalidLogin = true;

        }
      )


  }

}
