import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {log} from 'util';

export class User {
  constructor(
    public status: string,
  ) {}

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(login, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', {login, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('login', login);
          const tokenStr = 'Bearer ' + userData.jwttoken;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )


    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('login');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }

  getLogin() {
    return sessionStorage.getItem('login');
  }
}
