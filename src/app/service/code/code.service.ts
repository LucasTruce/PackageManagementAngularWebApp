import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


export class Code {
  constructor(
    public filePath: string,
    public id?: string,
    public pack?: any,
    public warehouse?: any,
    public car?: any,
    public product?: any
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
}
