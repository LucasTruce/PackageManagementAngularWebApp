import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../service/package/package.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-packages-info',
  templateUrl: './packages-info.component.html',
  styleUrls: ['./packages-info.component.css']
})
export class PackagesInfoComponent implements OnInit {

  packages: Array<Package> = new Array<Package>();
  constructor(private packageService: PackageService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.packageService.getPackagesForUser(this.authenticationService.getLogin()).subscribe(
      response => {
        this.successfulResponsePackages(response);
        console.log(this.packages);
      }
    );
  }

  successfulResponsePackages(response) {
    this.packages = response;
  }

}
