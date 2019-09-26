import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Warehouse {
  constructor(public phoneNumber: string,
              public street: string,
              public city: string,
              public postCode: string,
              public description: string,
              public id?: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('http://localhost:8080/warehouses');
  }

  saveWarehouse(warehouse) {
    return this.httpClient.post('http://localhost:8080/warehouses', warehouse);
  }
}
