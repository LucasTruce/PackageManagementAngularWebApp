import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class User {
  constructor(
    public name: string,
    public lastName: string,
    // tslint:disable-next-line:variable-name
    public number: string,
    public street: string,
    public city: string,
    public postCode: number
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>('//localhost:8080/users');
  }

  getOne(login: string) {
    return this.httpClient.get<User>('http://localhost:8080/users/?login=' + login);
  }

  saveUser(user, email) {
    return this.httpClient.post('http://localhost:8080/users/?email=' + email, user);
  }

  updateUser(user) {
    return this.httpClient.put('http://localhost:8080/users', user);
  }

}
