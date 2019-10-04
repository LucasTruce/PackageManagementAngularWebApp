import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Car, CarService} from '../../../../service/car/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  id: string;
  car: Car = new Car('', '', '', 0, 0, '', '' ,'', 0, '', '');

  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private carService: CarService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.carService.getCarById(this.id).subscribe(
      response => {
        this.successfulResponseCar(response);
      }
    );
  }

  updateCar() {
    this.carService.updateCar(this.car).subscribe(
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
