import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Package} from '../package/package.service';


export class Sender {
  constructor(
    public name: string,
    public lastName: string,
    public companyName: string,
    public city: string,
    public street: string,
    public postCode: string,
    public phoneNumber: string,
    public houseNumber: string,
    public apartmentNumber: string,
    public email?: string,
    public pack?: Package,
    public id?: string
  ) {}
}
@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(private httpClient: HttpClient) { }

  save(sender) {
    return this.httpClient.post('http://localhost:8080/senders', sender);
  }

  update(sender) {
    return this.httpClient.put('http://localhost:8080/senders', sender);
  }
}
