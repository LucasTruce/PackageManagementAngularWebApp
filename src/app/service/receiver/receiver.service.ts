import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Receiver {
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
export class ReceiverService {

  constructor(private httpClient: HttpClient) { }


  save(receiver, packId) {
    return this.httpClient.post('http://localhost:8080/recipients/?packId=' + packId, receiver);
  }
}
