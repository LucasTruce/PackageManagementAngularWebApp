import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../product/product.service';

export class Content {
  constructor(
    public date: string,
    public content?: string,
    public id?: string,
    public products?: Array<Product>
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private httpClient: HttpClient) { }

  saveContent(content) {
    return this.httpClient.post('http://localhost:8080/content', content);
  }
}
