import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class User {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public phoneNumber: string,
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

}
