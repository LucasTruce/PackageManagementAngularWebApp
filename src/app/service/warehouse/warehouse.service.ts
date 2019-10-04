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

  getAll(params) {
    return this.httpClient.get('http://localhost:8080/warehouses', {params});
  }

  saveWarehouse(warehouse) {
    return this.httpClient.post('http://localhost:8080/warehouses', warehouse);
  }

  deleteWarehouse(id) {
    return this.httpClient.delete('http://localhost:8080/warehouses?id=' + id);
  }

  getWarehouseById(id) {
    return this.httpClient.get('http://localhost:8080/warehouses/' + id);
  }

  updateWarehouse(warehouse) {
    return this.httpClient.put('http://localhost:8080/warehouses', warehouse);
  }
}
