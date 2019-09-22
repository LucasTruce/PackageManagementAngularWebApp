import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class ProductCategory {
  constructor(
    public name: string,
    public description: string,
    public id?: string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('http://localhost:8080/categories');
  }
}
