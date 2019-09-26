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
  constructor(private authService: AuthenticationService, private warehouseService: WarehouseService, private codeService: CodeService) { }

  ngOnInit() {
    this.warehouseService.getAll().subscribe(
      results => {
        this.successfulResponseWarehouses(results);

      }
    );
  }

  successfulResponseWarehouses(response) {
    this.warehouses = response;
  }

  addWarehouse() {

  }

}
