import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCategory} from '../productCategory/product-category.service';

export class Product {
  constructor(
    public name: string,
    public weight: number,
    public comments: string,
    public id?: string,
    public category?: ProductCategory
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  saveAll(products, content) {
    return this.httpClient.post('http://localhost:8080/products/?contentId=' + content, products);
  }
}
