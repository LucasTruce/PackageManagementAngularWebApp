import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../service/package/package.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-packages-info',
  templateUrl: './packages-info.component.html',
  styleUrls: ['./packages-info.component.css']
})
export class PackagesInfoComponent implements OnInit {

  packages: Array<Package> = new Array<Package>();
  config: any;
  param: object = {pageNumber: 0};
  tempPack: Package = new Package(0, 0,0, 0, '', '', '', '', '');

  constructor(private packageService: PackageService, private authenticationService: AuthenticationService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    };
  }

  ngOnInit() {
    this.packageService.getPackagesForUser(this.authenticationService.getLogin(), 0).subscribe(
      response => {
        this.successfulResponsePackages(response);
        this.configResponse(response);
      }
    );
  }

  sortPackages(event) {
    if(event.direction === '' || event.direction === 'asc') {
      this.param = {
        orderBy: event.active, //zwraca pole po którym chcemy sortować!
        direction: 'ASC'
      }
    }
    else{
      this.param = {
        orderBy: event.active,
        direction: 'DESC'
      }
    }

    this.packageService.getPackagesForUser(this.authenticationService.getLogin(), this.param).subscribe(
      response => {
        this.successfulResponsePackages(response);
        this.configResponse(response);
      }
    );
  }

  deletePackage(id) {
    this.packageService.deletePackage(id).subscribe(
      results => {
        this.packageService.getPackagesForUser(this.authenticationService.getLogin(), this.param).subscribe(
          response => {
            this.successfulResponsePackages(response);
            this.configResponse(response);
          }
        );
      }
    );
  }

  pageChanged(event) {
    this.param['pageNumber'] = event - 1;
    this.packageService.getPackagesForUser(this.authenticationService.getLogin(), this.param).subscribe(
      response => {
        this.successfulResponsePackages(response);
        this.configResponse(response);
      }
    );
  }

  configResponse(response) {
    this.config = {
      itemsPerPage: response.size,
      currentPage: response.number + 1,
      totalItems: response.totalElements
    };
  }

  successfulResponsePackages(response) {
    this.packages = response.content;
  }

  deletingPackage(pack) {
   this.tempPack = pack;
  }

  goToPdf(packageId, packageNumber){
   // window.open('http://localhost:8080/packages/raport/' + packageId, "_blank"); //przejscie do nowego okna
    this.packageService.getPdf(packageId).subscribe(
      pdf => {
        saveAs(pdf.body, "List-przewozowy-" + packageNumber + ".pdf");
      }
    );
  }
}
