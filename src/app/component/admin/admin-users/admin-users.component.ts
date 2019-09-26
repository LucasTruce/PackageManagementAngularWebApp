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

  constructor(private authService: AuthenticationService, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      results => {
        this.successfulResponseUsers(results);
        this.response = results;
        this.config = {
          itemsPerPage: this.response.size,
          currentPage: this.response.number,
          totalItems: this.response.totalElements
        };
      }
    );
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(response => {
      this.userService.getAllUsers().subscribe(results => {
        this.successfulResponseUsers(results);
      });
    });
  }

  pageChanged(event) {

  }

  successfulResponseUsers(response) {
    this.users = response.content;
  }

}
