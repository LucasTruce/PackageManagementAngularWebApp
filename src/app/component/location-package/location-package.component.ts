import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../service/package/package.service';

@Component({
  selector: 'app-location-package',
  templateUrl: './location-package.component.html',
  styleUrls: ['./location-package.component.css']
})
export class LocationPackageComponent implements OnInit {

  package: Package = new Package(0, 0, 0, 0, '', '', '', '', '', '', '');

  constructor(private packageService: PackageService) { }

  ngOnInit() {
  }

  findPackage() {
    this.packageService.findPackageByNumber(this.package.packageNumber).subscribe(
      response => {
        this.succesfullResponsePackage(response);
      }
    );
  }

  succesfullResponsePackage(response) {
    this.package = response;
  }
}
