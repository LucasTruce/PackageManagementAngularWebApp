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

  userDetails: UserDetails = new UserDetails('', '', '', '', '', '', '', '', '');

  error: object = {};
  temp = true;
  authenticate = false;
  comunicate: string = '';

  constructor(private userService: UserService, private userDetailsService: UserDetailsService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.error = {};

    //po wejsciu na strone probujemy pobrac dane
    this.userDetailsService.getOne(this.authenticationService.getLogin()).subscribe(
      response => {
        this.handleSuccessfulResponse(response); //jezeli userDetails juz istnieje w bazie to nasz obiekt wypelniamy danymi
        this.authenticate = true; // userDetails istnieje
      }, // w przypadku bledu wypelniamy obiekt error wiadomosciami
        err => {
          this.error = err.error.message;
          this.temp = false;

        }
    );

  }

  handleSuccessfulResponse(response) {
    this.userDetails = response;
  }

  createUser() {    // tworzenie uzytkownika lub edycja
    this.error = {};
    this.temp = true;
    this.comunicate = '';

    if(this.authenticate == true) {   //jesli userDetails istnieje to pobieramy dane i robimy update
      this.userDetailsService.update(this.userDetails, this.authenticationService.getLogin()).subscribe(
          response => {
            this.handleSuccessfulResponse(response);  //wypelniamy obiekt user details w przypadku powodzenia
            this.comunicate = 'Dane zmienione poprawnie!';
            this.router.navigate(['/profile']);
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
    else {     //w przypadku jak uzytkownik nie istnieje to tworzymy nowego

      this.userDetailsService.saveUserDetails(this.userDetails, this.authenticationService.getLogin()).subscribe(
        response => {
          this.handleSuccessfulResponse(response);
          this.router.navigate(['']);
        },
        er => {
          const errors = er.error.errors;

          for (const err of errors) {   //walidacja, przechwytujemy bledy
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
