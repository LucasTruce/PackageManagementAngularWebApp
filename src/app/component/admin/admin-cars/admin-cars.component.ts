import { Component, OnInit } from '@angular/core';
import {Car, CarService} from '../../../service/car/car.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {CodeService} from '../../../service/code/code.service';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

  cars: Array<Car> = new Array<Car>();
  constructor(private authService: AuthenticationService,
              private carService: CarService,
              private codeService: CodeService) { }

  ngOnInit() {
    this.carService.getAll().subscribe(
      response => {
          this.successfulResponseCars(response)
      }
    );
  }

  successfulResponseCars(response) {
    this.cars = response;
  }
}
