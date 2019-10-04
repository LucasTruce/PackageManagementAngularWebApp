import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../../../service/user/user.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: Array<User> = new Array<User>();
  config: any;
  response: any;
  param: object = {pageNumber: 0};

  constructor(private authService: AuthenticationService, private userService: UserService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    };
  }

  ngOnInit() {
    this.userService.getAllUsers(0).subscribe(
      results => {
        this.successfulResponseUsers(results);
        this.configResponse(results);
      }
    );
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(response => {
      this.userService.getAllUsers(0).subscribe(results => {
        this.successfulResponseUsers(results);
        this.configResponse(results);
      });
    });
  }

  pageChanged(event) {
    this.param['pageNumber'] = event - 1;

    this.userService.getAllUsers(this.param).subscribe(response => {
      this.successfulResponseUsers(response);
      this.configResponse(response);
    });

  }

  sortUser(event) {
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

    this.userService.getAllUsers(this.param).subscribe(
      response => {
        this.successfulResponseUsers(response);
        this.configResponse(response);
      }
    );

  }

  successfulResponseUsers(response) {
    this.users = response.content;
    this.response = response;
  }

  configResponse(response) {
    this.config = {
      itemsPerPage: response.size,
      currentPage: response.number + 1,
      totalItems: response.totalElements
    };
  }

}
