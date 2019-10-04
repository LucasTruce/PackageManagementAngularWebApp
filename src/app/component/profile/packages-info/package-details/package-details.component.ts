import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../../service/package/package.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  id: string;
  package: Package = new Package(0, 0, 0, '', '', '', '', '', '', '', '');

  constructor(private packageService: PackageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.packageService.findById(this.id).subscribe(
      results => {
        this.sucessfullPackageResponse(results);
      }
    );

  }

  sucessfullPackageResponse(response) {
    this.package = response;
  }

}
