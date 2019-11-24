import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../service/package/package.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.css']
})
export class AdminPackagesComponent implements OnInit {

  packages: Array<Package> = new Array<Package>();
  param: object = {pageNumber: 0};
  config: any;
  tempPack: Package = new Package(0, 0,0, 0, '', '', '', '', '');

  constructor(private authService: AuthenticationService, private packageService: PackageService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    };
  }

  ngOnInit() {
    this.packageService.getPackagesForAdmin(0).subscribe(
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

    this.packageService.getPackagesForAdmin(this.param).subscribe(
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

  pageChanged(event) {
    this.param['pageNumber'] = event - 1;
    this.packageService.getPackagesForAdmin(this.param).subscribe(
      response => {
        this.successfulResponsePackages(response);
        this.configResponse(response);
      }
    );
  }

  deletingPackage(pack) {
    this.tempPack = pack;
  }

  deletePackage(id) {
    this.packageService.deletePackage(id).subscribe(
      results => {
        this.packageService.getPackagesForAdmin(this.param).subscribe(
          response => {
            this.successfulResponsePackages(response);
            this.configResponse(response);
          }
        );
      }
    );
  }

  goToPdf(packageId, packageNumber){
    // window.open('http://localhost:8080/packages/raport/' + packageId, "_blank"); //przejscie do nowego okna
    this.packageService.getPdf(packageId).subscribe(
      pdf => {
        saveAs(pdf.body, "List-przewozowy-" + packageNumber + ".pdf");
      }
    );
  }

  successfulResponsePackages(response) {
    this.packages = response.content;
  }

}
