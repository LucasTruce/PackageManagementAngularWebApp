import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Role} from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  roles: Array<Role> = new Array<Role>();
  authenticate(login, password) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', {login, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('login', login);
          const tokenStr = 'Bearer ' + userData.jwttoken;
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('roles', JSON.stringify(userData.roles));
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
    sessionStorage.removeItem('roles');
  }

  getLogin() {
    return sessionStorage.getItem('login');
  }

  getRoles() {
    return JSON.parse(sessionStorage.getItem('roles'));
  }

  isAdmin() {
    this.roles = this.getRoles();
    for(let role of this.roles) {
      if(role.name === 'ROLE_ADMIN') {
        return true;
      }
    }
  }

  isUser() {
      this.roles = this.getRoles();
      for(let role of this.roles) {
        if(role.name === 'ROLE_USER') {
          return true;
        }
      }
  }

  isWorker() {
    this.roles = this.getRoles();
    for(let role of this.roles) {
      if(role.name === 'ROLE_WORKER') {
        return true;
      }
    }
  }
}
