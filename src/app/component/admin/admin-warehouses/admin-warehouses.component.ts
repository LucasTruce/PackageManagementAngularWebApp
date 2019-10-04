import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {Warehouse, WarehouseService} from '../../../service/warehouse/warehouse.service';
import {CodeService} from '../../../service/code/code.service';

@Component({
  selector: 'app-admin-warehouses',
  templateUrl: './admin-warehouses.component.html',
  styleUrls: ['./admin-warehouses.component.css']
})
export class AdminWarehousesComponent implements OnInit {

  warehouses: Array<Warehouse> = new Array<Warehouse>();
  config: any;
  param: object = {pageNumber: 0};

  constructor(private authService: AuthenticationService, private warehouseService: WarehouseService, private codeService: CodeService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    };
  }

  ngOnInit() {
    this.warehouseService.getAll(0).subscribe(
      results => {
        this.successfulResponseWarehouses(results);
        this.configResponse(results);
      }
    );
  }



  sortWarehouse(event) {
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

    this.warehouseService.getAll(this.param).subscribe(
      response => {
        this.successfulResponseWarehouses(response);
        this.configResponse(response);
      }
    );
  }

  pageChanged(event) {
    this.param['pageNumber'] = event - 1;

    this.warehouseService.getAll(this.param).subscribe(
      response => {
        this.successfulResponseWarehouses(response);
        this.configResponse(response);
      }
    );
  }

  deleteWarehouse(id) {
    this.warehouseService.deleteWarehouse(id).subscribe(
      response => {
        this.warehouseService.getAll(this.param).subscribe(
          results => {
            this.successfulResponseWarehouses(results);
            this.configResponse(results);
          }
        );
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

  successfulResponseWarehouses(response) {
    this.warehouses = response.content;
  }
}
