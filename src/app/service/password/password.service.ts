import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Password {
  constructor(
    public email: string,
    public login: string,
    public password: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient: HttpClient) { }

  savePassword(password) {
      return this.httpClient.post('http://localhost:8080/password', password);
  }
}
