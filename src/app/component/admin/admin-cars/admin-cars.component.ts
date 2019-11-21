import { Component, OnInit } from '@angular/core';
import {Car, CarService} from '../../../service/car/car.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

  cars: Array<Car> = new Array<Car>();
  config: any;
  param: object = {pageNumber: 0};
  tempCar: Car = new Car('', '', '', 0, 0, '', '', '', 0, '');

  constructor(private authService: AuthenticationService,
              private carService: CarService) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 10
      };

  }

  ngOnInit() {
    this.carService.getAll(0).subscribe(
      response => {
          this.successfulResponseCars(response);
          this.configResponse(response);
      }
    );
  }

  sortCars(event) {
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

    this.carService.getAll(this.param).subscribe(
      response => {
        this.successfulResponseCars(response);
        this.configResponse(response);
      }
    );
  }

  pageChanged(event) {
    this.param['pageNumber'] = event - 1;

    this.carService.getAll(this.param).subscribe(
      response => {
        this.successfulResponseCars(response);
        this.configResponse(response);
      }
    );
  }

  deletingCar(car){
    this.tempCar = car;
  }

  deleteCar(id) {
    this.carService.deleteCar(id).subscribe(
      response => {
        this.carService.getAll(this.param).subscribe(
          results => {
            this.successfulResponseCars(results);
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

  successfulResponseCars(response) {
    this.cars = response.content;
  }

  goToPdf(carId){
    this.carService.getPdf(carId).subscribe(
      pdf => {
        saveAs(pdf.body, pdf.headers.get('content-disposition'));
        //let fileURL = window.URL.createObjectURL(pdf); //otwieranie w nowej karcie (NALEŻY WYŁĄCZYĆ ADBLOCKA!!!)
        //window.open(fileURL);
      }
    );
  }


}
