import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class History {
  constructor(
    public localization: string,
    public date: string,
    public description: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpClient: HttpClient) { }

  getHistories(packId) {
    return this.httpClient.get('http://localhost:8080/history/?packId=' + packId);
  }
}
