import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Role {
  constructor(
    public name: string
  ) {}
}
export class User {
  constructor(
    public email: string,
    public login: string,
    public password: string,
    public roles?: object
) {}

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(login) {
    return this.httpClient.get('http://localhost:8080/users/?login=' + login);
  }
  saveUser(user) {
    return this.httpClient.post('http://localhost:8080/register', user);
  }

  updateUser(user) {
    return this.httpClient.put('http://localhost:8080/users', user);
  }

}
