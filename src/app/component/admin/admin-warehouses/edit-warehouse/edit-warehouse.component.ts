import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {Warehouse, WarehouseService} from '../../../../service/warehouse/warehouse.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.css']
})
export class EditWarehouseComponent implements OnInit {

  id: string;
  warehouse: Warehouse = new Warehouse('', '', '', '', '', '');

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.warehouseService.getWarehouseById(this.id).subscribe(
      response => {
        this.successfulResponseWarehouse(response);
      }
    );
  }

  updateWarehouse() {
    this.warehouseService.updateWarehouse(this.warehouse).subscribe(
      response => {
        this.successfulResponseWarehouse(response);
        this.router.navigate(['/admin/warehouses']);
      }
    );
  }

  successfulResponseWarehouse(response) {
    this.warehouse = response;
  }
}
