import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {Car, CarService} from '../../../../service/car/car.service';
import {Code, CodeService} from '../../../../service/code/code.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  car: Car = new Car('', '', '', 0, 0, '', '', '', 0, '', '', new Code(''));

  constructor(private authService: AuthenticationService, private carService: CarService, private codeService: CodeService, private router: Router) { }

  ngOnInit() {
  }

  addCar() {
    this.car.code.filePath = this.car.licensePlate;

    this.carService.saveCar(this.car).subscribe(
      response => {
        this.successfulResponseCar(response);
        this.router.navigate(['/admin/cars']);
      }
    );
  }

  successfulResponseCar(response) {
    this.car = response;
  }
}
