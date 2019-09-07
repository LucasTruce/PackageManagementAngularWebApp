import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../service/package/package.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {Code, CodeService} from '../../service/code/code.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  package: Package = new Package(0, 0, 0, '');
  code: Code = new Code('');
  error: object = {};
  added: boolean = false;
  senderAdded: boolean = false;

  constructor(private packageService: PackageService, private authenticationService: AuthenticationService, private router: Router, private codeService: CodeService) { }

  ngOnInit() {

  }

  createPackage(){
    this.added = false;
    this.packageService.save(this.package, this.authenticationService.getLogin()).subscribe(
      response => {
        this.handleSuccessfulResponse(response);
        this.codeService.save(this.code, this.package.id).subscribe(
          res => {
            this.handleSuccessfulCode(res);
            this.router.navigate(['/createPackage']);
            this.added = true;
          }
        );
      },
        err => {
          const errors = err.error.errors;

          for (const err of errors) {
            const field = err.field;
            const message = err.defaultMessage;
            this.error[field] = message;
          }
        }
    );
  }

  handleSuccessfulResponse(response) {
    this.package = response;
    this.code.filePath = this.package.packageNumber;
  }

  handleSenderReceiverResponse(ev) {
    this.senderAdded = ev;
  }

  handleSuccessfulCode(response) {
    this.code = response;
  }

}
