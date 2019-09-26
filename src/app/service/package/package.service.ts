import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';

export class Package {
  constructor(
    public height: number,
    public width: number,
    public length: number,
    public comments: string,
    public packageNumber?: string,
    public date?: string,
    public id?: string,
    public packageStatus?: any
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  public packNumber?: string;


  constructor(private httpClient: HttpClient) { }

  save(pack, login) {
    return this.httpClient.post('http://localhost:8080/packages/?login=' + login, pack);
  }

  getPackageNumber() {
    return this.packNumber;
  }

  getPackagesForUser(login) {
    return this.httpClient.get('http://localhost:8080/packages/?login=' + login);
  }
}
