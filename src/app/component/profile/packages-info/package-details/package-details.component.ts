import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../../service/package/package.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CodeService} from '../../../../service/code/code.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  id: string;
  package: Package = new Package(0, 0, 0, '', '', '', '', '', '', '', '');
  qrcode: any;

  constructor(private authService: AuthenticationService, private packageService: PackageService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private codeService: CodeService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if(this.router.url.startsWith('/admin/packages/') && !this.authService.isAdmin())
      this.router.navigate(['profile/packages-info']);

    this.packageService.findById(this.id).subscribe(
      results => {
        this.sucessfullPackageResponse(results)
        if(this.authService.getLogin() != this.package.users[0].login && !this.authService.isAdmin()){
          this.router.navigate(['profile/packages-info']);
        }
        this.codeService.getQrCode(this.package.code.id).subscribe(
          response => {
            this.successfullCodeResponse(response); //nowy
          }
        );
      },
      error => {
        if(error.status == 404){
          this.router.navigate(['profile/packages-info']);
        }
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
