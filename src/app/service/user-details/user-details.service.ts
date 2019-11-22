import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class UserDetails {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public phoneNumber: string,
    public street: string,
    public city: string,
    public postCode: string,
    public houseNumber: string,
    public apartmentNumber: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private httpClient: HttpClient) { }

  saveUserDetails(userDetails, login) {
      return this.httpClient.post('http://localhost:8080/userdetails/?login=' + login, userDetails);
  }

  getAll() {
      return this.httpClient.get('http://localhost:8080/userdetails');
  }

  getOne(login) {
      return this.httpClient.get('http://localhost:8080/userdetails/?login=' + login);
  }

  update(userDetails, login) {
      return this.httpClient.put('http://localhost:8080/userdetails/?login=' + login, userDetails);
  }
}
