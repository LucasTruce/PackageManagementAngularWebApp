import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDetails} from '../user-details/user-details.service';

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
    public roles?: object,
    public id?: string,
    public userDetails?: UserDetails
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

  getUserById(userId) {
    return this.httpClient.get('http://localhost:8080/users/' + userId);
  }

  getAllUsers() {
    return this.httpClient.get('http://localhost:8080/users');
  }

  registerUser(user) {
    return this.httpClient.post('http://localhost:8080/register', user);
  }

  updateUser(user) {
    return this.httpClient.put('http://localhost:8080/users', user);
  }

  deleteUser(userId) {
    return this.httpClient.delete('http://localhost:8080/users?id=' + userId);
  }

}
