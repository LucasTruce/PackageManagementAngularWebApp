import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../product/product.service';


export class Code {
  constructor(
    public filePath: string,
    public product?: any,
    public id?: string,
    public pack?: any,
    public warehouse?: any,
    public car?: any

  ) {}
}
@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private httpClient: HttpClient) { }

  save(code, packId) {
    return this.httpClient.post('http://localhost:8080/codes/?packId=' + packId, code);
  }

  saveWithWarehouse(warehouseId, code) {
    return this.httpClient.post('http://localhost:8080/codes/?warehouseId=' + warehouseId, code);
  }

  saveWithCar(carId, code) {
    return this.httpClient.post('http://localhost:8080/codes/?carId=' + carId, code);
  }

  saveWithProduct(codes) {
    return this.httpClient.post('http://localhost:8080/codes', codes);
  }
}
