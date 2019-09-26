import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Car {
  constructor(
    public brand: string,
    public model: string,
    public engineType: string,
    public power: number,
    public capacity: number,
    public color: string,
    public type: string,
    public licensePlate: string,
    public load: number,
    public comments: string,
    public id?: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('http://localhost:8080/cars');
  }

  saveCar(car) {
    return this.httpClient.post('http://localhost:8080/cars', car);
  }
}
