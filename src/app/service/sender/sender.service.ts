import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export class Sender {
  constructor(
    public name: string,
    public lastName: string,
    public companyName: string,
    public city: string,
    public street: string,
    public postCode: string,
    public phoneNumber: string,
    public email?: string
  ) {}
}
@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(private httpClient: HttpClient) { }

  save(sender, packId) {
    return this.httpClient.post('http://localhost:8080/senders/?packId=' + packId, sender);
  }

  update(sender) {
    return this.httpClient.put('http://localhost:8080/senders', sender);
  }
}
