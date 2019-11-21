import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {Warehouse, WarehouseService} from '../../../../service/warehouse/warehouse.service';
import {Router} from '@angular/router';
import {Code, CodeService} from '../../../../service/code/code.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {

  warehouse: Warehouse = new Warehouse('', '', '', '', '', '', new Code(''));


  constructor(private authService: AuthenticationService, private warehouseService: WarehouseService,private router: Router) { }

  ngOnInit() {
  }

  addWarehouse() {
    this.warehouse.code.filePath = this.warehouse.city;
    this.warehouseService.saveWarehouse(this.warehouse).subscribe(
      results => {
        this.successfulResponseWarehouse(results);
        console.log(this.warehouse.id)
        this.router.navigate(['/admin/warehouses']);
      }
    );
  }

  successfulResponseWarehouse(response) {
    this.warehouse = response;
  }

}
