import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {log} from 'util';
import {Receiver} from '../receiver/receiver.service';
import {Code} from '../code/code.service';

export class Package {
  constructor(
    public height: number,
    public width: number,
    public length: number,
    public weight: number,
    public comments: string,
    public packageNumber?: string,
    public date?: string,
    public id?: string,
    public packageStatus?: any,
    public sender?: any,
    public recipient?: any,
    public content?: any,
    public code?: Code,
    public users?: any
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private httpClient: HttpClient) { }

  save(pack, login) {
    return this.httpClient.post('http://localhost:8080/packages/?login=' + login, pack);
  }

  update(pack) {
    return this.httpClient.put('http://localhost:8080/packages', pack);
  }

  findPackageByNumber(packageNumber) {
    if(packageNumber === ''){
      packageNumber = 0;
    }
    return this.httpClient.get('http://localhost:8080/packages/number/' + packageNumber);
  }

  findById(id) {
    return this.httpClient.get('http://localhost:8080/packages/' + id);
  }


  getPackagesForUser(login, params) {
    return this.httpClient.get('http://localhost:8080/packages/?login=' + login, {params});
  }

  deletePackage(id) {
    return this.httpClient.delete('http://localhost:8080/packages?id=' + id);
  }

  getPdf(packageId) {  //list przewozowy paczki
    return this.httpClient.get('http://localhost:8080/packages/' + packageId + '/raport', {responseType: 'blob', observe: 'response'});
  }

  getPackagesForAdmin(params) {
    return this.httpClient.get('http://localhost:8080/packages/admin', {params});
  }
}
