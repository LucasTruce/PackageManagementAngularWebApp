import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductCategory} from '../productCategory/product-category.service';
import {Code} from '../code/code.service';
import {Content} from '../content/content.service';

export class Product {
  constructor(
    public name: string,
    public weight: number,
    public comments: string,
    public id?: string,
    public category?: ProductCategory,
    public code?: Code,
    public content?: Content
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  saveAll(products, contentId) {
    return this.httpClient.post('http://localhost:8080/products/?contentId=' + contentId, products);
  }

  deleteAll(products) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: products
    };
    return this.httpClient.delete('http://localhost:8080/products', options);
  }
}
