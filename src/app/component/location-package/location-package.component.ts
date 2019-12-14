import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../service/package/package.service';
import {History, HistoryService} from '../../service/history/history.service';

@Component({
  selector: 'app-location-package',
  templateUrl: './location-package.component.html',
  styleUrls: ['./location-package.component.css']
})
export class LocationPackageComponent implements OnInit {

  package: Package = new Package(0, 0, 0, 0, '', '', '', '', '', '', '');
  histories: Array<History> = new Array<History>();

  constructor(private packageService: PackageService,
              private historyService: HistoryService) { }

  ngOnInit() {
  }

  findPackage() {
    this.packageService.findPackageByNumber(this.package.packageNumber).subscribe(
      response => {
        this.succesfullResponsePackage(response);
        this.historyService.getHistories(this.package.id).subscribe(
          res => {
            this.succesfullResponseHistories(res);
          }
        );
      }
    );
  }

  succesfullResponsePackage(response) {
    this.package = response;
  }
  succesfullResponseHistories(response) {
    this.histories = response;
  }
}
