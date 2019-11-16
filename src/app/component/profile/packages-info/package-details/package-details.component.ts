import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../../service/package/package.service';
import {ActivatedRoute} from '@angular/router';
import {CodeService} from '../../../../service/code/code.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  id: string;
  package: Package = new Package(0, 0, 0, '', '', '', '', '', '', '', '');
  qrcode: any;

  constructor(private packageService: PackageService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private codeService: CodeService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.packageService.findById(this.id).subscribe(
      results => {
        this.sucessfullPackageResponse(results);
        this.codeService.getQrCode(this.package.code.id).subscribe(
          response => {
            this.successfullCodeResponse(response); //nowy
          }
        );
      }
    );

  }

  sucessfullPackageResponse(response) {
    this.package = response;
  }

  successfullCodeResponse(response) {
    let objectURL = 'data:image/png;base64,' + response.content;
    this.qrcode = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
