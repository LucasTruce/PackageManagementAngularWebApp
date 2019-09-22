import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Content {
  constructor(
    public date: string,
    public content?: string,
    public id?: string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private httpClient: HttpClient) { }

  saveContent(content, packId) {
    return this.httpClient.post('http://localhost:8080/content/?packId=' + packId, content);
  }
}
